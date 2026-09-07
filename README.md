# ⚡ AI Code Reviewer

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)

An intelligent full-stack web application that uses **Google Gemini** to review developer source code and provide feedback on code quality, potential bugs, security risks, performance, and possible improvements.

## 🌐 Live Demo

**[AI Code Reviewer](https://ai-code-reviewer-ecru-xi.vercel.app/)**

---

## 📸 Screenshots

### ☀️ Light Mode

![AI Code Reviewer - Light Mode](./docs/screenshots/light_mode.png)

### 🌙 Dark Mode

![AI Code Reviewer - Dark Mode](./docs/screenshots/dark_mode.png)

---

## ✨ Features

- 🤖 **AI-Powered Code Review** — Uses the Google Gemini API to analyze submitted source code and provide structured feedback.
- 🔍 **Code Analysis** — Reviews code for quality, best practices, potential bugs, security risks, performance, readability, and maintainability.
- 🛠️ **Refactored Code Suggestions** — Generates an improved version of the submitted code with Markdown code formatting.
- 📝 **Markdown Review Output** — Displays the generated review using Markdown rendering with syntax highlighting.
- 🎨 **Dark & Light Mode** — Supports persistent theme selection using React Context and `localStorage`.
- 💻 **Syntax Highlighting** — Uses PrismJS for syntax highlighting inside the code editor.
- ⌨️ **Code Editor** — Provides an in-browser code editor for entering and editing source code.
- 📋 **Quick Actions** — Provides actions for copying code, clearing the editor, and copying the generated review.
- ⏳ **Loading & Error States** — Handles loading states during API requests and displays errors when a review cannot be generated.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Axios, React Markdown, Rehype Highlight, PrismJS, React Simple Code Editor |
| **Backend** | Node.js, Express 5, CORS, Dotenv |
| **AI Integration** | Google Gemini API, `@google/genai` |
| **Architecture** | React Custom Hooks, React Context API, Express Routes, Controllers, Services |

---

## 📁 Project Architecture

```text
AI-Code-Reviewer/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CodeEditor.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ReviewOutput.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/
│   │   │   └── useCodeReview.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   │   └── ai.controller.js
    │   ├── routes/
    │   │   └── ai.routes.js
    │   ├── services/
    │   │   └── ai.service.js
    │   └── app.js
    ├── server.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- **Node.js**
- **npm**
- A **Google Gemini API key**

You can create a Gemini API key through [Google AI Studio](https://aistudio.google.com/app/apikey).

---

### 1. Clone the Repository

```bash
git clone https://github.com/shivamkumartech/AI-Code-Reviewer.git
cd AI-Code-Reviewer
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```env
PORT=3000
GOOGLE_GEMINI_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.6-flash
```

Start the backend server:

```bash
node --watch server.js
```

The backend will run on:

```text
http://localhost:3000
```

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd Frontend
npm install
```

Create a `.env` file inside the `Frontend/` directory if you want to configure the backend URL:

```env
VITE_API_URL=http://localhost:3000
```

If `VITE_API_URL` is not provided, the frontend uses:

```text
http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Open the Vite development URL shown in your terminal, typically:

```text
http://localhost:5173
```

---

## 📡 API Endpoints

### `POST /ai/get-review`

Sends source code to the backend for AI-powered code review.

**Request Body:**

```json
{
  "code": "function sum(a, b) { return a + b; }"
}
```

The backend sends the submitted code to Google Gemini and returns the generated review.

---

### `GET /health`

Returns the current backend health status.

**Response:**

```json
{
  "status": "OK",
  "timestamp": "..."
}
```

---

## 🔄 Request Flow

```text
User enters code
       ↓
CodeEditor
       ↓
useCodeReview
       ↓
api.js
       ↓
POST /ai/get-review
       ↓
Express Router
       ↓
AI Controller
       ↓
AI Service
       ↓
Google Gemini API
       ↓
AI-generated review
       ↓
ReviewOutput
```

---

## 🔐 Environment Variables

### Backend

```env
PORT=3000
GOOGLE_GEMINI_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.6-flash
```

### Frontend

```env
VITE_API_URL=http://localhost:3000
```

The Gemini API key is used by the backend and is not required in the frontend.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

## 👨‍💻 Author

Crafted with ❤️ by **Shivam Kumar**

GitHub: [@shivamkumartech](https://github.com/shivamkumartech)