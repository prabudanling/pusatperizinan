import { SEAL_SIZES, type Institution, type SealSize } from "@/lib/institutions";

/**
 * Seal SVG monogram instansi pemerintah — server-safe (tanpa client JS).
 * Desain: cincin ganda + monogram inisial putih di atas warna brand instansi.
 * Bukan logo resmi; identifikasi visual kanal yang kami urus.
 */
export function InstitutionSeal({
  inst,
  size = "md",
}: {
  inst: Institution;
  size?: SealSize;
}) {
  const px = SEAL_SIZES[size];
  const half = px / 2;
  const chars = inst.initials.length;
  const fontSize = chars <= 3 ? Math.round(px * 0.32) : Math.round(px * 0.2);
  const id = `seal-${inst.id}-${size}`;

  return (
    <svg
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      role="img"
      aria-label={`Seal ${inst.fullName}`}
      className="shrink-0"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={inst.color} stopOpacity="1" />
          <stop offset="100%" stopColor={inst.color} stopOpacity="0.78" />
        </linearGradient>
      </defs>
      {/* cincin luar */}
      <circle cx={half} cy={half} r={half - 1} fill="none" stroke={inst.color} strokeWidth="1.5" />
      {/* badan seal */}
      <circle cx={half} cy={half} r={half - 4} fill={`url(#${id})`} />
      {/* titik-titik bintik dekoratif (gaya cap instansi) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 8;
        const rr = half - 7.5;
        const cx = half + rr * Math.cos(angle);
        const cy = half + rr * Math.sin(angle);
        return <circle key={i} cx={cx} cy={cy} r="1" fill="#ffffff" opacity="0.55" />;
      })}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
        fontWeight="800"
        fontSize={fontSize}
        letterSpacing={chars > 3 ? "0.5" : "1"}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        {inst.initials}
      </text>
    </svg>
  );
}

/** Seal + nama instansi (untuk grid direktori) */
export function InstitutionBadge({
  inst,
  size = "md",
  showName = true,
}: {
  inst: Institution;
  size?: SealSize;
  showName?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <InstitutionSeal inst={inst} size={size} />
      {showName && (
        <div className="min-w-0">
          <p className="truncate text-sm font-bold leading-tight">{inst.name}</p>
          <p className="truncate text-xs text-muted-foreground">{inst.role}</p>
        </div>
      )}
    </div>
  );
}
