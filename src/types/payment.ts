export type PaymentMethod = "mobile_money" | "card";

export type MobileMoneyNetwork = "MTN" | "Telecel" | "AT";

export type PaymentPurpose = "dues" | "donation";

export interface PaymentDetailsInput {
  method: PaymentMethod;
  network?: MobileMoneyNetwork;
  momoNumber?: string;
}

export interface InitializePaymentPayload {
  purpose: PaymentPurpose;
  amount: number;
  currency: "GHS";
  email: string;
  method: PaymentMethod;
  network?: MobileMoneyNetwork;
  momoNumber?: string;
  metadata: Record<string, string | number | undefined>;
}

export interface InitializePaymentResponse {
  reference: string;
  status: "success" | "pending" | "redirect";
  /** If your backend returns a Paystack/Hubtel checkout URL, the frontend can redirect here */
  authorizationUrl?: string;
  message?: string;
}

export interface VerifyPaymentResponse {
  reference: string;
  status: "Successful" | "Pending" | "Failed";
  amount: number;
  message?: string;
}
