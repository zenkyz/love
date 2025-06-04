"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const poem = `Vivemos em lados diferentes do céu,
mas quando nos cruzamos,
até o tempo respeita.

O eclipse acontece
breve, silencioso, perfeito.
E mesmo depois que passa,
fica um rastro de luz
que só a gente entende.

Você ilumina quando tudo é sombra.
E eu te espero,
sempre que o céu disser que é hora.`;

// Generate deterministic star positions to avoid hydration mismatch
const starPositions = Array.from({ length: 40 }, (_, i) => {
  const angle = (i / 40) * Math.PI * 2;
  const radius = 30 + (i % 3) * 15;
  return {
    top: Math.round((Math.sin(angle) * radius + 50) * 100) / 100,
    left: Math.round((Math.cos(angle) * radius + 50) * 100) / 100,
    opacity: (0.6 + (i % 5) * 0.08).toFixed(2),
    duration: 2 + (i % 4),
    scale: 0.8 + (i % 3) * 0.2,
  };
});

export default function Home() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [audioMuted, setAudioMuted] = useState(true);
  const [showExtraStars, setShowExtraStars] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const unmuteAudio = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"unMute","args":""}',
        "*"
      );
      setAudioMuted(false);
    }
  };

  const muteAudio = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"mute","args":""}',
        "*"
      );
      setAudioMuted(true);
    }
  };

  const handleStarClick = () => {
    console.log('Star clicked!');
    setShowSurprise(true);
    setShowExtraStars(true);
    unmuteAudio();
  };

  useEffect(() => {
    if (iframeRef.current) {
      muteAudio();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b2735] to-[#090a0f] text-white overflow-hidden relative">
      {/* Starry background */}
      {starPositions.map((pos, i) => (
        <span
          key={i}
          className="absolute text-4xl text-yellow-300 star"
          style={{
            top: `${pos.top}vh`,
            left: `${pos.left}vw`,
            animation: `${i % 2 ? 'blink-slow' : 'blink-fast'} ${pos.duration}s ease-in-out infinite`,
            opacity: pos.opacity,
            transform: `translate(-50%, -50%) scale(${pos.scale})`,
          }}
          aria-hidden="true"
        >
          ⭐
        </span>
      ))}

      {/* Main content */}
      <main className="container max-w-4xl mx-auto px-4 py-4 relative z-10 flex flex-col items-center text-center min-h-screen justify-between">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          Do Sol pra minha querida Lua
        </h1>

        <div className="w-full max-w-[600px] aspect-[3/2] relative mb-8">
          <Image
            src="https://i.imgur.com/HkCwsmp.jpg"
            alt="Foto do casal"
            fill
            sizes="(max-width: 600px) 100vw, 600px"
            className="rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.4)] object-cover"
            priority
          />
        </div>

        <div className="my-8 relative z-20 flex flex-col items-center">
          <p className="text-xl mb-6 text-yellow-100 animate-pulse">Clique na estrela para ver a surpresa ✨</p>
          <button
            onClick={handleStarClick}
            className="group relative p-16 bg-transparent border-none cursor-pointer rounded-full hover:bg-yellow-500/10 transition-colors"
            aria-label="Mostrar seção surpresa"
          >
            <div className="absolute inset-0 animate-ping opacity-75 text-8xl text-yellow-300 star flex items-center justify-center pointer-events-none">⭐</div>
            <span className="text-8xl relative animate-pulse group-hover:scale-125 transition-transform duration-300 text-yellow-300 star group-hover:text-yellow-200 block">
              ⭐
            </span>
          </button>
        </div>

        {showSurprise && (
          <>
            <section
              className="mt-8 animate-fadeIn transition-opacity duration-700"
              aria-live="polite"
              aria-atomic="true"
            >
              <Image
                src="https://i.imgur.com/u4Zyf76.jpg"
                alt="Foto especial do casal"
                width={600}
                height={600}
                className="rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.4)] mb-8"
                loading="lazy"
              />
              <div
                className="bg-white/15 p-6 rounded-xl font-italic whitespace-pre-line shadow-[0_0_10px_rgba(255,255,255,0.3)] max-w-2xl mx-auto"
                tabIndex={0}
              >
                {poem}
              </div>
            </section>
            {showExtraStars && (
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[...Array(20)].map((_, i) => (
                  <span
                    key={i}
                    className="text-4xl text-yellow-300 star"
                    style={{
                      animation: `${i % 2 ? 'blink-slow' : 'blink-fast'} ${2 + (i % 3)}s ease-in-out infinite`,
                      opacity: (0.5 + (i % 5) * 0.1).toFixed(2),
                      transform: `translate(-50%, -50%) scale(${0.8 + (i % 3) * 0.2})`,
                    }}
                    aria-hidden="true"
                  >
                    ⭐
                  </span>
                ))}
              </div>
            )}
          </>
        )}

        <iframe
          ref={iframeRef}
          width="0"
          height="0"
          src="https://www.youtube.com/embed/ggG9ySCChYw?autoplay=1&loop=1&playlist=ggG9ySCChYw&mute=1&enablejsapi=1"
          title="Softcore the neighborhoounds"
          allow="autoplay"
          className="hidden"
        />
      </main>

      <footer className="text-center text-white/50 mt-12 mb-6 text-sm">
        Feito com ❤️ por você
      </footer>
    </div>
  );
}
