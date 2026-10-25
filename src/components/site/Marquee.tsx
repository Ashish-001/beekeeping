const ITEMS = ["Raw & Unheated", "Wildflower", "Ethically Harvested", "Honeycomb", "Small Batch", "Bee Pollen", "Pure Beeswax", "Lab Tested", "Propolis"];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative z-10 overflow-hidden bg-honey py-5 text-bark">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-medium italic md:text-3xl">
            {item}
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-bark/70" aria-hidden="true">
              <path d="M12 1l9.5 5.5v11L12 23l-9.5-5.5v-11z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
