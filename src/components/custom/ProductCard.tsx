"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
  hoverImage?: string;
  category?: string;
  isTrending?: boolean;
}

export function ProductCard({ id, name, price, oldPrice, image, hoverImage }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col h-full bg-white"
    >
      <Link href={`/product/${id}`} className="flex flex-col h-full">
        <div className="relative aspect-[2/3] overflow-hidden bg-[#f4f4f4] mb-3 md:mb-4 group/image">
          {/* Secondary Hover Image */}
          {hoverImage && (
            <Image
              src={hoverImage}
              alt={`${name} hover view`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
            />
          )}

          {/* Primary Image */}
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover transition-all duration-[600ms] ease-out group-hover:scale-105 ${
              hoverImage ? "group-hover/image:opacity-0 relative z-10" : ""
            }`}
          />
          
          {/* Sale Badge: Dawn Theme style (Bottom Left) */}
          {oldPrice && (
            <div className="absolute bottom-3 left-3 bg-[#f25e41] text-white text-[11px] font-semibold px-2.5 py-1 tracking-wider leading-none rounded-[2px] uppercase z-20">
              Sale
            </div>
          )}
        </div>

        <div className="flex flex-col text-left px-1">
          <h3 className="text-[13px] md:text-[15px] font-normal font-sans leading-[1.3] text-[#121212] hover:underline mb-1.5 md:mb-2 line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center gap-1.5 md:gap-2 mt-auto">
            {oldPrice ? (
               <>
                 <span className="text-[13px] md:text-[14px] text-[#121212] font-normal line-through opacity-70">{oldPrice}</span>
                 <span className="text-[13px] md:text-[14px] font-semibold text-[#121212]">{price}</span>
               </>
            ) : (
               <span className="text-[13px] md:text-[14px] font-normal text-[#121212]">{price}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

