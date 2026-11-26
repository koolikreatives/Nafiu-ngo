import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Check,
  Megaphone,
  Users,
} from "lucide-react";
import { PaymentMethodSelector } from "../../components/dashboard/PaymentMethodSelector";
import { useDashboardData } from "../../context/DashboardDataContext";
import { useToast } from "../../context/ToastContext";
import { formatGhc, getPercentage } from "../../lib/format";
import type { CampaignItem, DonationRecord } from "../../types/dashboard";
import type { PaymentDetailsInput } from "../../types/payment";

type DonationStep = 1 | 2 | 3 | 4;

const PRESET_AMOUNTS = [50, 100, 200, 500, 1000];

const STEP_LABELS = [
  { num: 1, label: "Choose cause" },
  { num: 2, label: "Enter amount" },
  { num: 3, label: "Review" },
  { num: 4, label: "Confirmation" },
];

function CampaignIcon({ icon }: { icon: CampaignItem["icon"] }) {
  const cls = "h-4 w-4 text-[#E86D43]";
  if (icon === "users") return <Users className={cls} />;
  if (icon === "megaphone") return <Megaphone className={cls} />;
  return <BarChart3 className={cls} />;
}

export default function MemberDonate() {
  const navigate = useNavigate();
  const { memberUser, campaigns, makeDonation } = useDashboardData();
  const { toast } = useToast();

  const [step, setStep] = useState<DonationStep>(1);
  const [selectedCampaignId, setSelectedCampaignId] = useState(
    campaigns[0]?.id || ""
  );
  const [amountInput, setAmountInput] = useState("500");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsInput>({
    method: "mobile_money",
    network: "MTN",
    momoNumber: memberUser.phone || "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmedDonation, setConfirmedDonation] =
    useState<DonationRecord | null>(null);

  const selectedCampaign =
    campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];
  const numericAmount = Number(amountInput);
  const isValidAmount = Number.isFinite(numericAmount) && numericAmount > 0;

  const handleConfirmDonation = async () => {
    if (!selectedCampaign || !isValidAmount) return;
    setSubmitting(true);
    setError("");
    try {
      const record = await makeDonation({
        campaignId: selectedCampaign.id,
        campaignTitle: selectedCampaign.title,
        amount: numericAmount,
        payment: paymentDetails,
      });
      setConfirmedDonation(record);
      setStep(4);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to process donation right now.";
      setError(message);
      toast.error("Donation failed", message);
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 4 && confirmedDonation) {
    return (
      <div className="flex justify-center py-6">
        <div className="w-full max-w-[540px] rounded-xl border border-[#E8ECEA] bg-white px-6 py-10 text-center sm:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F4ED] text-[#144533]">
            <Check className="h-6 w-6" strokeWidth={2.2} />
          </div>

          <p className="mt-5 font-['Manrope'] text-[10px] font-bold uppercase tracking-[0.12em] text-[#E06B43]">
            PAYMENT CONFIRMED
          </p>
          <h1 className="mt-2 font-['Manrope'] text-2xl font-bold text-[#142820]">
            Your donation is on its way.
          </h1>
          <p className="mt-2 text-xs text-[#7D8A85]">
            Thank you for supporting our mission and investing in brighter
            futures.
          </p>

          <div className="mt-7 divide-y divide-[#EEF2F0] border-y border-[#EEF2F0] text-left text-xs">
            <div className="flex items-center justify-between py-3">
              <span className="text-[#88948F]">Amount</span>
              <span className="font-semibold text-[#182B23]">
                {formatGhc(confirmedDonation.amount)}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-[#88948F]">Campaign</span>
              <span className="font-semibold text-[#182B23]">
                {confirmedDonation.campaign}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-[#88948F]">Transaction ID</span>
              <span className="font-semibold text-[#182B23]">
                {confirmedDonation.transactionId}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-[#88948F]">Status</span>
              <span className="font-semibold text-[#182B23]">
                {confirmedDonation.status}
              </span>
            </div>
          </div>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/dashboard/history")}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#E86D43] px-5 font-['Manrope'] text-xs font-bold text-white transition hover:bg-[#D55C33]"
            >
              View donation history
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E2E7E4] bg-white px-5 font-['Manrope'] text-xs font-bold text-[#142820] transition hover:bg-[#F5F7F6]"
            >
              Return to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const pageHeading =
    step === 1
      ? "What would you like to support?"
      : step === 2
        ? "Choose your contribution"
        : "Review your donation";

  return (
    <div className="space-y-6">
      <div>
        <p className="font-['Manrope'] text-[11px] font-bold uppercase tracking-[0.08em] text-[#E06B43]">
          MAKE A DONATION
        </p>
        <h1 className="mt-1 font-['Manrope'] text-2xl font-bold tracking-tight text-[#142820] sm:text-[28px]">
          {pageHeading}
        </h1>
        <p className="mt-1 text-[13px] text-[#6E7C76]">
          A simple act of generosity can create lasting change.
        </p>
      </div>

      {/* 4-Step Indicator */}
      <div className="flex flex-wrap items-center gap-4 pt-1 sm:gap-10">
        {STEP_LABELS.map((item) => {
          const activeOrDone = item.num <= step;
          return (
            <div key={item.num} className="flex items-center gap-2.5">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                  activeOrDone
                    ? "bg-[#144533] text-white"
                    : "border border-[#DCE2DF] bg-white text-[#9AA5A0]"
                }`}
              >
                {item.num}
              </span>
              <span
                className={`text-xs ${
                  activeOrDone
                    ? "font-semibold text-[#182B23]"
                    : "text-[#9AA5A0]"
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {campaigns.map((campaign) => {
              const isSelected = selectedCampaign?.id === campaign.id;
              const pct = getPercentage(
                campaign.raisedAmount,
                campaign.targetAmount
              );

              return (
                <button
                  key={campaign.id}
                  type="button"
                  onClick={() => setSelectedCampaignId(campaign.id)}
                  className={`flex flex-col justify-between rounded-xl border bg-white p-5 text-left transition ${
                    isSelected
                      ? "border-[#144533] ring-1 ring-[#144533]"
                      : "border-[#E8ECEA] hover:border-[#C5D1CC]"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FCEEE8]">
                        <CampaignIcon icon={campaign.icon} />
                      </div>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full ${
                          isSelected
                            ? "bg-[#144533] text-white"
                            : "border border-[#DCE2DF] bg-white"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </span>
                    </div>

                    <h2 className="mt-5 font-['Manrope'] text-base font-bold text-[#142820]">
                      {campaign.title}
                    </h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#7D8A85]">
                      {campaign.description}
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#88948F]">
                        {formatGhc(campaign.raisedAmount, false)} raised
                      </span>
                      <span className="font-bold text-[#142820]">{pct}%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#EAEFED]">
                      <div
                        className="h-full rounded-full bg-[#E86D43]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!selectedCampaign}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#E86D43] px-6 font-['Manrope'] text-xs font-bold text-white transition hover:bg-[#D55C33] disabled:opacity-50"
            >
              <span>Continue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && selectedCampaign && (
        <div className="mx-auto max-w-[600px] space-y-5 pt-2">
          <div className="rounded-xl border border-[#E8ECEA] bg-white p-6">
            <div className="flex items-center justify-between border-b border-[#F0F3F1] pb-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FCEEE8]">
                  <CampaignIcon icon={selectedCampaign.icon} />
                </div>
                <div>
                  <p className="text-[11px] text-[#88948F]">
                    You're supporting
                  </p>
                  <p className="font-['Manrope'] text-sm font-bold text-[#142820]">
                    {selectedCampaign.title}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-[#144533] hover:text-[#E86D43]"
              >
                Change
              </button>
            </div>

            <div className="pt-5">
              <p className="text-xs font-semibold text-[#182B23]">
                How much would you like to give?
              </p>

              <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                {PRESET_AMOUNTS.map((preset) => {
                  const selected = Number(amountInput) === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setAmountInput(String(preset));
                        setError("");
                      }}
                      className={`h-10 rounded-lg border text-xs font-semibold transition ${
                        selected
                          ? "border-[#144533] bg-[#144533] text-white"
                          : "border-[#E2E7E4] bg-white text-[#182B23] hover:border-[#144533]"
                      }`}
                    >
                      {formatGhc(preset)}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="customDonationAmount"
                  className="mb-2 block text-xs font-semibold text-[#182B23]"
                >
                  Or enter another amount
                </label>
                <div className="flex h-11 items-center rounded-lg border border-[#E2E7E4] bg-white px-3.5 focus-within:border-[#E86D43]">
                  <span className="mr-3 text-xs font-semibold text-[#182B23]">
                    GH₵
                  </span>
                  <input
                    id="customDonationAmount"
                    type="number"
                    min={1}
                    step="1"
                    value={amountInput}
                    onChange={(e) => {
                      setAmountInput(e.target.value);
                      setError("");
                    }}
                    className="w-full bg-transparent text-xs font-medium text-[#182B23] outline-none"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                  {error}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E2E7E4] bg-white px-5 font-['Manrope'] text-xs font-bold text-[#182B23] transition hover:bg-[#F5F7F6]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                if (!isValidAmount) {
                  setError("Please enter a valid amount greater than 0.");
                  return;
                }
                setStep(3);
              }}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#E86D43] px-6 font-['Manrope'] text-xs font-bold text-white transition hover:bg-[#D55C33]"
            >
              <span>Continue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && selectedCampaign && (
        <div className="mx-auto max-w-[600px] space-y-5 pt-2">
          <div className="rounded-xl border border-[#E8ECEA] bg-white p-6">
            <div className="flex items-center gap-3.5 border-b border-[#F0F3F1] pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FCEEE8]">
                <CampaignIcon icon={selectedCampaign.icon} />
              </div>
              <div>
                <p className="text-[11px] text-[#88948F]">Donation to</p>
                <p className="font-['Manrope'] text-sm font-bold text-[#142820]">
                  {selectedCampaign.title}
                </p>
              </div>
            </div>

            <div className="py-6 text-center">
              <p className="text-xs text-[#88948F]">Total contribution</p>
              <p className="mt-1.5 font-['Manrope'] text-3xl font-bold text-[#142820]">
                {formatGhc(numericAmount)}
              </p>
            </div>

            <div className="divide-y divide-[#EEF2F0] border-y border-[#EEF2F0] text-xs">
              <div className="flex items-center justify-between py-3">
                <span className="text-[#88948F]">Donor</span>
                <span className="font-semibold text-[#182B23]">
                  {memberUser.fullName}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[#88948F]">Email</span>
                <span className="font-semibold text-[#182B23]">
                  {memberUser.email}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[#88948F]">Member ID</span>
                <span className="font-semibold text-[#182B23]">
                  {memberUser.memberId || "NGO-2026-000124"}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <PaymentMethodSelector
                value={paymentDetails}
                onChange={setPaymentDetails}
              />
            </div>

            <div className="mt-4 rounded-lg bg-[#EDF4F0] px-4 py-3 text-[11px] text-[#355548]">
              Your payment is securely processed by our trusted payment provider.
            </div>

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={submitting}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E2E7E4] bg-white px-5 font-['Manrope'] text-xs font-bold text-[#182B23] transition hover:bg-[#F5F7F6] disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleConfirmDonation}
              disabled={submitting}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#E86D43] px-6 font-['Manrope'] text-xs font-bold text-white transition hover:bg-[#D55C33] disabled:opacity-60"
            >
              <span>{submitting ? "Processing..." : "Confirm & pay"}</span>
              {!submitting && <ArrowRight className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
