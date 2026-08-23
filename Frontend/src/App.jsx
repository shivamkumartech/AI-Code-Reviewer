import { useState } from "react";
import axios from "axios";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import CodeEditor from "./components/CodeEditor";
import ReviewOutput from "./components/ReviewOutput";

function AppContent() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reviewCode = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(response.data);
    } catch (err) {
      console.error("Error fetching review:", err);
      setError("Failed to generate code review. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col font-sans overflow-hidden bg-slate-100 text-slate-900 dark:bg-zinc-900 dark:text-zinc-100 transition-colors">
      <Navbar />
      <main className="flex-1 flex gap-4 p-4 h-[calc(100vh-64px)] overflow-hidden">
        <CodeEditor
          code={code}
          setCode={setCode}
          onReview={reviewCode}
          loading={loading}
        />
        <ReviewOutput
          review={review}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
