export function formatGhc(amount: number, spaced = true): string {
  const formatted = new Intl.NumberFormat("en-US").format(amount);
  return spaced ? `GH₵ ${formatted}` : `GH₵${formatted}`;
}

export function getInitials(firstName?: string, lastName?: string): string {
  const a = (firstName || "").trim()[0] || "";
  const b = (lastName || "").trim()[0] || "";
  return (a + b || "NC").toUpperCase();
}

export function getPercentage(raised: number, target: number): number {
  if (!target || target <= 0) return 0;
  return Math.min(100, Math.round((raised / target) * 100));
}
