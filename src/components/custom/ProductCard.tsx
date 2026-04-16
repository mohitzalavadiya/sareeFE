"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { getWhatsAppUrl, getProductInquiryMessage } from "@/lib/whatsapp";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  isTrending?: boolean;
}

export function ProductCard({ id, name, price, image, category, isTrending }: ProductCardProps) {
  const whatsappUrl = getWhatsAppUrl(getProductInquiryMessage(name, price));

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden border-none shadow-md group">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {isTrending && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
              Trending
            </Badge>
          )}
          <button className="absolute top-3 right-3 h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart size={18} />
          </button>
        </div>
        <CardContent className="p-4 bg-white">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
            {category}
          </p>
          <h3 className="font-serif text-lg font-semibold line-clamp-1 mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-primary font-bold text-xl">{price}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 bg-white grid grid-cols-2 gap-2">
          <Link 
            href={`/product/${id}`} 
            className="flex h-9 w-full items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            View Details
          </Link>
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex h-9 w-full items-center justify-center rounded-md bg-[#25D366] px-3 text-xs font-medium text-white hover:bg-[#1fb355] transition-colors gap-1"
          >
            <MessageCircle size={14} /> Buy
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
