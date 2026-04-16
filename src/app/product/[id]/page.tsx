"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { 
  MessageCircle, 
  Video, 
  Ruler, 
  Truck, 
  RotateCcw, 
  ShieldCheck,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/custom/ProductCard";
import { TRENDING_PRODUCTS, SHOP_DETAILS } from "@/lib/constants";
import { getWhatsAppUrl, getProductInquiryMessage } from "@/lib/whatsapp";
import { motion } from "framer-motion";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const product = TRENDING_PRODUCTS.find((p) => p.id === id) || TRENDING_PRODUCTS[0];
  
  const [activeImage, setActiveImage] = useState(product.image);
  const images = [product.image, "/images/silk.jpg", "/images/designer.jpg"]; // Dummy gallery

  const whatsappLink = getWhatsAppUrl(getProductInquiryMessage(product.name, product.price));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl border bg-white"
          >
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-contain"
            />
            {product.isTrending && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm py-1 px-3">
                Trending Choice
              </Badge>
            )}
          </motion.div>
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  activeImage === img ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="Product Thumb" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <nav className="flex text-sm text-muted-foreground mb-6">
              <span className="hover:text-primary cursor-pointer">Saree Shop</span>
              <span className="mx-2">/</span>
              <span className="hover:text-primary cursor-pointer uppercase tracking-wider text-xs font-semibold">{product.category}</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <p className="text-3xl font-bold text-primary">{product.price}</p>
              <div className="flex items-center gap-1 text-accent">
                <Star size={18} fill="currentColor" />
                <span className="text-sm font-bold text-foreground">4.9</span>
                <span className="text-xs text-muted-foreground ml-1">(24 Reviews)</span>
              </div>
            </div>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Experience the royal touch of Surat with this exquisite {product.name}. 
              Crafted from the finest {product.category.toLowerCase()} fabric, featuring traditional motifs 
              and intricate zari work that makes it perfect for any grand occasion.
            </p>

            <div className="space-y-4 mb-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-xl bg-accent/5">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Fabric</p>
                  <p className="font-medium">{product.category}</p>
                </div>
                <div className="p-4 border rounded-xl bg-accent/5">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Work Type</p>
                  <p className="font-medium">Hand Embroidery</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="grow flex h-14 items-center justify-center rounded-lg bg-[#25D366] px-8 text-lg font-bold text-white hover:bg-[#1fb355] transition-colors"
              >
                <MessageCircle className="mr-2" /> Buy via WhatsApp
              </a>
              <a 
                href={SHOP_DETAILS.googleMeet} 
                target="_blank" 
                rel="noopener noreferrer"
                className="grow md:grow-0 flex h-14 items-center justify-center rounded-lg border border-primary px-8 text-lg font-bold text-primary hover:bg-primary/5 transition-colors"
              >
                <Video className="mr-2" /> Book Video Call
              </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-y-6 pt-10 border-t">
              <div className="flex items-center gap-3">
                <Truck className="text-accent" />
                <span className="text-sm font-medium">Free Delivery Across India</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="text-accent" />
                <span className="text-sm font-medium">7 Days Easy Return</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-accent" />
                <span className="text-sm font-medium">100% Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-3">
                <Ruler className="text-accent" />
                <span className="text-sm font-medium">Custom Blouse Stitching</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="description" className="mb-20">
        <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 gap-8">
          <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 px-0 font-serif text-lg">Description</TabsTrigger>
          <TabsTrigger value="shipping" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 px-0 font-serif text-lg">Shipping & Policy</TabsTrigger>
          <TabsTrigger value="care" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 px-0 font-serif text-lg">Care Instructions</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-8 prose prose-slate">
           <p>This {product.name} is a masterpiece from our latest royal collection. The fabric is hand-picked for its premium quality and shine. </p>
           <ul>
             <li><strong>Length:</strong> 5.5 Meters Saree + 0.8 Meters Blouse Piece</li>
             <li><strong>Occasion:</strong> Wedding, Reception, Festival</li>
             <li><strong>Style:</strong> Traditional Surat Work</li>
           </ul>
        </TabsContent>
        <TabsContent value="shipping" className="py-8">
          <p className="text-muted-foreground">We offer free express shipping on order values above ₹5000. For international shipping, please contact us on WhatsApp for exact rates.</p>
        </TabsContent>
        <TabsContent value="care" className="py-8">
          <p className="text-muted-foreground leading-relaxed italic border-l-4 border-accent pl-4">Dry clean only is recommended for all our premium and silk sarees to maintain the zari luster and fabric quality for years.</p>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold">You May Also Like</h2>
          <Button variant="link" className="text-primary">View More</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRENDING_PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>
    </div>
  );
}
