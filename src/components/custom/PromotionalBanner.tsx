import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface PromotionalBannerProps {
  image: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  height?: string;
}

export function PromotionalBanner({ image, title, subtitle, buttonText = "SHOP NOW", height = "h-[450px] md:h-[600px]" }: PromotionalBannerProps) {
  return (
    <section className={`relative ${height} w-full overflow-hidden group`}>
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-[4000ms] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-all duration-1000" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="max-w-[1440px] mx-auto"
        >
          <h2 className="text-[32px] md:text-[52px] font-serif font-bold mb-6 uppercase tracking-[0.1em] leading-tight drop-shadow-lg">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[14px] md:text-[18px] font-medium mb-10 max-w-2xl mx-auto uppercase tracking-[0.2em] opacity-95">
              {subtitle}
            </p>
          )}
          <Link 
            href="/category/all"
            className="inline-block bg-white text-black px-14 py-4 text-[12px] font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:bg-black hover:text-white border-2 border-white"
          >
            {buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
