import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    setHistory((prev) => replace ? [...prev.slice(0, -1), mode] : [...prev, mode]);
  };

  const back = () => {
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  return { transition, back, mode: history[history.length - 1] };
};

