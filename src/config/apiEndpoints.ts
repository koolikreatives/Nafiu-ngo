/**
 * ============================================================================
 * CENTRAL API CONFIGURATION (NAFIU COMMUNITY)
 * ============================================================================
 * Paste the backend API URLs from your backend developer here.
 *
 * You can paste either:
 *   - A relative path (e.g. "/member/overview") -> automatically uses API_BASE_URL
 *   - A full URL (e.g. "https://nafiu.onrender.com/api/v1/member/overview")
 *
 * While your backend endpoints are still being built, keep `USE_MOCK_DATA = true`
 * (and `USE_MOCK_PAYMENTS = true`). When an endpoint is ready, set the flag to
 * `false` (or switch individual endpoints to live mode).
 * ============================================================================
 */

export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || "https://nafiu.onrender.com/api/v1";

/** Switch to `false` once your backend dashboard APIs are ready */
export const USE_MOCK_DATA = true;

/** Switch to `false` once your payment gateway (Paystack/Hubtel/MoMo) backend is ready */
export const USE_MOCK_PAYMENTS = true;

export const API_ENDPOINTS = {
  // ---------------- AUTHENTICATION ----------------
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
  },

  // ---------------- MEMBER PORTAL ----------------
  member: {
    // Overview KPIs, contributions chart, and recent donations
    overview: `${API_BASE_URL}/member/overview`,
    contributionsChart: `${API_BASE_URL}/member/contributions`,

    // Dues payment page
    duesSummary: `${API_BASE_URL}/member/dues/summary`,
    duesHistory: `${API_BASE_URL}/member/dues/history`,
    payDues: `${API_BASE_URL}/member/dues/pay`,

    // Make a donation & Donation history
    campaigns: `${API_BASE_URL}/campaigns`,
    makeDonation: `${API_BASE_URL}/member/donations`,
    donationHistory: `${API_BASE_URL}/member/donations/history`,

    // My profile & security
    profile: `${API_BASE_URL}/member/profile`,
    updateProfile: `${API_BASE_URL}/member/profile`,
    changePassword: `${API_BASE_URL}/member/change-password`,

    // Member notifications
    notifications: `${API_BASE_URL}/member/notifications`,
    markNotificationRead: (id: string) =>
      `${API_BASE_URL}/notifications/${id}/read`,
    markAllNotificationsRead: `${API_BASE_URL}/notifications/read-all`,
  },

  // ---------------- ADMIN WORKSPACE ----------------
  admin: {
    // Admin dashboard KPIs, donation chart, campaign performance, recent donations
    overview: `${API_BASE_URL}/admin/overview`,
    donationChart: `${API_BASE_URL}/admin/donations/chart`,
    campaigns: `${API_BASE_URL}/admin/campaigns`,
    createCampaign: `${API_BASE_URL}/admin/campaigns`,
    recentDonations: `${API_BASE_URL}/admin/donations/recent`,

    // Admin notifications
    notifications: `${API_BASE_URL}/admin/notifications`,
  },

  // ---------------- PAYMENT INTEGRATION ----------------
  payments: {
    // Initialize a Mobile Money / Card checkout session (e.g. Paystack / Hubtel)
    initialize: `${API_BASE_URL}/payments/initialize`,
    // Verify a payment reference after checkout callback
    verify: (reference: string) =>
      `${API_BASE_URL}/payments/verify/${reference}`,
  },
} as const;
