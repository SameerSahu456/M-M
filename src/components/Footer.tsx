import { TributeConfig } from '../types/tribute';

interface FooterProps {
  config: TributeConfig;
}

export function Footer({ config }: FooterProps) {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-[#FAF8F4] dark:bg-[#11100F] py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-editorial text-xl font-medium text-[#181615] dark:text-[#F4EFE6]">
            {config.brandTitle}
          </p>
          <p className="text-xs text-[#6B655E] dark:text-[#A39A8E] mt-1">
            A birthday gift from {config.senderName} to {config.recipientName}{' '}
            <span aria-hidden="true">·</span> {config.celebrationDate}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-[#6B655E] dark:text-[#A39A8E]">
          <a
            href="#top"
            className="hover:text-[#181615] dark:hover:text-[#F4EFE6] transition-colors whitespace-nowrap shrink-0"
          >
            Back to Top
          </a>
          <a
            href="#letter"
            className="hover:text-[#181615] dark:hover:text-[#F4EFE6] transition-colors whitespace-nowrap shrink-0"
          >
            Letter
          </a>
          <a
            href="#moments"
            className="hover:text-[#181615] dark:hover:text-[#F4EFE6] transition-colors whitespace-nowrap shrink-0"
          >
            Our Moments
          </a>
          <a
            href="#wishes"
            className="hover:text-[#181615] dark:hover:text-[#F4EFE6] transition-colors whitespace-nowrap shrink-0"
          >
            Wishes
          </a>
        </div>
      </div>
    </footer>
  );
}
