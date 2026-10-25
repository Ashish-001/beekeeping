import { useId } from "react";

type Props = { className?: string; style?: React.CSSProperties };

/** A friendly little bee. Wings flap with CSS so it costs nothing to animate. */
export function Bee({ className, style }: Props) {
  const clip = `bee-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 64 52" className={className} style={style} aria-hidden="true">
      {/* wings */}
      <g style={{ transformOrigin: "30px 20px" }} className="animate-wing">
        <ellipse cx="24" cy="12" rx="10" ry="14" fill="#ffffff" fillOpacity="0.75" stroke="#2b1a0e" strokeOpacity="0.25" transform="rotate(-25 24 12)" />
      </g>
      <g style={{ transformOrigin: "34px 20px", animationDelay: "0.06s" }} className="animate-wing">
        <ellipse cx="38" cy="11" rx="9" ry="13" fill="#ffffff" fillOpacity="0.65" stroke="#2b1a0e" strokeOpacity="0.25" transform="rotate(20 38 11)" />
      </g>
      {/* stinger */}
      <path d="M8 31 L1 33 L8 35 Z" fill="#2b1a0e" />
      {/* body */}
      <ellipse cx="30" cy="33" rx="22" ry="14" fill="#f6c453" />
      <clipPath id={clip}>
        <ellipse cx="30" cy="33" rx="22" ry="14" />
      </clipPath>
      <g clipPath={`url(#${clip})`} fill="#2b1a0e">
        <rect x="14" y="17" width="6" height="32" rx="2" />
        <rect x="25" y="17" width="6" height="32" rx="2" />
        <rect x="36" y="17" width="5" height="32" rx="2" />
      </g>
      {/* head */}
      <circle cx="51" cy="30" r="9" fill="#2b1a0e" />
      <circle cx="54" cy="28" r="2.6" fill="#fff" />
      <circle cx="54.6" cy="28.2" r="1.3" fill="#2b1a0e" />
      <path d="M50 22 Q52 14 57 13" stroke="#2b1a0e" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M53 22 Q57 16 62 17" stroke="#2b1a0e" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <circle cx="57" cy="13" r="1.6" fill="#2b1a0e" />
      <circle cx="62" cy="17" r="1.6" fill="#2b1a0e" />
      {/* shine */}
      <ellipse cx="26" cy="25" rx="8" ry="2.4" fill="#fff" fillOpacity="0.45" />
    </svg>
  );
}
