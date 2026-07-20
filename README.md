# REVEL - AI-Powered Contract Documentation Tool

REVEL is an advanced AI-powered platform for managing, analyzing, and collaborating on contract documentation. It provides a comprehensive suite of tools for legal teams and professionals to streamline their workflow, from document uploading and AI-assisted analysis to clause management and digital signatures.

## 🚀 Features

- **Interactive Dashboard**: Gain insights with an intuitive overview of recent documents, pending signatures, and team activities.
- **Document Management**: Upload, view, and manage contract documents securely.
- **Clause Library**: A centralized repository to store, search, and reuse standard clauses across your documents.
- **AI-Assisted Analysis**: Leverage artificial intelligence to analyze contracts, detect anomalies, and extract key information.
- **Audit Trail**: Track all activities and changes made to documents to ensure compliance and transparency.
- **Secure Authentication**: Robust user authentication and protected routes to ensure data privacy.

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS, React Router, Lucide React (for icons).
- **Backend API**: Node.js, Express, MongoDB, Mongoose, JWT Authentication.

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kileshwar23/AI-POWERED-CONTRACT-DOCUMENTATION-TOOL-REVEAL.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd AI-POWERED-CONTRACT-DOCUMENTATION-TOOL-REVEAL
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `src/components/` - Reusable UI components (Navbar, Layout, ProtectedRoutes, etc.)
- `src/pages/` - Main application pages (Dashboard, DocumentsLibrary, ClauseLibrary, AuditTrail, etc.)
- `src/services/` - API client and service modules for communicating with the backend (aiService, documentService, etc.)
- `src/context/` - React Context providers (e.g., AuthContext) for global state management.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.
