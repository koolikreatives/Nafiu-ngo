import {
  CreditCard,
  Heart,
  History,
  Home,
  Settings,
  Users,
} from "lucide-react";
import {
  DashboardShell,
  type DashboardNavItem,
} from "../../components/dashboard/DashboardShell";
import { useDashboardData } from "../../context/DashboardDataContext";

const ADMIN_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Dashboard", to: "/admin", icon: Home, end: true },
  { label: "Members", to: "/admin/members", icon: Users },
  { label: "Donations", to: "/admin/donations", icon: Heart },
  { label: "Campaigns", to: "/admin/campaigns", icon: CreditCard },
  { label: "Reports", to: "/admin/reports", icon: History },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

const ADMIN_BREADCRUMBS: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/members": "Members",
  "/admin/donations": "Donations",
  "/admin/campaigns": "Campaigns",
  "/admin/reports": "Reports",
  "/admin/settings": "Settings",
};

export default function AdminLayout() {
  const { adminUser } = useDashboardData();

  return (
    <DashboardShell
      role="administrator"
      portalLabel="Admin workspace"
      sectionLabel="ADMIN WORKSPACE"
      navItems={ADMIN_NAV_ITEMS}
      currentUser={adminUser}
      breadcrumbMap={ADMIN_BREADCRUMBS}
    />
  );
}
