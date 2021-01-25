import { useState } from "react";

export function useVisualMode(modes) {
  let [history, setHistory] = useState([modes]);
  let [mode, setMode] = useState(modes);

  function transition(newMode, replace = false) {
    setMode(newMode);
    if(replace) {setHistory(prev => [...prev.slice(0,-1), newMode])}
    else {setHistory(prev => [...prev, newMode])}
  }

  function back() {
    if(history.length === 1) {}
    else {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0,-1))
    };
  }

  return { back, transition, mode };
}