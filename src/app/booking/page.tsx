"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Video, 
  MessageCircle, 
  User, 
  Phone, 
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { getWhatsAppUrl, getVideoCallBookingMessage } from "@/lib/whatsapp";
import { SHOP_DETAILS, CATEGORIES } from "@/lib/constants";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    time: "",
    sareeType: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappUrl = getWhatsAppUrl(getVideoCallBookingMessage(formData));
    window.open(whatsappUrl, "_blank");
    setStep(3);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-20 px-4 bg-accent/5">
      <div className="container max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Book a <span className="text-primary italic">Live Consultation</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Experience our collection virtually! Let our style experts show you sarees in real-time over a video call. 
              Perfect for narrowing down choices and checking fabric flow.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <Video className="text-accent" />, text: "HD Video Walkthrough" },
                { icon: <User className="text-accent" />, text: "Dedicated Style Expert" },
                { icon: <Calendar className="text-accent" />, text: "Flexible Slots via WhatsApp" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3 px-4 bg-white rounded-xl shadow-sm border border-accent/10">
                  {item.icon}
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-2xl border-none overflow-hidden">
              <div className="bg-primary p-6 text-white text-center">
                <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-1">Appointment</p>
                <h2 className="text-2xl font-serif font-bold">Secure Your Slot</h2>
              </div>
              <CardContent className="p-8 bg-white">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Full Name</Label>
                          <Input 
                            id="name" 
                            placeholder="e.g. Anjali Gupta" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone / WhatsApp Number</Label>
                          <Input 
                            id="phone" 
                            placeholder="+91 00000 00000" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      <Button className="w-full h-12" onClick={() => setStep(2)}>
                        Next Step <ChevronRight size={18} className="ml-2" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="time">Preferred Appointment Time</Label>
                          <Input 
                            id="time" 
                            placeholder="e.g. Afternoon, 3 PM" 
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Interested Collection</Label>
                          <Select onValueChange={(v: string | null) => { if (v) setFormData(prev => ({ ...prev, sareeType: v })) }}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {CATEGORIES.map(c => (
                                <SelectItem key={c.slug} value={c.name}>{c.name}</SelectItem>
                              ))}
                              <SelectItem value="Mixed">All Collections</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" className="w-1/3" onClick={() => setStep(1)}>Back</Button>
                          <Button className="w-2/3 bg-primary" type="submit">
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
                      className="text-center py-10"
                    >
                      <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
                      <h3 className="text-2xl font-serif font-bold mb-4">Initial Request Sent!</h3>
                      <p className="text-muted-foreground mb-8">
                        We've opened WhatsApp to confirm your slot. You can also join our static meeting link at your requested time.
                      </p>
                      <div className="space-y-4">
                        <a 
                          href={getWhatsAppUrl(getVideoCallBookingMessage(formData))} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex h-12 w-full items-center justify-center rounded-lg bg-[#25D366] text-white hover:bg-[#1fb355] font-medium transition-colors"
                        >
                          <MessageCircle className="mr-2" /> Send via WhatsApp
                        </a>
                        <a 
                          href={SHOP_DETAILS.googleMeet} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex h-12 w-full items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary/5 font-medium transition-colors"
                        >
                          <Video className="mr-2" /> Open Google Meet
                        </a>
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
  );
}
