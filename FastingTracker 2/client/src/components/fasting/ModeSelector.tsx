import { FastingMode } from "@/pages/FastingTimer";

interface ModeSelectorProps {
  modes: FastingMode[];
  selectedMode: FastingMode;
  onModeChange: (mode: FastingMode) => void;
  disabled: boolean;
}

export default function ModeSelector({ 
  modes, 
  selectedMode, 
  onModeChange, 
  disabled 
}: ModeSelectorProps) {
  return (
    <div className="flex justify-center flex-wrap gap-2 mb-4">
      {modes.map((mode) => (
        <button
          key={mode.label}
          className={`px-3 py-1 rounded-xl text-sm font-semibold border border-[#bfa07e] transition
            ${selectedMode.label === mode.label
              ? "bg-[#876D5A] text-white"
              : "bg-[#e9dbc5] text-[#876D5A] hover:bg-[#f3e8dc]"}`}
          onClick={() => onModeChange(mode)}
          disabled={disabled}
          style={{letterSpacing: "0.04em"}}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
