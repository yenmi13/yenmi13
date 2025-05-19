import { formatTimeNoSeconds } from "@/hooks/useTimer";

interface TimerCircleProps {
  elapsed: number;
  progress: number;
  endTime: string;
}

export default function TimerCircle({ elapsed, progress, endTime }: TimerCircleProps) {
  const baseCircleColor = "#ecdac8";
  const progressColor = "#876D5A";
  
  return (
    <div className="relative w-full flex flex-col items-center mb-6">
      <div className="w-56 h-56 flex items-center justify-center relative">
        {/* Background circular progress bar */}
        <svg className="absolute top-0 left-0" width="224" height="224" viewBox="0 0 224 224">
          <circle
            cx="112"
            cy="112"
            r="104"
            fill="none"
            stroke={baseCircleColor}
            strokeWidth="16"
          />
          <circle
            cx="112"
            cy="112"
            r="104"
            fill="none"
            stroke={progressColor}
            strokeWidth="16"
            strokeDasharray={2 * Math.PI * 104}
            strokeDashoffset={2 * Math.PI * 104 * (1 - progress / 100)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s" }}
          />
        </svg>
        
        {/* Circle center content */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full select-none">
          <span className="text-base md:text-lg text-[#7b8a95] mb-1">已過時間</span>
          <span className="text-2xl md:text-3xl font-bold text-[#876D5A] tracking-widest mb-1">
            {formatTimeNoSeconds(elapsed)}
          </span>
          <span className="text-base md:text-lg text-[#7b8a95] mt-1">
            在 {endTime} 結束
          </span>
        </span>
      </div>
    </div>
  );
}
