import { useEffect } from 'react';
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

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#11100F]/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} full view`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF8F4] dark:bg-[#1A1816] border border-stone-300/60 dark:border-stone-800 p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photograph viewer"
          className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center bg-[#181615] text-[#FAF8F4] dark:bg-[#F4EFE6] dark:text-[#11100F] hover:opacity-85 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B]"
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
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium border border-stone-300 dark:border-stone-700 text-[#181615] dark:text-[#F4EFE6] hover:border-[#8A5A2B] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium border border-stone-300 dark:border-stone-700 text-[#181615] dark:text-[#F4EFE6] hover:border-[#8A5A2B] transition-colors cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
