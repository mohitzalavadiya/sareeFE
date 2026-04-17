"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  image: string;
  slug: string;
  index: number;
}

export function CategoryCard({ name, image, slug, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col"
    >
      <Link href={`/category/${slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#f3f3f3] mb-4">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col items-center text-center px-2 pb-4">
          <h3 className="text-[#121212] text-[18px] md:text-[22px] font-sans font-medium mb-4">
            {name}
          </h3>
          <div className="inline-block bg-white text-black border-2 border-black px-8 py-2.5 text-[12px] font-bold uppercase tracking-widest transition-all duration-300 group-hover:bg-black group-hover:text-white">
            Shop Now
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
