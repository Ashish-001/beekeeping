import { useId } from "react";

type Props = { color?: string; label?: string; className?: string; level?: number };

/** Illustrated jar used for products without a photo. `level` is 0–1 fill height. */
export function HoneyJar({ color = "#E8A317", label = "Raw Honey", className, level = 0.78 }: Props) {
  const id = useId().replace(/:/g, "");
  const top = 70 + (1 - level) * 150;
  const short = label.length > 16 ? label.split(" ").slice(0, 2).join(" ") : label;

  return (
    <svg viewBox="0 0 200 260" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`h-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.85" />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <linearGradient id={`g-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.85" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.25" />
        </linearGradient>
        <clipPath id={`c-${id}`}>
          <path d="M40 70 Q30 70 30 90 L30 225 Q30 245 52 245 L148 245 Q170 245 170 225 L170 90 Q170 70 160 70 Z" />
        </clipPath>
      </defs>

      {/* shadow */}
      <ellipse cx="100" cy="250" rx="72" ry="7" fill="#2b1a0e" opacity="0.15" />

      {/* glass */}
      <path d="M40 70 Q30 70 30 90 L30 225 Q30 245 52 245 L148 245 Q170 245 170 225 L170 90 Q170 70 160 70 Z" fill="#fff" fillOpacity="0.35" stroke="#2b1a0e" strokeOpacity="0.15" strokeWidth="2" />

      {/* honey with gently moving surface */}
      <g clipPath={`url(#c-${id})`}>
        <rect x="20" y={top + 6} width="160" height="200" fill={`url(#h-${id})`} />
        <path fill={color} d={`M0 ${top + 8} Q25 ${top} 50 ${top + 8} T100 ${top + 8} T150 ${top + 8} T200 ${top + 8} T250 ${top + 8} V${top + 30} H0 Z`}>
          <animateTransform attributeName="transform" type="translate" values="0 0; -50 0; 0 0" dur="5s" repeatCount="indefinite" />
        </path>
        {/* bubbles */}
        <circle cx="70" cy="200" r="3" fill="#fff" opacity="0.4">
          <animate attributeName="cy" values="235;120" dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.5;0" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="128" cy="200" r="2" fill="#fff" opacity="0.4">
          <animate attributeName="cy" values="235;130" dur="8s" begin="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.5;0" dur="8s" begin="2s" repeatCount="indefinite" />
        </circle>
      </g>
      <path d="M40 70 Q30 70 30 90 L30 225 Q30 245 52 245 L148 245 Q170 245 170 225 L170 90 Q170 70 160 70 Z" fill={`url(#g-${id})`} />

      {/* lid with fabric */}
      <rect x="44" y="44" width="112" height="28" rx="6" fill="#8b4a12" />
      <path d="M36 52 Q100 30 164 52 L172 66 Q100 56 28 66 Z" fill="#fdecc8" stroke="#c9790a" strokeOpacity="0.5" />
      <path d="M30 66 Q100 54 170 66" stroke="#c9790a" strokeWidth="3" fill="none" />

      {/* label */}
      <g>
        <path d="M52 140 L148 140 L148 196 L52 196 Z" fill="#fff8ec" stroke="#2b1a0e" strokeOpacity="0.15" />
        <path d="M100 148 l10 6 v12 l-10 6 l-10 -6 v-12 z" fill="none" stroke="#c9790a" strokeWidth="2" />
        <text x="100" y="186" textAnchor="middle" fontFamily="var(--font-fraunces), serif" fontSize="12" fontWeight="600" fill="#2b1a0e">
          {short}
        </text>
      </g>
    </svg>
  );
}
