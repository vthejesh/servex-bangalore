'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, QrCode, Smartphone, CreditCard, ArrowRight, Zap } from 'lucide-react';

interface UPIPaymentModalProps {
  serviceTitle: string;
  amount: number;
  customerName: string;
  onClose: () => void;
  onPaymentSuccess: (paymentMethod: string) => void;
}

export const UPIPaymentModal: React.FC<UPIPaymentModalProps> = ({
  serviceTitle,
  amount,
  customerName,
  onClose,
  onPaymentSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upi_qr' | 'gpay' | 'phonepe' | 'paytm' | 'cash'>('upi_qr');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMethod !== 'cash' && selectedMethod !== 'upi_qr' && !upiId.includes('@')) {
      alert('Please enter a valid UPI ID (e.g. name@okaxis or name@ybl).');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPaymentSuccess(selectedMethod === 'cash' ? 'Cash After Service' : `UPI (${selectedMethod.toUpperCase()})`);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl border border-orange-500/30">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 p-6 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-bold shadow-lg">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">ServeX Instant UPI Pay</h2>
              <p className="text-xs text-amber-100">Zero Convenience Fee • 100% Secure UPI</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-950/50 text-slate-300 hover:text-white hover:bg-slate-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/40 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">Payment Verified!</h3>
            <p className="text-xs text-slate-300">
              ₹{amount.toLocaleString('en-IN')} payment received for <span className="text-amber-400 font-bold">{serviceTitle}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-6 space-y-5">
            
            {/* Amount Summary */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-bold">Total Amount Payable</span>
                <span className="text-2xl font-black text-amber-400">₹{amount.toLocaleString('en-IN')}</span>
              </div>
              <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/30">
                UPI & Cash Ready
              </span>
            </div>

            {/* Payment Method Tabs */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Payment Option
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                
                <div
                  onClick={() => setSelectedMethod('upi_qr')}
                  className={`p-3 rounded-2xl border cursor-pointer text-center transition-all ${
                    selectedMethod === 'upi_qr'
                      ? 'border-orange-500 bg-orange-500/10 text-amber-300 ring-2 ring-orange-500/30'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                  <span className="text-xs font-bold block">Scan UPI QR</span>
                </div>

                <div
                  onClick={() => setSelectedMethod('gpay')}
                  className={`p-3 rounded-2xl border cursor-pointer text-center transition-all ${
                    selectedMethod === 'gpay'
                      ? 'border-orange-500 bg-orange-500/10 text-amber-300 ring-2 ring-orange-500/30'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mx-auto mb-1 text-sky-400" />
                  <span className="text-xs font-bold block">Google Pay</span>
                </div>

                <div
                  onClick={() => setSelectedMethod('phonepe')}
                  className={`p-3 rounded-2xl border cursor-pointer text-center transition-all ${
                    selectedMethod === 'phonepe'
                      ? 'border-orange-500 bg-orange-500/10 text-amber-300 ring-2 ring-orange-500/30'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                  <span className="text-xs font-bold block">PhonePe</span>
                </div>

                <div
                  onClick={() => setSelectedMethod('paytm')}
                  className={`p-3 rounded-2xl border cursor-pointer text-center transition-all ${
                    selectedMethod === 'paytm'
                      ? 'border-orange-500 bg-orange-500/10 text-amber-300 ring-2 ring-orange-500/30'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                  <span className="text-xs font-bold block">Paytm UPI</span>
                </div>

                <div
                  onClick={() => setSelectedMethod('cash')}
                  className={`p-3 rounded-2xl border cursor-pointer text-center transition-all col-span-2 sm:col-span-2 ${
                    selectedMethod === 'cash'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 ring-2 ring-emerald-500/30'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                  <span className="text-xs font-bold block">Pay Cash After Service</span>
                </div>

              </div>
            </div>

            {/* UPI QR Display */}
            {selectedMethod === 'upi_qr' && (
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-3">
                <p className="text-xs text-slate-400 font-bold uppercase">Scan with GPay, PhonePe, Paytm, or BHIM</p>
                
                <div className="w-40 h-40 bg-white p-3 rounded-2xl mx-auto flex flex-col items-center justify-center border-4 border-amber-400 shadow-xl">
                  {/* Generated QR Code Representation */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                      `upi://pay?pa=servex.bengaluru@okaxis&pn=ServeX+Bangalore&am=${amount}&cu=INR`
                    )}`}
                    alt="UPI Payment QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>

                <p className="text-[11px] font-mono text-amber-400">UPI VPA: servex.bengaluru@okaxis</p>
              </div>
            )}

            {/* UPI ID Input */}
            {selectedMethod !== 'cash' && selectedMethod !== 'upi_qr' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Enter Your UPI VPA ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. mobile@okaxis or username@ybl"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  required
                />
              </div>
            )}

            {/* Action Submit */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 hover:opacity-95 text-slate-950 font-black rounded-2xl shadow-xl shadow-orange-500/25 transition-all text-xs flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Zap className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Verifying Payment...</span>
                </>
              ) : (
                <>
                  <span>
                    {selectedMethod === 'cash'
                      ? 'Confirm Cash After Service Booking'
                      : `Approve ₹${amount.toLocaleString('en-IN')} Payment`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
