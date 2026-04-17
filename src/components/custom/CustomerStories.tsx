import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";

interface Story {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
  product: {
    name: string;
    price: string;
    thumbnail: string;
    link: string;
  };
}

interface CustomerStoriesProps {
  stories: Story[];
}

export function CustomerStories({ stories }: CustomerStoriesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative max-w-[1540px] mx-auto group">
      {/* Navigation Arrows */}
      <button 
        onClick={() => scroll("left")}
        className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100 hidden md:flex"
      >
        <ChevronLeft size={24} className="text-gray-400" />
      </button>

      <div 
        ref={scrollRef}
        className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 md:px-0 pb-12"
      >
        {stories.map((story) => (
          <motion.div 
            key={story.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="min-w-[90vw] md:min-w-[700px] lg:min-w-[850px] snap-center bg-white border border-[#e8e8e8] flex flex-col md:flex-row overflow-hidden"
          >
            {/* Persona Image (Left) */}
            <div className="md:w-[45%] relative aspect-square md:aspect-auto">
              <Image 
                src={story.image} 
                alt={story.name} 
                fill 
                className="object-cover"
              />
            </div>

            {/* Content Section (Right) */}
            <div className="flex-1 p-6 md:p-10 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[20px] md:text-[24px] font-sans font-medium text-[#121212]">
                  {story.name}
                </h3>
              </div>

              <div className="flex items-center gap-2 mb-6">
                 <div className="flex items-center justify-center w-4 h-3.5 bg-gray-100 rounded-[2px]">
                    <Check size={10} className="text-black stroke-[4px]" />
                 </div>
                 <span className="text-[13px] md:text-[14px] text-[#121212] opacity-70 italic font-sans">
                  {story.role}
                 </span>
              </div>

              <p className="text-[15px] md:text-[17px] leading-[1.8] text-[#121212] opacity-80 font-sans mb-10 flex-grow">
                {story.content}
              </p>

              <div className="border-t border-[#e8e8e8] pt-8 mt-auto">
                <Link href={story.product.link} className="flex items-center gap-4 group/prod">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-[#e8e8e8]">
                    <Image 
                      src={story.product.thumbnail} 
                      alt={story.product.name} 
                      fill 
                      className="object-cover group-hover/prod:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] md:text-[14px] text-[#121212] font-medium leading-tight mb-1 line-clamp-1 group-hover/prod:underline uppercase tracking-tight">
                      {story.product.name}
                    </span>
                    <span className="text-[15px] md:text-[16px] text-[#121212] font-semibold">
                      {story.product.price}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button 
        onClick={() => scroll("right")}
        className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100 hidden md:flex"
      >
        <ChevronRight size={24} className="text-gray-400" />
      </button>
    </div>
  );
}
