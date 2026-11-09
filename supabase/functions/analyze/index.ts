import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info",
};

const SYSTEM_PROMPT = `You are OfferLens, an expert Indian employment law and compensation analyst.
You will receive the full text of an Indian job offer letter.
Analyze it and return a JSON object with EXACTLY this structure (no markdown, no code fences, just raw JSON):

{
  "language": "<same as the language parameter sent>",
  "overview": {
    "candidateName": "<full name from the letter>",
    "role": "<job title / designation>",
    "company": "<company name>",
    "workLocation": "<office location and work mode>",
    "joiningDate": "<joining date>",
    "employmentType": "<full-time/part-time/contract>",
    "summary": "<2-3 sentence plain-language summary of the offer, mentioning key highlights and concerns>"
  },
  "salary": {
    "annualCtc": "<formatted e.g. ₹ 4,80,000>",
    "annualCtcNumeric": <number>,
    "monthlyGross": "<formatted>",
    "estimatedMonthlyInHand": "<formatted, after PF and estimated tax for this CTC>",
    "inHandNote": "<brief note about what is included/excluded in the estimate>",
    "components": [
      { "label": "<component name>", "amount": "<formatted amount / month or year>", "percentage": "<percentage of CTC or nature>" }
    ]
  },
  "benefits": [
    {
      "id": "<short id like health, leave, learning>",
      "icon": "<one of: ShieldAlert, CalendarCheck, GraduationCap, Laptop, HeartPulse, Coffee, Sparkles>",
      "title": "<benefit title>",
      "description": "<one line description>"
    }
  ],
  "keyTerms": [
    { "term": "<term name e.g. Probation Period>", "value": "<details from the offer letter>" }
  ],
  "redFlags": [
    {
      "id": "<e.g. rf-1>",
      "severity": "<high or medium or low>",
      "severityLabel": "<High Risk or Medium Risk or Low Risk>",
      "title": "<short title of the concern>",
      "explanation": "<plain language explanation of why this is risky, with reference to Indian labor law if relevant>",
      "clauseQuote": "<exact or near-exact quote from the offer letter text>"
    }
  ]
}

IMPORTANT RULES:
- The "■" character in the text is the ₹ (Indian Rupee) symbol. Always treat it as ₹.
- If the language parameter is "hi", write ALL text values in Hindi (Devanagari script), except numbers and proper nouns.
- If the language parameter is "en", write in clear simple English.
- Extract EVERY salary component you can find.
- Always include at least these key terms: Probation Period, Notice Period, Working Hours. Add Employment Bond, Non-Compete, Moonlighting if mentioned.
- For redFlags: be thorough. Flag service bonds, long notice periods (>30 days for freshers), non-compete clauses, penalty clauses, IP assignment beyond work scope, one-sided termination clauses.
- If no red flags exist, return an empty redFlags array.
- For estimatedMonthlyInHand: calculate Basic + HRA + Special/Other allowances, minus employee PF (12% of Basic, capped at ₹1800). Do NOT subtract income tax.
- Return ONLY valid JSON. No explanation text outside the JSON.`;

// ---- Gemini call with fallback model, retries and time limits ----
const MODELS = ["gemini-3.8-flash", "gemini-3.6-flash"];
const PER_TRY_TIMEOUT_MS = 55000;
const TOTAL_BUDGET_MS = 110000;

async function fetchGemini(url: string, options: RequestInit): Promise<Response> {
  const started = Date.now();
  let last: Response | undefined;
  for (const model of MODELS) {
    const u = url.replace(/models\/[^:]+:/, `models/${model}:`);
    for (let attempt = 0; attempt < 2; attempt++) {
      if (Date.now() - started > TOTAL_BUDGET_MS) {
        return last ?? new Response(JSON.stringify({ error: "timeout" }), { status: 504 });
      }
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), PER_TRY_TIMEOUT_MS);
      try {
        const res = await fetch(u, { ...options, signal: controller.signal });
        clearTimeout(timer);
        last = res;
        if (res.ok) return res;
        if (res.status === 400 || res.status === 404) break; // problem with this model: try the next one
        if (![429, 500, 503, 504].includes(res.status)) return res;
      } catch (_e) {
        clearTimeout(timer); // timeout or network error: try again
      }
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
    }
  }
  return last ?? new Response(JSON.stringify({ error: "AI service did not respond" }), { status: 504 });
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
    );
  }

  // Validate API key is configured
  if (!GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "GEMINI_API_KEY is not configured in Edge Function secrets. Please add it in the Supabase Dashboard under Edge Functions > Secrets." }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
    );
  }

  try {
    const body = await req.json();
    const { text, language } = body;

    if (!text || typeof text !== "string" || text.trim().length < 50) {
      return new Response(
        JSON.stringify({ error: "Offer letter text is too short or missing. Please upload a valid PDF with readable text." }),
        { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
      );
    }

    const lang = language === "hi" ? "hi" : "en";
    const letterText = text.length > 60000 ? text.substring(0, 60000) : text;

    // Call Gemini API (the model name in the URL is replaced by fetchGemini)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent`;

    const geminiResponse = await fetchGemini(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Language: ${lang}\n\n--- OFFER LETTER TEXT START ---\n${letterText}\n--- OFFER LETTER TEXT END ---`,
              },
            ],
          },
        ],
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
          thinkingConfig: { thinkingLevel: "low" },
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, errText);
      return new Response(
        JSON.stringify({ error: `Gemini API returned ${geminiResponse.status}: ${errText.substring(0, 200)}` }),
        { status: 502, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
      );
    }

    const geminiData = await geminiResponse.json();

    // Extract the generated text
    const generatedText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      console.error("No text in Gemini response:", JSON.stringify(geminiData));
      return new Response(
        JSON.stringify({ error: "Gemini returned an empty response. The offer letter may be too short or unclear." }),
        { status: 502, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
      );
    }

    // Parse the JSON from Gemini's response
    let analysisResult;
    try {
      // Strip markdown code fences if Gemini added them despite the instruction
      let cleaned = generatedText.trim();
      if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
      }
      analysisResult = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Failed to parse Gemini JSON:", parseErr, "\nRaw text:", generatedText.substring(0, 500));
      return new Response(
        JSON.stringify({ error: "Failed to parse the AI analysis. Please try again." }),
        { status: 502, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
      );
    }

    // Return the structured analysis
    return new Response(
      JSON.stringify(analysisResult),
      {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
    );
  }
});
