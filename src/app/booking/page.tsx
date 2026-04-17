"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Video, 
  MessageCircle, 
  User, 
  Phone, 
  Mail,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  Laptop
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { getWhatsAppUrl, getVideoCallBookingMessage, getWhatsAppUrlForUser, getCustomerConfirmationMessage } from "@/lib/whatsapp";
import { SHOP_DETAILS, CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PLATFORMS = [
  { id: "WhatsApp", name: "WhatsApp Video", icon: <MessageCircle className="w-5 h-5" />, color: "bg-green-50 text-green-600 border-green-200" },
  { id: "Google Meet", name: "Google Meet", icon: <Video className="w-5 h-5" />, color: "bg-blue-50 text-blue-600 border-blue-200" },
  { id: "Other", name: "Other (Zoom/Skype)", icon: <Laptop className="w-5 h-5" />, color: "bg-purple-50 text-purple-600 border-purple-200" },
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    platform: "WhatsApp",
    sareeType: "All Collections",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time slot is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
    // WhatsApp send feature removed per user request
    setStep(3);
  };


  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 md:py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Information */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                Personalized Shopping
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black leading-[1.1] mb-6">
                Your Private <span className="italic text-primary font-medium">Boutique</span> Experience
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
                Can't visit our store? Let us bring the collection to you. Book a one-on-one video consultation with our sari experts.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: <Video className="w-5 h-5" />, title: "HD Video Quality", desc: "See every detail of the fabric and work" },
                  { icon: <User className="w-5 h-5" />, title: "Personal Stylist", desc: "Expert advice on draping and styling" },
                  { icon: <Clock className="w-5 h-5" />, title: "30-Minute Sessions", desc: "Dedicated time for your selection" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-primary/20 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-black">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: Form Card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden rounded-3xl">
                <div className="h-2 bg-primary w-full" />
                <CardContent className="p-8 md:p-12 bg-white">
                  
                  {/* Step Progress */}
                  <div className="flex items-center justify-between mb-12 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-100 -translate-y-1/2" />
                    {[1, 2, 3].map((s) => (
                      <div 
                        key={s} 
                        className={cn(
                          "relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                          step >= s ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30" : "bg-gray-100 text-gray-400"
                        )}
                      >
                        {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center mb-8">
                          <h2 className="text-2xl font-serif font-bold text-black mb-2">Personal Details</h2>
                          <p className="text-gray-500">Provide your contact info so we can reach you.</p>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</Label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <Input 
                                id="name" 
                                placeholder="e.g. Anjali Gupta" 
                                className={cn("pl-12 h-14 rounded-xl border-gray-200 focus:ring-primary/20", errors.name && "border-red-500")}
                                value={formData.name}
                                onChange={(e) => {
                                  setFormData({...formData, name: e.target.value});
                                  if (errors.name) setErrors({...errors, name: ""});
                                }}
                              />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</Label>
                              <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input 
                                  id="email" 
                                  type="email"
                                  placeholder="anjali@example.com" 
                                  className={cn("pl-12 h-14 rounded-xl border-gray-200 focus:ring-primary/20", errors.email && "border-red-500")}
                                  value={formData.email}
                                  onChange={(e) => {
                                    setFormData({...formData, email: e.target.value});
                                    if (errors.email) setErrors({...errors, email: ""});
                                  }}
                                />
                              </div>
                              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-gray-500">WhatsApp Number</Label>
                              <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input 
                                  id="phone" 
                                  placeholder="+91 00000 00000" 
                                  className={cn("pl-12 h-14 rounded-xl border-gray-200 focus:ring-primary/20", errors.phone && "border-red-500")}
                                  value={formData.phone}
                                  onChange={(e) => {
                                    setFormData({...formData, phone: e.target.value});
                                    if (errors.phone) setErrors({...errors, phone: ""});
                                  }}
                                />
                              </div>
                              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                          </div>
                        </div>

                        <Button className="w-full h-14 rounded-xl text-md font-bold transition-all shadow-lg hover:shadow-primary/20" onClick={handleNext}>
                          Continue to Slot <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center mb-8">
                          <h2 className="text-2xl font-serif font-bold text-black mb-2">Schedule & Platform</h2>
                          <p className="text-gray-500">When should we call you and how?</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="date" className="text-xs font-bold uppercase tracking-widest text-gray-500">Preferred Date</Label>
                              <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input 
                                  id="date" 
                                  type="date"
                                  className={cn("pl-12 h-14 rounded-xl border-gray-200 focus:ring-primary/20", errors.date && "border-red-500")}
                                  value={formData.date}
                                  min={new Date().toISOString().split('T')[0]}
                                  onChange={(e) => {
                                    setFormData({...formData, date: e.target.value});
                                    if (errors.date) setErrors({...errors, date: ""});
                                  }}
                                />
                              </div>
                              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="time" className="text-xs font-bold uppercase tracking-widest text-gray-500">Preferred Time</Label>
                              <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input 
                                  id="time" 
                                  type="time"
                                  className={cn("pl-12 h-14 rounded-xl border-gray-200 focus:ring-primary/20", errors.time && "border-red-500")}
                                  value={formData.time}
                                  onChange={(e) => {
                                    setFormData({...formData, time: e.target.value});
                                    if (errors.time) setErrors({...errors, time: ""});
                                  }}
                                />
                              </div>
                              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Preferred Platform</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {PLATFORMS.map((plat) => (
                                <button
                                  key={plat.id}
                                  type="button"
                                  onClick={() => setFormData({...formData, platform: plat.id})}
                                  className={cn(
                                    "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2",
                                    formData.platform === plat.id 
                                      ? "border-primary bg-primary/5 shadow-md scale-[1.02]" 
                                      : "border-gray-100 bg-white hover:border-gray-200"
                                  )}
                                >
                                  <div className={cn("p-2 rounded-full", formData.platform === plat.id ? "bg-primary text-white" : plat.color)}>
                                    {plat.icon}
                                  </div>
                                  <span className="text-xs font-bold">{plat.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Interested Collection</Label>
                            <Select 
                              value={formData.sareeType}
                              onValueChange={(v) => setFormData(prev => ({ ...prev, sareeType: v }))}
                            >
                              <SelectTrigger className="h-14 rounded-xl border-gray-200">
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="All Collections">All Collections</SelectItem>
                                {CATEGORIES.map(c => (
                                  <SelectItem key={c.slug} value={c.name}>{c.name}</SelectItem>
                                ))}
                                <SelectItem value="Wedding Saree">Wedding Saree</SelectItem>
                                <SelectItem value="Designer Suit">Designer Suit</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex gap-4 pt-4">
                            <Button 
                              variant="ghost" 
                              className="h-14 w-24 rounded-xl border-gray-100 hover:bg-gray-50" 
                              onClick={() => setStep(1)}
                            >
                              Back
                            </Button>
                            <Button className="flex-1 h-14 rounded-xl text-md font-bold shadow-lg shadow-primary/20" type="submit">
                              Confirm Appointment
                            </Button>
                          </div>
                        </form>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6"
                      >
                        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                          <CheckCircle2 size={48} />
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-black mb-4">Initial Request Sent!</h3>
                        <p className="text-gray-500 mb-10 max-w-sm mx-auto">
                          We've opened WhatsApp to confirm your slot. Our team will get back to you shortly to finalize the call.
                        </p>
                        
                        <div className="grid grid-cols-1 gap-4">
                          {formData.platform === "Google Meet" && (
                            <a 
                              href={SHOP_DETAILS.googleMeet} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex h-16 w-full items-center justify-center rounded-2xl bg-primary text-white hover:bg-primary/90 font-bold text-lg transition-all shadow-xl shadow-primary/20 group"
                            >
                              <Video className="mr-3 group-hover:scale-110 transition-transform" /> Join Google Meet
                              <ExternalLink size={14} className="ml-2 opacity-50" />
                            </a>
                          )}
                          
                          <Button 
                            variant="ghost" 
                            className="mt-4 text-gray-400"
                            onClick={() => {
                              setStep(1);
                              setFormData({
                                name: "",
                                email: "",
                                phone: "",
                                date: "",
                                time: "",
                                platform: "WhatsApp",
                                sareeType: "All Collections",
                              });
                            }}
                          >
                            Book Another Call
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
