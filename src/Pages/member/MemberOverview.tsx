import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ContributionAreaChart } from "../../components/dashboard/ContributionAreaChart";
import { DonationsTable } from "../../components/dashboard/DonationsTable";
import { useDashboardData } from "../../context/DashboardDataContext";
import { IMPACT_CARD_IMAGE_URL } from "../../data/mockData";
import { formatGhc } from "../../lib/format";

export default function MemberOverview() {
  const { memberUser, memberSummary, memberContributions, memberDonations } =
    useDashboardData();

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-['Manrope'] text-[11px] font-bold uppercase tracking-[0.08em] text-[#E06B43]">
            MONDAY, 5 OCTOBER
          </p>
          <h1 className="mt-1 font-['Manrope'] text-2xl font-bold tracking-tight text-[#142820] sm:text-[28px]">
            Welcome back, {memberUser.firstName}.
          </h1>
          <p className="mt-1 text-[13px] text-[#6E7C76]">
            Your generosity is creating real opportunities. Here's your impact
            so far.
          </p>
        </div>

        <Link
          to="/dashboard/donate"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-[#E86D43] px-5 font-['Manrope'] text-xs font-bold text-white transition hover:bg-[#D55C33]"
        >
          Make a donation
        </Link>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#E8ECEA] bg-white p-5">
          <p className="text-xs text-[#7D8A85]">Total dues</p>
          <p className="mt-2 font-['Manrope'] text-2xl font-bold text-[#142820]">
            {formatGhc(memberSummary.totalDuesPaidYear)}
          </p>
          <p className="mt-2 text-[11px] text-[#8E9A95]">Paid in 2026</p>
        </div>

        <div className="rounded-xl border border-[#E8ECEA] bg-white p-5">
          <p className="text-xs text-[#7D8A85]">Total donated</p>
          <p className="mt-2 font-['Manrope'] text-2xl font-bold text-[#142820]">
            {formatGhc(memberSummary.totalDonated)}
          </p>
          <p className="mt-2 text-[11px] text-[#8E9A95]">
            + {formatGhc(memberSummary.donatedThisMonth, false)} this month
          </p>
        </div>

        <div className="rounded-xl border border-[#E8ECEA] bg-white p-5">
          <p className="text-xs text-[#7D8A85]">Pending</p>
          <p className="mt-2 font-['Manrope'] text-2xl font-bold text-[#142820]">
            {memberSummary.pendingCount}
          </p>
          <p className="mt-2 text-[11px] text-[#8E9A95]">
            Awaiting confirmation
          </p>
        </div>

        <div className="rounded-xl bg-[#144533] p-5 text-white">
          <p className="text-xs text-white/75">Your member ID</p>
          <p className="mt-2 font-['Manrope'] text-lg font-bold tracking-wide">
            {memberUser.memberId || "NGO-2026-000124"}
          </p>
          <p className="mt-2.5 text-[11px] text-white/65">
            Member since {memberUser.memberSince || "March 2026"}
          </p>
        </div>
      </div>

      {/* Contributions Chart + Impact Card */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <section className="rounded-xl border border-[#E8ECEA] bg-white p-5 lg:col-span-8">
          <div className="mb-4 flex items-start justify-between gap-2">
            <div>
              <h2 className="font-['Manrope'] text-[15px] font-bold text-[#142820]">
                My contributions
              </h2>
              <p className="mt-0.5 text-xs text-[#7D8A85]">
                Your giving over the last 6 months
              </p>
            </div>
            <span className="text-[11px] font-medium text-[#8E9A95]">
              Last 6 months
            </span>
          </div>

          <ContributionAreaChart data={memberContributions} />
        </section>

        <section
          className="relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-xl bg-[#144533] bg-cover bg-center p-6 text-white lg:col-span-4"
          style={{ backgroundImage: `url("${IMPACT_CARD_IMAGE_URL}")` }}
        >
          <div className="absolute inset-0 bg-[#144533]/85" />
          <div className="relative z-10">
            <p className="font-['Manrope'] text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
              YOUR IMPACT
            </p>
            <h2 className="mt-3 font-['Manrope'] text-2xl font-bold leading-tight">
              Every gift opens a door.
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-white/80">
              Your support has helped provide learning materials and mentorship
              to young people across {memberSummary.communitiesImpacted}{" "}
              communities.
            </p>
          </div>

          <Link
            to="/dashboard/donate"
            className="relative z-10 mt-6 inline-flex items-center gap-1.5 font-['Manrope'] text-xs font-bold text-white transition hover:text-[#F6A68A]"
          >
            <span>Continue your impact</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </div>

      {/* Recent Donations */}
      <section className="overflow-hidden rounded-xl border border-[#E8ECEA] bg-white">
        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <div>
            <h2 className="font-['Manrope'] text-[15px] font-bold text-[#142820]">
              Recent donations
            </h2>
            <p className="mt-0.5 text-xs text-[#7D8A85]">
              Your latest contribution activity
            </p>
          </div>
          <Link
            to="/dashboard/history"
            className="inline-flex items-center gap-1 font-['Manrope'] text-xs font-bold text-[#142820] transition hover:text-[#E86D43]"
          >
            <span>View all donations</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <DonationsTable donations={memberDonations.slice(0, 4)} />
      </section>
    </div>
  );
}
