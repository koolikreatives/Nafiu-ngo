import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
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
  MOCK_ADMIN_USER,
  MOCK_MEMBER_USER,
} from "../data/mockData";
import { formatGhc } from "../lib/format";
import {
  changeMemberPassword,
  createCampaign,
  fetchAdminDashboard,
  fetchMemberDashboard,
  fetchNotifications,
  submitDonation,
  submitDuesPayment,
  updateMemberProfile,
} from "../services/dashboardService";
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
  NotificationCategory,
  NotificationItem,
  UpdateProfilePayload,
  UserRole,
} from "../types/dashboard";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

interface DashboardDataContextValue {
  loading: boolean;
  memberUser: AuthUser;
  adminUser: AuthUser;
  memberSummary: MemberSummary;
  adminSummary: AdminSummary;
  memberContributions: ContributionPoint[];
  adminContributions: ContributionPoint[];
  memberDonations: DonationRecord[];
  adminDonations: DonationRecord[];
  duesPayments: DuesPaymentRecord[];
  campaigns: CampaignItem[];
  getNotificationsForRole: (role: UserRole) => NotificationItem[];
  getUnreadCountForRole: (role: UserRole) => number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (role: UserRole) => void;
  dismissNotification: (id: string) => void;
  pushNotification: (input: {
    role: UserRole | "all";
    title: string;
    message: string;
    category: NotificationCategory;
    targetPath?: string;
  }) => void;
  payDues: (payload: CreateDuesPaymentPayload) => Promise<DuesPaymentRecord>;
  makeDonation: (payload: CreateDonationPayload) => Promise<DonationRecord>;
  editProfile: (payload: UpdateProfilePayload) => Promise<AuthUser>;
  changePassword: (payload: ChangePasswordPayload) => Promise<string>;
  addCampaign: (payload: CreateCampaignPayload) => Promise<CampaignItem>;
}

const DashboardDataContext = createContext<
  DashboardDataContextValue | undefined
>(undefined);

export function DashboardDataProvider({ children }: { children: ReactNode }) {
  const { user, updateCurrentUser } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const [memberSummary, setMemberSummary] = useState<MemberSummary>(
    INITIAL_MEMBER_SUMMARY
  );
  const [adminSummary, setAdminSummary] = useState<AdminSummary>(
    INITIAL_ADMIN_SUMMARY
  );
  const [memberContributions, setMemberContributions] = useState<
    ContributionPoint[]
  >(INITIAL_MEMBER_CONTRIBUTIONS);
  const [adminContributions, setAdminContributions] = useState<
    ContributionPoint[]
  >(INITIAL_ADMIN_CONTRIBUTIONS);
  const [memberDonations, setMemberDonations] = useState<DonationRecord[]>(
    INITIAL_MEMBER_DONATIONS
  );
  const [adminDonations, setAdminDonations] = useState<DonationRecord[]>(
    INITIAL_ADMIN_DONATIONS
  );
  const [duesPayments, setDuesPayments] = useState<DuesPaymentRecord[]>(
    INITIAL_DUES_PAYMENTS
  );
  const [campaigns, setCampaigns] =
    useState<CampaignItem[]>(INITIAL_CAMPAIGNS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  );

  useEffect(() => {
    let active = true;
    async function loadInitialData() {
      try {
        const [memberData, adminData, memberNotifs, adminNotifs] =
          await Promise.all([
            fetchMemberDashboard(),
            fetchAdminDashboard(),
            fetchNotifications("member"),
            fetchNotifications("administrator"),
          ]);
        if (!active) return;
        setMemberSummary(memberData.summary);
        setMemberContributions(memberData.contributions);
        setMemberDonations(memberData.donations);
        setDuesPayments(memberData.duesPayments);
        setCampaigns(memberData.campaigns);

        setAdminSummary(adminData.summary);
        setAdminContributions(adminData.contributions);
        setAdminDonations(adminData.donations);

        const combined = [...memberNotifs, ...adminNotifs].filter(
          (item, index, arr) =>
            arr.findIndex((other) => other.id === item.id) === index
        );
        setNotifications(combined);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadInitialData();
    return () => {
      active = false;
    };
  }, []);

  const memberUser: AuthUser =
    user?.role === "member" ? user : MOCK_MEMBER_USER;
  const adminUser: AuthUser =
    user?.role === "administrator" ? user : MOCK_ADMIN_USER;

  const getNotificationsForRole = (role: UserRole) =>
    notifications.filter((n) => n.role === role || n.role === "all");

  const getUnreadCountForRole = (role: UserRole) =>
    getNotificationsForRole(role).filter((n) => !n.read).length;

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const markAllNotificationsRead = (role: UserRole) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.role === role || item.role === "all"
          ? { ...item, read: true }
          : item
      )
    );
    toast.info("Notifications cleared", "All notifications marked as read.");
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const pushNotification: DashboardDataContextValue["pushNotification"] = ({
    role,
    title,
    message,
    category,
    targetPath,
  }) => {
    const newItem: NotificationItem = {
      id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      role,
      title,
      message,
      timestamp: "Just now",
      read: false,
      category,
      targetPath,
    };
    setNotifications((prev) => [newItem, ...prev]);
  };

  const payDues = async (
    payload: CreateDuesPaymentPayload
  ): Promise<DuesPaymentRecord> => {
    const result = await submitDuesPayment({
      ...payload,
      memberEmail: payload.memberEmail || memberUser.email,
      memberId: payload.memberId || memberUser.memberId,
    });

    if (result.authorizationUrl) {
      toast.info("Redirecting to payment checkout...");
      window.location.assign(result.authorizationUrl);
      return result.record;
    }

    const created = result.record;
    setDuesPayments((prev) => [created, ...prev]);
    setMemberSummary((prev) => ({
      ...prev,
      totalDuesPaidYear: prev.totalDuesPaidYear + created.amount,
      quarterlyPaymentsCount: prev.quarterlyPaymentsCount + 1,
    }));

    pushNotification({
      role: "member",
      title: "Dues payment confirmed",
      message: `${formatGhc(created.amount)} paid for ${created.period} (${created.reference}).`,
      category: "dues",
      targetPath: "/dashboard/dues",
    });

    pushNotification({
      role: "administrator",
      title: "Member dues received",
      message: `${memberUser.fullName} paid ${formatGhc(created.amount)} for ${created.period}.`,
      category: "dues",
      targetPath: "/admin/donations",
    });

    toast.success(
      "Dues payment confirmed",
      `${formatGhc(created.amount)} paid for ${created.period}.`
    );

    return created;
  };

  const makeDonation = async (
    payload: CreateDonationPayload
  ): Promise<DonationRecord> => {
    const result = await submitDonation(
      {
        ...payload,
        donorEmail: payload.donorEmail || memberUser.email,
      },
      memberUser.fullName
    );

    if (result.authorizationUrl) {
      toast.info("Redirecting to payment checkout...");
      window.location.assign(result.authorizationUrl);
      return result.record;
    }

    const created = result.record;
    setMemberDonations((prev) => [created, ...prev]);
    setAdminDonations((prev) => [created, ...prev]);

    setMemberSummary((prev) => ({
      ...prev,
      totalDonated: prev.totalDonated + created.amount,
      donatedThisMonth: prev.donatedThisMonth + created.amount,
    }));

    setAdminSummary((prev) => ({
      ...prev,
      totalDonations: prev.totalDonations + created.amount,
      successfulCount: prev.successfulCount + 1,
      raisedThisMonth: prev.raisedThisMonth + created.amount,
    }));

    setCampaigns((prev) =>
      prev.map((camp) =>
        camp.id === payload.campaignId
          ? { ...camp, raisedAmount: camp.raisedAmount + created.amount }
          : camp
      )
    );

    setMemberContributions((prev) =>
      prev.map((point, idx) =>
        idx === prev.length - 1
          ? { ...point, amount: point.amount + Math.min(created.amount, 200) }
          : point
      )
    );

    pushNotification({
      role: "member",
      title: "Donation confirmed",
      message: `Your ${formatGhc(created.amount)} gift to ${created.campaign} (${created.transactionId}) is confirmed.`,
      category: "donation",
      targetPath: "/dashboard/history",
    });

    pushNotification({
      role: "administrator",
      title: "New donation received",
      message: `${memberUser.fullName} donated ${formatGhc(created.amount)} to ${created.campaign}.`,
      category: "donation",
      targetPath: "/admin/donations",
    });

    toast.success(
      "Donation confirmed",
      `Thank you! ${formatGhc(created.amount)} sent to ${created.campaign}.`
    );

    return created;
  };

  const editProfile = async (
    payload: UpdateProfilePayload
  ): Promise<AuthUser> => {
    const updated = await updateMemberProfile(memberUser, payload);
    if (user?.role === "member") {
      updateCurrentUser(updated);
    }
    pushNotification({
      role: "member",
      title: "Profile updated",
      message: "Your personal contact details have been saved.",
      category: "system",
      targetPath: "/dashboard/profile",
    });
    toast.success("Profile updated", "Your contact details have been saved.");
    return updated;
  };

  const changePassword = async (
    payload: ChangePasswordPayload
  ): Promise<string> => {
    const res = await changeMemberPassword(payload);
    if (user?.role === "member") {
      updateCurrentUser({
        ...user,
        passwordLastUpdated: "Last updated just now",
      });
    }
    pushNotification({
      role: "member",
      title: "Password updated",
      message: "Your account password was changed successfully.",
      category: "system",
      targetPath: "/dashboard/profile",
    });
    toast.success("Password updated", "Your security settings are up to date.");
    return res.message;
  };

  const addCampaign = async (
    payload: CreateCampaignPayload
  ): Promise<CampaignItem> => {
    const created = await createCampaign(payload);
    setCampaigns((prev) => [created, ...prev]);

    pushNotification({
      role: "administrator",
      title: "Campaign created",
      message: `"${created.title}" is now active with a target of ${formatGhc(created.targetAmount)}.`,
      category: "campaign",
      targetPath: "/admin/campaigns",
    });

    pushNotification({
      role: "member",
      title: "New community campaign",
      message: `Support "${created.title}" — target ${formatGhc(created.targetAmount)}.`,
      category: "campaign",
      targetPath: "/dashboard/donate",
    });

    toast.success(
      "Campaign created",
      `"${created.title}" is now live with a ${formatGhc(created.targetAmount)} target.`
    );

    return created;
  };

  const value = useMemo<DashboardDataContextValue>(
    () => ({
      loading,
      memberUser,
      adminUser,
      memberSummary,
      adminSummary,
      memberContributions,
      adminContributions,
      memberDonations,
      adminDonations,
      duesPayments,
      campaigns,
      getNotificationsForRole,
      getUnreadCountForRole,
      markNotificationRead,
      markAllNotificationsRead,
      dismissNotification,
      pushNotification,
      payDues,
      makeDonation,
      editProfile,
      changePassword,
      addCampaign,
    }),
    [
      loading,
      memberUser,
      adminUser,
      memberSummary,
      adminSummary,
      memberContributions,
      adminContributions,
      memberDonations,
      adminDonations,
      duesPayments,
      campaigns,
      notifications,
    ]
  );

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
}

export function useDashboardData(): DashboardDataContextValue {
  const ctx = useContext(DashboardDataContext);
  if (!ctx) {
    throw new Error(
      "useDashboardData must be used inside a DashboardDataProvider"
    );
  }
  return ctx;
}
