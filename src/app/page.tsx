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
const starPositions = Array.from({ length: 30 }, (_, i) => ({
  top: Math.round((i * 3.33 + Math.sin(i) * 20) * 100) / 100,
  left: Math.round((i * 3.33 + Math.cos(i) * 30) * 100) / 100,
  delay: Math.round(i * 0.15 * 100) / 100,
}));

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
          className={`absolute text-2xl animate-${i % 2 ? "blink-slow" : "blink-fast"}`}
          style={{
            top: `${pos.top}vh`,
            left: `${pos.left}vw`,
            animationDelay: `${pos.delay}s`,
          }}
          aria-hidden="true"
        >
          {i % 2 === 0 ? "⭐" : "✨"}
        </span>
      ))}

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          Do Sol pra minha querida Lua
        </h1>

        <Image
          src="https://i.imgur.com/HkCwsmp.jpg"
          alt="Foto do casal"
          width={800}
          height={600}
          style={{ width: "auto", height: "auto" }}
          className="rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.4)] mb-8"
          priority
        />

        <div className="my-12">
          <button
            onClick={handleStarClick}
            className="text-6xl animate-pulse hover:scale-125 transition-transform duration-300 bg-transparent border-none cursor-pointer drop-shadow-[0_0_5px_rgba(255,255,255,1)] hover:drop-shadow-[0_0_15px_rgba(255,255,255,1)] focus:outline-none focus:ring-4 focus:ring-white rounded"
            aria-label="Mostrar seção surpresa"
          >
            ⭐
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
                    className={`text-2xl animate-${i % 2 ? "blink-slow" : "blink-fast"}`}
                    aria-hidden="true"
                  >
                    {i % 2 === 0 ? "⭐" : "✨"}
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
