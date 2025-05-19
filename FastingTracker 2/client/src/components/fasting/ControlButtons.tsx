interface ControlButtonsProps {
  running: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isComplete: boolean;
}

export default function ControlButtons({
  running,
  onStart,
  onPause,
  onReset,
  isComplete
}: ControlButtonsProps) {
  const handleToggle = () => {
    if (running) {
      onPause();
    } else {
      onStart();
    }
  };

  return (
    <div className="flex justify-center space-x-4 mb-4">
      <button
        className="px-6 py-2 rounded-xl font-semibold shadow bg-[#876D5A] text-white hover:bg-[#bfa07e] transition"
        onClick={handleToggle}
      >
        {running ? "暫停" : isComplete ? "完成" : "開始"}
      </button>
      <button
        className="px-4 py-2 rounded-xl font-semibold shadow bg-[#e9dbc5] text-[#876D5A] hover:bg-[#f3e8dc] transition"
        onClick={onReset}
      >
        重置
      </button>
    </div>
  );
}
