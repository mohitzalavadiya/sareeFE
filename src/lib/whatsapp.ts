import { SHOP_DETAILS } from "./constants";

export const getWhatsAppUrl = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${SHOP_DETAILS.whatsapp}?text=${encodedMessage}`;
};

export const getProductInquiryMessage = (productName: string, price: string) => {
  return `Namaste! I'm interested in the "${productName}" priced at ${price}. Could you please share more details?`;
};

export const getVideoCallBookingMessage = (data: { name: string; time: string; sareeType: string }) => {
  return `Namaste! I'd like to book a video call consultation.\nName: ${data.name}\nPreferred Time: ${data.time}\nSaree Type: ${data.sareeType}`;
};
