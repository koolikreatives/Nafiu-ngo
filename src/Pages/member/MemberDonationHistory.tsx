import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { DonationsTable } from "../../components/dashboard/DonationsTable";
import { useDashboardData } from "../../context/DashboardDataContext";
import type { TransactionStatus } from "../../types/dashboard";

type FilterTab = "All" | TransactionStatus;

const FILTER_TABS: FilterTab[] = ["All", "Successful", "Pending", "Failed"];

export default function MemberDonationHistory() {
  const { memberDonations } = useDashboardData();
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDonations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return memberDonations.filter((item) => {
      if (activeTab !== "All" && item.status !== activeTab) return false;
      if (!q) return true;
      return (
        item.campaign.toLowerCase().includes(q) ||
        item.transactionId.toLowerCase().includes(q) ||
        item.date.toLowerCase().includes(q) ||
        String(item.amount).includes(q)
      );
    });
  }, [memberDonations, activeTab, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-['Manrope'] text-[11px] font-bold uppercase tracking-[0.08em] text-[#E06B43]">
            GIVING ACTIVITY
          </p>
          <h1 className="mt-1 font-['Manrope'] text-2xl font-bold tracking-tight text-[#142820] sm:text-[28px]">
            My donations
          </h1>
          <p className="mt-1 text-[13px] text-[#6E7C76]">
            Every contribution you've made, clearly recorded in one place.
          </p>
        </div>

        <Link
          to="/dashboard/donate"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-[#E86D43] px-5 font-['Manrope'] text-xs font-bold text-white transition hover:bg-[#D55C33]"
        >
          Make a donation
        </Link>
      </div>

      <section className="overflow-hidden rounded-xl border border-[#E8ECEA] bg-white">
        <div className="flex flex-col justify-between gap-3 p-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-1.5">
            {FILTER_TABS.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                    active
                      ? "bg-[#EDF4F0] text-[#144533]"
                      : "text-[#7D8A85] hover:bg-[#F6F8F7] hover:text-[#182B23]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9AA5A0]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions"
              aria-label="Search transactions"
              className="h-9 w-full rounded-lg border border-[#E2E7E4] bg-white pl-8 pr-3 text-xs text-[#182B23] outline-none transition placeholder:text-[#9AA5A0] focus:border-[#E86D43]"
            />
          </div>
        </div>

        <DonationsTable
          donations={filteredDonations}
          emptyMessage={
            searchQuery
              ? `No donations found matching "${searchQuery}".`
              : `No ${activeTab.toLowerCase()} donations yet.`
          }
        />
      </section>
    </div>
  );
}
