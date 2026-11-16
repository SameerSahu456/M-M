import { useState } from 'react';
import { MilestoneChapter } from '../types/tribute';

interface TimelineSectionProps {
  chapters: MilestoneChapter[];
}

export function TimelineSection({ chapters }: TimelineSectionProps) {
  const [selectedId, setSelectedId] = useState<string>(chapters[0]?.id ?? '');
  const activeChapter = chapters.find((c) => c.id === selectedId) ?? chapters[0];

  return (
    <section id="story" className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="mb-12 pb-5 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#6B655E] dark:text-[#A39A8E] mb-2">
              03. Our Timeline
            </p>
            <h2 className="font-editorial text-3xl lg:text-4xl font-normal text-[#181615] dark:text-[#F4EFE6]">
              Our Story So Far
            </h2>
          </div>
          <p className="text-xs text-[#6B655E] dark:text-[#A39A8E]">
            Select a chapter to read my note
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Chapter Index List */}
          <div className="lg:col-span-6 divide-y divide-stone-200 dark:divide-stone-800 border-t border-b border-stone-200 dark:border-stone-800">
            {chapters.map((chapter) => {
              const isActive = chapter.id === activeChapter?.id;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => setSelectedId(chapter.id)}
                  aria-expanded={isActive}
                  className={`w-full text-left py-5 px-4 transition-colors duration-150 flex items-baseline justify-between gap-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B] ${
                    isActive
                      ? 'bg-[#F2EFE9] dark:bg-[#1A1816]'
                      : 'hover:bg-[#F2EFE9]/50 dark:hover:bg-[#1A1816]/50'
                  }`}
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span className="font-mono-tabular text-xs text-[#8A5A2B] dark:text-[#D1A97A] shrink-0">
                      {chapter.index}.
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-editorial text-xl font-medium text-[#181615] dark:text-[#F4EFE6]">
                        {chapter.title}
                      </h3>
                      <p className="text-xs text-[#6B655E] dark:text-[#A39A8E] mt-1">
                        {chapter.location}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono-tabular text-sm text-[#6B655E] dark:text-[#A39A8E] shrink-0">
                    {chapter.year}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Chapter Reflection */}
          {activeChapter && (
            <div className="lg:col-span-6 bg-[#F2EFE9] dark:bg-[#1A1816] border border-stone-200/90 dark:border-stone-800 p-8 lg:p-10">
              <div className="flex items-center justify-between gap-4 text-xs text-[#6B655E] dark:text-[#A39A8E] pb-4 border-b border-stone-200 dark:border-stone-800">
                <span>
                  Chapter {activeChapter.index} <span aria-hidden="true">·</span>{' '}
                  {activeChapter.location}
                </span>
                <span className="font-mono-tabular">{activeChapter.year}</span>
              </div>

              <h3 className="font-editorial text-2xl lg:text-3xl font-normal text-[#181615] dark:text-[#F4EFE6] mt-6 mb-4 [text-wrap:balance]">
                {activeChapter.title}
              </h3>

              <p className="text-base font-medium text-[#2F2B28] dark:text-[#E5DDD0] leading-relaxed mb-4">
                {activeChapter.summary}
              </p>

              <p className="text-sm lg:text-base text-[#4C4742] dark:text-[#B5ACA0] leading-relaxed">
                {activeChapter.reflection}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
