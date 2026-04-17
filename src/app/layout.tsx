import type { Metadata } from "next";
import { Poppins, Trirong } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/custom/Navbar";
import { Footer } from "@/components/custom/Footer";
import { WhatsAppFloatingButton } from "@/components/custom/WhatsAppFloatingButton";

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
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}

