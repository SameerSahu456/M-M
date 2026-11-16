import { Heart } from 'lucide-react';
import { BirthdayWish } from '../types/tribute';

interface GuestbookSectionProps {
  recipientName: string;
  senderName: string;
  wishes: BirthdayWish[];
  onToggleCherish: (id: string) => void;
}

export function GuestbookSection({
  recipientName,
  senderName,
  wishes,
  onToggleCherish,
}: GuestbookSectionProps) {
  return (
    <section
      id="wishes"
      className="py-16 lg:py-24 bg-[#F2EFE9]/60 dark:bg-[#161412] border-t border-stone-200/80 dark:border-stone-800/80"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="mb-12 pb-5 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#6B655E] dark:text-[#A39A8E] mb-2">
              04. From {senderName}
            </p>
            <h2 className="font-editorial text-3xl lg:text-4xl font-normal text-[#181615] dark:text-[#F4EFE6]">
              Birthday Wishes For Your Year
            </h2>
          </div>
          <p className="text-xs font-mono-tabular text-[#6B655E] dark:text-[#A39A8E]">
            {wishes.length} Wishes for {recipientName}
          </p>
        </div>

        {/* 3-Column Editorial Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {wishes.map((wish) => (
            <article
              key={wish.id}
              className="bg-[#FAF8F4] dark:bg-[#1B1917] border border-stone-200/90 dark:border-stone-800 p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 text-xs text-[#6B655E] dark:text-[#A39A8E] pb-4 border-b border-stone-200/80 dark:border-stone-800">
                  <span className="uppercase tracking-widest">{wish.categoryLabel}</span>
                  <span>For {recipientName}</span>
                </div>

                <h3 className="font-editorial text-2xl font-normal text-[#181615] dark:text-[#F4EFE6] mt-5 mb-3">
                  {wish.title}
                </h3>

                <p className="text-[15px] leading-relaxed text-[#2F2B28] dark:text-[#D8D0C4]">
                  {wish.message}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/60 dark:border-stone-800/70 flex items-center justify-between">
                <span className="font-editorial italic text-base text-[#8A5A2B] dark:text-[#D1A97A]">
                  — {senderName}
                </span>

                <button
                  type="button"
                  onClick={() => onToggleCherish(wish.id)}
                  aria-pressed={Boolean(wish.cherished)}
                  aria-label={`Save wish ${wish.title}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tabular border transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B] ${
                    wish.cherished
                      ? 'border-[#8A5A2B] text-[#8A5A2B] bg-[#8A5A2B]/8 dark:border-[#D1A97A] dark:text-[#D1A97A]'
                      : 'border-stone-200 dark:border-stone-800 text-[#6B655E] dark:text-[#A39A8E] hover:border-stone-400 dark:hover:border-stone-600'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${wish.cherished ? 'fill-current' : ''}`}
                    aria-hidden="true"
                  />
                  <span>{wish.cherished ? 'Kept' : 'Keep'}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
