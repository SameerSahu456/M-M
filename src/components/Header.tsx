import { useEffect, useState } from 'react';
import { Flame, Menu, Wind, X } from 'lucide-react';

interface HeaderProps {
  brandTitle: string;
  tagline?: string;
  candleLit: boolean;
  onToggleCandle: () => void;
}

const NAV_LINKS = [
  { href: '#letter', label: 'Letter', menuLabel: 'The Letter', note: 'Words for you' },
  { href: '#moments', label: 'Moments', menuLabel: 'Our Moments', note: 'Photographs' },
  { href: '#story', label: 'Our Story', menuLabel: 'Our Story', note: 'Four chapters' },
  { href: '#wishes', label: 'Wishes', menuLabel: 'Wishes', note: 'For your year' },
];

export function Header({ brandTitle, tagline, candleLit, onToggleCandle }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock page scroll and allow Escape to close while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  // Close the menu if the viewport grows to the desktop layout
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handleChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const candleButtonTone = candleLit
    ? 'bg-[#D1A97A] text-[#11100F] hover:bg-[#DFBC93]'
    : 'bg-[#181615] text-[#FAF8F4] hover:bg-[#312C29]';

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#FAF8F4]/92 dark:bg-[#11100F]/92 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-300 pt-[env(safe-area-inset-top)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-3 md:py-4 flex items-center justify-between gap-3 md:gap-8">
          {/* Zone 1: Single text element couple wordmark */}
          <a
            href="#top"
            className="font-editorial text-[1.35rem] md:text-2xl font-medium tracking-tight text-[#181615] dark:text-[#F4EFE6] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B] rounded-sm"
          >
            {brandTitle}
          </a>

          {/* Zone 2: 4 concise single-line text links */}
          <nav
            aria-label="Primary sections"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B655E] dark:text-[#A39A8E]"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#181615] dark:hover:text-[#F4EFE6] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#8A5A2B] dark:hover:border-[#C69C6D]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action (Light Candle / Blow Candle) + mobile menu trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onToggleCandle}
              aria-pressed={candleLit}
              aria-label={candleLit ? 'Blow Candle' : 'Light Candle'}
              className={`inline-flex items-center gap-2 h-11 md:h-auto px-3.5 md:px-5 md:py-2.5 text-xs font-medium tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8A5A2B] ${candleButtonTone}`}
            >
              {candleLit ? (
                <Wind className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Flame className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span className="max-[359px]:hidden">{candleLit ? 'Blow Candle' : 'Light Candle'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden inline-flex items-center justify-center w-11 h-11 border border-stone-300 dark:border-stone-700 text-[#181615] dark:text-[#F4EFE6] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B]"
            >
              <Menu className="w-[18px] h-[18px]" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen editorial menu (mobile only). Rendered outside <header> because
          backdrop-filter would otherwise trap position: fixed inside the header box. */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="menu-overlay md:hidden fixed inset-0 z-40 flex flex-col bg-[#FAF8F4] dark:bg-[#11100F] text-[#181615] dark:text-[#F4EFE6] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        >
          <div className="px-6 py-3 flex items-center justify-between gap-3 border-b border-stone-200/80 dark:border-stone-800/80">
            <a
              href="#top"
              onClick={() => setMenuOpen(false)}
              className="font-editorial text-[1.35rem] font-medium tracking-tight whitespace-nowrap"
            >
              {brandTitle}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              autoFocus
              className="inline-flex items-center justify-center w-11 h-11 border border-stone-300 dark:border-stone-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B]"
            >
              <X className="w-[18px] h-[18px]" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Sections" className="flex-1 overflow-y-auto px-6 pt-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#6B655E] dark:text-[#A39A8E] mb-3">
              Contents
            </p>
            <ul className="border-t border-stone-200 dark:border-stone-800">
              {NAV_LINKS.map((link, i) => (
                <li
                  key={link.href}
                  className="menu-item border-b border-stone-200 dark:border-stone-800"
                  style={{ animationDelay: `${80 + i * 60}ms` }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 py-5 active:opacity-60 transition-opacity"
                  >
                    <span className="font-mono-tabular text-xs text-[#8A5A2B] dark:text-[#D1A97A] w-6 shrink-0">
                      0{i + 1}
                    </span>
                    <span className="font-editorial text-[2.1rem] leading-none tracking-tight flex-1">
                      {link.menuLabel}
                    </span>
                    <span className="text-[11px] uppercase tracking-widest text-[#6B655E] dark:text-[#A39A8E] shrink-0">
                      {link.note}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="menu-item px-6 pt-5 pb-6 border-t border-stone-200/80 dark:border-stone-800/80"
            style={{ animationDelay: '340ms' }}
          >
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onToggleCandle();
              }}
              className={`w-full inline-flex items-center justify-center gap-2.5 h-13 text-sm font-medium tracking-wide transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8A5A2B] ${candleButtonTone}`}
            >
              {candleLit ? (
                <Wind className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Flame className="w-4 h-4" aria-hidden="true" />
              )}
              <span>{candleLit ? 'Blow Out the Candle' : 'Light the Birthday Candle'}</span>
            </button>
            {tagline && (
              <p className="mt-4 text-center font-editorial italic text-base text-[#6B655E] dark:text-[#A39A8E]">
                {tagline}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
