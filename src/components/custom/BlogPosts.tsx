import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt?: string;
}

interface BlogPostsProps {
  posts: BlogPost[];
}

export function BlogPosts({ posts }: BlogPostsProps) {
  return (
    <div className="max-w-[1540px] mx-auto px-4 md:px-[50px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {posts.map((post, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer flex flex-col"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative aspect-[16/9] mb-6 overflow-hidden bg-[#f3f3f3]">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] text-[#121212] opacity-70 font-sans uppercase tracking-[0.1em] mb-3">
                  {post.date}
                </span>
                <h3 className="text-[24px] md:text-[28px] font-sans font-medium mb-4 leading-tight group-hover:underline underline-offset-4 decoration-1">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-[16px] text-[#121212] opacity-80 font-sans mb-6 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                <div 
                  className="text-[14px] font-medium underline underline-offset-8 decoration-1 text-black w-max hover:opacity-70 transition-opacity"
                >
                  Read more
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
