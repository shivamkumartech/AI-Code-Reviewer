import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b transition-colors border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm shadow text-white font-bold">
          ⚡
        </div>
        <h1 className="text-lg font-semibold tracking-tight">
          AI Code Reviewer
        </h1>
        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
          Senior AI
        </span>
      </div>

      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        <span>{isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
      </button>
    </header>
  );
}
