import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { useCodeReview } from "./hooks/useCodeReview";
import Navbar from "./components/Navbar";
import CodeEditor from "./components/CodeEditor";
import ReviewOutput from "./components/ReviewOutput";

function AppContent() {
  const { code, setCode, review, loading, error, reviewCode } = useCodeReview();

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
    const htmlEl = document.documentElement;
    htmlEl.classList.remove("light", "dark");
    htmlEl.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkMode, lightMode }}>
      <AppContent />
    </ThemeProvider>
  );
}
