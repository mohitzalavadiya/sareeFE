"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/custom/ProductCard";
import { CATEGORIES, TRENDING_PRODUCTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider"; // Note: I need to add this shadcn component
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

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = CATEGORIES.find((c) => c.slug === slug) || { name: "All Collection", slug: "all" };

  // Filter states
  const [priceRange, setPriceRange] = useState([5000, 50000]);
  const [selectedFabric, setSelectedFabric] = useState<string[]>([]);
  
  const fabrics = ["Silk", "Organza", "Chiffon", "Georgette", "Net"];
  const occasions = ["Bridal", "Party Wear", "Festival", "Casual"];
  const colors = ["Red", "Gold", "Pink", "Blue", "Cream"];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 capitalize">
          {category.name} <span className="text-accent italic">Sarees</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Browse our exquisite selection of {category.name.toLowerCase()} sarees, handcrafted with love and tradition in Surat.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-6">Filter By</h3>
            <Accordion multiple defaultValue={["price", "fabric", "occasion", "color"]}>
              <AccordionItem value="price">
                <AccordionTrigger className="font-medium">Price Range</AccordionTrigger>
                <AccordionContent className="pt-4 px-2">
                   <div className="space-y-4">
                     <div className="flex justify-between text-sm">
                       <span>₹{priceRange[0]}</span>
                       <span>₹{priceRange[1]}</span>
                     </div>
                     {/* Note: I'll use a simple range for now or just text inputs if slider is missing */}
                     <div className="h-2 w-full bg-accent/20 rounded-full relative">
                        <div className="absolute inset-x-0 h-full bg-accent rounded-full" />
                     </div>
                   </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fabric">
                <AccordionTrigger className="font-medium">Fabric Type</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {fabrics.map((f) => (
                      <Badge 
                        key={f} 
                        variant={selectedFabric.includes(f) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedFabric(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])}
                      >
                        {f}
                      </Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="occasion">
                <AccordionTrigger className="font-medium">Occasion</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                   {occasions.map(o => (
                     <label key={o} className="flex items-center gap-2 text-sm cursor-pointer">
                       <input type="checkbox" className="rounded border-gray-300 text-primary" />
                       {o}
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
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 border-b pb-6">
            <p className="text-muted-foreground">Showing 12 of 48 products</p>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Sheet>
                <SheetTrigger render={(
                  <Button variant="outline" size="sm" className="lg:hidden gap-2" />
                )}>
                  <Filter size={16} /> Filters
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetTitle>Filters</SheetTitle>
                  {/* Filters content for mobile */}
                  <div className="py-6">Sidebar filters would go here...</div>
                </SheetContent>
              </Sheet>

              <Select defaultValue="featured">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Using trending products for category too for demo */}
            {TRENDING_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
            {TRENDING_PRODUCTS.map((product) => (
              <ProductCard key={`extra-${product.id}`} {...product} />
            ))}
          </div>
          
          <div className="mt-16 flex justify-center">
            <Button variant="outline" size="lg" className="px-12">
              Load More Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
