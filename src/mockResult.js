/**
 * OfferLens - Mock Data Store (src/mockResult.js)
 * 
 * This file contains mock offer letter analysis results in English and Hindi.
 * When a backend is connected, the API response should match this JSON structure.
 */

// ==========================================
// 1. ENGLISH MOCK DATA (With Sample Red Flags)
// ==========================================
export const mockOfferResultEn = {
  language: 'en',
  overview: {
    candidateName: "Aarav Sharma",
    role: "Associate Software Engineer",
    company: "NexGen Cloud Technologies Pvt. Ltd.",
    workLocation: "Bengaluru, Karnataka (Hybrid - 3 days office)",
    joiningDate: "July 1, 2025",
    employmentType: "Full-time Permanent",
    summary: "Standard entry-level software developer offer with a competitive starting CTC. The offer includes health insurance and flexible hybrid work, but contains a 2-year service bond and a strict 90-day notice period that freshers should review closely before accepting."
  },
  salary: {
    annualCtc: "₹ 8,50,000",
    annualCtcNumeric: 850000,
    monthlyGross: "₹ 70,833",
    estimatedMonthlyInHand: "₹ 59,200",
    inHandNote: "Estimate before income tax deductions. Excludes voluntary employee PF and annual performance bonus.",
    components: [
      { label: "Basic Salary", amount: "₹ 35,417 / month", percentage: "50% of CTC" },
      { label: "House Rent Allowance (HRA)", amount: "₹ 14,167 / month", percentage: "20% of CTC" },
      { label: "Special Allowance", amount: "₹ 11,250 / month", percentage: "Flexible component" },
      { label: "Employer Provident Fund (PF)", amount: "₹ 4,250 / month", percentage: "Retirement savings" },
      { label: "Gratuity & Insurance provision", amount: "₹ 2,750 / month", percentage: "Statutory benefit" },
      { label: "Performance Incentive (Annual)", amount: "₹ 36,000 / year", percentage: "Paid annually upon review" }
    ]
  },
  benefits: [
    {
      id: "health",
      icon: "ShieldAlert",
      title: "Medical Insurance",
      description: "₹5,00,000 family floater coverage for self, spouse, and up to 2 dependent children or parents."
    },
    {
      id: "leave",
      icon: "CalendarCheck",
      title: "Paid Leaves",
      description: "18 Privilege leaves + 12 Casual/Sick leaves + 10 National holidays annually."
    },
    {
      id: "learning",
      icon: "GraduationCap",
      title: "Upskilling & Certifications",
      description: "₹25,000 annual reimbursement allowance for AWS, Azure, or technical certifications."
    },
    {
      id: "wfh",
      icon: "Laptop",
      title: "Hybrid Work Allowance",
      description: "One-time home workstation setup grant of ₹15,000 + monthly internet allowance."
    },
    {
      id: "wellness",
      icon: "HeartPulse",
      title: "Wellness & Counseling",
      description: "Free access to mental health counseling sessions and annual health check-up packages."
    },
    {
      id: "food",
      icon: "Coffee",
      title: "Meals & Transportation",
      description: "Subsidized cafeteria meals and complimentary evening cab pickup/drop for late shifts."
    }
  ],
  keyTerms: [
    { term: "Probation Period", value: "6 months from the date of joining (subject to performance confirmation)" },
    { term: "Notice Period", value: "90 days (3 months) post-confirmation; 30 days during probation" },
    { term: "Working Hours", value: "Monday to Friday, 9:30 AM – 6:30 PM (45 hours per week)" },
    { term: "Employment Bond", value: "24-month service agreement backed by a ₹1,50,000 security undertaking" },
    { term: "Moonlighting & Side Work", value: "Strictly prohibited. Any external commercial work requires prior written HR approval" },
    { term: "Non-Compete Duration", value: "12 months post-exit within competing cloud software service providers" }
  ],
  redFlags: [
    {
      id: "rf-1",
      severity: "high", // "high" | "medium" | "low"
      severityLabel: "High Risk",
      title: "2-Year Mandatory Service Bond (₹1,50,000)",
      explanation: "The company mandates serving for 24 months. If you resign earlier for higher studies, personal reasons, or a better opportunity, you must pay ₹1,50,000. Under Indian labor law (Section 27 of Contract Act), unreasonable bonds are often uncollectable, but companies may withhold your experience letter and relieving documents.",
      clauseQuote: "Clause 8.2: The employee undertakes to serve the Company for an uninterrupted period of no less than twenty-four (24) months. In the event of early resignation, the employee agrees to reimburse INR 1,50,000 towards specialized training and operational overheads."
    },
    {
      id: "rf-2",
      severity: "high",
      severityLabel: "High Risk",
      title: "Prolonged 90-Day (3-Month) Notice Period",
      explanation: "A 90-day notice period is very long for entry-level roles. Most future employers expect freshers to join within 15 to 30 days, which might hinder your ability to switch jobs smoothly in the future.",
      clauseQuote: "Clause 14.1: Either party may terminate this agreement by providing three (3) months prior notice in writing. Buyout of the notice period is strictly at the sole discretion of the management."
    },
    {
      id: "rf-3",
      severity: "medium",
      severityLabel: "Medium Risk",
      title: "Broad 12-Month Non-Compete Restriction",
      explanation: "Restricts you from joining direct or indirect competitors for one full year after leaving. While post-employment non-competes are generally void under Indian law, it can cause unnecessary legal friction or delayed onboarding with future employers.",
      clauseQuote: "Clause 19.4: For twelve (12) months following termination of employment, the employee shall not directly or indirectly render software engineering services to any entity in the cloud domain."
    }
  ]
};

// ==========================================
// 2. HINDI MOCK DATA (हिन्दी परिणाम)
// ==========================================
export const mockOfferResultHi = {
  language: 'hi',
  overview: {
    candidateName: "आरव शर्मा",
    role: "एसोसिएट सॉफ्टवेयर इंजीनियर",
    company: "नेक्सजेन क्लाउड टेक्नोलॉजीज प्राइवेट लिमिटेड",
    workLocation: "बेंगलुरु, कर्नाटक (हाइब्रिड - सप्ताह में 3 दिन कार्यालय)",
    joiningDate: "1 जुलाई 2025",
    employmentType: "पूर्णकालिक स्थायी (Full-time Permanent)",
    summary: "फ्रेशर्स के लिए अच्छा शुरुआती वेतन और स्वास्थ्य बीमा वाला ऑफर लेटर। हाइब्रिड कार्य की सुविधा उपलब्ध है, लेकिन इसमें 2 साल का सर्विस बॉन्ड और 90 दिनों की लंबी नोटिस अवधि शामिल है, जिसे स्वीकार करने से पहले ध्यान से पढ़ना आवश्यक है।"
  },
  salary: {
    annualCtc: "₹ 8,50,000",
    annualCtcNumeric: 850000,
    monthlyGross: "₹ 70,833",
    estimatedMonthlyInHand: "₹ 59,200",
    inHandNote: "आयकर (Income Tax) कटने से पहले का अनुमानित इन-हैंड वेतन। इसमें स्वैच्छिक पीएफ और वार्षिक प्रदर्शन बोनस शामिल नहीं है।",
    components: [
      { label: "मूल वेतन (Basic Salary)", amount: "₹ 35,417 / माह", percentage: "सीटीसी का 50%" },
      { label: "मकान किराया भत्ता (HRA)", amount: "₹ 14,167 / माह", percentage: "सीटीसी का 20%" },
      { label: "विशेष भत्ता (Special Allowance)", amount: "₹ 11,250 / माह", percentage: "लचीला हिस्सा" },
      { label: "कर्मचारी भविष्य निधि (PF)", amount: "₹ 4,250 / माह", percentage: "सेवानिवृत्ति बचत" },
      { label: "ग्रेच्युटी और बीमा प्रावधान", amount: "₹ 2,750 / माह", percentage: "वैधानिक लाभ" },
      { label: "प्रदर्शन प्रोत्साहन (वार्षिक)", amount: "₹ 36,000 / वर्ष", percentage: "वार्षिक समीक्षा पर देय" }
    ]
  },
  benefits: [
    {
      id: "health",
      icon: "ShieldAlert",
      title: "स्वास्थ्य बीमा (Medical Insurance)",
      description: "स्वयं, जीवनसाथी और आश्रित बच्चों या माता-पिता के लिए ₹5,00,000 का फ्लोटर कवर।"
    },
    {
      id: "leave",
      icon: "CalendarCheck",
      title: "सवेतन छुट्टियाँ (Paid Leaves)",
      description: "प्रति वर्ष 18 विशेषाधिकार छुट्टियाँ (PL) + 12 आकस्मिक/बीमारी छुट्टियाँ + 10 राष्ट्रीय अवकाश।"
    },
    {
      id: "learning",
      icon: "GraduationCap",
      title: "कौशल विकास व प्रमाणन भत्ता",
      description: "तकनीकी प्रमाणपत्रों और ऑनलाइन पाठ्यक्रमों के लिए प्रति वर्ष ₹25,000 का रीइंबर्समेंट भत्ता।"
    },
    {
      id: "wfh",
      icon: "Laptop",
      title: "हाइब्रिड वर्क सेटअप भत्ता",
      description: "घर पर वर्कस्टेशन सेटअप के लिए एकमुश्त ₹15,000 + मासिक हाई-स्पीड इंटरनेट भत्ता।"
    },
    {
      id: "wellness",
      icon: "HeartPulse",
      title: "मानसिक व शारीरिक कल्याण",
      description: "निःशुल्क मानसिक परामर्श सत्र और वार्षिक स्वास्थ्य जांच (Health Checkup) पैकेज।"
    },
    {
      id: "food",
      icon: "Coffee",
      title: "कैंटीन व परिवहन सुविधा",
      description: "कार्यालय में रियायती भोजन और देर की शिफ्ट के लिए घर तक मुफ्त कैब सुविधा।"
    }
  ],
  keyTerms: [
    { term: "परिवीक्षा अवधि (Probation Period)", value: "कार्यभार ग्रहण करने की तिथि से 6 माह (प्रदर्शन समीक्षा के बाद स्थायीकरण)" },
    { term: "नोटिस अवधि (Notice Period)", value: "स्थायी होने के बाद 90 दिन (3 माह); परिवीक्षा के दौरान 30 दिन" },
    { term: "कार्य के घंटे (Working Hours)", value: "सोमवार से शुक्रवार, सुबह 9:30 से शाम 6:30 तक (45 घंटे प्रति सप्ताह)" },
    { term: "रोजगार बॉन्ड (Employment Bond)", value: "₹1,50,000 के क्षतिपूर्ति हलफनामे के साथ 24 महीने का अनिवार्य सेवा समझौता" },
    { term: "मूनलाइटिंग व अन्य कार्य", value: "पूरी तरह प्रतिबंधित। बाहर का कोई भी कार्य करने के लिए एचआर की लिखित अनुमति आवश्यक है" },
    { term: "प्रतिस्पर्धा-रोधी अवधि (Non-Compete)", value: "नौकरी छोड़ने के बाद 12 महीने तक किसी प्रतिस्पर्धी क्लाउड कंपनी में काम करने पर प्रतिबंध" }
  ],
  redFlags: [
    {
      id: "rf-1",
      severity: "high",
      severityLabel: "उच्च जोखिम (High Risk)",
      title: "2 वर्ष का अनिवार्य सर्विस बॉन्ड (₹1,50,000)",
      explanation: "कंपनी में 24 महीने काम करना अनिवार्य किया गया है। यदि आप उच्च शिक्षा या बेहतर अवसर के लिए पहले छोड़ते हैं, तो ₹1.5 लाख चुकाने की मांग की जाएगी। भारतीय अनुबंध अधिनियम की धारा 27 के तहत ऐसे बॉन्ड अक्सर कानूनी रूप से लागू नहीं होते, परंतु कंपनी आपका अनुभव पत्र (Experience Letter) रोक सकती है।",
      clauseQuote: "धारा 8.2: कर्मचारी कम से कम 24 महीने निरंतर सेवा देने का वचन देता है। पूर्व त्यागपत्र की स्थिति में कंपनी को ₹1,50,000 प्रशिक्षण व्यय के रूप में चुकाने होंगे।"
    },
    {
      id: "rf-2",
      severity: "high",
      severityLabel: "उच्च जोखिम (High Risk)",
      title: "90 दिनों की अत्यधिक लंबी नोटिस अवधि",
      explanation: "फ्रेशर्स और शुरुआती पदों के लिए 3 महीने (90 दिन) का नोटिस बहुत लंबा है। अधिकांश नई कंपनियां 15 से 30 दिनों में ज्वाइनिंग की उम्मीद करती हैं, जिससे भविष्य में जॉब बदलना कठिन हो सकता है।",
      clauseQuote: "धारा 14.1: कोई भी पक्ष 3 महीने का लिखित नोटिस देकर रोजगार समाप्त कर सकता है। नोटिस अवधि का बायआउट पूर्णतः प्रबंधन के विवेकानुसार होगा।"
    },
    {
      id: "rf-3",
      severity: "medium",
      severityLabel: "मध्यम जोखिम (Medium Risk)",
      title: "1 वर्ष का गैर-प्रतिस्पर्धा खंड (Non-Compete Clause)",
      explanation: "नौकरी छोड़ने के बाद 1 साल तक उसी क्षेत्र की किसी प्रतिस्पर्धी कंपनी में जाने पर रोक लगाता है। भारत में रोजगार के बाद ऐसे प्रतिबंध कानूनी रूप से शून्य (Void) माने जाते हैं, फिर भी यह अनावश्यक कानूनी विवाद पैदा कर सकता है।",
      clauseQuote: "धारा 19.4: सेवा समाप्ति के 12 माह तक कर्मचारी प्रत्यक्ष या अप्रत्यक्ष रूप से क्लाउड सॉफ्टवेयर क्षेत्र की किसी प्रतिस्पर्धी इकाई को सेवाएं नहीं देगा।"
    }
  ]
};

// ==========================================
// 3. CLEAN OFFER MOCK (With 0 Red Flags)
// ==========================================
export const mockCleanOfferResultEn = {
  ...mockOfferResultEn,
  overview: {
    ...mockOfferResultEn.overview,
    company: "FairWork Labs India Pvt. Ltd.",
    summary: "Transparent and employee-friendly fresher offer letter with fair compensation, 30 days notice period, and zero restrictive service bonds."
  },
  keyTerms: [
    { term: "Probation Period", value: "3 months standard probation with regular mentor feedback" },
    { term: "Notice Period", value: "30 days for both parties" },
    { term: "Working Hours", value: "40 hours per week (Flexible working hours)" },
    { term: "Employment Bond", value: "None. No financial penalty or mandatory lock-in period." },
    { term: "Moonlighting & Side Work", value: "Allowed for open-source and personal non-competing side projects outside working hours." },
    { term: "Non-Compete Duration", value: "None applicable post-employment." }
  ],
  redFlags: [] // Zero red flags to test clean friendly message!
};

export const mockCleanOfferResultHi = {
  ...mockOfferResultHi,
  overview: {
    ...mockOfferResultHi.overview,
    company: "फेयरवर्क लैब्स इंडिया प्राइवेट लिमिटेड",
    summary: "कर्मचारी-हितैषी और पारदर्शी ऑफर लेटर। इसमें कोई अनुचित बॉन्ड नहीं है और केवल 30 दिनों की उचित नोटिस अवधि रखी गई है।"
  },
  keyTerms: [
    { term: "परिवीक्षा अवधि (Probation Period)", value: "3 माह की मानक परिवीक्षा" },
    { term: "नोटिस अवधि (Notice Period)", value: "दोनों पक्षों के लिए 30 दिन" },
    { term: "कार्य के घंटे (Working Hours)", value: "40 घंटे प्रति सप्ताह (लचीले कार्य घंटे)" },
    { term: "रोजगार बॉन्ड (Employment Bond)", value: "कोई बॉन्ड नहीं। कोई वित्तीय जुर्माना या जबरन रोक नहीं।" },
    { term: "मूनलाइटिंग व अन्य कार्य", value: "कार्यालय समय के बाद गैर-प्रतिस्पर्धी ओपन-सोर्स प्रोजेक्ट्स की अनुमति है।" },
    { term: "प्रतिस्पर्धा-रोधी अवधि (Non-Compete)", value: "नौकरी छोड़ने के बाद कोई प्रतिबंध नहीं।" }
  ],
  redFlags: []
};

// ==========================================
// 4. ERROR STATES DATA
// ==========================================
export const ERROR_TYPES = {
  SCANNED_PDF: "SCANNED_PDF",
  UNREADABLE_PDF: "UNREADABLE_PDF",
  FILE_TOO_LARGE: "FILE_TOO_LARGE",
  SERVER_ERROR: "SERVER_ERROR",
};

export const ERROR_MESSAGES = {
  en: {
    [ERROR_TYPES.SCANNED_PDF]: {
      title: "Scanned or Image-only PDF Detected",
      message: "This PDF has almost no readable text. It may be a scan or a photo. Please upload a text-based PDF.",
      hint: "Tip: Open your PDF and try selecting text with your mouse. If you can't highlight words, it's an image scan."
    },
    [ERROR_TYPES.UNREADABLE_PDF]: {
      title: "Unreadable or Password-Protected PDF",
      message: "We couldn't read the structure of this PDF. It may be corrupted, password-protected, or in an unsupported format.",
      hint: "Please ensure the PDF is not password-protected and can be opened in a standard PDF viewer."
    },
    [ERROR_TYPES.FILE_TOO_LARGE]: {
      title: "File Exceeds Size Limit",
      message: "This file is larger than the maximum allowed size of 10 MB. Please upload a smaller PDF.",
      hint: "Most text offer letters are under 2 MB. You can compress your PDF or remove scanned annexures."
    },
    [ERROR_TYPES.SERVER_ERROR]: {
      title: "Something Went Wrong",
      message: "We encountered an unexpected issue while processing your offer letter. Please try again.",
      hint: "Our analysis engine encountered a temporary hiccup. No files were stored."
    }
  },
  hi: {
    [ERROR_TYPES.SCANNED_PDF]: {
      title: "स्कैन या फोटो वाला पीडीएफ मिला",
      message: "इस पीडीएफ में पढ़ने योग्य टेक्स्ट लगभग नहीं है। यह कोई स्कैन या फोटो हो सकता है। कृपया टेक्स्ट-आधारित पीडीएफ अपलोड करें।",
      hint: "सुझाव: अपने पीडीएफ में माउस से टेक्स्ट चुनने का प्रयास करें। यदि शब्द हाइलाइट नहीं हो रहे हैं, तो यह एक स्कैन कॉपी है।"
    },
    [ERROR_TYPES.UNREADABLE_PDF]: {
      title: "अपठनीय या पासवर्ड-सुरक्षित पीडीएफ",
      message: "हम इस पीडीएफ को पढ़ नहीं सके। यह फ़ाइल दूषित (corrupt), पासवर्ड से सुरक्षित या असमर्थित प्रारूप में हो सकती है।",
      hint: "कृपया सुनिश्चित करें कि पीडीएफ में कोई पासवर्ड न लगा हो और वह सामान्य रूप से खुल रही हो।"
    },
    [ERROR_TYPES.FILE_TOO_LARGE]: {
      title: "फ़ाइल आकार सीमा से अधिक है",
      message: "यह फ़ाइल अधिकतम अनुमत सीमा 10 MB से बड़ी है। कृपया 10 MB से छोटी पीडीएफ फ़ाइल अपलोड करें।",
      hint: "आमतौर पर ऑफर लेटर 2 MB से कम होते हैं। आप फ़ाइल को कंप्रेस कर सकते हैं।"
    },
    [ERROR_TYPES.SERVER_ERROR]: {
      title: "कुछ तकनीकी समस्या आई",
      message: "आपके ऑफर लेटर का विश्लेषण करते समय अप्रत्याशित समस्या हुई। कृपया पुनः प्रयास करें।",
      hint: "यह एक अस्थायी समस्या हो सकती है। कृपया 'दोबारा प्रयास करें' बटन दबाएं।"
    }
  }
};
