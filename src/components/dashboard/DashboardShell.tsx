import { useState, type ComponentType } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import type { AuthUser, UserRole } from "../../types/dashboard";
import { NafiuLogo } from "./NafiuLogo";
import { NotificationBell } from "./NotificationBell";

export interface DashboardNavItem {
  label: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
  end?: boolean;
}

interface DashboardShellProps {
  role: UserRole;
  portalLabel: string;
  sectionLabel: string;
  navItems: DashboardNavItem[];
  currentUser: AuthUser;
  breadcrumbMap: Record<string, string>;
}

export function DashboardShell({
  role,
  portalLabel,
  sectionLabel,
  navItems,
  currentUser,
  breadcrumbMap,
}: DashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const currentPageTitle =
    breadcrumbMap[location.pathname] ||
    navItems.find((item) => item.to === location.pathname)?.label ||
    "Overview";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-[#144533] px-3 py-5 text-white">
      <div>
        <div className="flex items-center justify-between px-2 pb-6">
          <NafiuLogo />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="px-3 pb-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">
          {sectionLabel}
        </p>

        <nav className="space-y-1" aria-label={portalLabel}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${
                    isActive
                      ? "bg-white/14 text-white"
                      : "text-white/75 hover:bg-white/8 hover:text-white"
                  }`
                }
              >
                <Icon className="h-[17px] w-[17px] shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3 pt-4">
        {role === "member" && (
          <div className="flex items-center gap-3 rounded-xl bg-white/8 px-3 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3D3C1] font-['Manrope'] text-xs font-bold text-[#144533]">
              {currentUser.avatarInitials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-white">
                {currentUser.fullName}
              </p>
              <p className="truncate text-[10px] text-white/60">
                {currentUser.memberId || "Member"}
              </p>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-white/75 transition hover:bg-white/8 hover:text-white"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F7F9F8] text-[#172B22]">
      {/* Desktop sidebar */}
      <aside className="hidden w-[228px] shrink-0 lg:sticky lg:top-0 lg:block lg:h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative z-10 h-full w-[240px] shrink-0">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#EAECEB] bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="rounded-lg p-1.5 text-[#31423B] hover:bg-[#F2F5F3] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 text-xs text-[#7D8A85]">
              <span>{portalLabel}</span>
              <span className="text-[#BCC5C1]">/</span>
              <span className="font-medium text-[#3A4A43]">
                {currentPageTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <NotificationBell role={role} />

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3D3C1] font-['Manrope'] text-xs font-bold text-[#144533]">
              {currentUser.avatarInitials}
            </div>

            {role === "member" ? (
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-medium text-[#31423B] transition hover:text-[#E86D43]"
              >
                Sign out
              </button>
            ) : (
              <span className="hidden text-xs font-medium text-[#31423B] sm:inline">
                {currentUser.fullName}
              </span>
            )}
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1140px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
