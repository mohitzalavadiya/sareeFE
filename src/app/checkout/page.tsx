"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, ArrowLeft, ShieldCheck, Truck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const order = await response.json();

      if (order.error) {
        alert("Failed to create order. Please try again.");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: order.amount,
        currency: order.currency,
        name: "Speedo Sarees",
        description: "Payment for your order",
        order_id: order.id,
        handler: function (response: any) {
          // Payment Success
          console.log("Payment Successful:", response);
          clearCart();
          router.push("/checkout/success");
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#8B0000",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert("Payment Failed: " + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    useEffect(() => {
        router.push("/");
    }, []);
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left: Shipping Form */}
        <div className="bg-white p-6 md:p-12 lg:p-20 border-r">
          <div className="max-w-[600px] ml-auto w-full">
            <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight mb-8">SPEEDO SAREES</h1>
            
            <nav className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-gray-400 mb-10">
              <span className="text-black font-medium">Cart</span>
              <ChevronRight size={10} />
              <span className="text-black font-medium">Information</span>
              <ChevronRight size={10} />
              <span>Shipping</span>
              <ChevronRight size={10} />
              <span>Payment</span>
            </nav>

            <form onSubmit={handlePayment} className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Contact</h2>
                </div>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Email" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 focus:ring-[#8B0000]" 
                />
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">Shipping address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    id="firstName" 
                    placeholder="First name" 
                    required 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="h-12 border-gray-300 focus:ring-[#8B0000]" 
                  />
                  <Input 
                    id="lastName" 
                    placeholder="Last name" 
                    required 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="h-12 border-gray-300 focus:ring-[#8B0000]" 
                  />
                </div>
                <div className="mt-4">
                  <Input 
                    id="address" 
                    placeholder="Address" 
                    required 
                    value={formData.address}
                    onChange={handleInputChange}
                    className="h-12 border-gray-300 focus:ring-[#8B0000]" 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Input 
                    id="city" 
                    placeholder="City" 
                    required 
                    value={formData.city}
                    onChange={handleInputChange}
                    className="h-12 border-gray-300 focus:ring-[#8B0000]" 
                  />
                  <Input 
                    id="state" 
                    placeholder="State" 
                    required 
                    value={formData.state}
                    onChange={handleInputChange}
                    className="h-12 border-gray-300 focus:ring-[#8B0000]" 
                  />
                  <Input 
                    id="pincode" 
                    placeholder="PIN code" 
                    required 
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="h-12 border-gray-300 focus:ring-[#8B0000]" 
                  />
                </div>
                <div className="mt-4">
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="Phone" 
                    required 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-12 border-gray-300 focus:ring-[#8B0000]" 
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => router.back()}
                  className="text-sm font-medium hover:bg-transparent p-0"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Return to cart
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-[#8B0000] text-white hover:bg-[#8B0000]/90 h-14 px-10 rounded-md text-sm font-bold uppercase tracking-widest w-full md:w-auto"
                >
                  {loading ? "Processing..." : "Pay Now"}
                </Button>
              </div>
            </form>

            <Separator className="my-12" />
            
            <div className="flex gap-4 opacity-50 text-[10px] uppercase tracking-widest font-medium">
              <span>Refund policy</span>
              <span>Privacy policy</span>
              <span>Terms of service</span>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="p-6 md:p-12 lg:p-20 lg:bg-[#f4f4f4]">
          <div className="max-w-[450px] w-full">
            <div className="space-y-6 mb-10">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 bg-white border rounded-md overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] h-5 w-5 rounded-full flex items-center justify-center font-bold z-10">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-tight">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.price}</p>
                  </div>
                  <p className="text-sm font-medium">{item.price}</p>
                </div>
              ))}
            </div>

            <Separator className="mb-6" />

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-500">Free</span>
              </div>
            </div>

            <Separator className="mb-6" />

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">INR</span>
                <span className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-12 bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-sm font-medium">
                    <ShieldCheck className="text-green-600" size={20} />
                    Secure Checkout
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                    <Truck className="text-blue-600" size={20} />
                    Fast Delivery Guaranteed
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                    <Lock className="text-gray-600" size={20} />
                    Your data is safe with us
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
