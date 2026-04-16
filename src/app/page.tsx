"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, MessageCircle, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/custom/CategoryCard";
import { ProductCard } from "@/components/custom/ProductCard";
import { VideoReel } from "@/components/custom/VideoReel";
import { CATEGORIES, TRENDING_PRODUCTS, TESTIMONIALS, SHOP_DETAILS } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Luxury Saree Boutique"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              Elegance in Every <br /> <span className="text-accent italic">Single Drape</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/90 font-light tracking-wide">
              Discover Surat's finest collection of premium sarees. From bridal traditions to designer chic.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="#categories" 
                className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 text-lg font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                Shop Collection
              </Link>
              <a 
                href={getWhatsAppUrl("Namaste! I'd like to see your latest catalogue.")} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white bg-white/10 px-8 text-lg font-medium text-white backdrop-blur-md hover:bg-white/20 transition-colors"
              >
                <MessageCircle className="mr-2" /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section id="categories" className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">Featured Collections</h2>
          <div className="h-1 w-20 bg-accent mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.slug} {...cat} index={i} />
          ))}
        </div>
      </section>

      {/* Video Reels Section */}
      <section className="bg-primary/5 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-semibold tracking-widest uppercase text-sm mb-4 block">New Arrivals</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-snug">
                Experience the Quality via <span className="italic">Video Reels</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Swipe through our latest trending sarees in high-definition video. See how the fabric flows and the zari shines.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-lg">Real-life fabric movement</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-lg">Close-up embroidery details</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-lg">Instant inquiry via WhatsApp</span>
                </li>
              </ul>
              <Link 
                href="/booking"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-lg font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Book Personal Video Call
              </Link>
            </div>
            <div className="flex justify-center">
              <VideoReel />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section id="trending" className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-4xl font-serif font-bold mb-2">Trending This Season</h2>
            <p className="text-muted-foreground">Most loved designs by our brides and customers.</p>
          </div>
          <Link 
            href="/category/all"
            className="inline-flex items-center justify-center gap-2 text-primary hover:underline font-medium"
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRENDING_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* WhatsApp Banner */}
      <section className="container mx-auto px-4">
        <motion.div
          whileInView={{ scale: [0.95, 1] }}
          className="bg-primary rounded-3xl p-10 md:p-16 relative overflow-hidden text-white flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="relative z-10 flex-1">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Can't decide?</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-md">
              Chat with our style experts on WhatsApp and get personalized recommendations and actual photos of any saree you like.
            </p>
            <a 
              href={getWhatsAppUrl("Hi! I need help choosing a saree for a special occasion.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-[#25D366] px-8 text-lg font-bold text-white hover:bg-[#1fb355] shadow-lg transition-colors"
            >
              <MessageCircle className="mr-2" /> Start Chat Now
            </a>
          </div>
          <div className="relative z-10 h-64 w-64 opacity-20 md:opacity-100">
             <MessageCircle size={256} className="text-white" />
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -ml-32 -mb-32" />
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 pb-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">Hear From Our Brides</h2>
          <p className="text-muted-foreground">Trusted by thousands of happy women across India.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-accent/5 p-8 rounded-2xl relative border border-accent/10"
            >
              <div className="flex gap-1 text-accent mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-lg italic mb-6 leading-relaxed">"{t.content}"</p>
              <div>
                <p className="font-serif font-bold text-xl">{t.name}</p>
                <p className="text-accent font-medium text-sm">{t.role}</p>
              </div>
              <div className="absolute top-8 right-8 text-accent/20 font-serif text-8xl leading-none">"</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
