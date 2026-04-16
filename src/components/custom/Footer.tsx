import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { SHOP_DETAILS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-primary-foreground/20 pb-12 mb-8">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-2xl font-serif font-bold italic">Royal Saree</h3>
          <p className="text-primary-foreground/80 leading-relaxed">
            Surat's premier destination for exquisite sarees. We bring you the finest bridal, silk, and designer collections directly from the textile capital of India.
          </p>
          <div className="flex space-x-4">
            <Link href={SHOP_DETAILS.instagram} className="hover:text-accent transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href={SHOP_DETAILS.facebook} className="hover:text-accent transition-colors">
              <Facebook size={20} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-serif font-semibold mb-6 text-accent">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link href="/#categories" className="hover:text-accent transition-colors">Categories</Link></li>
            <li><Link href="/#trending" className="hover:text-accent transition-colors">Trending Now</Link></li>
            <li><Link href="/booking" className="hover:text-accent transition-colors">Book Video Call</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            <li><Link href="/#faq" className="hover:text-accent transition-colors">FAQs</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-lg font-serif font-semibold mb-6 text-accent">Visit Our Shop</h4>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <MapPin className="text-accent shrink-0" size={20} />
              <span className="text-primary-foreground/80">{SHOP_DETAILS.address}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="text-accent shrink-0" size={20} />
              <span className="text-primary-foreground/80">{SHOP_DETAILS.phone}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="text-accent shrink-0" size={20} />
              <span className="text-primary-foreground/80">info@royalsaree.shop</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 text-center text-primary-foreground/60 text-sm">
        <p>&copy; {new Date().getFullYear()} Royal Saree Boutique. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
