'use client';

import React from 'react';
import { Booking } from '@/types';
import { TirupatiLogo } from './TirupatiLogo';
import { X, Printer, Download, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

interface InvoiceModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  const basePrice = Math.round(booking.totalCost / 1.18);
  const totalTax = booking.totalCost - basePrice;
  const cgst = Math.round(totalTax / 2);
  const sgst = totalTax - cgst;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in print:p-0 print:bg-white print:static">
      <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl border border-slate-200 print:shadow-none print:border-none print:max-h-none print:w-full print:rounded-none">
        
        {/* Modal Controls */}
        <div className="bg-slate-900 text-white p-6 rounded-t-3xl flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-black">Official GST Service Invoice</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 hover:opacity-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-6 bg-white text-slate-900 print:p-6" id="printable-invoice">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <TirupatiLogo className="w-12 h-12" />
              <div>
                <h1 className="text-2xl font-black text-slate-900">ServeX <span className="text-orange-600">Bangalore</span></h1>
                <p className="text-xs text-slate-500">100+ On-Demand Services Marketplace</p>
                <p className="text-[10px] text-slate-400 mt-0.5">GSTIN: 29AAAAA0000A1Z5 • Karnataka, India</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                TAX INVOICE
              </span>
              <p className="text-xs font-bold text-slate-900 mt-2">Inv #: INV-BLR-{booking.id.slice(-6).toUpperCase()}</p>
              <p className="text-[11px] text-slate-500">Date: {new Date(booking.createdAt).toLocaleDateString('en-IN')}</p>
            </div>
          </div>

          {/* Customer & Provider Details */}
          <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">BILLED TO (CUSTOMER)</span>
              <p className="font-bold text-slate-900">{booking.customerName}</p>
              <p className="text-slate-600">{booking.customerPhone}</p>
              <p className="text-slate-600 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-orange-600" />
                {booking.customerAddress}
              </p>
            </div>

            <div className="border-l border-slate-200 pl-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">SERVICE PROVIDER</span>
              <p className="font-bold text-slate-900">{booking.providerName || 'ServeX Verified Professional'}</p>
              <p className="text-slate-600">Category: {booking.category}</p>
              <p className="text-slate-600">Schedule: {booking.scheduledDate} ({booking.scheduledTime})</p>
            </div>
          </div>

          {/* Particulars Table */}
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-bold uppercase text-[10px] tracking-wider">
                <th className="p-3 rounded-l-xl">Description</th>
                <th className="p-3 text-center">Category</th>
                <th className="p-3 text-right rounded-r-xl">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-3">
                  <p className="font-bold text-slate-900">{booking.serviceTitle}</p>
                  {booking.notes && <p className="text-[10px] text-slate-500 mt-0.5">Note: {booking.notes}</p>}
                </td>
                <td className="p-3 text-center text-slate-600">{booking.category}</td>
                <td className="p-3 text-right font-bold text-slate-900">₹{basePrice.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>

          {/* Tax Breakdown */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal (Excl. Tax):</span>
                <span className="font-bold text-slate-900">₹{basePrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>CGST (9%):</span>
                <span>₹{cgst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>SGST (9%):</span>
                <span>₹{sgst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-t border-slate-900 pt-2 text-sm font-black text-slate-900">
                <span>Total Amount Paid:</span>
                <span className="text-orange-600">₹{booking.totalCost.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Seal & Sign */}
          <div className="border-t border-slate-200 pt-4 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Electronically Verified • ServeX Bangalore</span>
            </div>
            <p className="italic">Thank you for booking with ServeX!</p>
          </div>

        </div>
      </div>
    </div>
  );
};
