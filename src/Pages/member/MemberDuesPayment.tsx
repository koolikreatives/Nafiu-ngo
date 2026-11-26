import { useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { PaymentMethodSelector } from "../../components/dashboard/PaymentMethodSelector";
import { useDashboardData } from "../../context/DashboardDataContext";
import { useToast } from "../../context/ToastContext";
import { formatGhc } from "../../lib/format";
import type { DuesPaymentRecord } from "../../types/dashboard";
import type { PaymentDetailsInput } from "../../types/payment";

type DuesStep = 1 | 2 | 3;

export default function MemberDuesPayment() {
  const { memberUser, memberSummary, duesPayments, payDues } =
    useDashboardData();
  const { toast } = useToast();

  const [step, setStep] = useState<DuesStep>(1);
  const [selectedPeriod, setSelectedPeriod] = useState(
    memberSummary.availableDuesPeriods[0] || "October – December 2026"
  );
  const [amountInput, setAmountInput] = useState(
    String(memberSummary.quarterlyDuesRate)
  );
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsInput>({
    method: "mobile_money",
    network: "MTN",
    momoNumber: memberUser.phone || "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmedRecord, setConfirmedRecord] =
    useState<DuesPaymentRecord | null>(null);

  const numericAmount = Number(amountInput);
  const isValidAmount = Number.isFinite(numericAmount) && numericAmount > 0;

  const handleReview = () => {
    setError("");
    if (!isValidAmount) {
      setError("Please enter a valid dues amount greater than 0.");
      return;
    }
    setStep(2);
  };

  const handleConfirmAndPay = async () => {
    if (!isValidAmount) return;
    setSubmitting(true);
    setError("");
    try {
      const record = await payDues({
        period: selectedPeriod,
        amount: numericAmount,
        payment: paymentDetails,
      });
      setConfirmedRecord(record);
      setStep(3);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to process dues payment. Please try again.";
      setError(message);
      toast.error("Payment failed", message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmedRecord(null);
    setAmountInput(String(memberSummary.quarterlyDuesRate));
    setStep(1);
  };

  if (step === 3 && confirmedRecord) {
    return (
      <div className="flex justify-center py-6">
        <div className="w-full max-w-[540px] rounded-xl border border-[#E8ECEA] bg-white px-6 py-10 text-center sm:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F4ED] text-[#144533]">
            <Check className="h-6 w-6" strokeWidth={2.2} />
          </div>

          <p className="mt-5 font-['Manrope'] text-[10px] font-bold uppercase tracking-[0.12em] text-[#E06B43]">
            DUES PAYMENT CONFIRMED
          </p>
          <h1 className="mt-2 font-['Manrope'] text-2xl font-bold text-[#142820]">
            Your membership is up to date.
          </h1>
          <p className="mt-2 text-xs text-[#7D8A85]">
            Thank you for fulfilling your membership commitment to NAFIU
            COMMUNITY.
          </p>

          <div className="mt-7 divide-y divide-[#EEF2F0] border-y border-[#EEF2F0] text-left text-xs">
            <div className="flex items-center justify-between py-3">
              <span className="text-[#88948F]">Payment period</span>
              <span className="font-semibold text-[#182B23]">
                {confirmedRecord.period}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-[#88948F]">Amount paid</span>
              <span className="font-semibold text-[#182B23]">
                {formatGhc(confirmedRecord.amount)}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-[#88948F]">Member ID</span>
              <span className="font-semibold text-[#182B23]">
                {memberUser.memberId || "NGO-2026-000124"}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-[#88948F]">Reference</span>
              <span className="font-semibold text-[#182B23]">
                {confirmedRecord.reference}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-[#88948F]">Status</span>
              <span className="font-semibold text-[#182B23]">
                {confirmedRecord.status}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="mt-7 inline-flex h-10 items-center justify-center rounded-lg bg-[#E86D43] px-6 font-['Manrope'] text-xs font-bold text-white transition hover:bg-[#D55C33]"
          >
            Make another payment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="font-['Manrope'] text-[11px] font-bold uppercase tracking-[0.08em] text-[#E06B43]">
          MEMBERSHIP DUES
        </p>
        <h1 className="mt-1 font-['Manrope'] text-2xl font-bold tracking-tight text-[#142820] sm:text-[28px]">
          Keep your membership active.
        </h1>
        <p className="mt-1 text-[13px] text-[#6E7C76]">
          Pay your quarterly dues and review your payment record.
        </p>
      </div>

      {/* 4 KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#E8ECEA] bg-white p-5">
          <p className="text-xs text-[#7D8A85]">Quarterly dues</p>
          <p className="mt-2 font-['Manrope'] text-2xl font-bold text-[#142820]">
            {formatGhc(memberSummary.quarterlyDuesRate)}
          </p>
          <p className="mt-2 text-[11px] text-[#8E9A95]">
            Standard member rate
          </p>
        </div>

        <div className="rounded-xl border border-[#E8ECEA] bg-white p-5">
          <p className="text-xs text-[#7D8A85]">Paid this year</p>
          <p className="mt-2 font-['Manrope'] text-2xl font-bold text-[#142820]">
            {formatGhc(memberSummary.totalDuesPaidYear)}
          </p>
          <p className="mt-2 text-[11px] text-[#8E9A95]">
            {memberSummary.quarterlyPaymentsCount} quarterly payments
          </p>
        </div>

        <div className="rounded-xl border border-[#E8ECEA] bg-white p-5">
          <p className="text-xs text-[#7D8A85]">Next due date</p>
          <p className="mt-2 font-['Manrope'] text-2xl font-bold text-[#142820]">
            {memberSummary.nextDueDate}
          </p>
          <p className="mt-2 text-[11px] text-[#8E9A95]">
            {memberSummary.nextDuePeriod}
          </p>
        </div>

        <div className="rounded-xl border border-[#E8ECEA] bg-white p-5">
          <p className="text-xs text-[#7D8A85]">Member since</p>
          <p className="mt-2 font-['Manrope'] text-2xl font-bold text-[#142820]">
            Mar 2026
          </p>
          <p className="mt-2 text-[11px] text-[#8E9A95]">
            ID: {memberUser.memberId || "NGO-2026-000124"}
          </p>
        </div>
      </div>

      {/* Main 2-column section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Left card: Step 1 or Step 2 */}
        <section className="rounded-xl border border-[#E8ECEA] bg-white p-6 lg:col-span-7">
          {step === 1 ? (
            <>
              <div>
                <h2 className="font-['Manrope'] text-base font-bold text-[#142820]">
                  Make a dues payment
                </h2>
                <p className="mt-0.5 text-xs text-[#7D8A85]">
                  Select the membership period you want to cover.
                </p>
              </div>

              <div className="mt-3 flex justify-end">
                <span className="font-['Manrope'] text-[10px] font-bold uppercase tracking-[0.08em] text-[#E06B43]">
                  STEP 1 OF 2
                </span>
              </div>

              <div className="mt-3 space-y-5">
                <div>
                  <label
                    htmlFor="duesPeriod"
                    className="mb-2 block text-xs font-semibold text-[#182B23]"
                  >
                    Payment period
                  </label>
                  <div className="relative">
                    <select
                      id="duesPeriod"
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="h-11 w-full appearance-none rounded-lg border border-[#E2E7E4] bg-white px-3.5 pr-10 text-xs font-medium text-[#182B23] outline-none transition focus:border-[#E86D43]"
                    >
                      {memberSummary.availableDuesPeriods.map((period) => (
                        <option key={period} value={period}>
                          {period}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6F7C77]" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="duesAmount"
                    className="mb-2 block text-xs font-semibold text-[#182B23]"
                  >
                    Amount
                  </label>
                  <div className="flex h-11 items-center rounded-lg border border-[#E2E7E4] bg-white px-3.5 focus-within:border-[#E86D43]">
                    <span className="mr-3 text-xs font-semibold text-[#182B23]">
                      GH₵
                    </span>
                    <input
                      id="duesAmount"
                      type="number"
                      min={1}
                      step="1"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                      className="w-full bg-transparent text-xs font-medium text-[#182B23] outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-[#E8ECEA] bg-[#FAFBFB] p-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#144533]" />
                  <div>
                    <p className="text-xs font-semibold text-[#182B23]">
                      Secure payment
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#7D8A85]">
                      Your payment will be processed securely and recorded
                      against your Member ID.
                    </p>
                  </div>
                </div>

                {error && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                    {error}
                  </p>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleReview}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#E86D43] px-5 font-['Manrope'] text-xs font-bold text-white transition hover:bg-[#D55C33]"
                  >
                    <span>Review payment</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="font-['Manrope'] text-base font-bold text-[#142820]">
                  Review your payment
                </h2>
                <p className="mt-0.5 text-xs text-[#7D8A85]">
                  Confirm the details before completing payment.
                </p>
              </div>

              <div className="mt-3 flex justify-end">
                <span className="font-['Manrope'] text-[10px] font-bold uppercase tracking-[0.08em] text-[#E06B43]">
                  STEP 2 OF 2
                </span>
              </div>

              <div className="py-6 text-center">
                <p className="text-xs text-[#88948F]">Total dues payment</p>
                <p className="mt-1.5 font-['Manrope'] text-3xl font-bold text-[#142820]">
                  {formatGhc(numericAmount)}
                </p>
              </div>

              <div className="divide-y divide-[#EEF2F0] border-y border-[#EEF2F0] text-xs">
                <div className="flex items-center justify-between py-3.5">
                  <span className="text-[#88948F]">Member</span>
                  <span className="font-semibold text-[#182B23]">
                    {memberUser.fullName}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3.5">
                  <span className="text-[#88948F]">Member ID</span>
                  <span className="font-semibold text-[#182B23]">
                    {memberUser.memberId || "NGO-2026-000124"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3.5">
                  <span className="text-[#88948F]">Payment period</span>
                  <span className="font-semibold text-[#182B23]">
                    {selectedPeriod}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <PaymentMethodSelector
                  value={paymentDetails}
                  onChange={setPaymentDetails}
                />
              </div>

              {error && (
                <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                  {error}
                </p>
              )}

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={submitting}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E2E7E4] bg-white px-5 font-['Manrope'] text-xs font-bold text-[#182B23] transition hover:bg-[#F5F7F6] disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAndPay}
                  disabled={submitting}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#E86D43] px-5 font-['Manrope'] text-xs font-bold text-white transition hover:bg-[#D55C33] disabled:opacity-60"
                >
                  <span>
                    {submitting ? "Processing..." : "Confirm & pay"}
                  </span>
                  {!submitting && <ArrowRight className="h-3.5 w-3.5" />}
                </button>
              </div>
            </>
          )}
        </section>

        {/* Right card: Recent dues payments */}
        <section className="rounded-xl border border-[#E8ECEA] bg-white p-6 lg:col-span-5">
          <h2 className="font-['Manrope'] text-base font-bold text-[#142820]">
            Recent dues payments
          </h2>
          <p className="mt-0.5 text-xs text-[#7D8A85]">
            Your latest membership payments
          </p>

          <div className="mt-5 divide-y divide-[#F0F3F1]">
            {duesPayments.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 py-3.5 first:pt-1 last:pb-1"
              >
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#144533]" />
                  <div>
                    <p className="text-xs font-semibold text-[#182B23]">
                      {item.period}
                    </p>
                    <p className="mt-1 text-[11px] text-[#8E9A95]">
                      {item.date} · {item.reference}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-xs font-semibold text-[#182B23]">
                  {formatGhc(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
