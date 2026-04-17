"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BLOG_POSTS } from "@/lib/constants";
import { motion } from "framer-motion";
import { ChevronLeft, Share2 } from "lucide-react";

export default function BlogPostDetail() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-medium mb-4">Blog post not found</h1>
        <Link href="/" className="underline font-medium">Back to Home</Link>
      </div>
    );
  }

  return (
    <main className="bg-white pb-24">
      {/* Header Section */}
      <header className="pt-16 pb-12 px-4">
        <div className="max-w-[800px] mx-auto text-center">
          <Link 
            href="/" 
            className="inline-flex items-center text-[13px] font-medium uppercase tracking-widest mb-10 hover:opacity-70 transition-opacity"
          >
            <ChevronLeft size={16} className="mr-1" /> Back to blog
          </Link>
          
          <h1 className="text-[32px] md:text-[48px] font-sans font-medium mb-6 leading-tight text-[#121212]">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-[13px] text-[#121212] opacity-70 uppercase tracking-widest mb-12">
            <span>{post.date}</span>
            <span className="w-1 h-1 bg-current rounded-full" />
            <button className="flex items-center hover:opacity-100 transition-opacity">
              <Share2 size={14} className="mr-2" /> Share
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-[1100px] mx-auto px-4 mb-16">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f3f3f3]">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill 
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Content Blocks */}
      <article className="max-w-[800px] mx-auto px-4">
        <div className="flex flex-col gap-12">
          {post.content.map((block, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {block.type === "text" && (
                <p className="text-[17px] md:text-[19px] leading-[1.8] text-[#121212] font-sans opacity-90">
                  {block.value}
                </p>
              )}
              {block.type === "image" && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f3f3f3] my-4">
                  <Image 
                    src={block.value} 
                    alt={`Blog detail ${i}`} 
                    fill 
                    className="object-cover"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex justify-center">
            <Link 
              href="/" 
              className="inline-flex items-center text-[13px] font-medium uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              <ChevronLeft size={16} className="mr-1" /> Back to blog
            </Link>
        </div>
      </article>
    </main>
  );
}
