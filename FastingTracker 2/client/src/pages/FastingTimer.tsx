import { useState, useEffect } from "react";
import ModeSelector from "@/components/fasting/ModeSelector";
import TimerCircle from "@/components/fasting/TimerCircle";
import ControlButtons from "@/components/fasting/ControlButtons";
import HistoryRecords from "@/components/fasting/HistoryRecords";
import useTimer from "@/hooks/useTimer";

export interface FastingMode {
  label: string;
  hours: number;
}

export interface FastingRecord {
  mode: number;
  seconds: number;
  date: string;
}

export const FASTING_MODES: FastingMode[] = [
  { label: "16:8", hours: 16 },
  { label: "20:4", hours: 20 },
  { label: "24h", hours: 24 },
  { label: "32h", hours: 32 },
  { label: "42h", hours: 42 },
  { label: "48h", hours: 48 },
];

export default function FastingTimer() {
  const [selectedMode, setSelectedMode] = useState<FastingMode>(FASTING_MODES[0]);
  const [records, setRecords] = useState<FastingRecord[]>([]);
  
  const {
    elapsed,
    running,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimer(selectedMode, (hours, seconds) => saveRecord(hours, seconds));

  // Load records from localStorage on component mount
  useEffect(() => {
    const recordStr = localStorage.getItem("fasting-records");
    if (recordStr) setRecords(JSON.parse(recordStr));
  }, []);

  // Save record to localStorage and update state
  function saveRecord(hours: number, seconds: number) {
    const record: FastingRecord = {
      mode: hours,
      seconds,
      date: new Date().toLocaleString(),
    };
    const newRecords = [record, ...records].slice(0, 3);
    setRecords(newRecords);
    localStorage.setItem("fasting-records", JSON.stringify(newRecords));
  }

  function handleModeChange(mode: FastingMode) {
    pauseTimer();
    setSelectedMode(mode);
    resetTimer();
  }

  // Get end time based on current time and selected mode
  function getEndTimeString() {
    const now = new Date();
    const end = new Date(now.getTime() + (selectedMode.hours * 3600 * 1000) - (elapsed * 1000));
    const isTomorrow = end.getDate() !== now.getDate();
    const hh = end.getHours().toString().padStart(2, '0');
    const mm = end.getMinutes().toString().padStart(2, '0');
    return (isTomorrow ? "明天 " : "") + `${hh}:${mm}`;
  }

  return (
    <div className="bg-gray-100 font-sans min-h-screen flex items-center justify-center p-4">
      <div className="bg-white text-[#876D5A] flex flex-col items-center rounded-2xl shadow-xl p-6 max-w-md w-full mx-auto border-2 border-[#bfa07e] transition-all duration-300">
        <div className="w-full mb-6">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold mb-2 text-center w-full">
              斷食倒數計時器
            </div>
          </div>
          <div className="text-sm text-[#b89878] text-center mb-1">
            持續追蹤你的斷食時間
          </div>
          
          <HistoryRecords records={records} />
          
          <ModeSelector 
            modes={FASTING_MODES} 
            selectedMode={selectedMode} 
            onModeChange={handleModeChange} 
            disabled={running}
          />
        </div>

        <TimerCircle 
          elapsed={elapsed} 
          progress={progress}
          endTime={getEndTimeString()}
        />

        <ControlButtons 
          running={running} 
          onStart={startTimer} 
          onPause={pauseTimer} 
          onReset={resetTimer}
          isComplete={progress >= 100}
        />

        <div className="text-sm mt-2 text-[#b89878]">
          斷食目標：{selectedMode.label}｜總時數
        </div>
      </div>
    </div>
  );
}
