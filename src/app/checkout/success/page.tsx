"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-[500px] w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center">
          <div className="bg-green-50 p-6 rounded-full">
            <CheckCircle className="text-green-600 h-16 w-16" strokeWidth={1.5} />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-serif font-bold tracking-tight">Order Confirmed!</h1>
          <p className="text-gray-500 text-lg">
            Thank you for shopping with Speedo Sarees. Your order has been placed successfully and is being processed.
          </p>
        </div>

        <div className="bg-[#f9f9f9] p-8 rounded-2xl border border-gray-100 space-y-4">
            <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">What happens next?</p>
            <div className="text-left space-y-4 text-sm">
                <div className="flex gap-4">
                    <span className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">1</span>
                    <p>You will receive an order confirmation email shortly.</p>
                </div>
                <div className="flex gap-4">
                    <span className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">2</span>
                    <p>Our team will carefully pack your beautiful saree.</p>
                </div>
                <div className="flex gap-4">
                    <span className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">3</span>
                    <p>We will notify you once your order has been shipped!</p>
                </div>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full bg-black text-white hover:bg-black/90 rounded-none h-14 px-10 uppercase tracking-[0.2em] text-xs font-bold group">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/category/all" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white rounded-none h-14 px-10 uppercase tracking-[0.2em] text-xs font-bold transition-all">
              View All Sarees
            </Button>
          </Link>
        </div>

        <div className="pt-10 flex items-center justify-center gap-2 text-gray-400">
            <ShoppingBag size={16} />
            <span className="text-xs font-medium uppercase tracking-[0.1em]">Speedo Sarees Boutique</span>
        </div>
      </div>
    </div>
  );
}
