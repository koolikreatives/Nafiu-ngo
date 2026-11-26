import type { PaymentDetailsInput } from "./payment";

export type UserRole = "member" | "administrator";

export type TransactionStatus = "Successful" | "Pending" | "Failed";

export type NotificationCategory = "donation" | "dues" | "campaign" | "member" | "system";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  role: UserRole;
  memberId?: string;
  memberSince?: string;
  accountCreated?: string;
  passwordLastUpdated?: string;
  avatarInitials: string;
}

export interface ContributionPoint {
  month: string;
  amount: number;
}

export interface DonationRecord {
  id: string;
  date: string;
  campaign: string;
  transactionId: string;
  amount: number;
  status: TransactionStatus;
  donorName?: string;
}

export interface DuesPaymentRecord {
  id: string;
  period: string;
  date: string;
  reference: string;
  amount: number;
  status: TransactionStatus;
}

export interface CampaignItem {
  id: string;
  title: string;
  description: string;
  raisedAmount: number;
  targetAmount: number;
  icon: "chart" | "users" | "megaphone";
}

export interface NotificationItem {
  id: string;
  role: UserRole | "all";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: NotificationCategory;
  targetPath?: string;
}

export interface MemberSummary {
  totalDuesPaidYear: number;
  quarterlyDuesRate: number;
  quarterlyPaymentsCount: number;
  nextDueDate: string;
  nextDuePeriod: string;
  totalDonated: number;
  donatedThisMonth: number;
  pendingCount: number;
  communitiesImpacted: number;
  availableDuesPeriods: string[];
}

export interface AdminSummary {
  totalDonations: number;
  donationsGrowthText: string;
  totalMembers: number;
  membersGrowthText: string;
  successfulCount: number;
  successRateText: string;
  pendingCount: number;
  pendingAmountText: string;
  raisedThisMonth: number;
}

export interface CreateDonationPayload {
  campaignId: string;
  campaignTitle: string;
  amount: number;
  donorEmail?: string;
  payment?: PaymentDetailsInput;
}

export interface CreateDuesPaymentPayload {
  period: string;
  amount: number;
  memberEmail?: string;
  memberId?: string;
  payment?: PaymentDetailsInput;
}

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface CreateCampaignPayload {
  title: string;
  description: string;
  targetAmount: number;
  icon: "chart" | "users" | "megaphone";
}
