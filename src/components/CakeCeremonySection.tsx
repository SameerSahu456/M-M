import { Flame, RotateCcw, Utensils, Wind } from 'lucide-react';
import { TributeConfig } from '../types/tribute';

interface CakeCeremonySectionProps {
  config: TributeConfig;
  candleLit: boolean;
  cakeCut: boolean;
  onBlowCandle: () => void;
  onLightCandle: () => void;
  onCutCake: () => void;
  onResetCake: () => void;
}

const arcPoints = (cx: number, cy: number, rx: number, ry: number, count: number) =>
  Array.from({ length: count }, (_, i) => {
    const t = (Math.PI * (i + 0.5)) / count;
    return { x: cx + rx * Math.cos(t), y: cy + ry * Math.sin(t) };
  });

const BOTTOM_TIER_PEARLS = arcPoints(195, 200, 96, 19, 27);
const TOP_TIER_PEARLS = arcPoints(195, 194, 60, 15, 18);

const GOLD_DRIPS = [
  { x: 143, len: 12 },
  { x: 156, len: 24 },
  { x: 170, len: 10 },
  { x: 184, len: 28 },
  { x: 204, len: 14 },
  { x: 218, len: 22 },
  { x: 233, len: 9 },
  { x: 246, len: 18 },
].map((d) => ({ ...d, y: 133 + 12 * Math.sqrt(1 - ((d.x - 195) / 58.5) ** 2) }));

const SPARKLES = [
  { x: 92, y: 96, s: 1 },
  { x: 304, y: 82, s: 0.8 },
  { x: 332, y: 168, s: 0.6 },
  { x: 70, y: 176, s: 0.55 },
  { x: 268, y: 34, s: 0.5 },
  { x: 128, y: 44, s: 0.6 },
];

function Rose({ x, y, r, pale = false }: { x: number; y: number; r: number; pale?: boolean }) {
  const outer = pale ? '#FBF3EC' : '#F3D9D2';
  const mid = pale ? '#F3E2D8' : '#EBC4BC';
  const core = pale ? '#E8CCC0' : '#D9A39B';
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={outer} stroke="#DDBDB4" strokeWidth="0.8" />
      <circle cx={x + r * 0.08} cy={y - r * 0.05} r={r * 0.62} fill={mid} />
      <path
        d={`M${x - r * 0.55} ${y + r * 0.1} A${r * 0.6} ${r * 0.6} 0 0 1 ${x + r * 0.5} ${y - r * 0.3}`}
        fill="none"
        stroke={core}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <circle cx={x + r * 0.1} cy={y - r * 0.05} r={r * 0.28} fill={core} />
    </g>
  );
}

export function CakeCeremonySection({
  config,
  candleLit,
  cakeCut,
  onBlowCandle,
  onLightCandle,
  onCutCake,
  onResetCake,
}: CakeCeremonySectionProps) {
  return (
    <section
      id="cake-ceremony"
      className="py-16 lg:py-24 border-t border-stone-200/80 dark:border-stone-800/80 bg-[#F2EFE9]/70 dark:bg-[#161412] transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="mb-8 sm:mb-10 pb-5 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#6B655E] dark:text-[#A39A8E] mb-2">
              Birthday Ritual · {config.celebrationDate}
            </p>
            <h2 className="font-editorial text-3xl lg:text-4xl font-normal text-[#181615] dark:text-[#F4EFE6]">
              {candleLit
                ? `Make a Wish, ${config.recipientName}`
                : cakeCut
                  ? `Happy Birthday, ${config.recipientName}`
                  : `Your Birthday Cake`}
            </h2>
          </div>
          <p className="text-xs text-[#6B655E] dark:text-[#A39A8E]">
            {candleLit
              ? 'Blow out the candle or cut your birthday cake'
              : cakeCut
                ? `First slice served with love from ${config.senderName}`
                : 'Light the candle again or cut a slice'}
          </p>
        </div>

        <div className="bg-[#FAF8F4] dark:bg-[#1B1917] border border-stone-200/90 dark:border-stone-800 p-5 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 items-center">
          {/* Interactive Luxury Cake Illustration Stage */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <svg
              viewBox="0 0 420 350"
              className="w-full max-w-md h-auto"
              role="img"
              aria-label={`Two-tier birthday cake for ${config.recipientName}${candleLit ? ' with lit candle' : ''}${cakeCut ? ' with a slice cut' : ''}`}
            >
              <defs>
                <radialGradient id="cakeFlameGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F6C15A" stopOpacity="0.6" />
                  <stop offset="55%" stopColor="#F6C15A" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#F6C15A" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="buttercreamBody" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#EADFCB" />
                  <stop offset="24%" stopColor="#FDFAF3" />
                  <stop offset="62%" stopColor="#F1E9DA" />
                  <stop offset="100%" stopColor="#D9CBB3" />
                </linearGradient>
                <linearGradient id="goldFoil" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#A97C3F" />
                  <stop offset="28%" stopColor="#EFD59C" />
                  <stop offset="55%" stopColor="#C39A5B" />
                  <stop offset="80%" stopColor="#E9CC8F" />
                  <stop offset="100%" stopColor="#A97C3F" />
                </linearGradient>
                <linearGradient id="porcelainStand" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E4DAC8" />
                  <stop offset="35%" stopColor="#FBF8F1" />
                  <stop offset="100%" stopColor="#D2C6B0" />
                </linearGradient>
                <linearGradient id="candleWax" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F3E6C8" />
                  <stop offset="45%" stopColor="#FFFBF0" />
                  <stop offset="100%" stopColor="#DCC79B" />
                </linearGradient>
                <clipPath id="candleClip">
                  <rect x="191" y="72" width="8" height="60" rx="2" />
                </clipPath>
              </defs>

              {/* Soft Candlelight Halo */}
              {candleLit && (
                <circle cx="195" cy="52" r="60" fill="url(#cakeFlameGlow)">
                  <animate attributeName="r" values="58;66;58" dur="2.6s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Candlelight Sparkles */}
              {candleLit && (
                <g fill="#D9B36C" className="animate-pulse">
                  {SPARKLES.map((s) => (
                    <path
                      key={`${s.x}-${s.y}`}
                      transform={`translate(${s.x} ${s.y}) scale(${s.s})`}
                      d="M0 -7 C0.8 -2 2 -0.8 7 0 C2 0.8 0.8 2 0 7 C-0.8 2 -2 0.8 -7 0 C-2 -0.8 -0.8 -2 0 -7 Z"
                    />
                  ))}
                </g>
              )}

              {/* Ground Shadow */}
              <ellipse cx="195" cy="338" rx="120" ry="7" fill="#000000" opacity="0.08" />

              {/* Gold-Rimmed Porcelain Pedestal Stand */}
              <ellipse cx="195" cy="332" rx="58" ry="9" fill="url(#porcelainStand)" stroke="url(#goldFoil)" strokeWidth="1.6" />
              <path
                d="M176 298 C181 311 183 319 170 330 L220 330 C207 319 209 311 214 298 Z"
                fill="url(#porcelainStand)"
                stroke="#CDBFA8"
                strokeWidth="1"
              />
              <ellipse cx="195" cy="314" rx="14.5" ry="3" fill="none" stroke="url(#goldFoil)" strokeWidth="1.6" />
              <ellipse cx="195" cy="295" rx="130" ry="17" fill="#CFC2AB" />
              <ellipse cx="195" cy="291" rx="130" ry="17" fill="url(#porcelainStand)" stroke="url(#goldFoil)" strokeWidth="2.2" />

              {/* Bottom Tier */}
              <path
                d="M99 200 L99 276 C99 289 142 298 195 298 C248 298 291 289 291 276 L291 200 Z"
                fill="url(#buttercreamBody)"
                stroke="#D6CBB7"
                strokeWidth="1.2"
              />
              {/* Gold Ribbon Band */}
              <path
                d="M99 258 C99 271 142 280 195 280 C248 280 291 271 291 258 L291 267 C291 280 248 289 195 289 C142 289 99 280 99 267 Z"
                fill="url(#goldFoil)"
              />
              <ellipse cx="195" cy="200" rx="96" ry="19" fill="#FBF7EF" stroke="#D6CBB7" strokeWidth="1.2" />
              {/* Piped Pearl Border */}
              {BOTTOM_TIER_PEARLS.map((p, i) => (
                <circle key={`bp-${i}`} cx={p.x} cy={p.y} r="3.3" fill="#FFFDF8" stroke="#D9CDB8" strokeWidth="0.7" />
              ))}
              {/* Gold Script Name */}
              <text
                x={cakeCut ? 168 : 195}
                y="252"
                textAnchor="middle"
                className="font-editorial"
                fontSize="25"
                fontStyle="italic"
                fill="#B08748"
              >
                {config.recipientName}
              </text>

              {/* Top Tier */}
              <path
                d="M135 132 L135 194 C135 203 162 209 195 209 C228 209 255 203 255 194 L255 132 Z"
                fill="url(#buttercreamBody)"
                stroke="#D6CBB7"
                strokeWidth="1.2"
              />
              {TOP_TIER_PEARLS.map((p, i) => (
                <circle key={`tp-${i}`} cx={p.x} cy={p.y} r="2.8" fill="#FFFDF8" stroke="#D9CDB8" strokeWidth="0.7" />
              ))}
              <ellipse cx="195" cy="132" rx="60" ry="12" fill="#FBF7EF" stroke="#D6CBB7" strokeWidth="1.2" />

              {/* Gold Drip Glaze */}
              <g stroke="url(#goldFoil)" strokeLinecap="round" fill="none">
                <path d="M136.5 133 A58.5 12 0 0 0 253.5 133" strokeWidth="5" />
                {GOLD_DRIPS.map((d) => (
                  <line key={d.x} x1={d.x} y1={d.y} x2={d.x} y2={d.y + d.len} stroke="#D2AC6A" strokeWidth="6.5" />
                ))}
              </g>

              {/* Blush Roses & Sage Leaves — Bottom Tier Ledge */}
              <g>
                <ellipse cx="112" cy="196" rx="12" ry="4.5" transform="rotate(-28 112 196)" fill="#6C7C5E" />
                <ellipse cx="150" cy="212" rx="11" ry="4" transform="rotate(18 150 212)" fill="#7E8E6E" />
                <ellipse cx="136" cy="190" rx="9" ry="3.5" transform="rotate(-60 136 190)" fill="#8A9A7A" />
                <Rose x={126} y={203} r={12} />
                <Rose x={144} y={207} r={8} pale />
                <Rose x={111} y={207} r={6.5} pale />
                <circle cx="156" cy="203" r="2.6" fill="url(#goldFoil)" />
                <circle cx="118" cy="193" r="2.2" fill="url(#goldFoil)" />
              </g>

              {/* Blush Roses — Top Tier */}
              <g>
                <ellipse cx="243" cy="126" rx="10" ry="3.8" transform="rotate(-20 243 126)" fill="#6C7C5E" />
                <ellipse cx="216" cy="127" rx="8" ry="3.2" transform="rotate(24 216 127)" fill="#7E8E6E" />
                <Rose x={230} y={131} r={9} />
                <Rose x={244} y={135} r={6} pale />
                <circle cx="219" cy="134" r="2.2" fill="url(#goldFoil)" />
              </g>

              {/* Cut Wedge on Right Side of Bottom Tier when Cut */}
              {cakeCut && (
                <g>
                  <polygon points="232,217.5 282,208 258,201" fill="#EADCC7" />
                  <polygon
                    points="232,217.5 282,208 282,285.3 232,296.3"
                    fill="#DFC49C"
                    stroke="#C7A97D"
                    strokeWidth="1"
                  />
                  <line x1="233" y1="238" x2="281" y2="228.5" stroke="#FAF5EA" strokeWidth="4" />
                  <line x1="233" y1="256" x2="281" y2="246.5" stroke="#B5536A" strokeWidth="2" />
                  <line x1="233" y1="274" x2="281" y2="264.5" stroke="#FAF5EA" strokeWidth="4" />
                </g>
              )}

              {/* Ivory Taper Candle with Gold Spiral */}
              <rect x="191" y="72" width="8" height="60" rx="2" fill="url(#candleWax)" stroke="#CDB98F" strokeWidth="0.8" />
              <g clipPath="url(#candleClip)" stroke="url(#goldFoil)" strokeWidth="1.6">
                {[80, 92, 104, 116, 128].map((y) => (
                  <line key={y} x1="190" y1={y + 4} x2="200" y2={y - 4} />
                ))}
              </g>
              <line x1="195" y1="65" x2="195" y2="72" stroke="#4A3723" strokeWidth="1.5" strokeLinecap="round" />

              {/* Lit Flame OR Blown-out Smoke */}
              {candleLit ? (
                <g>
                  <path
                    d="M195 38 C195 38 205 51 205 60 C205 65.5 200.5 69 195 69 C189.5 69 185 65.5 185 60 C185 51 195 38 195 38 Z"
                    fill="#E5A53F"
                  />
                  <path
                    d="M195 48 C195 48 200 55.5 200 60.5 C200 63.5 197.8 65.5 195 65.5 C192.2 65.5 190 63.5 190 60.5 C190 55.5 195 48 195 48 Z"
                    fill="#FFF4D2"
                  />
                </g>
              ) : (
                <path
                  d="M195 61 C192 55 198 50 194 44 C192 41 196 37 195 33"
                  fill="none"
                  stroke="#9C948A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.65"
                />
              )}

              {/* Served Slice on Gold-Rimmed Porcelain Plate when Cake is Cut */}
              {cakeCut && (
                <g transform="translate(304, 250)">
                  <ellipse cx="52" cy="56" rx="54" ry="12" fill="#D8CDB9" />
                  <ellipse cx="52" cy="54" rx="54" ry="12" fill="#F8F5EE" stroke="url(#goldFoil)" strokeWidth="1.8" />
                  <ellipse cx="52" cy="52" rx="40" ry="8" fill="none" stroke="#E4DCCE" strokeWidth="1" />

                  <polygon
                    points="18,46 82,36 82,8 18,18"
                    fill="#DFC49C"
                    stroke="#C7A97D"
                    strokeWidth="1"
                  />
                  <line x1="19" y1="26" x2="81" y2="16" stroke="#FAF5EA" strokeWidth="3.5" />
                  <line x1="19" y1="33" x2="81" y2="23" stroke="#B5536A" strokeWidth="1.6" />
                  <line x1="19" y1="40" x2="81" y2="30" stroke="#FAF5EA" strokeWidth="3.5" />
                  <polygon
                    points="18,18 82,8 60,0 18,18"
                    fill="#FAF6EE"
                    stroke="#D6CBB7"
                    strokeWidth="1"
                  />
                  <polygon
                    points="60,0 82,8 82,36 60,28"
                    fill="#EFE7D8"
                    stroke="#D6CBB7"
                    strokeWidth="1"
                  />
                  <line x1="60" y1="24" x2="82" y2="32" stroke="url(#goldFoil)" strokeWidth="3" />
                  <circle cx="50" cy="7" r="3.2" fill="#E9C3BC" stroke="#D7A8A1" strokeWidth="0.7" />
                </g>
              )}
            </svg>
          </div>

          {/* Ceremony Controls & Message */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8A5A2B] dark:text-[#D1A97A] mb-2">
                {config.senderName} & {config.recipientName}
              </p>
              <h3 className="font-editorial text-2xl lg:text-3xl font-normal text-[#181615] dark:text-[#F4EFE6] mb-3">
                {cakeCut
                  ? 'First Slice for You'
                  : candleLit
                    ? 'The Candle Is Lit'
                    : 'Wish Made'}
              </h3>
              <p className="text-sm leading-relaxed text-[#4C4742] dark:text-[#C5BDB2]">
                {cakeCut
                  ? `Happy birthday, ${config.recipientName}. May our fifth year together—and every year after—be filled with sweetness, peace, and quiet joy.`
                  : candleLit
                    ? `Close your eyes, make your birthday wish for our year ahead, then blow out the candle and cut your cake.`
                    : `The candle has been blown out and daylight has returned. Cut your birthday slice whenever you’re ready.`}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {candleLit ? (
                <button
                  type="button"
                  onClick={onBlowCandle}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 sm:py-3.5 text-sm font-medium bg-[#D1A97A] text-[#11100F] hover:bg-[#DFBC93] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B]"
                >
                  <Wind className="w-4 h-4" aria-hidden="true" />
                  <span>Blow Candle</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onLightCandle}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 sm:py-3.5 text-sm font-medium bg-[#181615] text-[#FAF8F4] hover:bg-[#312C29] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B]"
                >
                  <Flame className="w-4 h-4" aria-hidden="true" />
                  <span>Light Candle Again</span>
                </button>
              )}

              {!cakeCut ? (
                <button
                  type="button"
                  onClick={onCutCake}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 sm:py-3.5 text-sm font-medium border border-stone-300 dark:border-stone-700 text-[#181615] dark:text-[#F4EFE6] hover:border-[#8A5A2B] dark:hover:border-[#D1A97A] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B]"
                >
                  <Utensils className="w-4 h-4" aria-hidden="true" />
                  <span>Cut Cake</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onResetCake}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 sm:py-3.5 text-sm font-medium border border-stone-300 dark:border-stone-700 text-[#181615] dark:text-[#F4EFE6] hover:border-[#8A5A2B] dark:hover:border-[#D1A97A] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B]"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span>Reset Cake</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
