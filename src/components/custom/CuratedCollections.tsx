import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CollectionItem {
  title: string;
  image: string;
  buttonText: string;
}

interface CuratedCollectionsProps {
  items: CollectionItem[];
}

export function CuratedCollections({ items }: CuratedCollectionsProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px]">
        {items.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group flex flex-col"
          >
            {/* Dawn Standard Image Block */}
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#f3f3f3] mb-3">
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
              />
            </div>
            
            {/* Align text similarly to Dawn collection-list */}
            <div className="flex flex-col items-center justify-center text-center mt-2 px-2 pb-2">
              <h3 className="text-[17px] md:text-[20px] font-sans font-medium text-[#121212] mb-3">
                {item.title}
              </h3>
              <Link 
                href={`/category/${item.title.toLowerCase().replace(/[\s|]+/g, '-')}`}
                className="bg-black text-white px-6 py-2.5 text-[12px] md:text-[13px] font-medium transition-colors hover:bg-gray-800"
              >
                {item.buttonText}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
