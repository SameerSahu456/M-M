import { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export function ResilientImage({ src, alt, title, className = '' }: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F2EFE9] via-[#EAE4DA] to-[#DFD7CA] dark:from-[#1F1C19] dark:via-[#191614] dark:to-[#13110F] text-[#6B655E] dark:text-[#A39A8E] p-8 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          className="w-8 h-8 mb-3 opacity-60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="16" rx="1" />
          <path d="M3 16l5-5 4 4 3-3 6 6" />
          <circle cx="8.5" cy="9" r="1.25" />
        </svg>
        <p className="font-editorial italic text-lg text-[#181615] dark:text-[#F4EFE6]">
          {title || alt}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
