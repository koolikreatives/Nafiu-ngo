import { API_ENDPOINTS, USE_MOCK_PAYMENTS } from "../config/apiEndpoints";
import type {
  InitializePaymentPayload,
  InitializePaymentResponse,
  VerifyPaymentResponse,
} from "../types/payment";
import { apiRequest } from "./apiClient";

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Starts a payment transaction for Dues or Donations.
 * When `USE_MOCK_PAYMENTS` is `false`, this calls `API_ENDPOINTS.payments.initialize`
 * and supports either instant confirmation or redirecting to `authorizationUrl`
 * (e.g. Paystack / Hubtel / Flutterwave checkout).
 */
export async function initializePayment(
  payload: InitializePaymentPayload
): Promise<InitializePaymentResponse> {
  if (!USE_MOCK_PAYMENTS) {
    return apiRequest<InitializePaymentResponse>(
      API_ENDPOINTS.payments.initialize,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  }

  await delay(450);
  const prefix = payload.purpose === "dues" ? "DUE" : "TXN";
  const randomCode = Math.floor(100000 + Math.random() * 899999);
  return {
    reference: `${prefix}-${randomCode}`,
    status: "success",
    message: "Payment processed successfully.",
  };
}

/**
 * Verifies a payment after gateway redirect or webhook completion.
 */
export async function verifyPayment(
  reference: string,
  amount: number
): Promise<VerifyPaymentResponse> {
  if (!USE_MOCK_PAYMENTS) {
    return apiRequest<VerifyPaymentResponse>(
      API_ENDPOINTS.payments.verify(reference)
    );
  }

  await delay(250);
  return {
    reference,
    status: "Successful",
    amount,
    message: "Payment verified.",
  };
}
