import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useToast, type ToastVariant } from "../../context/ToastContext";

function ToastIcon({ variant }: { variant: ToastVariant }) {
  switch (variant) {
    case "success":
      return <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1B7A4E]" />;
    case "error":
      return <XCircle className="h-4 w-4 shrink-0 text-[#C83B3B]" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 shrink-0 text-[#B3741A]" />;
    default:
      return <Info className="h-4 w-4 shrink-0 text-[#144533]" />;
  }
}

const ACCENT_BORDER: Record<ToastVariant, string> = {
  success: "border-l-[#1B7A4E]",
  error: "border-l-[#C83B3B]",
  warning: "border-l-[#E86D43]",
  info: "border-l-[#144533]",
};

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[340px] max-w-[calc(100vw-2rem)] flex-col gap-2.5"
    >
      {toasts.map((item) => (
        <div
          key={item.id}
          role="status"
          className={`pointer-events-auto flex items-start gap-3 rounded-xl border border-[#E4EAE7] border-l-4 ${ACCENT_BORDER[item.variant]} bg-white p-3.5 shadow-lg transition-all`}
        >
          <div className="mt-0.5">
            <ToastIcon variant={item.variant} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-['Manrope'] text-xs font-bold text-[#142820]">
              {item.title}
            </p>
            {item.description && (
              <p className="mt-0.5 text-[11px] leading-relaxed text-[#5E6E67]">
                {item.description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => dismissToast(item.id)}
            aria-label="Dismiss toast"
            className="rounded p-1 text-[#9AA5A0] transition hover:bg-[#F2F5F3] hover:text-[#182B23]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
