import { useId, useState } from "react";
import { formatGhc } from "../../lib/format";
import type { ContributionPoint } from "../../types/dashboard";

interface ContributionAreaChartProps {
  data: ContributionPoint[];
  yTicks?: number[];
}

function buildSmoothPath(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return path;
}

export function ContributionAreaChart({
  data,
  yTicks = [0, 250, 500, 750, 1000],
}: ContributionAreaChartProps) {
  const gradientId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data.length) {
    return (
      <div className="flex h-48 items-center justify-center text-xs text-[#7B8782]">
        No contribution data available yet.
      </div>
    );
  }

  const width = 560;
  const height = 210;
  const padLeft = 44;
  const padRight = 18;
  const padTop = 16;
  const padBottom = 28;

  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;
  const maxY = Math.max(
    yTicks[yTicks.length - 1] || 1000,
    ...data.map((d) => d.amount)
  );

  const coords = data.map((point, index) => {
    const x =
      data.length === 1
        ? padLeft + plotWidth / 2
        : padLeft + (index / (data.length - 1)) * plotWidth;
    const ratio = Math.min(1, Math.max(0, point.amount / maxY));
    const y = padTop + plotHeight - ratio * plotHeight;
    return { ...point, x, y };
  });

  const linePath = buildSmoothPath(coords);
  const first = coords[0];
  const last = coords[coords.length - 1];
  const baselineY = padTop + plotHeight;
  const areaPath = `${linePath} L ${last.x.toFixed(2)} ${baselineY.toFixed(2)} L ${first.x.toFixed(2)} ${baselineY.toFixed(2)} Z`;

  const hovered = hoveredIndex !== null ? coords[hoveredIndex] : null;

  return (
    <div className="relative w-full select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Contributions over the last 6 months"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EB6E44" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#EB6E44" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {yTicks.map((tick) => {
          const y = padTop + plotHeight - (tick / maxY) * plotHeight;
          return (
            <g key={tick}>
              <line
                x1={padLeft}
                y1={y}
                x2={width - padRight}
                y2={y}
                stroke="#EEF2F0"
                strokeWidth="1"
              />
              <text
                x={padLeft - 10}
                y={y + 3.5}
                textAnchor="end"
                className="fill-[#9AA5A0] text-[10px]"
              >
                {new Intl.NumberFormat("en-US").format(tick)}
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path
          d={linePath}
          fill="none"
          stroke="#E86D43"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {hovered && (
          <g>
            <line
              x1={hovered.x}
              y1={padTop}
              x2={hovered.x}
              y2={baselineY}
              stroke="#E86D43"
              strokeOpacity="0.25"
              strokeDasharray="3 3"
            />
            <circle
              cx={hovered.x}
              cy={hovered.y}
              r="5"
              fill="#FFFFFF"
              stroke="#E86D43"
              strokeWidth="2.5"
            />
          </g>
        )}

        {coords.map((pt, index) => (
          <g key={pt.month}>
            <text
              x={pt.x}
              y={height - 6}
              textAnchor="middle"
              className={`text-[10px] ${
                hoveredIndex === index
                  ? "fill-[#144533] font-semibold"
                  : "fill-[#9AA5A0]"
              }`}
            >
              {pt.month}
            </text>
            <rect
              x={pt.x - plotWidth / Math.max(coords.length * 2, 2)}
              y={padTop}
              width={plotWidth / Math.max(coords.length, 1)}
              height={plotHeight + 20}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          </g>
        ))}
      </svg>

      {hovered && (
        <div
          className="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 rounded-lg border border-[#E6ECE9] bg-white px-2.5 py-1.5 text-[11px] shadow-md"
          style={{ left: `${(hovered.x / width) * 100}%` }}
        >
          <span className="font-semibold text-[#182B23]">{hovered.month}: </span>
          <span className="font-semibold text-[#E86D43]">
            {formatGhc(hovered.amount)}
          </span>
        </div>
      )}
    </div>
  );
}
