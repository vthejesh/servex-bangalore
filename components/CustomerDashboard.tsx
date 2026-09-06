'use client';

import React from 'react';
import { Booking } from '@/types';
import { getWhatsAppDispatchUrl } from '@/utils/whatsapp';
import { 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  User, 
  XCircle, 
  ArrowRight,
  MessageCircle,
  Printer,
  Star
} from 'lucide-react';

interface CustomerDashboardProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onExploreServices: () => void;
  onOpenInvoice: (booking: Booking) => void;
  onOpenReview: (booking: Booking) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  bookings,
  onCancelBooking,
  onExploreServices,
  onOpenInvoice,
  onOpenReview,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in relative z-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-sky-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-widest bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full border border-sky-500/30">
              Customer Portal (Bangalore)
            </span>
          </div>
          <h1 className="text-3xl font-black text-white">My Service Orders</h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Track orders, auto-dispatch to provider via WhatsApp, download GST invoices, and submit star reviews.
          </p>
        </div>

        <button
          onClick={onExploreServices}
          className="px-5 py-3.5 bg-gradient-to-r from-sky-400 to-indigo-500 hover:opacity-95 text-slate-950 font-black rounded-2xl shadow-lg shadow-sky-500/25 transition-all text-xs flex items-center gap-2 shrink-0"
        >
          <span>Hire New Service</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-12 border border-slate-800 text-center shadow-xl">
          <ShoppingBag className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No Service Orders Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-6">
            Browse through our 100+ services catalog or use the AI Want assistant to quickly hire plumbers, carpenters, electricians, gym trainers, or software devs in Bangalore!
          </p>
          <button
            onClick={onExploreServices}
            className="px-6 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs rounded-2xl shadow-lg hover:opacity-95 transition-all"
          >
            Explore 100+ Services Catalog
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((item) => {
            const waUrl = getWhatsAppDispatchUrl(item);

            return (
              <div
                key={item.id}
                className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl hover:border-sky-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-sky-500/10 text-sky-300 px-2.5 py-0.5 rounded-md border border-sky-500/20">
                      {item.category}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md ${
                        item.status === 'Confirmed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : item.status === 'In Progress'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : item.status === 'Completed'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{item.serviceTitle}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-sky-400" />
                      Pro: <strong className="text-white">{item.providerName || 'Auto-Assigned Pro'}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      Scheduled: <strong className="text-white">{item.scheduledDate} ({item.scheduledTime})</strong>
                    </span>
                    <span className="flex items-center gap-1.5 sm:col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      Address: {item.customerAddress}
                    </span>
                  </div>

                  {item.notes && (
                    <p className="text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800 italic">
                      "{item.notes}"
                    </p>
                  )}

                  {/* Actions Bar */}
                  <div className="flex items-center gap-2 pt-2 flex-wrap">
                    {/* WhatsApp Dispatch Button */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Dispatch</span>
                    </a>

                    {/* Download Invoice Button */}
                    <button
                      onClick={() => onOpenInvoice(item)}
                      className="px-3 py-1.5 bg-sky-600/30 hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/40 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>GST Invoice</span>
                    </button>

                    {/* Submit Review Button */}
                    <button
                      onClick={() => onOpenReview(item)}
                      className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>Write Review</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Payable</span>
                    <span className="text-2xl font-black text-amber-400">₹{item.totalCost.toLocaleString('en-IN')}</span>
                  </div>

                  {item.status !== 'Completed' && item.status !== 'Cancelled' && (
                    <button
                      onClick={() => onCancelBooking(item.id)}
                      className="px-3.5 py-1.5 bg-rose-950/60 text-rose-300 hover:bg-rose-900 border border-rose-500/30 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancel Order</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
