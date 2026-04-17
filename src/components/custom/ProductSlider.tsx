import React from "react";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductSliderProps {
  products: any[];
}

export function ProductSlider({ products }: ProductSliderProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/slider">
      <div 
        ref={scrollRef}
        className="flex gap-[15px] overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6"
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[75%] sm:min-w-[45%] lg:min-w-[calc(25%-11.25px)] xl:min-w-[calc(25%-11.25px)] snap-start">
            <ProductCard {...product} category={product.category || "Collection"} />
          </div>
        ))}
      </div>
      
      {/* Arrows: Desktop Only */}
      <button 
        onClick={() => scroll("left")}
        className="absolute left-4 top-[40%] -translate-y-1/2 bg-white/90 border border-gray-100 shadow-md p-3 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center hover:bg-black hover:text-white z-10"
        aria-label="Previous"
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>
      <button 
        onClick={() => scroll("right")}
        className="absolute right-4 top-[40%] -translate-y-1/2 bg-white/90 border border-gray-100 shadow-md p-3 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center hover:bg-black hover:text-white z-10"
        aria-label="Next"
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
