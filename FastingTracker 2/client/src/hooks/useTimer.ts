import { useState, useRef, useEffect } from "react";
import { FastingMode } from "@/pages/FastingTimer";

export function formatTimeNoSeconds(seconds: number): string {
  const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export default function useTimer(
  selectedMode: FastingMode,
  onComplete: (hours: number, seconds: number) => void
) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  // Reset timer when mode changes
  useEffect(() => {
    setElapsed(0);
  }, [selectedMode]);
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  const totalSeconds = selectedMode.hours * 3600;
  const progress = Math.min((elapsed / totalSeconds) * 100, 100);
  
  function startTimer() {
    if (intervalRef.current) return;
    
    setRunning(true);
    intervalRef.current = window.setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= totalSeconds) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setRunning(false);
          onComplete(selectedMode.hours, totalSeconds);
          return totalSeconds;
        }
        return prev + 1;
      });
    }, 1000);
  }
  
  function pauseTimer() {
    setRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }
  
  function resetTimer() {
    if (elapsed > 0) {
      onComplete(selectedMode.hours, elapsed);
    }
    
    setElapsed(0);
    setRunning(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }
  
  return {
    elapsed,
    running,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
  };
}
