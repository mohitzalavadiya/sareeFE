import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ImageWithTextProps {
  image: string;
  heading: string;
  subheading: string;
  buttonText: string;
  buttonLink: string;
  imageFirst?: boolean;
}

export function ImageWithText({ 
  image, 
  heading, 
  subheading, 
  buttonText, 
  buttonLink,
  imageFirst = true 
}: ImageWithTextProps) {
  return (
    <section className="w-full">
      <div className="max-w-[1540px] mx-auto px-4 md:px-[50px]">
        <div className={`flex flex-col md:flex-row items-stretch overflow-hidden`}>
          
          {/* Image Block */}
          <div className={`w-full md:w-1/2 aspect-[5/4] relative ${imageFirst ? 'order-1' : 'order-1 md:order-2'}`}>
            <Image 
              src={image} 
              alt={heading} 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Text Block */}
          <div className={`w-full md:w-1/2 bg-[#f4f4f4] flex flex-col items-center justify-center text-center p-10 md:p-20 ${imageFirst ? 'order-2' : 'order-2 md:order-1'}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-md"
            >
              <h2 className="text-[28px] md:text-[36px] font-sans font-medium text-[#121212] mb-4 leading-tight">
                {heading}
              </h2>
              <h4 className="text-[16px] md:text-[18px] font-sans text-[#121212] mb-8 opacity-80 uppercase tracking-widest">
                {subheading}
              </h4>
              <Link 
                href={buttonLink}
                className="inline-block bg-black text-white px-8 py-3.5 text-[13px] font-bold uppercase tracking-widest transition-colors hover:bg-gray-800"
              >
                {buttonText}
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
