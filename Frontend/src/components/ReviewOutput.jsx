import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import useTheme from "../context/ThemeContext";

export default function ReviewOutput({ review, loading, error }) {
  const { themeMode } = useTheme();
  const isDark = themeMode === "dark";

  return (
    <div className="flex-1 flex flex-col border rounded-xl overflow-hidden shadow-sm transition-colors bg-white border-slate-200 dark:bg-zinc-950 dark:border-zinc-800">
      {/* Panel Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b transition-colors bg-slate-50 border-slate-200 dark:bg-zinc-900/60 dark:border-zinc-800">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          Review Output
        </span>
          {review && (
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/25">
                Analysis Ready
              </span>
          )}
      </div>

      {/* Review Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-sm mb-4">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-slate-500 dark:text-zinc-400">
            <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-xs font-medium">Analyzing your code...</p>
          </div>
        ) : review ? (
          <div
            className={`markdown-body ${isDark ? "dark-markdown" : "light-markdown"}`}
          >
            <Markdown rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}>
              {review}
            </Markdown>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 dark:text-zinc-400">
            <div className="text-3xl mb-2 opacity-50">🔍</div>
            <h3 className="text-sm font-semibold mb-1 text-slate-800 dark:text-zinc-200">
              Ready to review your code
            </h3>
            <p className="text-xs max-w-xs leading-relaxed">
              Paste your code in the left editor and click{" "}
              <strong className="text-indigo-500">Review Code</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

