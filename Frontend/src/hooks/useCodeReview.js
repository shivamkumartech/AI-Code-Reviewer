import { useState, useCallback } from "react";
import { getCodeReview } from "../services/api";

const INITIAL_CODE = `function sum(a, b) {
  return a + b;
}`;

export function useCodeReview() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reviewCode = useCallback(async () => {
    if (!code.trim()) {
      setError("Please enter some code before requesting a review.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const responseText = await getCodeReview(code);
      setReview(responseText);
    } catch (err) {
      setError(err.message || "Failed to generate code review.");
    } finally {
      setLoading(false);
    }
  }, [code]);

  const clearCode = useCallback(() => {
    setCode("");
    setError(null);
  }, []);

  const resetAll = useCallback(() => {
    setCode(INITIAL_CODE);
    setReview("");
    setError(null);
  }, []);

  return {
    code,
    setCode,
    review,
    loading,
    error,
    setError,
    reviewCode,
    clearCode,
    resetAll,
  };
}
