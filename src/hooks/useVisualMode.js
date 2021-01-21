import React, { useState } from "react";

export function useVisualMode(modes) {
  let [history, setHistory] = useState([modes]);
  let [mode, setMode] = useState(modes);

  function transition(newMode, replace = false) {
    if(replace) {history = [...history.slice(0,-1), newMode]};
    setMode(newMode);
    history.push(newMode)
  }

  function back() {
    if(history.length === 1) {}
    else {history.pop()};
    setMode(history[history.length -1]);
  }

  return { back, transition, mode };
}