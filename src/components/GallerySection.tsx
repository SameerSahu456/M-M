import { useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { GalleryItem } from '../types/tribute';
import { ResilientImage } from './ResilientImage';

interface GallerySectionProps {
  items: GalleryItem[];
  onSelectPhoto: (item: GalleryItem) => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function GallerySection({ items, onSelectPhoto }: GallerySectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // On phones the grid becomes a swipeable filmstrip; track which frame is centred
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const centre = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDistance = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const distance = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  const activeItem = items[activeIndex] ?? items[0];

  return (
    <section
      id="moments"
      className="py-16 lg:py-24 bg-[#F2EFE9]/60 dark:bg-[#161412] border-t border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="mb-8 sm:mb-12 pb-5 border-b border-stone-200 dark:border-stone-800 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#6B655E] dark:text-[#A39A8E] mb-2">
              02. Photographs
            </p>
            <h2 className="font-editorial text-3xl lg:text-4xl font-normal text-[#181615] dark:text-[#F4EFE6]">
              Our Moments
            </h2>
          </div>
          <p className="sm:hidden text-xs text-[#6B655E] dark:text-[#A39A8E] pb-1">Swipe to browse</p>
        </div>

        {/* Pure Photo Grid — No Text on Cards. Below sm: edge-to-edge snap filmstrip. */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar max-sm:-mx-6 max-sm:px-6 max-sm:scroll-px-6 max-sm:flex max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory max-sm:overscroll-x-contain gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 lg:gap-6"
        >
          {items.map((item) => {
            const spanWide = item.featured ? 'md:col-span-2 lg:col-span-2' : '';

            return (
              <article
                key={item.id}
                className={`group max-sm:shrink-0 max-sm:w-[80%] max-sm:snap-center ${spanWide}`}
              >
                <button
                  type="button"
                  onClick={() => onSelectPhoto(item)}
                  className="block w-full bg-[#FAF8F4] dark:bg-[#1B1917] border border-stone-200/90 dark:border-stone-800 p-2.5 transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B]"
                  aria-label={`View ${item.title}`}
                >
                  <div
                    className={`relative overflow-hidden bg-stone-200 dark:bg-stone-800 ${
                      spanWide ? 'aspect-[3/4] sm:aspect-[16/9]' : item.aspectClass
                    }`}
                  >
                    <ResilientImage
                      src={item.imageSrc}
                      alt={item.title}
                      title={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                    <span className="absolute bottom-3 right-3 p-2 bg-[#181615]/75 text-[#FAF8F4] opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-200">
                      <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </button>
              </article>
            );
          })}
        </div>

        {/* Filmstrip caption, counter and progress — phones only */}
        {activeItem && (
          <div className="sm:hidden mt-5" aria-hidden="true">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-editorial italic text-lg text-[#181615] dark:text-[#F4EFE6] truncate">
                {activeItem.title}
              </p>
              <p className="font-mono-tabular text-xs text-[#6B655E] dark:text-[#A39A8E] shrink-0">
                <span className="text-[#8A5A2B] dark:text-[#D1A97A]">{pad(activeIndex + 1)}</span>
                {' / '}
                {pad(items.length)}
              </p>
            </div>
            <div className="mt-3 h-px bg-stone-300 dark:bg-stone-700 relative">
              <span
                className="absolute left-0 -top-px h-[3px] bg-[#8A5A2B] dark:bg-[#D1A97A] transition-transform duration-300 ease-out"
                style={{
                  width: `${100 / items.length}%`,
                  transform: `translateX(${activeIndex * 100}%)`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
