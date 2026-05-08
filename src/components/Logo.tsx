import clsx from "clsx";

type Props = {
  className?: string;
  showWordmark?: boolean;
};

export function Logo({ className, showWordmark = true }: Props) {
  return (
    <div className={clsx("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 48 48"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="emerald-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        {/* Sun rays */}
        <g stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round">
          <line x1="24" y1="3" x2="24" y2="8" />
          <line x1="24" y1="40" x2="24" y2="45" />
          <line x1="3" y1="24" x2="8" y2="24" />
          <line x1="40" y1="24" x2="45" y2="24" />
          <line x1="9" y1="9" x2="12.5" y2="12.5" />
          <line x1="35.5" y1="35.5" x2="39" y2="39" />
          <line x1="9" y1="39" x2="12.5" y2="35.5" />
          <line x1="35.5" y1="12.5" x2="39" y2="9" />
        </g>
        {/* Solar panel disc */}
        <circle cx="24" cy="24" r="13" fill="url(#emerald-grad)" />
        <g stroke="#ecfdf5" strokeWidth="0.9" opacity="0.85">
          <line x1="11" y1="20" x2="37" y2="20" />
          <line x1="11" y1="24" x2="37" y2="24" />
          <line x1="11" y1="28" x2="37" y2="28" />
          <line x1="18" y1="11.5" x2="18" y2="36.5" />
          <line x1="24" y1="11" x2="24" y2="37" />
          <line x1="30" y1="11.5" x2="30" y2="36.5" />
        </g>
      </svg>
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-emerald-800 leading-none">
          Emerald<span className="text-sun-500">True</span>Energy
        </span>
      )}
    </div>
  );
}
