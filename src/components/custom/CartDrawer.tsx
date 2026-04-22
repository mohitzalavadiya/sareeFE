"use client";

import React from "react";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";

const FREE_SHIPPING_THRESHOLD = 3000;

import Link from "next/link";

export function CartDrawer() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    totalAmount, 
    isDrawerOpen, 
    setIsDrawerOpen 
  } = useCart();

  const shippingProgress = Math.min((totalAmount / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - totalAmount;

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <SheetContent side="right" className="w-full sm:max-w-[450px] p-0 flex flex-col gap-0 border-l">
        <SheetHeader className="px-6 py-6 border-b flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-[22px] font-medium font-sans uppercase tracking-tight">Your Cart</SheetTitle>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="text-black hover:opacity-70 transition-opacity"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </SheetHeader>

        {/* Free Shipping Progress */}
        {items.length > 0 && (
          <div className="px-6 py-4 bg-[#f9f9f9]">
            <p className="text-[13px] mb-2 font-medium">
              {remainingForFreeShipping > 0 
                ? `You're ₹${remainingForFreeShipping.toLocaleString()} away from free shipping!` 
                : "Congratulations! You've unlocked free shipping!"}
            </p>
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black transition-all duration-500 ease-out" 
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-hidden flex flex-col">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
              <ShoppingBag size={48} strokeWidth={1} className="mb-4 opacity-20" />
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Button 
                onClick={() => setIsDrawerOpen(false)}
                className="bg-black text-white rounded-none h-12 px-8 uppercase tracking-widest text-xs font-bold"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ScrollArea className="flex-1 px-6">
              <div className="py-6 space-y-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-5 group">
                    <div className="relative aspect-[2/3] w-24 bg-[#f4f4f4] overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h4 className="text-[14px] font-medium leading-tight group-hover:underline cursor-pointer line-clamp-2">
                          {item.name}
                        </h4>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          <X size={18} strokeWidth={1.5} />
                        </button>
                      </div>
                      
                      <div className="flex flex-col gap-4 mt-auto">
                        <div className="flex items-center border w-fit">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-semibold">{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-[12px] text-gray-400 line-through">{item.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-white border-t space-y-4">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Subtotal</span>
              <span className="text-xl font-bold">₹{totalAmount.toLocaleString()}</span>
            </div>
            <p className="text-[11px] text-gray-500 text-center mb-4">
              Shipping, taxes, and discounts will be calculated at checkout.
            </p>
            <Link href="/checkout" onClick={() => setIsDrawerOpen(false)}>
              <Button className="w-full bg-black text-white hover:bg-black/90 rounded-none h-14 uppercase tracking-[0.2em] text-xs font-bold group">
                Check out
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="w-full text-center text-[12px] font-medium underline uppercase tracking-widest pt-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
