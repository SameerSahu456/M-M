import { useRef, useState, type CSSProperties } from 'react';
import { Flame, Heart, Wind } from 'lucide-react';
import { TributeConfig } from '../types/tribute';

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  drift: number;
  tilt: number;
}

interface TributeLetterSectionProps {
  config: TributeConfig;
  kissesCount: number;
  candleLit: boolean;
  onSendKiss: () => void;
  onToggleCandle: () => void;
}

export function TributeLetterSection({
  config,
  kissesCount,
  candleLit,
  onSendKiss,
  onToggleCandle,
}: TributeLetterSectionProps) {
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const heartIdRef = useRef(0);

  const handleSendLove = () => {
    onSendKiss();
    heartIdRef.current += 1;
    const heart: FloatingHeart = {
      id: heartIdRef.current,
      left: 12 + Math.random() * 76,
      size: 20 + Math.random() * 16,
      drift: (Math.random() - 0.5) * 70,
      tilt: (Math.random() - 0.5) * 40,
    };
    setFloatingHearts((hearts) => [...hearts, heart]);
    // Remove once the 2.2s float animation is over
    window.setTimeout(() => removeHeart(heart.id), 2400);
  };

  const removeHeart = (id: number) =>
    setFloatingHearts((hearts) => hearts.filter((h) => h.id !== id));

  return (
    <section id="letter" className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section Title */}
        <div className="mb-12 pb-5 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#6B655E] dark:text-[#A39A8E] mb-2">
              01. From {config.senderName} to {config.recipientName}
            </p>
            <h2 className="font-editorial text-3xl lg:text-4xl font-normal text-[#181615] dark:text-[#F4EFE6]">
              A Letter For Your Birthday
            </h2>
          </div>
          <p className="text-xs font-mono-tabular text-[#6B655E] dark:text-[#A39A8E]">
            {config.celebrationDate}
          </p>
        </div>

        {/* 70/30 Asymmetric Editorial Reading Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* 70% Reading Column */}
          <div className="lg:col-span-8">
            <div className="max-w-prose space-y-6 text-base lg:text-[17px] leading-[1.8] text-[#2F2B28] dark:text-[#D8D0C4]">
              <p className="editorial-dropcap">{config.letterLeadParagraph}</p>
              <p>{config.letterSecondParagraph}</p>
            </div>

            {/* Editorial Pull Quote with Top/Bottom Hairline Dividers */}
            <blockquote className="my-12 py-8 border-t border-b border-stone-200 dark:border-stone-800 max-w-2xl">
              <p className="font-editorial italic text-2xl lg:text-[1.85rem] leading-snug text-[#181615] dark:text-[#F4EFE6] [text-wrap:balance]">
                “{config.pullQuote}”
              </p>
            </blockquote>

            <p className="font-editorial italic text-xl text-[#8A5A2B] dark:text-[#D1A97A]">
              {config.senderSignature}
            </p>
          </div>

          {/* 30% Margin Dedication Card & Birthday Candle Ritual */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-[#F2EFE9] dark:bg-[#1A1816] border border-stone-200/90 dark:border-stone-800 p-7 transition-colors duration-300">
              {/* Minimalist Interactive Birthday Candle Visual */}
              <div className="pb-6 mb-6 border-b border-stone-200 dark:border-stone-800 flex flex-col items-center text-center">
                <svg
                  width="64"
                  height="96"
                  viewBox="0 0 64 96"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="mb-3"
                >
                  {/* Warm Ambient Glow when Lit */}
                  {candleLit && (
                    <circle cx="32" cy="24" r="22" fill="url(#candleGlow)" opacity="0.85" />
                  )}

                  {/* Flame when Lit */}
                  {candleLit ? (
                    <g>
                      <path
                        d="M32 8C32 8 40 19 40 26C40 30.4183 36.4183 34 32 34C27.5817 34 24 30.4183 24 26C24 19 32 8 32 8Z"
                        fill="#E5A94C"
                      />
                      <path
                        d="M32 16C32 16 36 22 36 26C36 28.2091 34.2091 30 32 30C29.7909 30 28 28.2091 28 26C28 22 32 16 32 16Z"
                        fill="#FFF3D1"
                      />
                    </g>
                  ) : (
                    /* Subtle wisp when blown out */
                    <path
                      d="M32 29C30 25 34 22 31 18"
                      stroke="currentColor"
                      strokeOpacity="0.3"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Wick */}
                  <line
                    x1="32"
                    y1="33"
                    x2="32"
                    y2="41"
                    stroke={candleLit ? '#5C4328' : '#78716C'}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />

                  {/* Beeswax Candle Body */}
                  <rect
                    x="22"
                    y="41"
                    width="20"
                    height="44"
                    rx="2"
                    fill={candleLit ? '#EAE0CE' : '#E7E2D8'}
                    stroke="#C8BFA8"
                    strokeWidth="1"
                  />
                  {/* Candle Holder Dish */}
                  <path
                    d="M14 85H50C48.5 89 44 91 32 91C20 91 15.5 89 14 85Z"
                    fill={candleLit ? '#B8925A' : '#A8A29E'}
                  />

                  <defs>
                    <radialGradient
                      id="candleGlow"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(32 24) rotate(90) scale(22)"
                    >
                      <stop stopColor="#F5B951" stopOpacity="0.6" />
                      <stop offset="1" stopColor="#F5B951" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>

                <p className="font-editorial italic text-lg text-[#181615] dark:text-[#F4EFE6]">
                  {candleLit
                    ? `Make a wish, ${config.recipientName}`
                    : `Light the candle for ${config.recipientName}`}
                </p>
                <p className="text-xs text-[#6B655E] dark:text-[#A39A8E] mt-1">
                  {candleLit
                    ? 'Blow out the candle to return to daylight'
                    : 'Lighting the candle dims the room'}
                </p>
              </div>

              <dl className="divide-y divide-stone-200/80 dark:divide-stone-800 text-sm">
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#6B655E] dark:text-[#A39A8E]">For</dt>
                  <dd className="font-medium text-[#181615] dark:text-[#F4EFE6] text-right">
                    {config.recipientName}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#6B655E] dark:text-[#A39A8E]">From</dt>
                  <dd className="font-medium text-[#181615] dark:text-[#F4EFE6] text-right">
                    {config.senderName}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#6B655E] dark:text-[#A39A8E]">Together</dt>
                  <dd className="font-mono-tabular text-[#181615] dark:text-[#F4EFE6] text-right">
                    {config.yearsTogether}
                  </dd>
                </div>
              </dl>

              {/* Interactive Couple Birthday Ritual */}
              <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-800 space-y-3">
                <button
                  type="button"
                  onClick={onToggleCandle}
                  aria-pressed={candleLit}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B] ${
                    candleLit
                      ? 'bg-[#D1A97A] text-[#11100F] hover:bg-[#DFBC93]'
                      : 'bg-[#181615] text-[#FAF8F4] hover:bg-[#312C29]'
                  }`}
                >
                  <span className="inline-flex items-center gap-2.5">
                    {candleLit ? (
                      <Wind className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Flame className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span>{candleLit ? 'Blow Out Candle' : 'Light Birthday Candle'}</span>
                  </span>
                  <span className="text-xs font-mono-tabular">
                    {candleLit ? 'Lit' : 'Off'}
                  </span>
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={handleSendLove}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium border border-stone-300 dark:border-stone-700 text-[#181615] dark:text-[#F4EFE6] hover:border-[#8A5A2B] dark:hover:border-[#C69C6D] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B]"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Heart className="w-4 h-4 fill-current text-[#8A5A2B] dark:text-[#D1A97A]" aria-hidden="true" />
                      <span>Send Birthday Love</span>
                    </span>
                    <span className="font-mono-tabular text-xs opacity-80">{kissesCount}</span>
                  </button>
                  {/* One heart floats up for every click */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-full h-0" aria-hidden="true">
                    {floatingHearts.map((h) => (
                      <span
                        key={h.id}
                        className="floating-heart absolute bottom-0"
                        style={
                          {
                            left: `${h.left}%`,
                            '--heart-drift': `${h.drift}px`,
                            '--heart-tilt': `${h.tilt}deg`,
                          } as CSSProperties
                        }
                      >
                        <Heart
                          className="fill-current text-[#D6455F] drop-shadow-sm"
                          style={{ width: h.size, height: h.size }}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
