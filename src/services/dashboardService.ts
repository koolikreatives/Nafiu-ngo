import { API_ENDPOINTS, USE_MOCK_DATA } from "../config/apiEndpoints";
import {
  INITIAL_ADMIN_CONTRIBUTIONS,
  INITIAL_ADMIN_DONATIONS,
  INITIAL_ADMIN_SUMMARY,
  INITIAL_CAMPAIGNS,
  INITIAL_DUES_PAYMENTS,
  INITIAL_MEMBER_CONTRIBUTIONS,
  INITIAL_MEMBER_DONATIONS,
  INITIAL_MEMBER_SUMMARY,
  INITIAL_NOTIFICATIONS,
} from "../data/mockData";
import type {
  AdminSummary,
  AuthUser,
  CampaignItem,
  ChangePasswordPayload,
  ContributionPoint,
  CreateCampaignPayload,
  CreateDonationPayload,
  CreateDuesPaymentPayload,
  DonationRecord,
  DuesPaymentRecord,
  MemberSummary,
  NotificationItem,
  UpdateProfilePayload,
  UserRole,
} from "../types/dashboard";
import { apiRequest } from "./apiClient";
import { initializePayment } from "./paymentService";

export interface MemberDashboardPayload {
  summary: MemberSummary;
  contributions: ContributionPoint[];
  donations: DonationRecord[];
  duesPayments: DuesPaymentRecord[];
  campaigns: CampaignItem[];
}

export interface AdminDashboardPayload {
  summary: AdminSummary;
  contributions: ContributionPoint[];
  donations: DonationRecord[];
  campaigns: CampaignItem[];
}

export interface DuesSubmissionResult {
  record: DuesPaymentRecord;
  authorizationUrl?: string;
}

export interface DonationSubmissionResult {
  record: DonationRecord;
  authorizationUrl?: string;
}

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

function formatTodayDisplay(): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());
}

export async function fetchMemberDashboard(): Promise<MemberDashboardPayload> {
  if (!USE_MOCK_DATA) {
    const [overview, contributions, duesHistory, donations, campaigns] =
      await Promise.all([
        apiRequest<MemberSummary>(API_ENDPOINTS.member.overview),
        apiRequest<ContributionPoint[]>(API_ENDPOINTS.member.contributionsChart),
        apiRequest<DuesPaymentRecord[]>(API_ENDPOINTS.member.duesHistory),
        apiRequest<DonationRecord[]>(API_ENDPOINTS.member.donationHistory),
        apiRequest<CampaignItem[]>(API_ENDPOINTS.member.campaigns),
      ]);
    return { summary: overview, contributions, duesPayments: duesHistory, donations, campaigns };
  }

  await delay(120);
  return {
    summary: INITIAL_MEMBER_SUMMARY,
    contributions: INITIAL_MEMBER_CONTRIBUTIONS,
    donations: INITIAL_MEMBER_DONATIONS,
    duesPayments: INITIAL_DUES_PAYMENTS,
    campaigns: INITIAL_CAMPAIGNS,
  };
}

export async function fetchAdminDashboard(): Promise<AdminDashboardPayload> {
  if (!USE_MOCK_DATA) {
    const [overview, contributions, campaigns, donations] = await Promise.all([
      apiRequest<AdminSummary>(API_ENDPOINTS.admin.overview),
      apiRequest<ContributionPoint[]>(API_ENDPOINTS.admin.donationChart),
      apiRequest<CampaignItem[]>(API_ENDPOINTS.admin.campaigns),
      apiRequest<DonationRecord[]>(API_ENDPOINTS.admin.recentDonations),
    ]);
    return { summary: overview, contributions, campaigns, donations };
  }

  await delay(120);
  return {
    summary: INITIAL_ADMIN_SUMMARY,
    contributions: INITIAL_ADMIN_CONTRIBUTIONS,
    donations: INITIAL_ADMIN_DONATIONS,
    campaigns: INITIAL_CAMPAIGNS,
  };
}

export async function fetchNotifications(
  role: UserRole
): Promise<NotificationItem[]> {
  if (!USE_MOCK_DATA) {
    const url =
      role === "administrator"
        ? API_ENDPOINTS.admin.notifications
        : API_ENDPOINTS.member.notifications;
    return apiRequest<NotificationItem[]>(url);
  }

  await delay(100);
  return INITIAL_NOTIFICATIONS.filter(
    (item) => item.role === role || item.role === "all"
  );
}

export async function submitDuesPayment(
  payload: CreateDuesPaymentPayload
): Promise<DuesSubmissionResult> {
  const paymentInit = await initializePayment({
    purpose: "dues",
    amount: payload.amount,
    currency: "GHS",
    email: payload.memberEmail || "member@nafiucommunity.org",
    method: payload.payment?.method || "mobile_money",
    network: payload.payment?.network,
    momoNumber: payload.payment?.momoNumber,
    metadata: {
      period: payload.period,
      memberId: payload.memberId,
    },
  });

  if (paymentInit.authorizationUrl) {
    return {
      authorizationUrl: paymentInit.authorizationUrl,
      record: {
        id: `due_${Date.now()}`,
        period: payload.period,
        date: formatTodayDisplay(),
        reference: paymentInit.reference,
        amount: payload.amount,
        status: "Pending",
      },
    };
  }

  if (!USE_MOCK_DATA) {
    const record = await apiRequest<DuesPaymentRecord>(
      API_ENDPOINTS.member.payDues,
      {
        method: "POST",
        body: JSON.stringify({ ...payload, reference: paymentInit.reference }),
      }
    );
    return { record };
  }

  return {
    record: {
      id: `due_${Date.now()}`,
      period: payload.period,
      date: formatTodayDisplay(),
      reference: paymentInit.reference,
      amount: payload.amount,
      status: "Successful",
    },
  };
}

export async function submitDonation(
  payload: CreateDonationPayload,
  donorName: string
): Promise<DonationSubmissionResult> {
  const paymentInit = await initializePayment({
    purpose: "donation",
    amount: payload.amount,
    currency: "GHS",
    email: payload.donorEmail || "member@nafiucommunity.org",
    method: payload.payment?.method || "mobile_money",
    network: payload.payment?.network,
    momoNumber: payload.payment?.momoNumber,
    metadata: {
      campaignId: payload.campaignId,
      campaignTitle: payload.campaignTitle,
    },
  });

  if (paymentInit.authorizationUrl) {
    return {
      authorizationUrl: paymentInit.authorizationUrl,
      record: {
        id: `don_${Date.now()}`,
        date: formatTodayDisplay(),
        campaign: payload.campaignTitle,
        transactionId: paymentInit.reference,
        amount: payload.amount,
        status: "Pending",
        donorName,
      },
    };
  }

  if (!USE_MOCK_DATA) {
    const record = await apiRequest<DonationRecord>(
      API_ENDPOINTS.member.makeDonation,
      {
        method: "POST",
        body: JSON.stringify({ ...payload, reference: paymentInit.reference }),
      }
    );
    return { record };
  }

  return {
    record: {
      id: `don_${Date.now()}`,
      date: formatTodayDisplay(),
      campaign: payload.campaignTitle,
      transactionId: paymentInit.reference,
      amount: payload.amount,
      status: "Successful",
      donorName,
    },
  };
}

export async function updateMemberProfile(
  currentUser: AuthUser,
  payload: UpdateProfilePayload
): Promise<AuthUser> {
  if (!USE_MOCK_DATA) {
    return apiRequest<AuthUser>(API_ENDPOINTS.member.updateProfile, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }

  await delay(250);
  const firstInitial = payload.firstName.trim()[0] || "U";
  const lastInitial = payload.lastName.trim()[0] || "";
  return {
    ...currentUser,
    firstName: payload.firstName.trim(),
    lastName: payload.lastName.trim(),
    fullName: `${payload.firstName.trim()} ${payload.lastName.trim()}`.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    country: payload.country.trim(),
    avatarInitials: `${firstInitial}${lastInitial}`.toUpperCase(),
  };
}

export async function changeMemberPassword(
  payload: ChangePasswordPayload
): Promise<{ message: string }> {
  if (!USE_MOCK_DATA) {
    return apiRequest<{ message: string }>(
      API_ENDPOINTS.member.changePassword,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  }

  await delay(250);
  if (!payload.currentPassword || payload.newPassword.length < 8) {
    throw new Error("New password must be at least 8 characters.");
  }
  return { message: "Password updated successfully." };
}

export async function createCampaign(
  payload: CreateCampaignPayload
): Promise<CampaignItem> {
  if (!USE_MOCK_DATA) {
    return apiRequest<CampaignItem>(API_ENDPOINTS.admin.createCampaign, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  await delay(250);
  return {
    id: `camp_${Date.now()}`,
    title: payload.title.trim(),
    description: payload.description.trim(),
    raisedAmount: 0,
    targetAmount: payload.targetAmount,
    icon: payload.icon,
  };
}
