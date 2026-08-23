import { useState } from "react";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import EditorComponent from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

// Fallback for CommonJS/ESM module import variations
const Editor = EditorComponent.default || EditorComponent;

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reviewCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(response.data);
    } catch (err) {
      console.error("Error fetching review:", err);
      setError("Failed to get code review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <button 
          onClick={reviewCode} 
          className="review"
          disabled={loading}
        >
          {loading ? "Reviewing..." : "Review"}
        </button>
      </div>

      <div className="right">
        {error && <p className="error" style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <p>Analyzing your code...</p>
        ) : (
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review || "Click **Review** to analyze your code."}
          </Markdown>
        )}
      </div>
    </main>
  );
}

export default App;
