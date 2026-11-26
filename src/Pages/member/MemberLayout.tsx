import {
  CreditCard,
  Heart,
  History,
  Home,
  User,
} from "lucide-react";
import {
  DashboardShell,
  type DashboardNavItem,
} from "../../components/dashboard/DashboardShell";
import { useDashboardData } from "../../context/DashboardDataContext";

const MEMBER_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Overview", to: "/dashboard", icon: Home, end: true },
  { label: "Dues payment", to: "/dashboard/dues", icon: CreditCard },
  { label: "Make a donation", to: "/dashboard/donate", icon: Heart },
  { label: "Donation history", to: "/dashboard/history", icon: History },
  { label: "My profile", to: "/dashboard/profile", icon: User },
];

const MEMBER_BREADCRUMBS: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/dues": "Dues payment",
  "/dashboard/donate": "Make a donation",
  "/dashboard/history": "Donation history",
  "/dashboard/profile": "My profile",
};

export default function MemberLayout() {
  const { memberUser } = useDashboardData();

  return (
    <DashboardShell
      role="member"
      portalLabel="Member portal"
      sectionLabel="MEMBER PORTAL"
      navItems={MEMBER_NAV_ITEMS}
      currentUser={memberUser}
      breadcrumbMap={MEMBER_BREADCRUMBS}
    />
  );
}
