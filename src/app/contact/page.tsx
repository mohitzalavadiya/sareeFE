"use client";

import React from "react";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Mail, 
  Clock, 
  Send 
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // I need to add this
import { Card, CardContent } from "@/components/ui/card";
import { SHOP_DETAILS } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function ContactPage() {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Connect With <span className="text-primary italic">Us</span></h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're looking for your dream bridal saree or have questions about our collections, 
              we're here to help you shine.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info Side */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold mb-8 underline decoration-accent decoration-2 underline-offset-8">Direct Contact</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">Our Boutique</p>
                  <p className="text-muted-foreground leading-relaxed">{SHOP_DETAILS.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">WhatsApp Inquiry</p>
                  <p className="text-muted-foreground">{SHOP_DETAILS.phone}</p>
                  <a 
                    href={getWhatsAppUrl("Hi Royal Saree! I have a question.")}
                    className="p-0 text-[#25D366] h-auto font-bold hover:underline block mt-1"
                  >
                    Chat with an Expert
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">Business Hours</p>
                  <p className="text-muted-foreground">Mon - Sat: 10:00 AM to 8:30 PM</p>
                  <p className="text-muted-foreground">Sun: 11:00 AM to 5:00 PM</p>
                </div>
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div className="mt-12 overflow-hidden rounded-2xl h-64 grayscale hover:grayscale-0 transition-all border brightness-90">
               <div className="w-full h-full bg-accent/5 flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                 <MapPin size={48} className="opacity-20" />
                 <p className="text-xs uppercase tracking-widest font-bold">Map Preview of Surat Location</p>
                 <p className="text-[10px] text-center px-10">Interaction would be live map with API key</p>
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl bg-white/50 backdrop-blur-sm border-none overflow-hidden">
               <CardContent className="p-8 md:p-12">
                 <h2 className="text-3xl font-serif font-bold mb-8">Send Us an Inquiry</h2>
                 <form className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <Label className="text-sm font-semibold">First Name</Label>
                       <Input placeholder="John" className="h-12 focus-visible:ring-accent" />
                     </div>
                     <div className="space-y-2">
                       <Label className="text-sm font-semibold">Last Name</Label>
                       <Input placeholder="Doe" className="h-12 focus-visible:ring-accent" />
                     </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <Label className="text-sm font-semibold">Email Address</Label>
                       <Input type="email" placeholder="john@example.com" className="h-12 focus-visible:ring-accent" />
                     </div>
                     <div className="space-y-2">
                       <Label className="text-sm font-semibold">Phone Number</Label>
                       <Input placeholder="+91 00000 00000" className="h-12 focus-visible:ring-accent" />
                     </div>
                   </div>

                   <div className="space-y-2">
                     <Label className="text-sm font-semibold">Your Message</Label>
                     <Textarea 
                       placeholder="Tell us about the occasion and what you're looking for..." 
                       className="min-h-[150px] focus-visible:ring-accent text-base"
                     />
                   </div>

                   <Button className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/95 shadow-lg group">
                     Submit Message <Send size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   </Button>
                   
                   <p className="text-center text-xs text-muted-foreground">
                     We usually respond to website inquiries within 2-4 business hours.
                   </p>
                 </form>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
