import type { TransactionStatus } from "../../types/dashboard";

export function StatusBadge({ status }: { status: TransactionStatus }) {
  const styles: Record<TransactionStatus, string> = {
    Successful: "bg-[#E6F5EC] text-[#1D7A4E]",
    Pending: "bg-[#FDF3DF] text-[#B3741A]",
    Failed: "bg-[#FDECEC] text-[#C83B3B]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium ${styles[status]}`}
    >
      <span className="text-[10px] leading-none">•</span>
      {status}
    </span>
  );
}
