import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProductCard } from "./ProductCard";
import { NEW_ARRIVALS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

interface MostLovedTabsProps {
  tabs: { 
    id: string; 
    label: string; 
    products: { 
      id: string; 
      name: string; 
      price: string; 
      oldPrice: string; 
      image: string; 
      hoverImage?: string; 
    }[] 
  }[];
}

export function MostLovedTabs({ tabs }: MostLovedTabsProps) {
  return (
    <Tabs defaultValue={tabs[0].id} className="w-full">
      <div className="flex justify-center mb-10 overflow-x-auto scrollbar-hide">
        <TabsList className="bg-transparent border-b rounded-none h-auto p-0 gap-4 md:gap-8 flex-nowrap">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent pb-4 px-0 font-medium text-sm md:text-base uppercase tracking-wider transition-all whitespace-nowrap"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <AnimatePresence mode="wait">
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-[15px]"
            >
              {tab.products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  {...product} 
                />
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </AnimatePresence>
    </Tabs>
  );
}
