/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { CakeCeremonySection } from './components/CakeCeremonySection';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { GuestbookSection } from './components/GuestbookSection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LightboxModal } from './components/LightboxModal';
import { TimelineSection } from './components/TimelineSection';
import { TributeLetterSection } from './components/TributeLetterSection';
import {
  DEFAULT_TRIBUTE_CONFIG,
  GALLERY_ITEMS,
  INITIAL_WISHES,
  MILESTONE_CHAPTERS,
} from './data/defaultTribute';
import { BirthdayWish, GalleryItem } from './types/tribute';
import { ambientAudio } from './utils/ambientAudio';

const WISHES_STORAGE_KEY = 'mansi_shubh_wishes_v4';
const KISSES_STORAGE_KEY = 'mansi_shubh_kisses_v4';

function loadInitialWishes(): BirthdayWish[] {
  try {
    const stored = localStorage.getItem(WISHES_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Fall back to defaults
  }
  return INITIAL_WISHES;
}

export default function App() {
  const config = DEFAULT_TRIBUTE_CONFIG;
  const [wishes, setWishes] = useState<BirthdayWish[]>(loadInitialWishes);
  const [kissesCount, setKissesCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(KISSES_STORAGE_KEY);
      return stored ? Number(stored) || 1 : 1;
    } catch {
      return 1;
    }
  });
  // Starts normal (unlit/light theme); lighting the candle turns theme dark and shows cake section
  const [candleLit, setCandleLit] = useState(false);
  const [showCakeSection, setShowCakeSection] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (candleLit) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Keep the mobile browser chrome in step with the room's light
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', candleLit ? '#11100F' : '#FAF8F4');
  }, [candleLit]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(wishes));
    } catch {
      // Ignore storage failures
    }
  }, [wishes]);

  useEffect(() => {
    try {
      localStorage.setItem(KISSES_STORAGE_KEY, String(kissesCount));
    } catch {
      // Ignore storage failures
    }
  }, [kissesCount]);

  useEffect(() => {
    return () => {
      ambientAudio.stop();
    };
  }, []);

  const scrollToCake = () => {
    window.setTimeout(() => {
      const el = document.getElementById('cake-ceremony');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 60);
  };

  const handleLightCandle = () => {
    setCandleLit(true);
    setShowCakeSection(true);
    scrollToCake();
  };

  const handleBlowCandle = () => {
    setCandleLit(false);
  };

  const handleToggleCandle = () => {
    if (candleLit) {
      handleBlowCandle();
    } else {
      handleLightCandle();
    }
  };

  const handleToggleAudio = () => {
    const playing = ambientAudio.toggle();
    setIsAudioPlaying(playing);
  };

  const handleToggleCherish = (id: string) => {
    setWishes((prev) =>
      prev.map((wish) => {
        if (wish.id !== id) return wish;
        const nextCherished = !wish.cherished;
        return {
          ...wish,
          cherished: nextCherished,
          cherishCount: nextCherished ? wish.cherishCount + 1 : Math.max(0, wish.cherishCount - 1),
        };
      })
    );
  };

  const handleNavigateLightbox = (direction: -1 | 1) => {
    if (!selectedPhoto) return;
    const currentIndex = GALLERY_ITEMS.findIndex((item) => item.id === selectedPhoto.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setSelectedPhoto(GALLERY_ITEMS[nextIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#181615] dark:bg-[#11100F] dark:text-[#F4EFE6] transition-colors duration-300">
      <Header
        brandTitle={config.brandTitle}
        tagline={`From ${config.senderName} to ${config.recipientName} · ${config.celebrationDate}`}
        candleLit={candleLit}
        onToggleCandle={handleToggleCandle}
      />

      <main className="flex-1">
        <HeroSection
          config={config}
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={handleToggleAudio}
        />

        <TributeLetterSection
          config={config}
          kissesCount={kissesCount}
          candleLit={candleLit}
          onSendKiss={() => setKissesCount((c) => c + 1)}
          onToggleCandle={handleToggleCandle}
        />

        {showCakeSection && (
          <CakeCeremonySection
            config={config}
            candleLit={candleLit}
            cakeCut={cakeCut}
            onBlowCandle={handleBlowCandle}
            onLightCandle={handleLightCandle}
            onCutCake={() => setCakeCut(true)}
            onResetCake={() => setCakeCut(false)}
          />
        )}

        <GallerySection items={GALLERY_ITEMS} onSelectPhoto={setSelectedPhoto} />

        <TimelineSection chapters={MILESTONE_CHAPTERS} />

        <GuestbookSection
          recipientName={config.recipientName}
          senderName={config.senderName}
          wishes={wishes}
          onToggleCherish={handleToggleCherish}
        />
      </main>

      <Footer config={config} />

      <LightboxModal
        item={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onPrev={() => handleNavigateLightbox(-1)}
        onNext={() => handleNavigateLightbox(1)}
      />
    </div>
  );
}
