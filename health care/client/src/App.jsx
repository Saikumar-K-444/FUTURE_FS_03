import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import "./index.css";

// ===============================
// API URL
// ===============================

const API_URL = "http://10.148.198.152:5000/api/diseases";

function App() {

  // ===============================
  // PAGE NAVIGATION
  // ===============================

  const [activePage, setActivePage] = useState("home");

  // ===============================
  // MAIN STATES
  // ===============================

  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedDisease, setSelectedDisease] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("అన్నీ");

  const [listening, setListening] = useState(false);

  const fileRef = useRef(null);

  // ===============================
  // BMI
  // ===============================

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");

  // ===============================
  // APPOINTMENT
  // ===============================

  const [appointment, setAppointment] = useState({

    name: "",
    mobile: "",
    age: "",
    gender: "",
    disease: "",
    date: ""

  });

  // ===============================
  // DISEASE CATEGORIES
  // ===============================

  const categories = [

    "అన్నీ",

    "🦠 వైరల్",

    "🫁 శ్వాసకోశం",

    "🍽️ జీర్ణకోశం",

    "❤️ దీర్ఘకాలిక",

    "👁️ కంటి & చెవి",

    "🩹 చర్మం"

  ];

  // ===============================
  // DOCTORS
  // ===============================
const doctors = [
  {
    name: "Dr. Ramesh",
    department: "General Physician",
    experience: "12 Years",
    image: "R",
  },
  {
    name: "Dr. Lakshmi",
    department: "Cardiologist",
    experience: "15 Years",
    image: "L",
  },
  {
    name: "Dr. Suresh",
    department: "Dermatologist",
    experience: "10 Years",
    image: "S",
  },
];
 

  // ===============================
  // DAILY HEALTH TIPS
  // ===============================

  const healthTips = [

    "💧 రోజుకు కనీసం 3 లీటర్ల నీరు తాగండి.",

    "🥗 పోషకాహారం ఎక్కువగా తీసుకోండి.",

    "🏃 రోజూ 30 నిమిషాలు వ్యాయామం చేయండి.",

    "😴 రోజుకు 7-8 గంటలు నిద్రపోండి.",

    "🚭 ధూమపానం మరియు మద్యం నివారించండి."

  ];
  // ===============================
  // FETCH DISEASE DATA
  // ===============================

  useEffect(() => {

    axios
      .get(API_URL)

      .then((res) => {

        const data = res.data.data || res.data;

        setDiseases(data);

        setLoading(false);

      })

      .catch((err) => {

        console.error("API Error :", err);

        alert("సర్వర్‌కు కనెక్ట్ కాలేకపోయింది.");

        setLoading(false);

      });

  }, []);

  // ===============================
  // FILTER DISEASES
  // ===============================

  const filteredDiseases = useMemo(() => {

    return diseases.filter((item) => {

      const keyword = search.toLowerCase();

      const searchMatch =

        item.name.toLowerCase().includes(keyword) ||

        item.symptoms.toLowerCase().includes(keyword);

      if (selectedCategory === "అన్నీ") return searchMatch;

      if (
        selectedCategory === "🦠 వైరల్" &&
        (
          item.name.includes("జలుబు") ||
          item.name.includes("COVID") ||
          item.name.includes("డెంగ్యూ")
        )
      ) return searchMatch;

      if (
        selectedCategory === "🫁 శ్వాసకోశం" &&
        (
          item.name.includes("ఆస్తమా") ||
          item.name.includes("న్యుమోనియా")
        )
      ) return searchMatch;

      if (
        selectedCategory === "🍽️ జీర్ణకోశం" &&
        (
          item.name.includes("విరేచనాలు") ||
          item.name.includes("టైఫాయిడ్")
        )
      ) return searchMatch;

      if (
        selectedCategory === "❤️ దీర్ఘకాలిక" &&
        (
          item.name.includes("మధుమేహం") ||
          item.name.includes("రక్తపోటు")
        )
      ) return searchMatch;

      if (
        selectedCategory === "👁️ కంటి & చెవి" &&
        (
          item.name.includes("కంటి") ||
          item.name.includes("చెవి")
        )
      ) return searchMatch;

      if (
        selectedCategory === "🩹 చర్మం" &&
        (
          item.name.includes("చర్మ")
        )
      ) return searchMatch;

      return false;

    });

  }, [diseases, search, selectedCategory]);

  // ===============================
  // VOICE SEARCH
  // ===============================

  const startVoiceSearch = () => {

    const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert("ఈ Browser Voice Search Support చేయదు.");

      return;

    }

    const recognition = new SpeechRecognition();

    recognition.lang = "te-IN";

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {

      const text = event.results[0][0].transcript;

      setSearch(text);

    };

    recognition.onend = () => {

      setListening(false);

    };

    recognition.onerror = () => {

      setListening(false);

    };

  };

  // ===============================
  // TEXT TO SPEECH
  // ===============================

  const speakDisease = (disease) => {

    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(

      `వ్యాధి పేరు ${disease.name}.
      లక్షణాలు ${disease.symptoms}.
      మందులు ${disease.medicines}.
      జాగ్రత్తలు ${disease.precautions}.`

    );

    speech.lang = "te-IN";

    speech.rate = 0.9;

    window.speechSynthesis.speak(speech);

  };

  const stopSpeech = () => {

    if (window.speechSynthesis) {

      window.speechSynthesis.cancel();

    }

  };
    // ===============================
  // MEDICINE SCAN
  // ===============================

  const scanMedicine = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const fileName = file.name.toLowerCase();

    let disease = null;

    if (fileName.includes("ors")) {

      disease = diseases.find((d) =>
        d.name.includes("విరేచనాలు")
      );

    } else if (fileName.includes("spray")) {

      disease = diseases.find((d) =>
        d.name.includes("జలుబు")
      );

    } else if (fileName.includes("drop")) {

      disease = diseases.find((d) =>
        d.name.includes("కంటి")
      );

    } else if (fileName.includes("lotion")) {

      disease = diseases.find((d) =>
        d.name.includes("చర్మ")
      );

    } else if (fileName.includes("antacid")) {

      disease = diseases.find((d) =>
        d.name.includes("గుండెల్లో")
      );

    }

    if (disease) {

      setSelectedDisease(disease);

      setShowPopup(true);

      speakDisease(disease);

    } else {

      alert("❌ మందు గుర్తించబడలేదు.");

    }

    e.target.value = "";

  };

  // ===============================
  // BMI CALCULATOR
  // ===============================

  const calculateBMI = () => {

    if (!height || !weight) {

      alert("Height మరియు Weight నమోదు చేయండి.");

      return;

    }

    const h = Number(height) / 100;

    const bmiValue = (Number(weight) / (h * h)).toFixed(1);

    setBmi(bmiValue);

  };

  // ===============================
  // APPOINTMENT BOOKING
  // ===============================

  const bookAppointment = () => {

    if (

      appointment.name.trim() === "" ||

      appointment.mobile.trim() === "" ||

      appointment.date.trim() === ""

    ) {

      alert("⚠️ అన్ని వివరాలు నమోదు చేయండి.");

      return;

    }

    alert("✅ Appointment విజయవంతంగా బుక్ అయింది.");

    setAppointment({

      name: "",

      mobile: "",

      age: "",

      gender: "",

      disease: "",

      date: ""

    });

  };

  // ===============================
  // RETURN
  // ===============================

  return (
    <div className="app">

  {/* ==========================
      NAVBAR
  ========================== */}

  <nav className="navbar">

    <div className="logo">
      🏥 Smart Health Care
    </div>

    <ul>

      <li>
        <button
          className={activePage === "home" ? "nav-active" : ""}
          onClick={() => setActivePage("home")}
        >
          🏠 Home
        </button>
      </li>

      <li>
        <button
          className={activePage === "diseases" ? "nav-active" : ""}
          onClick={() => setActivePage("diseases")}
        >
          🦠 Diseases
        </button>
      </li>

      <li>
        <button
          className={activePage === "doctors" ? "nav-active" : ""}
          onClick={() => setActivePage("doctors")}
        >
          👨‍⚕️ Doctors
        </button>
      </li>

      <li>
        <button
          className={activePage === "appointment" ? "nav-active" : ""}
          onClick={() => setActivePage("appointment")}
        >
          📅 Appointment
        </button>
      </li>

      <li>
        <button
          className={activePage === "bmi" ? "nav-active" : ""}
          onClick={() => setActivePage("bmi")}
        >
          ⚖️ BMI
        </button>
      </li>

      <li>
        <button
          className={activePage === "contact" ? "nav-active" : ""}
          onClick={() => setActivePage("contact")}
        >
          📞 Contact
        </button>
      </li>

    </ul>

  </nav>

  {/* ==========================
      HOME PAGE
  ========================== */}

  {activePage === "home" && (

    <>

      <header className="hero">

        <h1>🏥 AI Powered Smart Health Care</h1>

        <p>

          తెలుగులో ఆరోగ్య సమాచారం • AI సహాయంతో వ్యాధి గుర్తింపు •
          మందుల వివరాలు

        </p>

      </header>

      <section className="dashboard-counters">

        <div className="counter-card">
          <h2>{diseases.length}</h2>
          <p>వ్యాధులు</p>
        </div>

        <div className="counter-card">
          <h2>24/7</h2>
          <p>AI Support</p>
        </div>

        <div className="counter-card">
          <h2>100%</h2>
          <p>తెలుగు Guide</p>
        </div>

        <div className="counter-card">
          <h2>AI</h2>
          <p>Medicine Scan</p>
        </div>

      </section>

      <section className="healthy-tips-section">

        <h2>❤️ రోజువారీ ఆరోగ్య చిట్కాలు</h2>

        <div className="tips-grid">

          {healthTips.map((tip, index) => (

            <div
              className="tip-card"
              key={index}
            >

              <h3>{tip}</h3>

            </div>

          ))}

        </div>

      </section>

    </>

  )}
  {/* ==========================
    DISEASES PAGE
========================== */}

{activePage === "diseases" && (

<>
  {/* Search */}
  <section className="search-container">

    <input
      type="text"
      placeholder="🔍 వ్యాధి పేరు లేదా లక్షణం వెతకండి..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

  </section>

  {/* Categories */}
  <section className="category-section">

    {categories.map((cat, index) => (

      <button
        key={index}
        className={
          selectedCategory === cat
            ? "category-btn active"
            : "category-btn"
        }
        onClick={() => setSelectedCategory(cat)}
      >
        {cat}
      </button>

    ))}

  </section>

  {/* Control Panel */}

  <section className="control-panel">

    <button
      className={`voice-btn ${listening ? "listening" : ""}`}
      onClick={startVoiceSearch}
    >
      {listening ? "🎙 Listening..." : "🎤 Talk To AI"}
    </button>

    <button
      className="scan-btn"
      onClick={() => fileRef.current.click()}
    >
      📷 Scan Medicine
    </button>

    <input
      type="file"
      hidden
      accept="image/*"
      ref={fileRef}
      onChange={scanMedicine}
    />

  </section>

  {/* Disease Cards */}

  {

    loading ? (

      <div className="loading">

        <h2>డేటా లోడ్ అవుతోంది...</h2>

      </div>

    ) : (

      <section className="card-container">

        {

          filteredDiseases.length === 0 ? (

            <div className="no-data">

              <h2>❌ సమాచారం లభించలేదు</h2>

            </div>

          ) : (

            filteredDiseases.map((item) => (

              <div
                className="card"
                key={item.id}
              >

                <img
                  src={item.image_url}
                  alt={item.name}
                  loading="lazy"
                />

                <div className="card-body">

                  <h2>{item.name}</h2>

                  <div className="info-box">

                    <h3>🤒 లక్షణాలు</h3>

                    <p>{item.symptoms}</p>

                  </div>

                  <div className="info-box">

                    <h3>💊 మందులు</h3>

                    <p>{item.medicines}</p>

                  </div>

                  <div className="warning">

                    <h3>⚠️ జాగ్రత్తలు</h3>

                    <p>{item.precautions}</p>

                  </div>

                  <button
                    className="details-btn"
                    onClick={() => {

                      setSelectedDisease(item);

                      setShowPopup(true);

                      speakDisease(item);

                    }}
                  >

                    🤖 AI పూర్తి రిపోర్ట్

                  </button>

                </div>

              </div>

            ))

          )

        }

      </section>

    )

  }

</>

)}
{/* ==========================
    DOCTORS PAGE
========================== */}

{activePage === "doctors" && (

<section className="doctors-section">

  <h2>👨‍⚕️ మా నిపుణులైన వైద్యులు</h2>

  <div className="doctor-grid">

    {doctors.map((doctor, index) => (

      <div
        className="doctor-card"
        key={index}
      >

        <img
          src={`https://ui-avatars.com/api/?name=${doctor.image}&background=0D8ABC&color=fff&size=256&bold=true&font-size=0.55`}
          alt={doctor.name}
        />

        <h3>{doctor.name}</h3>

        <p>{doctor.department}</p>

        <span>{doctor.experience}</span>

        <button
          className="consult-btn"
          onClick={() => setActivePage("appointment")}
        >
          📅 Book Appointment
        </button>

      </div>

    ))}

  </div>

</section>

)}

{/* ==========================
    APPOINTMENT PAGE
========================== */}

{activePage === "appointment" && (

<section className="appointment-section">

  <h2>📅 Doctor Appointment Booking</h2>

  <div className="appointment-form">

    <input
      type="text"
      placeholder="👤 Full Name"
      value={appointment.name}
      onChange={(e)=>
        setAppointment({
          ...appointment,
          name:e.target.value
        })
      }
    />

    <input
      type="tel"
      placeholder="📱 Mobile Number"
      value={appointment.mobile}
      onChange={(e)=>
        setAppointment({
          ...appointment,
          mobile:e.target.value
        })
      }
    />

    <input
      type="number"
      placeholder="🎂 Age"
      value={appointment.age}
      onChange={(e)=>
        setAppointment({
          ...appointment,
          age:e.target.value
        })
      }
    />

    <select
      value={appointment.gender}
      onChange={(e)=>
        setAppointment({
          ...appointment,
          gender:e.target.value
        })
      }
    >

      <option value="">Gender</option>

      <option>Male</option>

      <option>Female</option>

      <option>Other</option>

    </select>

    <input
      type="text"
      placeholder="🤒 Disease"
      value={appointment.disease}
      onChange={(e)=>
        setAppointment({
          ...appointment,
          disease:e.target.value
        })
      }
    />

    <input
      type="date"
      value={appointment.date}
      onChange={(e)=>
        setAppointment({
          ...appointment,
          date:e.target.value
        })
      }
    />

    <button
      className="appointment-btn"
      onClick={bookAppointment}
    >

      ✅ Confirm Appointment

    </button>

  </div>

</section>

)}
{/* ==========================
    BMI PAGE
========================== */}

{activePage === "bmi" && (

<section className="bmi-section">

  <h2>⚖️ BMI Calculator</h2>

  <div className="bmi-container">

    <input
      type="number"
      placeholder="📏 Height (cm)"
      value={height}
      onChange={(e)=>setHeight(e.target.value)}
    />

    <input
      type="number"
      placeholder="⚖️ Weight (kg)"
      value={weight}
      onChange={(e)=>setWeight(e.target.value)}
    />

    <button
      className="bmi-btn"
      onClick={calculateBMI}
    >
      Calculate BMI
    </button>

    {bmi && (

      <div className="bmi-result">

        <h2>Your BMI : {bmi}</h2>

        <p>

          {bmi < 18.5
            ? "🟡 Under Weight"
            : bmi < 25
            ? "🟢 Normal"
            : bmi < 30
            ? "🟠 Over Weight"
            : "🔴 Obesity"}

        </p>

      </div>

    )}

  </div>

</section>

)}

{/* ==========================
    CONTACT PAGE
========================== */}

{activePage === "contact" && (

<>

<section className="contact-section">

<h2>📞 Contact Us</h2>

<div className="contact-grid">

<div className="contact-card">

<h3>📧 Email</h3>

<p>support@smarthealthcare.com</p>

</div>

<div className="contact-card">

<h3>📱 Phone</h3>

<p>+91 9876543210</p>

</div>

<div className="contact-card">

<h3>📍 Address</h3>

<p>Visakhapatnam, Andhra Pradesh</p>

</div>

</div>

</section>

<section className="emergency-section">

<div className="emergency-card">

<h2>🚑 Emergency</h2>

<p>

Emergency ఉన్నప్పుడు వెంటనే 108 కి కాల్ చేయండి.

</p>

<button

className="emergency-btn"

onClick={() => window.open("tel:108")}

>

📞 Call 108

</button>

</div>

<div className="emergency-card">

<h2>👨‍⚕️ Doctor Consultation</h2>

<p>

త్వరలో Online Doctor Consultation అందుబాటులోకి వస్తుంది.

</p>

<button

className="consult-btn"

onClick={() => alert("Coming Soon")}

>

Consult Doctor

</button>

</div>

</section>

</>

)}

{/* ==========================
    FOOTER
========================== */}

<footer className="beautiful-footer">

<h2>🏥 Smart Health Care</h2>

<p>AI Powered Healthcare Assistant</p>

<p>Developed By <b>Sai Kumar</b></p>

<hr />

<p>© 2026 Smart Health Care. All Rights Reserved.</p>

</footer>

{/* ==========================
    AI REPORT POPUP
========================== */}

{

showPopup && selectedDisease && (

<div

className="popup-overlay"

onClick={() => {

setShowPopup(false);

stopSpeech();

setSelectedDisease(null);

}}

>

<div

className="popup"

onClick={(e)=>e.stopPropagation()}

>

<h2>🤖 AI Health Report</h2>

<hr />

<h3>{selectedDisease.name}</h3>

<img

src={selectedDisease.image_url}

alt={selectedDisease.name}

className="popup-image"

/>

<div className="popup-section">

<h3>🤒 లక్షణాలు</h3>

<p>{selectedDisease.symptoms}</p>

</div>

<div className="popup-section">

<h3>💊 మందులు</h3>

<p>{selectedDisease.medicines}</p>

</div>

<div className="popup-warning-box">

<h3>⚠️ జాగ్రత్తలు</h3>

<p>{selectedDisease.precautions}</p>

</div>

<div className="popup-actions">

<button

className="speak-btn"

onClick={() => speakDisease(selectedDisease)}

>

🔊 Speak Again

</button>

<button

className="close-btn"

onClick={() => {

stopSpeech();

setShowPopup(false);

setSelectedDisease(null);

}}

>

❌ Close

</button>

</div>

</div>

</div>

)

}

</div>

);

}

export default App;