"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Volume2, VolumeX, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface Reel {
  id: string;
  videoUrl: string;
  title: string;
  description: string;
}

const REELS: Reel[] = [
  {
    id: "1",
    videoUrl: "/videos/reel-1.mp4",
    title: "Bridal Red Silk",
    description: "New arrival for the wedding season. Pure silk with hand zari work.",
  },
  {
    id: "2",
    videoUrl: "/videos/reel-2.mp4",
    title: "Designer Organza",
    description: "Lightweight and elegant floral organza for summer parties.",
  },
];

export function VideoReel() {
  const [activeReel, setActiveReel] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const index = Math.round(scrollRef.current.scrollTop / scrollRef.current.clientHeight);
    if (index !== activeReel) {
      setActiveReel(index);
    }
  };

  return (
    <div className="relative h-[600px] w-full max-w-[400px] mx-auto overflow-hidden rounded-3xl shadow-2xl bg-black">
      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {REELS.map((reel, index) => (
          <div key={reel.id} className="h-full w-full snap-start relative">
            {/* Video Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 flex items-center justify-center">
              {/* Note: User needs to place reel-x.mp4 in /public/videos/ */}
              <video
                src={reel.videoUrl}
                className="h-full w-full object-cover"
                autoPlay={index === activeReel}
                muted={isMuted}
                loop
                playsInline
              />
              
              {/* UI Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <h4 className="font-serif font-bold text-xl mb-1">{reel.title}</h4>
                <p className="text-sm text-white/80 line-clamp-2 mb-4">{reel.description}</p>
                <div className="flex gap-2">
                  <a
                    href={getWhatsAppUrl(`I saw the "${reel.title}" reel and I'm interested!`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grow flex h-9 items-center justify-center rounded-lg bg-[#25D366] text-white hover:bg-[#1fb355] font-medium transition-colors"
                  >
                    <MessageCircle size={16} className="mr-2" /> Inquire
                  </a>
                </div>
              </div>

              {/* Mute Control */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-4 right-4 h-10 w-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reel Indicators */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {REELS.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 rounded-full transition-all duration-300 ${
              i === activeReel ? "h-6 bg-accent" : "h-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        {!activeReel && <Play size={48} className="text-white fill-white/20" />}
      </div>
    </div>
  );
}
