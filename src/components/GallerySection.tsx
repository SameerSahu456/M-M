import { Maximize2 } from 'lucide-react';
import { GalleryItem } from '../types/tribute';
import { ResilientImage } from './ResilientImage';

interface GallerySectionProps {
  items: GalleryItem[];
  onSelectPhoto: (item: GalleryItem) => void;
}

export function GallerySection({ items, onSelectPhoto }: GallerySectionProps) {
  return (
    <section
      id="moments"
      className="py-16 lg:py-24 bg-[#F2EFE9]/60 dark:bg-[#161412] border-t border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="mb-12 pb-5 border-b border-stone-200 dark:border-stone-800">
          <p className="text-xs uppercase tracking-widest text-[#6B655E] dark:text-[#A39A8E] mb-2">
            02. Photographs
          </p>
          <h2 className="font-editorial text-3xl lg:text-4xl font-normal text-[#181615] dark:text-[#F4EFE6]">
            Our Moments
          </h2>
        </div>

        {/* Pure Photo Grid — No Text on Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((item) => {
            const spanWide = item.featured ? 'md:col-span-2 lg:col-span-2' : '';

            return (
              <article key={item.id} className={`group ${spanWide}`}>
                <button
                  type="button"
                  onClick={() => onSelectPhoto(item)}
                  className="block w-full bg-[#FAF8F4] dark:bg-[#1B1917] border border-stone-200/90 dark:border-stone-800 p-2.5 transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B]"
                  aria-label={`View ${item.title}`}
                >
                  <div
                    className={`relative overflow-hidden bg-stone-200 dark:bg-stone-800 ${
                      spanWide ? 'aspect-[16/9]' : item.aspectClass
                    }`}
                  >
                    <ResilientImage
                      src={item.imageSrc}
                      alt={item.title}
                      title={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                    <span className="absolute bottom-3 right-3 p-2 bg-[#181615]/75 text-[#FAF8F4] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
