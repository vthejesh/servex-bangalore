'use client';

import React, { useState } from 'react';
import { ServiceItem, ProviderProfile, Booking } from '@/types';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  CreditCard
} from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem | null;
  providers: ProviderProfile[];
  onClose: () => void;
  onConfirmBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  providers,
  onClose,
  onConfirmBooking,
}) => {
  if (!service) return null;

  const matchingProviders = providers.filter(
    (p) => p.category === service.category || p.servicesOffered.includes(service.id)
  );

  const [selectedProviderId, setSelectedProviderId] = useState<string>(
    matchingProviders.length > 0 ? matchingProviders[0].id : 'auto'
  );

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('Indiranagar, Bangalore');
  const [scheduledDate, setScheduledDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [scheduledTime, setScheduledTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedProvider = matchingProviders.find((p) => p.id === selectedProviderId);
  const estimatedCost = selectedProvider ? selectedProvider.rate : service.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill in your name, phone number, and address in Bangalore.');
      return;
    }

    onConfirmBooking({
      serviceId: service.id,
      serviceTitle: service.title,
      category: service.category,
      providerId: selectedProvider?.id,
      providerName: selectedProvider ? selectedProvider.name : 'Auto-Assigned Verified Bangalore Pro',
      customerName,
      customerPhone,
      customerAddress,
      scheduledDate,
      scheduledTime,
      status: 'Confirmed',
      totalCost: estimatedCost,
      notes,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl border border-orange-500/30">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 p-6 rounded-t-3xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-slate-950/40 text-amber-300 px-2.5 py-1 rounded-full border border-amber-300/30">
              {service.category}
            </span>
            <h2 className="text-xl font-black mt-1 text-white">{service.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-950/50 text-slate-300 hover:text-white hover:bg-slate-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4 animate-bounce border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">Booking Confirmed!</h3>
            <p className="text-xs text-slate-300 mt-2 max-w-md">
              Your service order for <span className="font-semibold text-amber-400">{service.title}</span> has been placed. Our verified Bangalore professional will contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Service Summary Box */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Base Bangalore Rate</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-amber-400">₹{service.price.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-slate-400">/{service.unit}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-amber-400 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{service.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-slate-400">{service.providersCount} Pros Available</span>
              </div>
            </div>

            {/* Select Provider Option */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Select Service Provider
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setSelectedProviderId('auto')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedProviderId === 'auto'
                      ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-500/30'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-950/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Auto-Assign Best Pro</p>
                      <p className="text-[10px] text-slate-400">Match based on Bangalore location</p>
                    </div>
                  </div>
                </div>

                {matchingProviders.map((prov) => (
                  <div
                    key={prov.id}
                    onClick={() => setSelectedProviderId(prov.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      selectedProviderId === prov.id
                        ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-500/30'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img src={prov.avatarUrl} alt={prov.name} className="w-8 h-8 rounded-full object-cover border border-amber-400/40" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-white truncate">{prov.name}</p>
                          <span className="text-[10px] font-bold text-amber-400">₹{prov.rate}/{prov.rateType.slice(0,2)}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">{prov.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  <Calendar className="w-3.5 h-3.5 inline mr-1 text-orange-400" />
                  Scheduled Date
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  <Clock className="w-3.5 h-3.5 inline mr-1 text-orange-400" />
                  Preferred Time Slot
                </label>
                <select
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="08:00 AM">08:00 AM - 10:00 AM</option>
                  <option value="10:00 AM">10:00 AM - 12:00 PM</option>
                  <option value="02:00 PM">02:00 PM - 04:00 PM</option>
                  <option value="05:00 PM">05:00 PM - 07:00 PM</option>
                  <option value="Flexible">Flexible / Immediate</option>
                </select>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Contact & Bangalore Address
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none placeholder-slate-500"
                  required
                />

                <input
                  type="tel"
                  placeholder="Mobile Phone Number *"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none placeholder-slate-500"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Bangalore Address (e.g. Indiranagar 100ft Road) *"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Total Cost Breakdown */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total Payable Amount</span>
                <span className="text-2xl font-black text-amber-400">₹{estimatedCost.toLocaleString('en-IN')}</span>
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:opacity-95 text-slate-950 font-black rounded-2xl shadow-xl shadow-orange-500/25 transition-all text-xs flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Confirm Service Booking</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
