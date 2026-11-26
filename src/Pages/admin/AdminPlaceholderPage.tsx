import { Link } from "react-router-dom";
import { ArrowLeft, LayoutGrid } from "lucide-react";

interface AdminPlaceholderPageProps {
  title: string;
  eyebrow: string;
  description: string;
}

export default function AdminPlaceholderPage({
  title,
  eyebrow,
  description,
}: AdminPlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-['Manrope'] text-[11px] font-bold uppercase tracking-[0.08em] text-[#E06B43]">
          {eyebrow}
        </p>
        <h1 className="mt-1 font-['Manrope'] text-2xl font-bold tracking-tight text-[#142820] sm:text-[28px]">
          {title}
        </h1>
        <p className="mt-1 text-[13px] text-[#6E7C76]">{description}</p>
      </div>

      <div className="rounded-xl border border-dashed border-[#D3DCD8] bg-white px-6 py-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF4F0] text-[#144533]">
          <LayoutGrid className="h-5 w-5" />
        </div>
        <h2 className="mt-4 font-['Manrope'] text-base font-bold text-[#142820]">
          {title} view ready for design
        </h2>
        <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-[#7D8A85]">
          Share the design screenshot for this page whenever you're ready, and
          we'll build out the full interface and connect it to your backend
          endpoints.
        </p>

        <Link
          to="/admin"
          className="mt-6 inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#144533] px-4 font-['Manrope'] text-xs font-bold text-white transition hover:bg-[#1B5842]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Admin Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
