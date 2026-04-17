import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface EditorsPickProps {
  items: {
    title: string;
    subtitle: string;
    image: string;
    buttonText: string;
  }[];
}

export function EditorsPicks({ items }: EditorsPickProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
      {items.map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[22/16] group overflow-hidden bg-[#f3f3f3]"
        >
          {/* Image Container */}
          <div className="absolute inset-0">
            <Image 
              src={item.image} 
              alt={item.title} 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
            />
          </div>

          {/* Text Overlay - Middle Right alignment per Shopify Dawn */}
          <div className="absolute inset-0 flex items-center justify-end p-6 md:p-12 pointer-events-none">
            <div className="max-w-[80%] text-left pointer-events-auto">
              <h3 className="text-[20px] md:text-[28px] font-sans font-medium text-white mb-2 leading-tight drop-shadow-sm">
                {item.title}
              </h3>
              <p className="text-[14px] md:text-[16px] text-white/95 font-sans font-normal mb-6 drop-shadow-sm">
                {item.subtitle}
              </p>
              <Link 
                href="/category/all"
                className="inline-block bg-white text-black px-6 md:px-8 py-3 text-[12px] md:text-[13px] font-medium uppercase tracking-wider transition-colors hover:bg-black hover:text-white"
              >
                {item.buttonText}
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
