"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Menu, X, Search, Heart, User, ShoppingBag, 
  Facebook, Instagram, Twitter, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "SHOP", href: "/category/all" },
  { name: "NEW ARRIVALS", href: "/category/new-arrivals" },
  { name: "BOOK VIDEO CALL", href: "/booking" },
  { name: "SAREE COLLECTIONS", href: "/category/sarees" },
  { name: "GEORGETTE SUITS", href: "/category/georgette-suits" },
  { name: "EDITOR'S PICKS", href: "/category/editors-picks" },
];



export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* Top Bar */}
      <div className="bg-[#8B0000] text-white py-2.5 px-4 md:px-8 flex items-center justify-center text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em]">
         FREE SHIPPING ON ALL ORDERS | VIDEO CALL AVAILABLE
      </div>

      {/* Primary Navbar */}
      <nav className="border-b">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 h-[92px] flex items-center justify-between relative">
          
          {/* Left: Menu & Search */}
          <div className="flex items-center gap-6">
             <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger
                  render={
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-6 w-6" />
                    </Button>
                  }
                />
                <SheetContent side="left" className="w-[300px] p-0">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <div className="flex flex-col space-y-0 pt-10">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="p-6 border-b text-[12px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
              
              <button className="text-black hover:opacity-70 transition-opacity">
                <Search size={22} strokeWidth={1.25} />
              </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Link href="/" className="flex flex-col items-center pointer-events-auto">
              <span className="text-2xl md:text-[32px] font-serif font-bold tracking-[0.05em] text-black leading-none uppercase">SPEEDO SAREES</span>
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-5 md:space-x-7">
            <button className="hidden sm:block text-black hover:opacity-70 transition-opacity">
              <User size={22} strokeWidth={1.25} />
            </button>
            <button className="text-black hover:opacity-70 transition-opacity relative">
              <ShoppingBag size={22} strokeWidth={1.25} />
              <span className="absolute -bottom-1 -right-1 bg-black text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-bold">0</span>
            </button>
          </div>
        </div>

        {/* Desktop Bottom Menu */}
        <div className="hidden md:flex justify-center border-t py-4">
           <div className="flex items-center space-x-10">
             {navLinks.map((link) => (
               <Link
                 key={link.name}
                 href={link.href}
                 className="text-[12px] font-medium tracking-[0.15em] text-black hover:text-[#8B0000] transition-colors uppercase"
               >
                 {link.name}
               </Link>
             ))}
           </div>
        </div>
      </nav>
    </header>
  );
}

