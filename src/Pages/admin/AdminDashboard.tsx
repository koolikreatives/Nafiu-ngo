import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus, X } from "lucide-react";
import { ContributionAreaChart } from "../../components/dashboard/ContributionAreaChart";
import { DonationsTable } from "../../components/dashboard/DonationsTable";
import { useDashboardData } from "../../context/DashboardDataContext";
import { formatGhc, getPercentage } from "../../lib/format";

export default function AdminDashboard() {
  const {
    adminUser,
    adminSummary,
    adminContributions,
    adminDonations,
    campaigns,
    addCampaign,
  } = useDashboardData();

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("25000");
  const [icon, setIcon] = useState<"chart" | "users" | "megaphone">("chart");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleCreateCampaign = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const parsedTarget = Number(targetAmount);
    if (!title.trim() || !description.trim()) {
      setError("Please fill in the campaign title and description.");
      return;
    }
    if (!Number.isFinite(parsedTarget) || parsedTarget <= 0) {
      setError("Target amount must be greater than 0.");
      return;
    }

    setSaving(true);
    try {
      await addCampaign({
        title,
        description,
        targetAmount: parsedTarget,
        icon,
      });
      setTitle("");
      setDescription("");
      setTargetAmount("25000");
      setModalOpen(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create campaign."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-['Manrope'] text-[11px] font-bold uppercase tracking-[0.08em] text-[#E06B43]">
            MONDAY, 5 OCTOBER
          </p>
          <h1 className="mt-1 font-['Manrope'] text-2xl font-bold tracking-tight text-[#142820] sm:text-[28px]">
            Good morning, {adminUser.firstName}.
          </h1>
          <p className="mt-1 text-[13px] text-[#6E7C76]">
            Here's how NAFIU COMMUNITY is performing today.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setError("");
            setModalOpen(true);
          }}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#E86D43] px-5 font-['Manrope'] text-xs font-bold text-white transition hover:bg-[#D55C33]"
        >
          <span>Create campaign</span>
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#E8ECEA] bg-white p-5">
          <p className="text-xs text-[#7D8A85]">Total donations</p>
          <p className="mt-2 font-['Manrope'] text-2xl font-bold text-[#142820]">
            {formatGhc(adminSummary.totalDonations)}
          </p>
          <p className="mt-2 text-[11px] text-[#8E9A95]">
            {adminSummary.donationsGrowthText}
          </p>
        </div>

        <div className="rounded-xl border border-[#E8ECEA] bg-white p-5">
          <p className="text-xs text-[#7D8A85]">Total members</p>
          <p className="mt-2 font-['Manrope'] text-2xl font-bold text-[#142820]">
            {adminSummary.totalMembers}
          </p>
          <p className="mt-2 text-[11px] text-[#8E9A95]">
            {adminSummary.membersGrowthText}
          </p>
        </div>

        <div className="rounded-xl border border-[#E8ECEA] bg-white p-5">
          <p className="text-xs text-[#7D8A85]">Successful</p>
          <p className="mt-2 font-['Manrope'] text-2xl font-bold text-[#142820]">
            {adminSummary.successfulCount}
          </p>
          <p className="mt-2 text-[11px] text-[#8E9A95]">
            {adminSummary.successRateText}
          </p>
        </div>

        <div className="rounded-xl border border-[#E8ECEA] bg-white p-5">
          <p className="text-xs text-[#7D8A85]">Pending</p>
          <p className="mt-2 font-['Manrope'] text-2xl font-bold text-[#142820]">
            {adminSummary.pendingCount}
          </p>
          <p className="mt-2 text-[11px] text-[#8E9A95]">
            {adminSummary.pendingAmountText}
          </p>
        </div>
      </div>

      {/* Donation Overview + Campaign Performance */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <section className="rounded-xl border border-[#E8ECEA] bg-white p-5 lg:col-span-8">
          <div className="mb-4 flex items-start justify-between gap-2">
            <div>
              <h2 className="font-['Manrope'] text-[15px] font-bold text-[#142820]">
                Donation overview
              </h2>
              <p className="mt-0.5 text-xs text-[#7D8A85]">
                {formatGhc(adminSummary.raisedThisMonth)} raised this month
              </p>
            </div>
            <span className="text-[11px] font-medium text-[#8E9A95]">
              Last 6 months
            </span>
          </div>

          <ContributionAreaChart data={adminContributions} />
        </section>

        <section className="rounded-xl border border-[#E8ECEA] bg-white p-5 lg:col-span-4">
          <h2 className="font-['Manrope'] text-[15px] font-bold text-[#142820]">
            Campaign performance
          </h2>
          <p className="mt-0.5 text-xs text-[#7D8A85]">
            Progress towards current targets
          </p>

          <div className="mt-5 space-y-5">
            {campaigns.map((campaign) => {
              const pct = getPercentage(
                campaign.raisedAmount,
                campaign.targetAmount
              );
              return (
                <div key={campaign.id}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-['Manrope'] text-xs font-bold text-[#142820]">
                        {campaign.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#8E9A95]">
                        {formatGhc(campaign.raisedAmount, false)} raised
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#142820]">
                      {pct}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#EAEFED]">
                    <div
                      className="h-full rounded-full bg-[#E86D43] transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
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
              Latest contributions across all campaigns
            </p>
          </div>
          <Link
            to="/admin/donations"
            className="inline-flex items-center gap-1 font-['Manrope'] text-xs font-bold text-[#142820] transition hover:text-[#E86D43]"
          >
            <span>View all donations</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <DonationsTable donations={adminDonations.slice(0, 5)} />
      </section>

      {/* Create Campaign Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl border border-[#E8ECEA] bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-['Manrope'] text-base font-bold text-[#142820]">
                Create new campaign
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
                className="rounded-lg p-1 text-[#7D8A85] hover:bg-[#F2F5F3]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="mt-4 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#182B23]">
                  Campaign title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Ramadan Care Drive"
                  className="h-10 w-full rounded-lg border border-[#E2E7E4] px-3 text-xs outline-none focus:border-[#E86D43]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#182B23]">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly describe who this campaign supports..."
                  className="w-full rounded-lg border border-[#E2E7E4] p-3 text-xs outline-none focus:border-[#E86D43]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#182B23]">
                    Target amount (GH₵)
                  </label>
                  <input
                    type="number"
                    min={100}
                    required
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="h-10 w-full rounded-lg border border-[#E2E7E4] px-3 text-xs outline-none focus:border-[#E86D43]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#182B23]">
                    Icon theme
                  </label>
                  <select
                    value={icon}
                    onChange={(e) =>
                      setIcon(
                        e.target.value as "chart" | "users" | "megaphone"
                      )
                    }
                    className="h-10 w-full rounded-lg border border-[#E2E7E4] bg-white px-3 text-xs outline-none focus:border-[#E86D43]"
                  >
                    <option value="chart">Education / Growth</option>
                    <option value="users">Community / Youth</option>
                    <option value="megaphone">Outreach / Tech</option>
                  </select>
                </div>
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="h-9 rounded-lg border border-[#E2E7E4] px-4 text-xs font-semibold text-[#182B23] hover:bg-[#F5F7F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="h-9 rounded-lg bg-[#E86D43] px-4 font-['Manrope'] text-xs font-bold text-white hover:bg-[#D55C33] disabled:opacity-60"
                >
                  {saving ? "Creating..." : "Create campaign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
