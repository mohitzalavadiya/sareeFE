import { SHOP_DETAILS } from "./constants";

export const getWhatsAppUrl = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${SHOP_DETAILS.whatsapp}?text=${encodedMessage}`;
};

export const getProductInquiryMessage = (productName: string, price: string) => {
  return `Namaste! I'm interested in the "${productName}" priced at ${price}. Could you please share more details?`;
};

export const getVideoCallBookingMessage = (data: { 
  name: string; 
  email: string;
  phone: string;
  date: string;
  time: string; 
  platform: string;
  sareeType: string;
}) => {
  return `Namaste! I'd like to book a video call consultation.\n\n👤 Name: ${data.name}\n📧 Email: ${data.email}\n📱 Phone: ${data.phone}\n🗓️ Date: ${data.date}\n⏰ Preferred Time: ${data.time}\n💻 Platform: ${data.platform}\n👗 Interested in: ${data.sareeType}`;
};
export const getWhatsAppUrlForUser = (phone: string, message: string) => {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

export const getCustomerConfirmationMessage = (data: { 
  name: string; 
  date: string; 
  time: string; 
  platform: string; 
}) => {
  let message = `Hello ${data.name}! 👋\n\nYour video call booking with Speedo Sarees is confirmed. we're excited to show you our collection!\n\n📅 Date: ${data.date}\n⏰ Time: ${data.time}\n💻 Platform: ${data.platform}`;
  
  if (data.platform === "Google Meet") {
    message += `\n🔗 Meet Link: ${SHOP_DETAILS.googleMeet}`;
  }
  
  message += `\n\nSee you soon! ✨`;
  return message;
};
