import { useEffect, useRef, type TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryItem } from '../types/tribute';
import { ResilientImage } from './ResilientImage';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function LightboxModal({ item, onClose, onPrev, onNext }: LightboxModalProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, onPrev, onNext]);

  // Keep the page behind from scrolling while a photograph is open
  useEffect(() => {
    if (!item) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [item]);

  // Swipe left / right to move between photographs
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const handleTouchEnd = (e: TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) onNext();
    else onPrev();
  };

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#11100F]/92 backdrop-blur-sm flex items-center justify-center p-3 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} full view`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF8F4] dark:bg-[#1A1816] border border-stone-300/60 dark:border-stone-800 p-2.5 sm:p-3"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photograph viewer"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center bg-[#181615] text-[#FAF8F4] dark:bg-[#F4EFE6] dark:text-[#11100F] hover:opacity-85 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B]"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        <div className="bg-[#181615] flex items-center justify-center max-h-[75vh] overflow-hidden">
          <ResilientImage
            src={item.imageSrc}
            alt={item.title}
            title={item.title}
            className="w-full h-full max-h-[75vh] object-contain"
          />
        </div>

        <div className="pt-3 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center gap-1.5 shrink-0 px-3.5 sm:px-4 py-3 sm:py-2 text-xs font-medium border border-stone-300 dark:border-stone-700 text-[#181615] dark:text-[#F4EFE6] hover:border-[#8A5A2B] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span className="max-sm:sr-only">Previous</span>
          </button>

          <p className="font-editorial italic text-base text-[#181615] dark:text-[#F4EFE6] text-center truncate min-w-0">
            {item.title}
          </p>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1.5 shrink-0 px-3.5 sm:px-4 py-3 sm:py-2 text-xs font-medium border border-stone-300 dark:border-stone-700 text-[#181615] dark:text-[#F4EFE6] hover:border-[#8A5A2B] transition-colors cursor-pointer"
          >
            <span className="max-sm:sr-only">Next</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
