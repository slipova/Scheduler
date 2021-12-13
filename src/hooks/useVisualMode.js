import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    //TODO: I should use prev version of the history(bad things happen if not)
    // const newHistory = [...history];
    // if (replace) {
    //   newHistory.pop();
    // }
    // setHistory([...newHistory, newMode]);
    setHistory((prev) => replace ? [...prev.slice(0, -1), mode] : [...prev, mode])
  }

  const back = () => {
    //TODO: I should use prev version of the history(bad things happen if not)
    // if (history.length < 2) {
    //   return;
    // }
    // const newHistory = [...history];
    // newHistory.pop();
    // setHistory(newHistory);
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))
  }


  return { transition, back, mode: history[history.length - 1] };
};

