import useTheme from "../context/ThemeContext";

export default function Navbar() {
  const { themeMode, darkMode, lightMode } = useTheme();

  const toggleTheme = () => {
    if (themeMode === "dark") {
      lightMode();
    } else {
      darkMode();
    }
  };

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b transition-colors border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold tracking-tight">
          AI Code Reviewer
        </h1>
      </div>

      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${themeMode === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${themeMode === "dark" ? "light" : "dark"} mode`}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all active:scale-95 cursor-pointer bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800 shadow-sm"
      >
        <span className="transition-transform duration-200">
          {themeMode === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </span>
      </button>
    </header>
  );
}
