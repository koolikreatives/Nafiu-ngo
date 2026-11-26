import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CalendarClock,
  CheckCheck,
  HeartHandshake,
  Info,
  Megaphone,
  Users,
  X,
} from "lucide-react";
import { useDashboardData } from "../../context/DashboardDataContext";
import type { NotificationCategory, UserRole } from "../../types/dashboard";

function CategoryIcon({ category }: { category: NotificationCategory }) {
  const iconClass = "h-4 w-4";
  switch (category) {
    case "donation":
      return <HeartHandshake className={`${iconClass} text-[#E86D43]`} />;
    case "dues":
      return <CalendarClock className={`${iconClass} text-[#144533]`} />;
    case "campaign":
      return <Megaphone className={`${iconClass} text-[#E86D43]`} />;
    case "member":
      return <Users className={`${iconClass} text-[#144533]`} />;
    default:
      return <Info className={`${iconClass} text-[#5D6D66]`} />;
  }
}

export function NotificationBell({ role }: { role: UserRole }) {
  const navigate = useNavigate();
  const {
    getNotificationsForRole,
    getUnreadCountForRole,
    markNotificationRead,
    markAllNotificationsRead,
    dismissNotification,
  } = useDashboardData();

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const items = getNotificationsForRole(role);
  const unreadCount = getUnreadCountForRole(role);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`Notifications (${unreadCount} unread)`}
        aria-expanded={open}
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#31423B] transition hover:bg-[#F2F5F3]"
      >
        <Bell className="h-[18px] w-[18px]" strokeWidth={1.9} />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E86D43] px-1 text-[10px] font-bold leading-none text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-[330px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-[#E6ECE9] bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-[#EEF2F0] px-4 py-3">
            <div className="flex items-center gap-2">
              <h3 className="font-['Manrope'] text-sm font-bold text-[#142820]">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="rounded-full bg-[#FCECE6] px-2 py-0.5 text-[11px] font-semibold text-[#D65B33]">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => markAllNotificationsRead(role)}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#144533] transition hover:text-[#E86D43]"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[340px] divide-y divide-[#F1F4F2] overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell className="mx-auto mb-2 h-6 w-6 text-[#B5C0BB]" />
                <p className="text-xs font-medium text-[#4F5E58]">
                  You're all caught up
                </p>
                <p className="mt-0.5 text-[11px] text-[#88948F]">
                  New updates and payment alerts will appear here.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className={`group flex items-start gap-3 px-4 py-3 transition ${
                    item.read ? "bg-white hover:bg-[#F9FBFA]" : "bg-[#F4F9F6] hover:bg-[#ECF4EF]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      markNotificationRead(item.id);
                      if (item.targetPath) {
                        setOpen(false);
                        navigate(item.targetPath);
                      }
                    }}
                    className="flex min-w-0 flex-1 items-start gap-3 text-left"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4F6F5]">
                      <CategoryIcon category={item.category} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        {!item.read && (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-[#E86D43]" />
                        )}
                        <p className="truncate text-xs font-semibold text-[#182B23]">
                          {item.title}
                        </p>
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-[#5E6E67]">
                        {item.message}
                      </p>
                      <p className="mt-1 text-[10px] text-[#8F9B96]">
                        {item.timestamp}
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => dismissNotification(item.id)}
                    aria-label="Dismiss notification"
                    className="mt-0.5 rounded p-1 text-[#9AA5A0] opacity-70 transition hover:bg-[#EBF0ED] hover:text-[#182B23] group-hover:opacity-100"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
