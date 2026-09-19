"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function MultilingualShowcase() {
  const languages = [
    { id: "hi", name: "हिन्दी (Hindi)" },
    { id: "ta", name: "தமிழ் (Tamil)" },
    { id: "te", name: "తెలుగు (Telugu)" },
    { id: "kn", name: "ಕನ್ನಡ (Kannada)" },
    { id: "bn", name: "বাংলা (Bengali)" },
    { id: "gu", name: "ગુજરાતી (Gujarati)" },
    { id: "mr", name: "मराठी (Marathi)" },
    { id: "en", name: "English (Plain)" },
  ];

  const [selectedLang, setSelectedLang] = useState("hi");

  const translations: Record<
    string,
    { title: string; text: string; note: string }
  > = {
    hi: {
      title: "सरल हिन्दी व्याख्या (Citizen Insight)",
      text: "मकान मालिक यह वादा करता है कि छत गिरने या पानी के रिसाव जैसी बड़ी संरचनात्मक खराबी आने पर, किरायेदार द्वारा लिखित सूचना देने के 14 दिनों के भीतर उसे मरम्मत का काम शुरू करना होगा। यदि मकान मालिक ऐसा करने में विफल रहता है, तो किरायेदार खुद मरम्मत करवा सकता है और उस खर्च को आने वाले महीनों के किराये में से काट सकता है।",
      note: "सटीकता स्कोर: 99.8% • मॉडल टेनेंसी एक्ट के अनुकूल",
    },
    ta: {
      title: "எளிமையான தமிழ் விளக்கம் (Citizen Insight)",
      text: "வீட்டின் மேற்கூரை சேதம் அல்லது தீவிர நீர் கசிவு போன்ற பெரிய கட்டமைப்பு குறைபாடுகள் ஏற்பட்டால், வாடகைதாரர் எழுத்துப்பூர்வமாக அறிவித்த 14 நாட்களுக்குள் நில உரிமையாளர் சீரமைப்பு பணிகளைத் தொடங்க வேண்டும். உரிமையாளர் தவறினால், வாடகைதாரரே பழுதுபார்த்து அந்த செலவை அடுத்தடுத்த மாத வாடகையில் கழித்துக் கொள்ளலாம்.",
      note: "துல்லியம்: 99.7% • மாதிரி வாடகைச் சட்டம் அங்கீகரிக்கப்பட்டது",
    },
    te: {
      title: "సరళమైన తెలుగు వివరణ (Citizen Insight)",
      text: "పైకప్పు దెబ్బతినడం లేదా నీటి లీకేజీ వంటి ప్రధాన నిర్మాణ సమస్యలు ఏర్పడినప్పుడు, అద్దెదారు లిఖితపూర్వకంగా తెలిపిన 14 రోజుల్లోగా ఇంటి యజమాని మరమ్మతులు ప్రారంభించాలి. యజమాని స్పందించకపోతే, అద్దెదారే స్వయంగా మరమ్మతులు చేయించి ఆ ఖర్చును రాబోయే అద్దె నుండి మినహాయించుకోవచ్చు.",
      note: "ఖచ్చితత్వం: 99.8% • మోడల్ టెనెన్సీ చట్టానికి అనుగుణంగా",
    },
    kn: {
      title: "ಸರಳ ಕನ್ನಡ ವಿವರಣೆ (Citizen Insight)",
      text: "ಮೇಲ್ಛಾವಣಿ ಹಾನಿ ಅಥವಾ ನೀರು ಸೋರಿಕೆಯಂತಹ ಪ್ರಮುಖ ರಚನಾತ್ಮಕ ದೋಷಗಳು ಕಂಡುಬಂದಾಗ, ಬಾಡಿಗೆದಾರರು ಲಿಖಿತ ಸೂಚನೆ ನೀಡಿದ 14 ದಿನಗಳ ಒಳಗೆ ಮನೆ ಮಾಲೀಕರು ದುರಸ್ತಿ ಕಾರ್ಯವನ್ನು ಪ್ರಾರಂಭಿಸಬೇಕು. ಮಾಲೀಕರು ವಿಫಲವಾದರೆ, ಬಾಡಿಗೆದಾರರೇ ದುರಸ್ತಿ ಮಾಡಿಸಿ ಆ ವೆಚ್ಚವನ್ನು ಮುಂದಿನ ತಿಂಗಳ ಬಾಡಿಗೆಯಲ್ಲಿ ಕಡಿತಗೊಳಿಸಬಹುದು.",
      note: "ನಿಖರತೆ: 99.8% • ಮಾದರಿ ಬಾಡಿಗೆ ಕಾಯ್ದೆ ಪ್ರಕಾರ ಮಾನ್ಯತೆ",
    },
    bn: {
      title: "সহজ বাংলা ব্যাখ্যা (Citizen Insight)",
      text: "ছাদ ক্ষতিগ্রস্ত হওয়া বা জল পড়ার মতো বড় কাঠামোগত ত্রুটি দেখা দিলে, ভাড়াটিয়া লিখিত নোটিশ দেওয়ার ১৪ দিনের মধ্যে বাড়িওয়ালাকে মেরামত শুরু করতে হবে। বাড়িওয়ালা ব্যর্থ হলে, ভাড়াটিয়া নিজেই মেরামত করিয়ে সেই খরচ পরবর্তী মাসের ভাড়া থেকে কেটে নিতে পারেন।",
      note: "নির্ভুলতা: 99.8% • মডেল ভাড়াটিয়া আইন অনুমোদিত",
    },
    gu: {
      title: "સરળ ગુજરાતી સમજૂતી (Citizen Insight)",
      text: "છત પડવી કે પાણી ગળવા જેવી મોટી માળખાકીય ખામી સર્જાય ત્યારે, ભાડૂઆત દ્વારા લેખિત જાણ કર્યાના 14 દિવસમાં મકાનમાલિકે સમારકામ શરૂ કરવું પડશે. જો મકાનમાલિક નિષ્ફળ જાય, તો ભાડૂઆત જાતે સમારકામ કરાવી શકે છે અને તે ખર્ચ આગામી મહિનાના ભાડામાંથી કાપી શકે છે.",
      note: "ચોકસાઈ સ્કોર: 99.8% • મોડેલ ટેનન્સી એક્ટ સુસંગત",
    },
    mr: {
      title: "सोप्या मराठीत स्पष्टीकरण (Citizen Insight)",
      text: "छताचे नुकसान किंवा पाणी गळती यांसारखी मोठी संरचनात्मक समस्या उद्भवल्यास, भाडेकरूने लेखी नोटीस दिल्यानंतर 14 दिवसांच्या आत घरमालकाने दुरुस्ती सुरू केली पाहिजे. घरमालक अयशस्वी ठरल्यास, भाडेकरू स्वतः दुरुस्ती करू शकतो आणि झालेला खर्च पुढील महिन्यांच्या भाड्यातून वजा करू शकतो.",
      note: "अचूकता स्कोअर: 99.8% • मॉडेल टेनन्सी ॲक्टनुसार",
    },
    en: {
      title: "Plain English Breakdown (Citizen Insight)",
      text: "If there is major structural damage like a leaking roof or wall seepage, the landlord must start repairs within 14 days of your written notice. If the landlord fails to act, you have the legal right to fix it yourself and deduct the actual repair cost from your upcoming monthly rent payments.",
      note: "Accuracy Score: 99.9% • Model Tenancy Act §15 Compliant",
    },
  };

  const current = translations[selectedLang] || translations.hi;

  return (
    <section className="w-full py-16 md:py-24 bg-[#f8f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#d97706] font-extrabold block mb-2">
            Constitutional Inclusivity
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#0b1c30] mb-4">
            Legal Truth in the Language of Your Conscience
          </h2>
          <p className="text-sm sm:text-base text-[#45464d] leading-relaxed">
            Over 80% of Indians cannot comfortably interpret English statutory prose.
            NyayaSetu bridges this civic divide with verified legal dialect translations across
            12 scheduled languages.
          </p>
        </div>

        {/* Language Switcher Pill Tray */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLang(lang.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedLang === lang.id
                  ? "bg-[#0f172a] text-white shadow-sm"
                  : "bg-white text-[#45464d] hover:text-[#0b1c30] hover:bg-[#eff4ff] border border-[#0f172a]/5"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>

        {/* Interactive Split Comparison Card */}
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-[#0f172a]/10 shadow-lg overflow-hidden">
          <div className="px-6 py-3.5 bg-[#e5eeff] border-b border-[#0f172a]/5 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0b1c30]">
              Parallel Clause Breakdown
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#d97706]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Legal Semantics Verified (IndicLegal-v3 Engine)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: English Raw Clause */}
            <div className="p-6 bg-[#eff4ff]/40 border-b md:border-b-0 md:border-r border-[#0f172a]/5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-[#64748b] block mb-2 font-semibold">
                  Original Clause (English)
                </span>
                <p className="text-xs sm:text-sm text-[#0b1c30] italic leading-relaxed font-mono bg-white p-3.5 rounded-xl border border-[#0f172a]/5 shadow-2xs">
                  &quot;The Lessor covenants that in the event of major structural deterioration,
                  including roofing failure or seepage impacting habitability, the Lessor shall
                  initiate remedial restoration within 14 calendar days upon Lessee&apos;s written
                  intimation, failing which Lessee may effect repairs and offset actual incurred
                  expenditure against succeeding rental accruals.&quot;
                </p>
              </div>
              <div className="mt-4 pt-2 text-xs text-[#64748b] font-mono">
                Citation: Clause 8(a) • Maintenance &amp; Offsets
              </div>
            </div>

            {/* Right: Plain Indic Explanation */}
            <div className="p-6 bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-[#d97706] font-bold block mb-2">
                  {current.title}
                </span>
                <p className="text-xs sm:text-sm text-[#0b1c30] leading-relaxed p-3.5 bg-[#eff4ff]/60 rounded-xl border border-[#0f172a]/5">
                  {current.text}
                </p>
              </div>
              <div className="mt-4 pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                <span className="text-[#d97706] font-bold">{current.note}</span>
                <span className="text-[#64748b] font-mono">Verifiable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
