import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const isDark = theme === "dark";

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Dynamic Prism Theme (for Code Editor)
    let prismLink = document.getElementById("prism-theme");
    if (!prismLink) {
      prismLink = document.createElement("link");
      prismLink.id = "prism-theme";
      prismLink.rel = "stylesheet";
      document.head.appendChild(prismLink);
    }
    prismLink.href = isDark
      ? "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
      : "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css";

    // Dynamic Highlight.js Theme (for Review Output Markdown code blocks)
    let hljsLink = document.getElementById("hljs-theme");
    if (!hljsLink) {
      hljsLink = document.createElement("link");
      hljsLink.id = "hljs-theme";
      hljsLink.rel = "stylesheet";
      document.head.appendChild(hljsLink);
    }
    hljsLink.href = isDark
      ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
      : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css";
  }, [theme, isDark]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
