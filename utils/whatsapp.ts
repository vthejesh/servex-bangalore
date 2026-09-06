import { Booking } from '@/types';

export const getWhatsAppDispatchUrl = (booking: Booking, providerPhone?: string): string => {
  const phone = (providerPhone || booking.customerPhone || '919876543210').replace(/[^0-9]/g, '');
  
  const text = `*New Service Booking - ServeX Bangalore* 🚀
----------------------------------------
📌 *Service*: ${booking.serviceTitle} (${booking.category})
👤 *Customer*: ${booking.customerName}
📞 *Contact*: ${booking.customerPhone}
📍 *Address*: ${booking.customerAddress}
📅 *Schedule*: ${booking.scheduledDate} at ${booking.scheduledTime}
💰 *Total Amount*: ₹${booking.totalCost.toLocaleString('en-IN')}
📝 *Notes*: ${booking.notes || 'None'}
----------------------------------------
*Assigned Provider*: ${booking.providerName || 'Verified Professional'}

Please confirm receipt and dispatch arrival time.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};
