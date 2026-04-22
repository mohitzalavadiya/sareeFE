"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  MessageCircle, 
  Video, 
  Truck, 
  RotateCcw, 
  ShieldCheck,
  Star,
  ChevronRight,
  Plus,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductSlider } from "@/components/custom/ProductSlider";
import { SectionHeader } from "@/components/custom/SectionHeader";
import { NEW_ARRIVALS, SHOP_DETAILS } from "@/lib/constants";
import { getWhatsAppUrl, getProductInquiryMessage } from "@/lib/whatsapp";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const { addItem, updateQuantity: updateCartQuantity, items } = useCart();
  
  // Find product in any list
  const product = NEW_ARRIVALS.find((p) => p.id === id) || NEW_ARRIVALS[0];
  
  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const gallery = product.gallery || [product.image];

  const whatsappLink = getWhatsAppUrl(getProductInquiryMessage(product.name, product.price));

  return (
    <div className="max-w-[1540px] mx-auto px-4 md:px-[50px] py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#121212] opacity-50 mb-12">
        <Link href="/" className="hover:opacity-100 transition-opacity">Home</Link>
        <ChevronRight size={10} strokeWidth={3} />
        <Link href="/collections/all" className="hover:opacity-100 transition-opacity">Products</Link>
        <ChevronRight size={10} strokeWidth={3} />
        <span className="opacity-100 font-medium">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="flex flex-col lg:flex-row gap-0 mb-20">
        
        {/* Column 1: Vertical thumbnails (Desktop) */}
        <div className="hidden lg:flex flex-col gap-4 w-[100px] shrink-0">
          {gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img)}
              className={`relative aspect-[3/4] overflow-hidden border transition-all duration-300 ${
                activeImage === img ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`Thumb ${i}`} fill className="object-cover" />
            </button>
          ))}
        </div>

        {/* Column 2: Main Image */}
        <div className="lg:flex-1 lg:px-[40px]">
          <div className="relative aspect-[3/4] overflow-hidden bg-[#f3f3f3]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute top-5 left-5 flex flex-col gap-2">
              {product.oldPrice && (
                <span className="bg-[#8B0000] text-white py-1 px-4 text-[12px] font-bold uppercase tracking-widest shadow-lg">
                  Sale
                </span>
              )}
            </div>
          </div>

          {/* Mobile Thumbnails */}
          <div className="flex lg:hidden gap-3 mt-4 overflow-x-auto pb-4 scrollbar-hide">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`relative min-w-[80px] aspect-[3/4] overflow-hidden border transition-all ${
                  activeImage === img ? "border-black" : "border-gray-100"
                }`}
              >
                <Image src={img} alt="Thumb" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Column 3: Purchase Sidebar */}
        <div className="lg:w-[400px] shrink-0">
          <h1 className="text-[32px] md:text-[40px] font-sans font-normal text-[#121212] mb-4 leading-[1.1]">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-5 mb-8">
             <span className="text-[24px] font-normal text-[#121212]">{product.price}</span>
             {product.oldPrice && (
               <span className="text-[18px] text-[#121212] opacity-50 line-through">{product.oldPrice}</span>
             )}
          </div>

          {/* Trust Badges Bar */}
          <div className="flex gap-4 mb-10 py-4 border-y border-[#e8e8e8]">
            <div className="flex items-center gap-2 text-[12px] font-medium opacity-70">
              <ShieldCheck size={16} /> 100% Quality
            </div>
            <div className="flex items-center gap-2 text-[12px] font-medium opacity-70">
              <Truck size={16} /> Fast Shipping
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
             <label className="block text-[13px] font-medium mb-4 text-[#121212]">Quantity</label>
             <div className="inline-flex items-center border border-[#121212] h-[45px] w-[130px]">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="flex-1 text-center font-medium text-[14px]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Plus size={14} />
                </button>
             </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mb-10">
             <button 
               onClick={() => addItem({ ...product, quantity })}
               className="w-full h-[50px] bg-[#EBC155] text-black font-medium hover:opacity-90 transition-all uppercase tracking-widest text-[13px] border border-[#EBC155]"
             >
               Add to Cart
             </button>
             <button className="w-full h-[50px] bg-black text-white font-medium hover:bg-[#121212] transition-all uppercase tracking-widest text-[13px]">
               Buy It Now
             </button>
             
             <div className="mt-6 flex flex-col gap-3">
               <a 
                 href={whatsappLink}
                 target="_blank"
                 className="flex h-[45px] w-full items-center justify-center border border-[#25D366] text-[#25D366] font-medium uppercase tracking-widest text-[12px] hover:bg-[#25D366] hover:text-white transition-all"
               >
                 <MessageCircle className="mr-3" size={18} fill="currentColor" /> Inquiry via WhatsApp
               </a>
             </div>
          </div>

          {/* Payment Icons */}
          <div className="flex flex-wrap gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <Image src="https://speedo-sarees.myshopify.com/cdn/shop/t/4/assets/visa.svg?v=123" alt="Visa" width={38} height={24} />
            <Image src="https://speedo-sarees.myshopify.com/cdn/shop/t/4/assets/mastercard.svg?v=456" alt="Mastercard" width={38} height={24} />
            <Image src="https://speedo-sarees.myshopify.com/cdn/shop/t/4/assets/paypal.svg?v=789" alt="PayPal" width={38} height={24} />
            <Image src="https://speedo-sarees.myshopify.com/cdn/shop/t/4/assets/gpay.svg?v=012" alt="GPay" width={38} height={24} />
          </div>
        </div>
      </div>

      {/* Info Tabs Section */}
      <div className="mb-24 border-t border-[#e8e8e8]">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="bg-transparent h-auto p-0 flex justify-center gap-[40px] md:gap-[80px] border-b border-[#e8e8e8] w-full rounded-none">
            <TabsTrigger 
              value="description" 
              className="px-0 py-6 text-[14px] uppercase tracking-widest font-normal rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="additional" 
              className="px-0 py-6 text-[14px] uppercase tracking-widest font-normal rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all"
            >
              Additional Info
            </TabsTrigger>
            <TabsTrigger 
              value="shipping" 
              className="px-0 py-6 text-[14px] uppercase tracking-widest font-normal rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all"
            >
              Shipping & Returns
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="pt-12 text-[16px] leading-[1.8] text-[#121212] opacity-80 max-w-[900px] mx-auto text-center">
            {product.description || "No description available for this product."}
          </TabsContent>
          
          <TabsContent value="additional" className="pt-12 max-w-[800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              {product.specs?.map((spec, i) => (
                <div key={i} className="flex justify-between border-b border-[#f3f3f3] pb-4">
                  <span className="font-medium opacity-50 uppercase text-[12px] tracking-widest">{spec.label}</span>
                  <span className="font-medium text-[#121212]">{spec.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="pt-12 text-[16px] leading-[1.8] text-[#121212] opacity-80 max-w-[900px] mx-auto text-center">
             We offer FREE Express Shipping on all orders across India. Delivery usually takes 3-5 business days. 
             We also provide a 7-day hassle-free return and exchange policy for all unworn and unwashed products.
          </TabsContent>
        </Tabs>
      </div>

      {/* Recommended Section */}
      <section className="pt-24 border-t border-[#e8e8e8]">
        <SectionHeader title="You May Also Like" centered={true} />
        <ProductSlider products={NEW_ARRIVALS} />
      </section>
    </div>
  );
}

