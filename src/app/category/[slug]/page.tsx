"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/custom/ProductCard";
import { CATEGORIES, NEW_ARRIVALS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Filter, ChevronDown, LayoutGrid, List } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeader } from "@/components/custom/SectionHeader";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = CATEGORIES.find((c) => c.slug === slug) || { name: "All Collection", slug: "all" };

  // Filter states
  const [selectedFabric, setSelectedFabric] = useState<string[]>([]);
  
  const fabrics = ["Silk", "Organza", "Chiffon", "Georgette", "Net"];
  const occasions = ["Bridal", "Party Wear", "Festival", "Casual"];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Header */}
      <div className="mb-16">
        <SectionHeader title={`${category.name}`} centered={true} subtitle={`Browse our exquisite selection of ${category.name.toLowerCase()}, handcrafted with love and tradition in Surat.`} />
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 border-b pb-4">Filter By</h3>
            <Accordion multiple={true} defaultValue={["price", "fabric"]} className="border-b">
              <AccordionItem value="price" className="border-none">
                <AccordionTrigger className="text-xs font-bold uppercase tracking-widest hover:no-underline py-4">Price</AccordionTrigger>
                <AccordionContent>
                   <div className="space-y-3 pt-2">
                     {["Under ₹5000", "₹5000 - ₹10000", "₹10000 - ₹20000", "Over ₹20000"].map(range => (
                        <label key={range} className="flex items-center gap-3 text-sm cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 border-gray-300 rounded-none focus:ring-black checked:bg-black" />
                          <span className="group-hover:text-black transition-colors">{range}</span>
                        </label>
                     ))}
                   </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fabric" className="border-none">
                <AccordionTrigger className="text-xs font-bold uppercase tracking-widest hover:no-underline py-4">Fabric</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {fabrics.map((f) => (
                      <label key={f} className="flex items-center gap-3 text-sm cursor-pointer group">
                         <input type="checkbox" className="w-4 h-4 border-gray-300 rounded-none focus:ring-black checked:bg-black" />
                         <span className="group-hover:text-black transition-colors">{f}</span>
                      </label>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-grow">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4 border-y py-4">
            <p className="text-xs uppercase tracking-widest font-medium">{NEW_ARRIVALS.length * 2} products</p>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Sheet>
              <SheetTrigger
                render={
                  <Button variant="outline" size="sm" className="lg:hidden gap-2 rounded-none border-black uppercase text-[10px] font-bold tracking-widest px-4">
                    <Filter size={12} /> Filters
                  </Button>
                }
              />
                <SheetContent side="left" className="w-[300px]">
                  <SheetTitle className="uppercase tracking-widest font-serif mb-8">Filter & Sort</SheetTitle>
                  <div className="py-6">Sidebar filters content...</div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-[10px] uppercase font-bold tracking-widest hidden sm:block">Sort by:</span>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-[140px] sm:w-[160px] rounded-none border-none shadow-none uppercase text-[10px] font-bold tracking-widest focus:ring-0">
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-black">
                    <SelectItem value="featured" className="text-[10px] uppercase font-bold tracking-widest">Featured</SelectItem>
                    <SelectItem value="newest" className="text-[10px] uppercase font-bold tracking-widest">Newest</SelectItem>
                    <SelectItem value="price-low" className="text-[10px] uppercase font-bold tracking-widest">Price: Low-High</SelectItem>
                    <SelectItem value="price-high" className="text-[10px] uppercase font-bold tracking-widest">Price: High-Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-8">
            {[...NEW_ARRIVALS, ...NEW_ARRIVALS].map((product, i) => (
              <ProductCard key={`${product.id}-${i}`} {...product} category={category.name} />
            ))}
          </div>
          
          <div className="mt-24 flex justify-center border-t pt-12">
            <Button variant="outline" size="lg" className="rounded-none border-black px-16 uppercase text-xs font-bold tracking-[0.2em] h-14 hover:bg-black hover:text-white transition-all">
              Load More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

