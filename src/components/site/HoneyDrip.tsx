/**
 * A dripping-honey edge. Place at the top of a section; `color` is the colour dripping down
 * (usually the background of the section above).
 */
export function HoneyDrip({ color = "#e8a317", className = "" }: { color?: string; className?: string }) {
  const drips = [
    { x: 80, h: 60, d: 0 },
    { x: 230, h: 95, d: 0.6 },
    { x: 410, h: 50, d: 1.4 },
    { x: 560, h: 110, d: 0.3 },
    { x: 740, h: 70, d: 1.0 },
    { x: 900, h: 120, d: 1.8 },
    { x: 1060, h: 55, d: 0.8 },
    { x: 1220, h: 90, d: 1.2 },
    { x: 1370, h: 65, d: 0.2 },
  ];
  return (
    <div className={`pointer-events-none relative h-0 w-full ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-20 w-full md:h-32">
        <path d="M0 0 H1440 V22 Q1400 30 1360 22 T1280 22 T1200 26 T1100 20 T1000 24 T900 20 T800 26 T700 20 T600 24 T500 20 T400 26 T300 20 T200 24 T100 20 T0 24 Z" fill={color} />
        {drips.map((d) => (
          <g key={d.x}>
            <path
              d={`M${d.x - 14} 18 Q${d.x - 12} ${d.h * 0.6} ${d.x - 8} ${d.h - 6} Q${d.x} ${d.h + 10} ${d.x + 8} ${d.h - 6} Q${d.x + 12} ${d.h * 0.6} ${d.x + 14} 18 Z`}
              fill={color}
              style={{ transformOrigin: `${d.x}px 18px`, animation: `drip 3.5s ${d.d}s ease-out both` }}
            />
            <circle
              cx={d.x}
              cy={d.h + 2}
              r="5"
              fill={color}
              style={{ animation: `drop-fall 4s ${d.d + 2}s ease-in infinite`, transformBox: "fill-box" }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
