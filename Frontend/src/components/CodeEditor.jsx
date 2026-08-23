import prism from "prismjs";
import EditorComponent from "react-simple-code-editor";
import { useTheme } from "../context/ThemeContext";

const Editor = EditorComponent.default || EditorComponent;

export default function CodeEditor({ code, setCode, onReview, loading }) {
  const { isDark } = useTheme();

  return (
    <div className="flex-1 flex flex-col border rounded-xl overflow-hidden shadow-sm relative transition-colors bg-white border-slate-200 dark:bg-zinc-950 dark:border-zinc-800">
      {/* Panel Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b transition-colors bg-slate-50 border-slate-200 dark:bg-zinc-900/60 dark:border-zinc-800">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          Source Code
        </span>
        <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 dark:bg-indigo-500/15 dark:text-indigo-400 dark:border-indigo-500/25">
          JavaScript
        </span>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-auto relative p-2 pb-16">
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) =>
            prism.highlight(code, prism.languages.javascript, "javascript")
          }
          padding={12}
          className={`min-h-full ${isDark ? "text-zinc-200" : "text-zinc-800"}`}
          style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: 14,
            lineHeight: "1.6",
          }}
        />
      </div>

      {/* Action Button */}
      <button
        onClick={onReview}
        disabled={loading}
        className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-medium px-5 py-2.5 rounded-lg shadow-md transition-all cursor-pointer disabled:opacity-50 z-10 flex items-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span>Reviewing...</span>
          </>
        ) : (
          <>
            <span>Review Code</span>
            <span>✨</span>
          </>
        )}
      </button>
    </div>
  );
}
