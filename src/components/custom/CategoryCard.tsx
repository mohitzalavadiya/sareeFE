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
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative aspect-square overflow-hidden rounded-2xl group"
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-white text-2xl font-serif font-bold mb-2">{name}</h3>
        <Link
          href={`/category/${slug}`}
          className="inline-flex items-center text-accent font-medium hover:underline gap-2"
        >
          Explore Collection <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
