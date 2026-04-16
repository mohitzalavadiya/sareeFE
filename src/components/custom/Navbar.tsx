"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { SHOP_DETAILS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/#categories" },
  { name: "Trending", href: "/#trending" },
  { name: "Video Call", href: "/booking" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-serif font-bold tracking-tighter text-primary">
            ROYAL<span className="text-accent italic font-light">Saree</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
          <Button variant="default" size="sm" className="bg-primary text-white hover:bg-primary/90">
            Book Appointment
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-2 md:hidden">
          <Link href="/booking">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="text-left font-serif text-2xl mb-6">Royal Saree Boutique</SheetTitle>
              <nav className="flex flex-col space-y-4 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium border-b pb-2 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">{SHOP_DETAILS.address}</p>
                  <Button className="w-full" onClick={() => setIsOpen(false)}>
                    Close Menu
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
