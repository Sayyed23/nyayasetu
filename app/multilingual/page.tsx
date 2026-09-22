"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import {
  Languages,
  Volume2,
  VolumeX,
  Sparkles,
  Download,
  BookOpen,
  CheckCircle2,
  Play,
  Pause,
  ArrowRight,
} from "lucide-react";

export default function MultilingualPage() {
  const [selectedLang, setSelectedLang] = useState<"kannada" | "hindi" | "tamil" | "bengali" | "marathi">("kannada");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState("1.0x");

  const translations = {
    kannada: {
      langName: "ಕನ್ನಡ (Kannada)",
      audioLabel: "Audio Readout (ಕನ್ನಡ)",
      title: "ಬಾಡಿಗೆ ಒಪ್ಪಂದ — ಬೆಂಗಳೂರು ನಗರ ವ್ಯಾಪ್ತಿ",
      summary: "ಈ ಒಪ್ಪಂದವು ಮಾಲೀಕರು ಮತ್ತು ಬಾಡಿಗೆದಾರರ ನಡುವೆ 11 ತಿಂಗಳ ಅವಧಿಗೆ ಮಾಡಲಾದ ವಸತಿ ಬಾಡಿಗೆ ಕರಾರು ಪತ್ರವಾಗಿದೆ.",
      clause14b_legalese:
        "ಮನೆ ಖಾಲಿ ಮಾಡುವ ಸಂದರ್ಭದಲ್ಲಿ ಸಣ್ಣ ಪುಟ್ಟ ಬಣ್ಣ ಬಳಿಯುವ ಕೆಲಸಗಳಿಗೆ ಬಾಡಿಗೆದಾರರ ₹1,50,000 ಸಂಪೂರ್ಣ ಠೇವಣಿಯನ್ನು ಯಾವುದೇ ಮುನ್ಸೂಚನೆ ಇಲ್ಲದೆ ಮುಟ್ಟುಗೋಲು ಹಾಕಿಕೊಳ್ಳಲು ಮಾಲೀಕರಿಗೆ ಸಂಪೂರ್ಣ ಹಕ್ಕಿರುತ್ತದೆ.",
      clause14b_plain:
        "ಮಾಲೀಕರು ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಠೇವಣಿ ಹಣವನ್ನು ಸಣ್ಣ ಬಣ್ಣದ ಕೊಳಕಿಗೆ ಮುಟ್ಟುಗೋಲು ಹಾಕಿಕೊಳ್ಳಲು ಬಯಸಿದ್ದಾರೆ. ಆದರೆ ಕಾನೂನಿನ ಪ್ರಕಾರ ಸಾಮಾನ್ಯ ಸವೆತಕ್ಕೆ ಠೇವಣಿ ಕಡಿತಗೊಳಿಸುವಂತಿಲ್ಲ.",
      lexicon: [
        { term: "Security Deposit", regional: "ಭದ್ರತಾ ಠೇವಣಿ", meaning: "ಕರಾರಿನ ಕೊನೆಯಲ್ಲಿ ಮರುಪಾವತಿಸಬೇಕಾದ ಮುಂಗಡ ಹಣ" },
        { term: "Forfeiture", regional: "ಮುಟ್ಟುಗೋಲು", meaning: "ನಿಯಮ ಉಲ್ಲಂಘನೆಗಾಗಿ ಹಣ ಅಥವಾ ಹಕ್ಕನ್ನು ಕಸಿದುಕೊಳ್ಳುವುದು" },
        { term: "Quiet Enjoyment", regional: "ಶಾಂತಿಯುತ ಅನುಭೋಗ", meaning: "ಮಾಲೀಕರ ಅನಗತ್ಯ ಹಸ್ತಕ್ಷೇಪವಿಲ್ಲದೆ ವಾಸಿಸುವ ಹಕ್ಕು" },
        { term: "Indemnity", regional: "ಹಾನಿಪರಿಹಾರ", meaning: "ಉಂಟಾದ ನಷ್ಟ ಅಥವಾ ದಂಡವನ್ನು ಭರಿಸುವ ಭರವಸೆ" },
      ],
    },
    hindi: {
      langName: "हिन्दी (Hindi)",
      audioLabel: "ऑडियो वाचन (हिन्दी)",
      title: "आवासीय किराया समझौता — बेंगलुरु शहरी",
      summary: "यह 11 महीने की अवधि के लिए मकान मालिक और किरायेदार के बीच निष्पादित एक वैध आवासीय किराया अनुबंध है।",
      clause14b_legalese:
        "मकान खाली करते समय मामूली रंगाई-पुताई की आवश्यकता होने पर, मकान मालिक बिना किसी पूर्व सूचना के संपूर्ण ₹1,50,000 सुरक्षा जमा राशि को जब्त करने का पूर्ण अधिकार रखता है।",
      clause14b_plain:
        "मकान मालिक साधारण पेंट घिसावट के लिए आपका पूरा ₹1,50,000 डिपॉजिट जब्त करना चाहता है। कानूनन सामान्य टूट-फूट पर पूरी जमा राशि जब्त नहीं की जा सकती।",
      lexicon: [
        { term: "Security Deposit", regional: "सुरक्षा जमा (अमानत)", meaning: "अनुबंध समाप्ति पर वापस की जाने वाली अग्रिम राशि" },
        { term: "Forfeiture", regional: "ज़ब्ती / राजसात", meaning: "शर्तों के उल्लंघन पर राशि का अधिकार समाप्त होना" },
        { term: "Quiet Enjoyment", regional: "निर्बाध उपयोग / शांतिपूर्ण उपभोग", meaning: "मालिक के अनुचित दखल के बिना रहने का अधिकार" },
        { term: "Indemnity", regional: "क्षतिपूर्ति", meaning: "हुए नुकसान या जुर्माने की भरपाई का दायित्व" },
      ],
    },
    tamil: {
      langName: "தமிழ் (Tamil)",
      audioLabel: "ஒலி வாசிப்பு (தமிழ்)",
      title: "குடியிருப்பு வாடகை ஒப்பந்தம் — பெங்களூரு நகரம்",
      summary: "இது 11 மாத காலத்திற்கு வீட்டு உரிமையாளருக்கும் வாடகைதாரருக்கும் இடையே செய்யப்பட்ட குடியிருப்பு ஒப்பந்தமாகும்.",
      clause14b_legalese:
        "வீட்டை காலி செய்யும்போது சிறிய வண்ணம் பூசும் தேவைகளுக்காக முழு முன்வைப்புத்தொகையையும் பறிமுதல் செய்ய உரிமையாளருக்கு உரிமை உண்டு.",
      clause14b_plain:
        "சாதாரண பெயிண்ட் தேய்மானத்திற்காக உங்கள் ₹1,50,000 முழு முன்வைப்பையும் உரிமையாளர் பறிக்க முடியாது. இது சட்டவிரோதம்.",
      lexicon: [
        { term: "Security Deposit", regional: "முன்பணம் (அட்வான்ஸ்)", meaning: "ஒப்பந்த முடிவில் திருப்பித் தரப்படும் பாதுகாப்புத் தொகை" },
        { term: "Forfeiture", regional: "பறிமுதல்", meaning: "விதிமீறலுக்காக தொகையை உரிமையாளர் பிடித்துக்கொள்வது" },
        { term: "Quiet Enjoyment", regional: "அமைதியான குடியிருப்பு உரிமை", meaning: "உரிமையாளரின் அநாவசிய இடையூறு இன்றி வாழும் உரிமை" },
        { term: "Indemnity", regional: "ஈட்டுறுதி", meaning: "ஏற்பட்ட இழப்பை ஈடுசெய்யும் உத்தரவாதம்" },
      ],
    },
    bengali: {
      langName: "বাংলা (Bengali)",
      audioLabel: "অডিও পাঠ (বাংলা)",
      title: "আবাসিক ভাড়ার চুক্তি — বেঙ্গালুরু আরবান",
      summary: "এটি বাড়িওয়ালা এবং ভাড়াটিয়ার মধ্যে ১১ মাসের জন্য স্বাক্ষরিত একটি বৈধ আবাসিক ভাড়ার চুক্তি।",
      clause14b_legalese:
        "বাড়ি ছাড়ার সময় সামান্য রং করার কাজের জন্য বাড়িওয়ালা সম্পূর্ণ ₹১,৫০,০০০ নিরাপত্তা আমানত বাজেয়াপ্ত করার একক অধিকার সংরক্ষণ করেন।",
      clause14b_plain:
        "বাড়িওয়ালা সাধারণ রং ক্ষয়ের জন্য আপনার পুরো ₹১,৫০,০০০ জামানত কাটতে পারেন না। আইনে সাধারণ ক্ষয়ক্ষতিকে বাজেয়াপ্তযোগ্য ধরা হয় না।",
      lexicon: [
        { term: "Security Deposit", regional: "নিরাপত্তা আমানত", meaning: "চুক্তি শেষে ফেরতযোগ্য অগ্রিম টাকা" },
        { term: "Forfeiture", regional: "বাজেয়াপ্তকরণ", meaning: "নিয়ম ভঙ্গের দায়ে অর্থ আটক রাখা" },
        { term: "Quiet Enjoyment", regional: "শান্তিপূর্ণ ভোগের অধিকার", meaning: "বাড়িওয়ালার অনাকাঙ্ক্ষিত হস্তক্ষেপ ছাড়া বসবাসের অধিকার" },
        { term: "Indemnity", regional: "ক্ষতিপূরণ", meaning: "যেকোনো আইনি জরিমানা বা ক্ষতির দায় গ্রহণ" },
      ],
    },
    marathi: {
      langName: "मराठी (Marathi)",
      audioLabel: "ऑडिओ वाचन (मराठी)",
      title: "निवासी भाडेकरार — बंगळुरू शहर",
      summary: "हा घरमालक आणि भाडेकरू यांच्यात ११ महिन्यांच्या मुदतीसाठी केलेला अधिकृत भाडेकरार आहे.",
      clause14b_legalese:
        "जागा रिकामी करताना किरकोळ रंगकामाच्या कारणास्तव घरमालक संपूर्ण ₹१,५०,००० अनामत रक्कम जप्त करण्याचा पूर्ण अधिकार राखून ठेवतो.",
      clause14b_plain:
        "किरकोळ रंगकामासाठी मालक तुमची पूर्ण अनामत जप्त करू शकत नाही. कायद्यानुसार सामान्य वापरामुळे झालेल्या झिजेसाठी जप्ती बेकायदेशीर आहे.",
      lexicon: [
        { term: "Security Deposit", regional: "सुरक्षा अनामत (डिपॉझिट)", meaning: "करार संपल्यावर परत मिळणारी रक्कम" },
        { term: "Forfeiture", regional: "जप्ती", meaning: "शर्तभंगापोटी रक्कम ताब्यात घेणे" },
        { term: "Quiet Enjoyment", regional: "शांततापूर्ण वापराचा अधिकार", meaning: "मालकाच्या विनाकारण हस्तक्षेपाशिवाय राहण्याचा हक्क" },
        { term: "Indemnity", regional: "नुकसानभरपाई", meaning: "उद्भवलेल्या नुकसानीची जबाबदारी स्वीकारणे" },
      ],
    },
  };

  const current = translations[selectedLang];

  return (
    <DashboardShell showSubNav activeSubNav="multilingual">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Header Strip */}
          <div className="bg-white rounded-2xl p-6 border border-[#0f172a]/8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#0f172a] text-white text-xs font-bold uppercase tracking-wider">
                  Bhasantara Engine 4.2
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#065f46] text-xs font-bold">
                  AI4Bharat IndicTrans2 Verified • 99.8% Fidelity
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0b1c30]">
                Multilingual Legal Understanding & Indic Fidelity
              </h1>
              <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                Democratizing complex Indian legal jargon into 22 Eighth-Schedule Constitutional languages. Real-time legal term grounding, parallel clause translation, and native Indic audio readouts.
              </p>
            </div>

            {/* Audio Readout Player Simulation */}
            <div className="flex items-center gap-2 bg-[#f8f9ff] p-2 rounded-xl border border-[#0f172a]/5">
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="px-3.5 py-2 rounded-lg bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlayingAudio ? "Pause Readout" : current.audioLabel}</span>
              </button>

              <select
                value={audioSpeed}
                onChange={(e) => setAudioSpeed(e.target.value)}
                className="bg-white border border-[#cbd5e1] rounded-lg px-2 py-1.5 text-xs font-bold text-[#0b1c30] focus:outline-none"
              >
                <option value="0.75x">0.75x</option>
                <option value="1.0x">1.0x</option>
                <option value="1.25x">1.25x</option>
                <option value="1.5x">1.5x</option>
              </select>
            </div>
          </div>

          {/* Indic Language Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(["kannada", "hindi", "tamil", "bengali", "marathi"] as const).map((langKey) => (
              <button
                key={langKey}
                type="button"
                onClick={() => setSelectedLang(langKey)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedLang === langKey
                    ? "bg-[#0f172a] text-white shadow-sm"
                    : "bg-white text-[#45464d] border border-[#0f172a]/5 hover:bg-[#eff4ff]"
                }`}
              >
                {translations[langKey].langName}
              </button>
            ))}
          </div>

          {/* Side-by-Side Dual-Pane Reading Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Pane: Source Formal Legal English */}
            <div className="p-6 bg-white rounded-2xl border border-[#0f172a]/8 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#0f172a]/5">
                <span className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
                  Source Document Excerpt (English Legal Deed)
                </span>
                <span className="text-[10px] font-mono text-[#64748b]">Page 4 • Clause 14(b)</span>
              </div>

              <div className="p-4 bg-[#f8f9ff] rounded-xl border border-[#cbd5e1] space-y-2">
                <p className="font-mono text-xs text-[#0b1c30] leading-relaxed">
                  &quot;IN WITNESS WHEREOF the Lessor retains absolute, sole, and unilateral rights to forfeit in
                  entirety the Security Deposit quantified under Clause 14(b) without prior cure notification in the
                  event of minor aesthetic repainting requirements upon vacation of the demised premises.&quot;
                </p>
                <div className="text-[10px] text-[#ba1a1a] font-bold">
                  Flagged: High Unfair Contractual Risk under Karnataka Rent Precedents
                </div>
              </div>
            </div>

            {/* Right Pane: Vernacular Indic Translation with Plain Language */}
            <div className="p-6 bg-white rounded-2xl border border-[#0f172a]/8 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#0f172a]/5">
                <span className="text-xs font-bold text-[#d97706] uppercase tracking-wider">
                  Indic Translation & Meaning ({current.langName})
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ecfdf5] text-[#065f46]">
                  99.8% Alignment
                </span>
              </div>

              <div className="p-4 bg-[#eff4ff] rounded-xl border border-[#0f172a]/5 space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-[#64748b] uppercase block">
                    ವಸ್ತುನಿಷ್ಠ ಅನುವಾದ (Objective Translation):
                  </span>
                  <p className="text-xs text-[#0b1c30] mt-1 leading-relaxed">
                    &quot;{current.clause14b_legalese}&quot;
                  </p>
                </div>

                <div className="pt-2 border-t border-[#0f172a]/5">
                  <span className="text-[10px] font-bold text-[#d97706] uppercase block">
                    ಸರಳ ನಾಗರಿಕ ಅರ್ಥ (Citizen Plain Meaning):
                  </span>
                  <p className="text-xs text-[#064e3b] font-medium mt-1 leading-relaxed bg-[#ecfdf5] p-2.5 rounded-lg border border-[#a7f3d0]">
                    {current.clause14b_plain}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Indic Legal Lexicon & Terminology Demystifier */}
          <div className="bg-white rounded-2xl p-6 border border-[#0f172a]/8 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-[#0b1c30] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#d97706]" />
              <span>Indic Legal Terminology Lexicon ({current.langName})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {current.lexicon.map((lex, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#f8f9ff] border border-[#0f172a]/5 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#64748b] uppercase">{lex.term}</span>
                  <p className="text-sm font-bold text-[#0b1c30]">{lex.regional}</p>
                  <p className="text-xs text-[#45464d] leading-relaxed pt-1">{lex.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
