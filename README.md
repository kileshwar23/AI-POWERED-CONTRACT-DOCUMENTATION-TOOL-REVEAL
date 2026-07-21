# 🚀 REVEL - AI-Powered Contract Documentation Tool

Welcome to **REVEL**, a state-of-the-art AI-powered platform designed to revolutionize the way you manage, analyze, and store legal contracts and documents. Built with a sleek, modern, and highly responsive user interface, REVEL leverages Google Gemini's advanced AI capabilities to extract key clauses, identify critical risks, and generate comprehensive summaries in seconds.

---

## ✨ Key Features

- **🧠 AI Contract Analysis**: Automatically extract clauses, identify high-risk areas, and get instant summaries of lengthy legal documents using Gemini AI.
- **🔐 Secure Authentication**: Robust JWT-based authentication system with Role-Based Access Control (Admin, Owner, Org Admin, User).
- **📂 Document Library**: A sleek dashboard to upload, manage, download, and delete your documents seamlessly.
- **📊 Real-time Dashboard Statistics**: Track how many documents you've analyzed, risks identified, and time saved natively.
- **🎨 Stunning UI/UX**: Built with React, TailwindCSS, and Lucide Icons, featuring beautiful glassmorphism, fluid micro-animations, and a highly polished dark-mode aesthetic.

---

## 🛠️ Technology Stack

### Frontend (`/revel`)
- **React.js (Vite)**
- **Tailwind CSS** (for styling and glassmorphism effects)
- **React Router** (navigation)
- **Lucide React** (modern icons)
- **Axios** (API requests)

### Backend (`/revel-backend`)
- **Node.js & Express.js**
- **MongoDB & Mongoose** (Includes an auto-fallback to In-Memory DB for seamless local testing without setup)
- **Google Generative AI (Gemini)** (For document analysis)
- **Multer** (File uploads)
- **PDF-Parse** (Text extraction from uploaded documents)
- **Bcrypt & JSONWebToken (JWT)** (Security & Auth)

---

## 🚀 Getting Started

Follow these steps to run REVEL on your local machine.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB URI (Optional: the backend will automatically spin up an in-memory DB if not provided)
- Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/kileshwar23/AI-POWERED-CONTRACT-DOCUMENTATION-TOOL-REVEAL.git
cd AI-POWERED-CONTRACT-DOCUMENTATION-TOOL-REVEAL
```

### 2. Backend Setup
```bash
cd revel-backend
npm install
```
Create a `.env` file in the `revel-backend` directory:
```env
PORT=8080
JWT_SECRET=your_super_secret_key_here
GEMINI_API_KEY=your_google_gemini_api_key_here
# MONGO_URI=your_mongodb_cluster_url (Optional)
```
Start the backend server:
```bash
npm run dev
```
*(The backend runs on http://localhost:8080. If no MONGO_URI is provided, it will spin up a local in-memory DB for you!)*

### 3. Frontend Setup
Open a new terminal window:
```bash
cd revel
npm install
```
Start the frontend development server:
```bash
npm run dev
```
*(The frontend usually runs on http://localhost:5173)*

---

## 📸 Screenshots

*(Feel free to add your application screenshots here to showcase the beautiful UI!)*

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/kileshwar23/AI-POWERED-CONTRACT-DOCUMENTATION-TOOL-REVEAL/issues).

## 📄 License

This project is licensed under the MIT License.
