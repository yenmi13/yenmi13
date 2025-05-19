import { FastingRecord } from "@/pages/FastingTimer";
import { formatTimeNoSeconds } from "@/hooks/useTimer";

interface HistoryRecordsProps {
  records: FastingRecord[];
}

export default function HistoryRecords({ records }: HistoryRecordsProps) {
  if (!records || records.length === 0) {
    return null;
  }

  return (
    <div className="text-xs text-[#C28153] text-center mb-3">
      {records.map((record, idx) => (
        <div key={idx}>
          {idx === 0 ? "最近紀錄" : `前${idx + 1}次`}｜
          {record.mode}小時：{formatTimeNoSeconds(record.seconds)}
          <span className="ml-2 text-[#b89878]">({record.date})</span>
        </div>
      ))}
    </div>
  );
}
