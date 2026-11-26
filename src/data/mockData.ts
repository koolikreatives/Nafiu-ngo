import type {
  AdminSummary,
  AuthUser,
  CampaignItem,
  ContributionPoint,
  DonationRecord,
  DuesPaymentRecord,
  MemberSummary,
  NotificationItem,
} from "../types/dashboard";

export const IMPACT_CARD_IMAGE_URL =
  "https://res.cloudinary.com/exstf7ai/image/upload/v1794904195/mu.jpg";

export const MOCK_MEMBER_USER: AuthUser = {
  id: "usr_member_001",
  firstName: "Issah",
  lastName: "Mohammed",
  fullName: "Issah Mohammed",
  email: "issah.mohammed@email.com",
  phone: "+233 24 555 0182",
  country: "Ghana",
  role: "member",
  memberId: "NGO-2026-000124",
  memberSince: "March 2026",
  accountCreated: "14 March 2026",
  passwordLastUpdated: "Last updated 3 months ago",
  avatarInitials: "IM",
};

export const MOCK_ADMIN_USER: AuthUser = {
  id: "usr_admin_001",
  firstName: "Amina",
  lastName: "Abdullahi",
  fullName: "Amina Abdullahi",
  email: "admin@nafiucommunity.org",
  phone: "+233 24 555 0101",
  country: "Ghana",
  role: "administrator",
  memberSince: "January 2024",
  accountCreated: "10 January 2024",
  passwordLastUpdated: "Last updated 1 month ago",
  avatarInitials: "AA",
};

export const INITIAL_MEMBER_SUMMARY: MemberSummary = {
  totalDuesPaidYear: 450,
  quarterlyDuesRate: 150,
  quarterlyPaymentsCount: 3,
  nextDueDate: "05 Oct",
  nextDuePeriod: "October – December 2026",
  totalDonated: 2500,
  donatedThisMonth: 500,
  pendingCount: 1,
  communitiesImpacted: 3,
  availableDuesPeriods: [
    "October – December 2026",
    "January – March 2027",
    "April – June 2027",
  ],
};

export const INITIAL_ADMIN_SUMMARY: AdminSummary = {
  totalDonations: 125500,
  donationsGrowthText: "+12.4% this month",
  totalMembers: 428,
  membersGrowthText: "+18 new this month",
  successfulCount: 392,
  successRateText: "94.2% success rate",
  pendingCount: 12,
  pendingAmountText: "GH₵ 3,450 in review",
  raisedThisMonth: 18500,
};

export const INITIAL_MEMBER_CONTRIBUTIONS: ContributionPoint[] = [
  { month: "May", amount: 160 },
  { month: "Jun", amount: 280 },
  { month: "Jul", amount: 400 },
  { month: "Aug", amount: 430 },
  { month: "Sep", amount: 610 },
  { month: "Oct", amount: 850 },
];

export const INITIAL_ADMIN_CONTRIBUTIONS: ContributionPoint[] = [
  { month: "May", amount: 160 },
  { month: "Jun", amount: 280 },
  { month: "Jul", amount: 400 },
  { month: "Aug", amount: 430 },
  { month: "Sep", amount: 610 },
  { month: "Oct", amount: 850 },
];

export const INITIAL_CAMPAIGNS: CampaignItem[] = [
  {
    id: "camp_scholarship",
    title: "Scholarship Support",
    description: "Create educational opportunities for promising young people.",
    raisedAmount: 32500,
    targetAmount: 50000,
    icon: "chart",
  },
  {
    id: "camp_mentorship",
    title: "Youth Mentorship",
    description: "Fund mentorship and personal development programs.",
    raisedAmount: 12400,
    targetAmount: 20000,
    icon: "users",
  },
  {
    id: "camp_skills",
    title: "Skills & Technology",
    description: "Equip young people with valuable digital skills.",
    raisedAmount: 18000,
    targetAmount: 30000,
    icon: "megaphone",
  },
];

export const INITIAL_MEMBER_DONATIONS: DonationRecord[] = [
  {
    id: "don_1",
    date: "05 Oct 2026",
    campaign: "Scholarship Support",
    transactionId: "TXN-839201",
    amount: 500,
    status: "Successful",
    donorName: "Issah Mohammed",
  },
  {
    id: "don_2",
    date: "20 Sep 2026",
    campaign: "Youth Mentorship",
    transactionId: "TXN-734802",
    amount: 300,
    status: "Successful",
    donorName: "Issah Mohammed",
  },
  {
    id: "don_3",
    date: "10 Sep 2026",
    campaign: "General Support",
    transactionId: "TXN-681492",
    amount: 1000,
    status: "Pending",
    donorName: "Issah Mohammed",
  },
  {
    id: "don_4",
    date: "02 Aug 2026",
    campaign: "Skills & Technology",
    transactionId: "TXN-610283",
    amount: 700,
    status: "Successful",
    donorName: "Issah Mohammed",
  },
];

export const INITIAL_ADMIN_DONATIONS: DonationRecord[] = [
  {
    id: "adon_1",
    date: "05 Oct 2026",
    campaign: "Scholarship Support",
    transactionId: "TXN-839201",
    amount: 500,
    status: "Successful",
    donorName: "Issah Mohammed",
  },
  {
    id: "adon_2",
    date: "20 Sep 2026",
    campaign: "Youth Mentorship",
    transactionId: "TXN-734802",
    amount: 300,
    status: "Successful",
    donorName: "Zainab Ibrahim",
  },
  {
    id: "adon_3",
    date: "10 Sep 2026",
    campaign: "General Support",
    transactionId: "TXN-681492",
    amount: 1000,
    status: "Pending",
    donorName: "Issah Mohammed",
  },
];

export const INITIAL_DUES_PAYMENTS: DuesPaymentRecord[] = [
  {
    id: "due_1",
    period: "July – September 2026",
    date: "02 Jul 2026",
    reference: "DUE-742901",
    amount: 150,
    status: "Successful",
  },
  {
    id: "due_2",
    period: "April – June 2026",
    date: "04 Apr 2026",
    reference: "DUE-621384",
    amount: 150,
    status: "Successful",
  },
  {
    id: "due_3",
    period: "January – March 2026",
    date: "08 Jan 2026",
    reference: "DUE-518207",
    amount: 150,
    status: "Successful",
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif_m_1",
    role: "member",
    title: "Quarterly dues reminder",
    message: "Your October – December 2026 dues (GH₵ 150) are due on 05 Oct.",
    timestamp: "10 mins ago",
    read: false,
    category: "dues",
    targetPath: "/dashboard/dues",
  },
  {
    id: "notif_m_2",
    role: "member",
    title: "Donation pending confirmation",
    message: "TXN-681492 (GH₵ 1,000 for General Support) is awaiting verification.",
    timestamp: "2 hours ago",
    read: false,
    category: "donation",
    targetPath: "/dashboard/history",
  },
  {
    id: "notif_m_3",
    role: "member",
    title: "Donation receipt confirmed",
    message: "Thank you! Your GH₵ 500 gift to Scholarship Support was confirmed.",
    timestamp: "Yesterday",
    read: true,
    category: "donation",
    targetPath: "/dashboard/history",
  },
  {
    id: "notif_a_1",
    role: "administrator",
    title: "12 pending donations in review",
    message: "GH₵ 3,450 across recent member contributions awaits confirmation.",
    timestamp: "15 mins ago",
    read: false,
    category: "donation",
    targetPath: "/admin/donations",
  },
  {
    id: "notif_a_2",
    role: "administrator",
    title: "18 new members this month",
    message: "Community membership reached 428 active members.",
    timestamp: "1 hour ago",
    read: false,
    category: "member",
    targetPath: "/admin/members",
  },
  {
    id: "notif_a_3",
    role: "administrator",
    title: "Scholarship Support reached 65%",
    message: "GH₵ 32,500 raised toward the GH₵ 50,000 campaign target.",
    timestamp: "Yesterday",
    read: true,
    category: "campaign",
    targetPath: "/admin/campaigns",
  },
];
