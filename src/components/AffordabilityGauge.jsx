// Financial Comfort Gauge — upper semicircle (speedometer style)

// ── Score calculation ─────────────────────────────────────────────────────────
function computeScore(takeHome, housing, car, budget) {
  const net = takeHome.netMonthly;
  if (net <= 0) return 50;

  const housingCost = housing.scenarios[1].maxMonthlyHousing;
  const carCost     = car.scenarios[1].totalMonthly;
  const essential   = housingCost + carCost + budget.food + budget.utilities + budget.healthIns;
  const ratio       = essential / net;

  // free_pct ≥ 0.23 → 100 (excellent), free_pct ≤ 0.03 → 0 (very tight)
  // equivalently: ratio ≤ 0.77 → 100, ratio ≥ 0.97 → 0
  return Math.round(Math.max(0, Math.min(100, ((0.97 - ratio) / 0.20) * 100)));
}

function getLabel(score) {
  if (score >= 80) return { text: 'Excellent',   color: '#10b981' };
  if (score >= 60) return { text: 'Comfortable', color: '#3b82f6' };
  if (score >= 40) return { text: 'Manageable',  color: '#f59e0b' };
  if (score >= 20) return { text: 'Tight',       color: '#f97316' };
  return             { text: 'Very Tight',   color: '#ef4444' };
}

// ── SVG helpers ───────────────────────────────────────────────────────────────
const toRad = (d) => (d * Math.PI) / 180;

function arcPath(cx, cy, r, fromDeg, toDeg) {
  const x1 = cx + r * Math.cos(toRad(fromDeg));
  const y1 = cy + r * Math.sin(toRad(fromDeg));
  const x2 = cx + r * Math.cos(toRad(toDeg));
  const y2 = cy + r * Math.sin(toRad(toDeg));
  const span = toDeg - fromDeg;
  if (span <= 0) return '';
  const large = span >= 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

// Score → SVG angle: 0→180°, 50→270°, 100→360°
const scoreToAngle = (s) => 180 + (s / 100) * 180;

const SEGMENTS = [
  { from: 180, to: 216, color: '#ef4444' },
  { from: 216, to: 252, color: '#f97316' },
  { from: 252, to: 288, color: '#f59e0b' },
  { from: 288, to: 324, color: '#3b82f6' },
  { from: 324, to: 360, color: '#10b981' },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function AffordabilityGauge({ takeHome, housing, car, budget }) {
  const score = computeScore(takeHome, housing, car, budget);
  const { text, color } = getLabel(score);

  const cx = 100, cy = 92, r = 68;
  const STROKE = 14;
  const NEEDLE  = 54;

  const needleDeg = scoreToAngle(score);
  const needleRad = toRad(needleDeg);
  const nx = cx + NEEDLE * Math.cos(needleRad);
  const ny = cy + NEEDLE * Math.sin(needleRad);

  const activePath = score > 0 ? arcPath(cx, cy, r, 180, needleDeg) : '';

  return (
    <div className="card flex flex-col">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Financial Comfort Score</h3>
      <p className="text-xs text-slate-400 mb-3">Room in your budget after essentials</p>

      <div className="flex flex-col items-center flex-1 justify-center">
        {/* SVG contains only the arc — no text overlapping the needle */}
        <div className="relative w-full max-w-[260px]">
          <svg viewBox="0 0 200 102" className="w-full">
            {/* Background track */}
            <path
              d={arcPath(cx, cy, r, 180, 360)}
              fill="none" stroke="#f1f5f9" strokeWidth={STROKE} strokeLinecap="round"
            />

            {/* Dim color segments */}
            {SEGMENTS.map((seg, i) => (
              <path
                key={i}
                d={arcPath(cx, cy, r, seg.from, seg.to)}
                fill="none" stroke={seg.color} strokeWidth={STROKE}
                strokeLinecap="butt" opacity="0.18"
              />
            ))}

            {/* Active fill */}
            {activePath && (
              <path
                d={activePath}
                fill="none" stroke={color} strokeWidth={STROKE} strokeLinecap="round"
              />
            )}

            {/* Tick marks */}
            {[216, 252, 288, 324].map((deg) => {
              const inner = r - STROKE / 2 - 2;
              const outer = r + STROKE / 2 + 2;
              return (
                <line
                  key={deg}
                  x1={cx + inner * Math.cos(toRad(deg))} y1={cy + inner * Math.sin(toRad(deg))}
                  x2={cx + outer * Math.cos(toRad(deg))} y2={cy + outer * Math.sin(toRad(deg))}
                  stroke="white" strokeWidth="1.5"
                />
              );
            })}

            {/* Needle */}
            <line
              x1={cx} y1={cy} x2={nx.toFixed(2)} y2={ny.toFixed(2)}
              stroke={color} strokeWidth="2.5" strokeLinecap="round"
            />
            <circle cx={cx} cy={cy} r="6" fill={color} />
            <circle cx={cx} cy={cy} r="3" fill="white" />

            {/* End labels — beside the arc ends, not below the pivot */}
            <text x="18" y="88" fontSize="6.5" fill="#94a3b8" textAnchor="middle">Very</text>
            <text x="18" y="96" fontSize="6.5" fill="#94a3b8" textAnchor="middle">Tight</text>
            <text x="182" y="88" fontSize="6.5" fill="#94a3b8" textAnchor="middle">Excel-</text>
            <text x="182" y="96" fontSize="6.5" fill="#94a3b8" textAnchor="middle">lent</text>
          </svg>

          {/* Score centered below the needle pivot, outside the SVG */}
          <div className="text-center -mt-1">
            <div className="text-3xl font-black tabular-nums" style={{ color }}>{score}</div>
            <div className="text-xs text-slate-400">out of 100</div>
          </div>
        </div>

        <div className="mt-3 text-center">
          <div className="text-xl font-black" style={{ color }}>{text}</div>
          <div className="text-xs text-slate-400 mt-0.5">Financial Comfort Level</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 text-center">
        <div className="bg-slate-50 rounded-lg p-2.5">
          <div className="text-xs text-slate-400">Housing % of take-home</div>
          <div className="text-base font-black text-slate-800 tabular-nums">
            {((housing.scenarios[1].maxMonthlyHousing / takeHome.netMonthly) * 100).toFixed(0)}%
          </div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2.5">
          <div className="text-xs text-slate-400">Housing + Car</div>
          <div className="text-base font-black text-slate-800 tabular-nums">
            {(((housing.scenarios[1].maxMonthlyHousing + car.scenarios[1].totalMonthly) / takeHome.netMonthly) * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
}
