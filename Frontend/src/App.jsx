import { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import CodeEditor from "./components/CodeEditor";
import ReviewOutput from "./components/ReviewOutput";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function AppContent() {
  const [code, setCode] = useState(`
    function sum() {
      return a + b;
    }
  `);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reviewCode = async () => {
    if (!code.trim()) {
      setError("Please enter some code before requesting a review.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/ai/get-review`, {
        code,
      });
      setReview(response.data);
    } catch (err) {
      console.error("Error fetching review:", err);
      const serverMsg = err.response?.data?.message || err.response?.data;
      setError(
        "Failed to generate code review. Make sure the backend server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col font-sans overflow-hidden transition-colors bg-slate-100 text-slate-900 dark:bg-zinc-900 dark:text-zinc-100">
      <Navbar />
      <main className="flex-1 flex gap-4 p-4 h-[calc(100vh-64px)] overflow-hidden">
        <CodeEditor
          code={code}
          setCode={setCode}
          onReview={reviewCode}
          loading={loading}
        />
        <ReviewOutput review={review} loading={loading} error={error} />
      </main>
    </div>
  );
}

export default function App() {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "dark";
  });

  const darkMode = () => {
    setThemeMode("dark");
  };

  const lightMode = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkMode, lightMode }}>
      <AppContent />
    </ThemeProvider>
  );
}
