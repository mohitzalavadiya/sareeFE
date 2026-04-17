"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Wedding Collection",
    subtitle: "Celebrate Love. Discover Our Wedding Collection",
    image: "/images/new-main-banner-1.webp",
    cta: "SHOP NOW",
    href: "/category/bridal",
  },
  {
    id: 2,
    title: "Fancy Sarees Collection",
    subtitle: "Elegance Redefined. Explore Our Fancy Sarees.",
    image: "/images/new-main-banner-2.webp",
    cta: "SHOP NOW",
    href: "/category/silk",
  },
  {
    id: 3,
    title: "Traditional Beauty",
    subtitle: "Explore Our Lehengas & Cholis.",
    image: "/images/new-main-banner-3.webp",
    cta: "SHOP NOW",
    href: "/category/bridal",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-[#fef3f2]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="relative h-full w-full"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            priority
            className="object-cover object-center"
          />
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/5" />
          
          <div className="container relative z-10 mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 text-gray-900 tracking-tight">
                {slides[current].title}
              </h1>
              <p className="text-sm md:text-lg mb-10 text-gray-700 font-sans tracking-wide">
                {slides[current].subtitle}
              </p>
              <Link href={slides[current].href}>
                <Button className="bg-black text-white hover:bg-gray-900 px-10 py-6 text-xs tracking-[0.2em] font-bold rounded-none">
                  {slides[current].cta}
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full border border-gray-400 transition-all ${
              current === i ? "bg-black scale-110" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
