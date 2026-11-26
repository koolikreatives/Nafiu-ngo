import { formatGhc } from "../../lib/format";
import type { DonationRecord } from "../../types/dashboard";
import { StatusBadge } from "./StatusBadge";

interface DonationsTableProps {
  donations: DonationRecord[];
  emptyMessage?: string;
}

export function DonationsTable({
  donations,
  emptyMessage = "No donations match your current filter.",
}: DonationsTableProps) {
  if (donations.length === 0) {
    return (
      <div className="px-5 py-10 text-center text-xs text-[#7D8A85]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse text-left">
        <thead>
          <tr className="border-y border-[#EEF2F0] bg-[#FAFBFA] text-[11px] font-medium text-[#7A8782]">
            <th className="px-5 py-3 font-medium">Date</th>
            <th className="px-5 py-3 font-medium">Campaign</th>
            <th className="px-5 py-3 font-medium">Transaction ID</th>
            <th className="px-5 py-3 font-medium">Amount</th>
            <th className="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F0F3F1] text-[13px]">
          {donations.map((row) => (
            <tr
              key={row.id}
              className="transition-colors hover:bg-[#FAFDFB]"
            >
              <td className="px-5 py-4 text-[#475650]">{row.date}</td>
              <td className="px-5 py-4 font-medium text-[#1D3028]">
                {row.campaign}
              </td>
              <td className="px-5 py-4 text-[#7F8B86]">{row.transactionId}</td>
              <td className="px-5 py-4 font-semibold text-[#182B23]">
                {formatGhc(row.amount)}
              </td>
              <td className="px-5 py-4">
                <StatusBadge status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
