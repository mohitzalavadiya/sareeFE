"use client";

import { motion } from "framer-motion";
import { HeroSlider } from "@/components/custom/HeroSlider";
import { SectionHeader } from "@/components/custom/SectionHeader";
import { ProductSlider } from "@/components/custom/ProductSlider";
import { CuratedCollections } from "@/components/custom/CuratedCollections";
import { EditorsPicks } from "@/components/custom/EditorsPicks";
import { MostLovedTabs } from "@/components/custom/MostLovedTabs";
import { ImageWithText } from "@/components/custom/ImageWithText";
import { BlogPosts } from "@/components/custom/BlogPosts";
import { InstagramDiaries } from "@/components/custom/InstagramDiaries";
import { CustomerStories } from "@/components/custom/CustomerStories";
import { CategoryCard } from "@/components/custom/CategoryCard";
import { 
  NEW_ARRIVALS, 
  SAREE_COLLECTIONS,
  GEORGETTE_SUITS,
  CURATED_COLLECTIONS, 
  EDITORS_PICKS, 
  MOST_LOVED_TABS, 
  BLOG_POSTS, 
  CUSTOMER_STORIES,
  CATEGORIES
} from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col gap-[60px] md:gap-[80px] pb-24 bg-white">
      {/* 1. Hero Slider Section */}
      <HeroSlider />

      {/* 2. New Arrivals */}
      <section className="w-full">
        <div className="max-w-[1540px] mx-auto px-4 md:px-[50px]">
          <SectionHeader title="New Arrivals" viewAllLink="/category/new-arrivals" />
          <ProductSlider products={NEW_ARRIVALS} />
        </div>
      </section>

      {/* 3. Curated Collections */}
      <section className="w-full">
        <div className="max-w-[1540px] mx-auto px-4 md:px-[50px]">
          <SectionHeader title="Curated Collections" viewAllLink="/category/all" />
          <CuratedCollections items={CURATED_COLLECTIONS} />
        </div>
      </section>

      {/* 4. Saree Collections */}
      <section className="w-full">
        <div className="max-w-[1540px] mx-auto px-4 md:px-[50px]">
          <SectionHeader title="Saree Collections" viewAllLink="/category/sarees" />
          <ProductSlider products={SAREE_COLLECTIONS} />
        </div>
      </section>

      {/* 5. Editor's Picks */}
      <section className="w-full">
        <div className="max-w-[1540px] mx-auto px-4 md:px-[50px]">
          <SectionHeader title="Editor's Picks" viewAllLink="/category/editors-picks" />
          <EditorsPicks items={EDITORS_PICKS} />
        </div>
      </section>

      {/* 6. Georgette Suits */}
      <section className="w-full">
        <div className="max-w-[1540px] mx-auto px-4 md:px-[50px]">
          <SectionHeader title="Georgette Suits" viewAllLink="/category/georgette-suits" />
          <ProductSlider products={GEORGETTE_SUITS} />
        </div>
      </section>

      {/* 7. Wedding-Ready Banner */}
      <ImageWithText 
        image="/images/wedding_ready_banner.png"
        heading="Wedding-Ready Within A Minute"
        subheading="Instant SareeTM"
        buttonText="PRE DRAPE ALL SAREES"
        buttonLink="/category/all"
      />

      {/* 8. Shop By Category */}
      <section className="w-full">
        <div className="max-w-[1540px] mx-auto px-4 md:px-[50px]">
          <SectionHeader title="Shop By Category" />
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-[15px]">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.slug} {...cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Most Loved */}
      <section className="w-full">
        <div className="max-w-[1540px] mx-auto px-4 md:px-[50px]">
          <SectionHeader title="Most Loved" centered={true} />
          <MostLovedTabs tabs={MOST_LOVED_TABS} />
        </div>
      </section>

      {/* 10. Blog posts */}
      <section className="w-full">
        <div className="max-w-[1540px] mx-auto px-4 md:px-[50px]">
          <SectionHeader title="Blog posts" viewAllLink="/blog" />
          <BlogPosts posts={BLOG_POSTS} />
        </div>
      </section>

      {/* 12. Visit Our Instagram Diaries */}
      <section className="py-[60px] md:py-[80px] bg-[#f9f9f9]">
        <SectionHeader 
          title="Visit Our Instagram Diaries" 
          subtitle="Follow to Know More"
        />
        <InstagramDiaries />
      </section>

      {/* 13. Customer Stories */}
      <section className="w-full">
        <div className="max-w-[1540px] mx-auto px-4 md:px-[50px]">
          <SectionHeader title="Customer Stories" centered={true} />
          <CustomerStories stories={CUSTOMER_STORIES} />
        </div>
      </section>
    </div>
  );
}

