'use client';

import React from 'react';
import { ServiceItem, ProviderProfile, Booking } from '@/types';
import { 
  BarChart2, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  ShoppingBag, 
  Grid,
  CheckCircle,
  Sparkles
} from 'lucide-react';

interface AdminOverviewProps {
  services: ServiceItem[];
  providers: ProviderProfile[];
  bookings: Booking[];
  categories: string[];
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  services,
  providers,
  bookings,
  categories,
}) => {
  const totalVolume = bookings.reduce((acc, curr) => acc + curr.totalCost, 0);
  const totalVerifiedProviders = providers.filter((p) => p.isVerified).length;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in relative z-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-purple-500/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-black uppercase tracking-widest bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
            Platform Command Center
          </span>
          <span className="text-xs text-slate-400">Bangalore Market Engine</span>
        </div>
        <h1 className="text-3xl font-black text-white">Platform Analytics & Metrics</h1>
        <p className="text-sm text-slate-300 mt-1 max-w-xl">
          Real-time metrics on 100+ services catalog distribution, provider verification, booking volume in ₹, and category performance.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Catalog Services</span>
            <div className="p-2 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30">
              <Grid className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-white">{services.length}</span>
          <p className="text-xs text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            10 Active Categories
          </p>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified Pros</span>
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-white">{providers.length}</span>
          <p className="text-xs text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            {totalVerifiedProviders} Bangalore Pros
          </p>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bookings</span>
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-white">{bookings.length}</span>
          <p className="text-xs text-indigo-400 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            AI & Direct Orders
          </p>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Booking Value</span>
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-amber-400">₹{totalVolume.toLocaleString('en-IN')}</span>
          <p className="text-xs text-amber-300 font-semibold mt-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Est. Commission ₹{(totalVolume * 0.15).toLocaleString('en-IN')}
          </p>
        </div>

      </div>

      {/* Category Breakdown Table */}
      <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-purple-400" />
          100+ Services Category Coverage (Bangalore)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat, idx) => {
            const count = services.filter((s) => s.category === cat).length;
            const categoryProviders = providers.filter((p) => p.category === cat).length;

            return (
              <div
                key={idx}
                className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 flex items-center justify-between hover:border-purple-500/40 transition-colors"
              >
                <div>
                  <h4 className="text-sm font-bold text-white">{cat}</h4>
                  <span className="text-xs text-slate-400">{categoryProviders} Registered Pros</span>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-amber-400">{count} Services</span>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">100% Live</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
