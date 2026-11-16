import { Volume2, VolumeX, ArrowDownRight } from 'lucide-react';
import { HERO_IMAGE_PATH } from '../data/defaultTribute';
import { TributeConfig } from '../types/tribute';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  config: TributeConfig;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export function HeroSection({
  config,
  isAudioPlaying,
  onToggleAudio,
}: HeroSectionProps) {
  return (
    <section id="top" className="pt-9 pb-14 lg:pt-16 lg:pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Asymmetric Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-12 items-stretch">
          {/* Left Typographic Column */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2 lg:py-6">
            <div>
              {/* Unboxed Couple Dedication Metadata */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs tracking-widest uppercase text-[#6B655E] dark:text-[#A39A8E] mb-5 sm:mb-6">
                <span>From {config.senderName} to {config.recipientName}</span>
                <span aria-hidden="true" className="max-sm:hidden">·</span>
                <span className="max-sm:hidden">{config.milestoneLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">{config.celebrationDate}</span>
              </div>

              <h1 className="font-editorial text-[clamp(2.25rem,12vw,3.5rem)] sm:text-[clamp(2.75rem,5.2vw,4.5rem)] leading-[1.02] sm:leading-[1.04] font-normal tracking-tight text-[#181615] dark:text-[#F4EFE6] sm:[text-wrap:balance] mb-6 sm:mb-7">
                Happy Birthday,{' '}
                <span className="max-sm:block italic text-[#8A5A2B] dark:text-[#D1A97A]">
                  {config.recipientName}.
                </span>
              </h1>

              <p className="text-base lg:text-lg leading-relaxed text-[#4C4742] dark:text-[#C5BDB2] max-w-xl mb-8 sm:mb-10">
                {config.heroDedication}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 sm:pt-4">
              <a
                href="#letter"
                className="inline-flex items-center justify-between sm:justify-center gap-2.5 px-6 sm:px-7 py-4 sm:py-3.5 text-sm font-medium bg-[#181615] text-[#FAF8F4] dark:bg-[#F4EFE6] dark:text-[#11100F] hover:bg-[#312C29] dark:hover:bg-[#E4DDD1] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8A5A2B]"
              >
                <span>Read My Letter</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onToggleAudio}
                aria-pressed={isAudioPlaying}
                className="inline-flex items-center justify-between sm:justify-center flex-row-reverse sm:flex-row gap-2.5 px-6 py-4 sm:py-3.5 text-sm font-medium border border-stone-300 dark:border-stone-700 text-[#181615] dark:text-[#F4EFE6] hover:border-[#8A5A2B] dark:hover:border-[#C69C6D] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A2B]"
              >
                {isAudioPlaying ? (
                  <>
                    <Volume2 className="w-4 h-4 text-[#8A5A2B] dark:text-[#D1A97A]" aria-hidden="true" />
                    <span>Pause Melody</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-[#6B655E] dark:text-[#A39A8E]" aria-hidden="true" />
                    <span>Play Gentle Melody</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-5 flex flex-col">
            <figure className="flex-1 flex flex-col bg-[#F2EFE9] dark:bg-[#1A1816] border border-stone-200/90 dark:border-stone-800 p-2.5 sm:p-3">
              <div className="relative flex-1 aspect-[4/5] sm:aspect-auto sm:min-h-[380px] lg:min-h-[500px] overflow-hidden bg-stone-200 dark:bg-stone-800">
                <ResilientImage
                  src={HERO_IMAGE_PATH}
                  alt={`${config.senderName} and ${config.recipientName} together under a canopy of festival lights`}
                  title={`${config.senderName} & ${config.recipientName}`}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
              <figcaption className="pt-3 pb-1 px-1 flex items-center justify-between gap-4 text-xs text-[#6B655E] dark:text-[#A39A8E]">
                <span className="font-editorial italic text-sm text-[#181615] dark:text-[#F4EFE6]">
                  A Toast to You Tonight
                </span>
                <span className="font-mono-tabular shrink-0">{config.locationLabel}</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Full-Width 4-Column Couple Details Strip */}
        <div className="mt-10 sm:mt-12 lg:mt-16 py-7 sm:py-8 border-t border-b border-stone-200 dark:border-stone-800 grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-7 sm:gap-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#6B655E] dark:text-[#A39A8E] mb-1.5">
              For
            </p>
            <p className="font-editorial text-[1.75rem] sm:text-3xl leading-9 font-medium text-[#181615] dark:text-[#F4EFE6]">
              {config.recipientName}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#6B655E] dark:text-[#A39A8E] mb-1.5">
              With Love From
            </p>
            <p className="font-editorial text-[1.75rem] sm:text-3xl leading-9 font-medium text-[#8A5A2B] dark:text-[#D1A97A]">
              {config.senderName}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#6B655E] dark:text-[#A39A8E] mb-1.5">
              Together
            </p>
            <p className="font-editorial text-[clamp(1.05rem,5.4vw,1.5rem)] sm:text-3xl leading-9 whitespace-nowrap font-medium text-[#181615] dark:text-[#F4EFE6] font-mono-tabular">
              {config.yearsTogether}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#6B655E] dark:text-[#A39A8E] mb-1.5">
              Celebration
            </p>
            <p className="font-editorial text-[clamp(1.05rem,5.4vw,1.5rem)] sm:text-3xl leading-9 whitespace-nowrap font-medium text-[#181615] dark:text-[#F4EFE6] font-mono-tabular">
              {config.celebrationDate}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
