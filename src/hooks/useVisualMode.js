import { useState } from "react";

export function useVisualMode(modes) {
  let [history, setHistory] = useState([modes]);
  let [mode, setMode] = useState(modes);

  function transition(newMode, replace = false) {
    setMode(newMode);
    if(replace) {setHistory(prev => [...prev.slice(0,-1), newMode])} //if replace is true, remove the last history then add newMode
    else {setHistory(prev => [...prev, newMode])} //else, add newMode
  }

  function back() {
    if(history.length === 1) {}//if first page, do nothing
    else {
      setMode(history[history.length - 2]); //set mode to last page
      setHistory(history.slice(0,-1)) //remove last history
    };
  }

  return { back, transition, mode };
}