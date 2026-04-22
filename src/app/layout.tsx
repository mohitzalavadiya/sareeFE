import type { Metadata } from "next";
import { Poppins, Trirong } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/custom/Navbar";
import { Footer } from "@/components/custom/Footer";
import { WhatsAppFloatingButton } from "@/components/custom/WhatsAppFloatingButton";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const trirong = Trirong({
  variable: "--font-trirong",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Royal Saree Boutique | Premium Surat Saree Retail Shop",
  description: "Explore the finest collection of Bridal, Silk, Designer, and Party Wear sarees from Surat. Book a video call consultation and shop via WhatsApp.",
};

import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/custom/CartDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${trirong.variable} scroll-smooth`}
    >
      <body className="min-h-screen font-sans bg-background text-foreground flex flex-col">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
          <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        </CartProvider>
      </body>
    </html>
  );
}

