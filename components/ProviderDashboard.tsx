'use client';

import React, { useState } from 'react';
import { ProviderProfile, Booking, ServiceItem } from '@/types';
import { 
  Briefcase, 
  Clock, 
  Star, 
  MapPin, 
  Plus, 
  ShieldCheck
} from 'lucide-react';

interface ProviderDashboardProps {
  providers: ProviderProfile[];
  bookings: Booking[];
  services: ServiceItem[];
  onUpdateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  openRegisterModal: () => void;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({
  providers,
  bookings,
  services,
  onUpdateBookingStatus,
  openRegisterModal,
}) => {
  const [selectedProviderId, setSelectedProviderId] = useState<string>(
    providers.length > 0 ? providers[0].id : ''
  );

  const activeProvider = providers.find((p) => p.id === selectedProviderId) || providers[0];

  const providerJobs = bookings.filter(
    (b) => b.providerId === activeProvider?.id || b.category === activeProvider?.category
  );

  const totalEarnings = providerJobs
    .filter((b) => b.status === 'Completed' || b.status === 'Confirmed')
    .reduce((acc, curr) => acc + curr.totalCost, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in relative z-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 rounded-3xl p-8 text-white shadow-2xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
              Provider Hub (Bangalore)
            </span>
          </div>
          <h1 className="text-3xl font-black text-white">Service Provider Portal</h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Accept client service requests in Bangalore, manage active jobs, track earnings in ₹, and offer services across 100+ categories.
          </p>
        </div>

        <button
          onClick={openRegisterModal}
          className="px-5 py-3.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:opacity-95 text-slate-950 font-black rounded-2xl shadow-lg shadow-emerald-500/25 transition-all text-xs flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Register Provider Account</span>
        </button>
      </div>

      {/* Provider Selector & Active Profile Info */}
      {activeProvider ? (
        <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <img
                src={activeProvider.avatarUrl}
                alt={activeProvider.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-white">{activeProvider.name}</h3>
                  {activeProvider.isVerified && (
                    <ShieldCheck className="w-5 h-5 text-sky-400" />
                  )}
                </div>
                <p className="text-xs text-slate-400">{activeProvider.businessName || activeProvider.category}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    {activeProvider.location}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {activeProvider.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Switch Active Provider Profile */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Active Profile:</span>
              <select
                value={selectedProviderId}
                onChange={(e) => setSelectedProviderId(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-950/50 border border-emerald-500/30 p-4 rounded-2xl">
              <span className="text-xs font-bold text-emerald-400 block uppercase">Total Revenue (₹)</span>
              <span className="text-2xl font-black text-amber-400">₹{totalEarnings.toLocaleString('en-IN')}</span>
            </div>

            <div className="bg-sky-950/50 border border-sky-500/30 p-4 rounded-2xl">
              <span className="text-xs font-bold text-sky-400 block uppercase">Active Orders</span>
              <span className="text-2xl font-black text-white">{providerJobs.length}</span>
            </div>

            <div className="bg-purple-950/50 border border-purple-500/30 p-4 rounded-2xl">
              <span className="text-xs font-bold text-purple-400 block uppercase">Completed Jobs</span>
              <span className="text-2xl font-black text-white">{activeProvider.completedJobs}</span>
            </div>
          </div>

          {/* Incoming Job Requests */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              Incoming Job Requests in Bangalore
            </h4>

            {providerJobs.length === 0 ? (
              <div className="bg-slate-950/60 p-8 rounded-2xl text-center border border-slate-800">
                <Clock className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-xs text-slate-400">No active job requests in this category yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {providerJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-sky-300 bg-sky-500/10 px-2.5 py-0.5 rounded-md border border-sky-500/20">
                          {job.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase ${
                          job.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          job.status === 'In Progress' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          job.status === 'Completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {job.status}
                        </span>
                      </div>

                      <h5 className="text-sm font-bold text-white">{job.serviceTitle}</h5>
                      <p className="text-xs text-slate-400">Client: <span className="font-semibold text-slate-200">{job.customerName}</span> ({job.customerPhone})</p>
                      <p className="text-xs text-slate-400">Address: {job.customerAddress}</p>
                      <p className="text-xs text-slate-500">Date: {job.scheduledDate} at {job.scheduledTime}</p>
                    </div>

                    <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Job Value</span>
                        <span className="text-lg font-black text-amber-400">₹{job.totalCost.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {job.status !== 'In Progress' && job.status !== 'Completed' && (
                          <button
                            onClick={() => onUpdateBookingStatus(job.id, 'In Progress')}
                            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm"
                          >
                            Start Work
                          </button>
                        )}
                        {job.status !== 'Completed' && (
                          <button
                            onClick={() => onUpdateBookingStatus(job.id, 'Completed')}
                            className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      ) : null}
    </div>
  );
};
