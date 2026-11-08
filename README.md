# OfferLens

OfferLens is a web application that analyzes job offer letters to help candidates understand their CTC, monthly take-home salary, benefits, and hidden red flags (such as non-competes, service bonds, and probation terms).

## Features
- **Client-Side PDF Text Extraction:** In-browser text parsing via `pdfjs-dist` (normalizing common encoding issues like `■` to `₹`).
- **AI-Powered Offer Analysis:** Supabase Edge Function integrating Gemini 2.0 to extract compensation breakdowns, probation terms, notice period, and red flags.
- **Multilingual Support:** English and Hindi (`en` / `hi`).
- **Database Logging:** Real-time logging of analyzed offers and user inquiries directly to Supabase with Row Level Security (RLS).
- **Vercel-Ready:** Pre-configured for seamless SPA deployments with custom routing and fallback rules.

---

## Deployment on Vercel

### 1. Push to GitHub
Ensure the project is pushed to your GitHub repository:
```bash
git init
git add .
git commit -m "Initial commit for OfferLens"
git branch -M main
git remote add origin https://github.com/krishkumar10-web/offerlens.git
git push -u origin main
```

### 2. Import into Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Import `krishkumar10-web/offerlens`.
4. Framework Preset: **Vite** (auto-detected).
5. Build Command: `npm run build`
6. Output Directory: `dist`

### 3. Environment Variables
Add these in the Vercel Project Settings under **Environment Variables**:
- `VITE_SUPABASE_URL`: Your Supabase Project URL (`https://<project-id>.supabase.co`)
- `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
