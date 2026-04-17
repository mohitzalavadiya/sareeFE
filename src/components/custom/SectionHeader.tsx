import React from "react";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  viewAllLink?: string;
}

export function SectionHeader({ title, subtitle, viewAllLink }: SectionHeaderProps) {
  return (
    <div className="mb-10 lg:mb-14 relative group">
      <div className="flex flex-col items-center">
        <h2 className="text-[28px] md:text-[40px] font-normal leading-tight text-[#121212] m-0 text-center">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-[14px] text-[#121212] font-normal text-center">
            {subtitle}
          </p>
        )}
      </div>
      
      {viewAllLink && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:block">
          <Link href={viewAllLink} className="text-[14px] text-[#121212] underline underline-offset-4 hover:opacity-70 transition-opacity whitespace-nowrap">
            View all
          </Link>
        </div>
      )}

      {/* Mobile-only view all (centered below subtitle) */}
      {viewAllLink && (
        <div className="sm:hidden mt-4 text-center">
           <Link href={viewAllLink} className="text-[14px] text-[#121212] underline underline-offset-4 hover:opacity-70 transition-opacity">
            View all
          </Link>
        </div>
      )}
    </div>
  );
}
