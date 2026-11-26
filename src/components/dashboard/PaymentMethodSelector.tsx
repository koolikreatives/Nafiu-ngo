import { CreditCard, Smartphone } from "lucide-react";
import type {
  MobileMoneyNetwork,
  PaymentDetailsInput,
  PaymentMethod,
} from "../../types/payment";

interface PaymentMethodSelectorProps {
  value: PaymentDetailsInput;
  onChange: (next: PaymentDetailsInput) => void;
}

const NETWORKS: MobileMoneyNetwork[] = ["MTN", "Telecel", "AT"];

export function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  const selectMethod = (method: PaymentMethod) => {
    onChange({
      ...value,
      method,
      network: method === "mobile_money" ? value.network || "MTN" : undefined,
    });
  };

  return (
    <div className="space-y-3 rounded-xl border border-[#E8ECEA] bg-[#FAFBFB] p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-[#182B23]">Payment method</p>
        <span className="text-[10px] font-medium text-[#88948F]">
          GH₵ Checkout
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => selectMethod("mobile_money")}
          className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-xs font-semibold transition ${
            value.method === "mobile_money"
              ? "border-[#144533] bg-[#EDF4F0] text-[#144533]"
              : "border-[#E2E7E4] bg-white text-[#4E5D57] hover:border-[#C5D1CC]"
          }`}
        >
          <Smartphone className="h-4 w-4 shrink-0" />
          <span>Mobile Money</span>
        </button>

        <button
          type="button"
          onClick={() => selectMethod("card")}
          className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-xs font-semibold transition ${
            value.method === "card"
              ? "border-[#144533] bg-[#EDF4F0] text-[#144533]"
              : "border-[#E2E7E4] bg-white text-[#4E5D57] hover:border-[#C5D1CC]"
          }`}
        >
          <CreditCard className="h-4 w-4 shrink-0" />
          <span>Card (Visa / MC)</span>
        </button>
      </div>

      {value.method === "mobile_money" ? (
        <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[11px] font-medium text-[#7D8A85]">
              Network
            </label>
            <select
              value={value.network || "MTN"}
              onChange={(e) =>
                onChange({
                  ...value,
                  network: e.target.value as MobileMoneyNetwork,
                })
              }
              className="h-9 w-full rounded-lg border border-[#E2E7E4] bg-white px-2.5 text-xs font-medium text-[#182B23] outline-none focus:border-[#E86D43]"
            >
              {NETWORKS.map((net) => (
                <option key={net} value={net}>
                  {net} Mobile Money
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium text-[#7D8A85]">
              MoMo number
            </label>
            <input
              type="tel"
              value={value.momoNumber || ""}
              onChange={(e) =>
                onChange({ ...value, momoNumber: e.target.value })
              }
              placeholder="024 555 0182"
              className="h-9 w-full rounded-lg border border-[#E2E7E4] bg-white px-2.5 text-xs text-[#182B23] outline-none focus:border-[#E86D43]"
            />
          </div>
        </div>
      ) : (
        <p className="pt-1 text-[11px] text-[#6E7C76]">
          You will complete payment securely via our card payment gateway once
          checkout is connected.
        </p>
      )}
    </div>
  );
}
