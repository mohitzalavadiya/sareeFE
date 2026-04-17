"use client";

import React from "react";
import { Truck, Headset, HandCoins, CreditCard } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "FREE SHIPPING",
  },
  {
    icon: Headset,
    title: "SUPPORT 24/7",
  },
  {
    icon: HandCoins,
    title: "100% MONEY BACK",
  },
  {
    icon: CreditCard,
    title: "SECURE PAYMENTS",
  },
];

export function Features() {
  return (
    <section className="bg-white py-12 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center space-y-4 group cursor-default"
            >
              <div className="text-gray-900 group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={32} strokeWidth={1} />
              </div>
              <h3 className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-gray-800 uppercase">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
