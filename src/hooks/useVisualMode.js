import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {
    //TODO: I should use prev version of the history(bad things happen if not)
    const newHistory = [...history];
    if (replace) {
      newHistory.pop();
    }
    setHistory([...newHistory, newMode]);

  }

  const back = () => {
    //TODO: I should use prev version of the history(bad things happen if not)
    if (history.length < 2) {
      return;
    }
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
  }
  const mode = history[history.length - 1];

  return { transition, back, mode };
};

