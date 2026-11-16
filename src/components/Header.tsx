import { Flame, Wind } from 'lucide-react';

interface HeaderProps {
  brandTitle: string;
  candleLit: boolean;
  onToggleCandle: () => void;
}

export function Header({ brandTitle, candleLit, onToggleCandle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F4]/92 dark:bg-[#11100F]/92 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element couple wordmark */}
        <a
          href="#top"
          className="font-editorial text-2xl font-medium tracking-tight text-[#181615] dark:text-[#F4EFE6] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B] rounded-sm"
        >
          {brandTitle}
        </a>

        {/* Zone 2: 4 concise single-line text links */}
        <nav
          aria-label="Primary sections"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B655E] dark:text-[#A39A8E]"
        >
          <a
            href="#letter"
            className="hover:text-[#181615] dark:hover:text-[#F4EFE6] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#8A5A2B] dark:hover:border-[#C69C6D]"
          >
            Letter
          </a>
          <a
            href="#moments"
            className="hover:text-[#181615] dark:hover:text-[#F4EFE6] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#8A5A2B] dark:hover:border-[#C69C6D]"
          >
            Moments
          </a>
          <a
            href="#story"
            className="hover:text-[#181615] dark:hover:text-[#F4EFE6] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#8A5A2B] dark:hover:border-[#C69C6D]"
          >
            Our Story
          </a>
          <a
            href="#wishes"
            className="hover:text-[#181615] dark:hover:text-[#F4EFE6] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#8A5A2B] dark:hover:border-[#C69C6D]"
          >
            Wishes
          </a>
        </nav>

        {/* Zone 3: 1 primary action (Light Candle / Blow Candle) */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onToggleCandle}
            aria-pressed={candleLit}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8A5A2B] ${
              candleLit
                ? 'bg-[#D1A97A] text-[#11100F] hover:bg-[#DFBC93]'
                : 'bg-[#181615] text-[#FAF8F4] hover:bg-[#312C29]'
            }`}
          >
            {candleLit ? (
              <>
                <Wind className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Blow Candle</span>
              </>
            ) : (
              <>
                <Flame className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Light Candle</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
