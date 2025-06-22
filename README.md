# 🔮 ASTROPALM — AI-Powered Palmistry & Astrology

**AstroPalm** is a full-stack AI-driven web application that fuses the ancient art of palmistry with modern machine learning and astrology. Using real-time hand tracking, gesture recognition, and birth details, it delivers insightful predictions, personalized natal charts, and interactive palm reading reports — all in a beautifully animated, user-friendly interface.

---

## 🚀 Features

### ✋ Palmistry (MediaPipe + ML)
- Real-time hand landmark detection using **MediaPipe Hands**
- Palm line classification (Heart, Head, Life lines) with gesture recognition
- Dual-hand detection, confidence overlays, and interactive palm diagram
- Snapshot + PDF export of palm readings with highlighted visual results

### 🌌 Astrology (FreeAstrologyAPI)
- Astrology form: name, DOB, time, and location
- Accurate planetary positions, house interpretations, and aspects
- Dynamic natal chart SVG and zodiac avatars
- ChromaGrid-based UI with GSAP animations for cosmic aesthetic

### 📄 Document AI
- Upload palm images or live webcam scans
- Embedded knowledge via LangChain + HuggingFace
- Natural language querying with smart document highlighting



## 🧠 How It Works

1. **Palm Analysis**  
   Upload your palm image or use webcam. MediaPipe detects hand landmarks, and our ML model classifies palm lines and gestures. Results are visualized and exported as a personalized PDF.

2. **Astrology Analysis**  
   Enter your birth details. We query **FreeAstrologyAPI** to fetch planetary positions, aspects, and house info. A natal chart is generated with beautiful animations.

3. **PDFQuery (Document AI)**  
   Ask natural language questions on any uploaded PDF using LangChain + local embedding. See intelligent chunk-level highlighting directly on the document.


