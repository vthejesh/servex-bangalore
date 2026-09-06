'use client';

import React from 'react';
import { TirupatiLogo } from './TirupatiLogo';
import { Language, TRANSLATIONS } from '@/data/translations';
import { 
  Sparkles, 
  Search, 
  UserCheck, 
  ShoppingBag, 
  BarChart2, 
  PlusCircle, 
  MapPin, 
  Grid,
  Globe
} from 'lucide-react';

export const BANGALORE_ZONES = [
  'All Bangalore',
  'Indiranagar',
  'Koramangala',
  'Whitefield',
  'HSR Layout',
  'Electronic City',
  'Jayanagar',
  'MG Road',
  'Yelahanka',
  'Rajajinagar',
];

interface NavbarProps {
  activeTab: 'catalog' | 'ai-want' | 'customer-dashboard' | 'provider-dashboard' | 'admin';
  setActiveTab: (tab: 'catalog' | 'ai-want' | 'customer-dashboard' | 'provider-dashboard' | 'admin') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
  openProviderRegisterModal: () => void;
  openAddServiceModal: () => void;
  bookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  selectedZone,
  setSelectedZone,
  currentLang,
  setCurrentLang,
  openProviderRegisterModal,
  openAddServiceModal,
  bookingsCount,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md text-white shadow-2xl border-b border-orange-500/20">
      
      {/* Top Banner with Language Switcher */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-rose-600 text-slate-950 font-black text-xs py-1.5 px-4 text-center tracking-wide flex flex-wrap items-center justify-between gap-2 shadow-md">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
          <span>{t.bangaloreHeader}</span>
        </div>

        {/* Language & Zone Selector in Header */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          
          {/* Bangalore Zone Filter Dropdown */}
          <div className="flex items-center gap-1 bg-slate-950/80 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/40 text-[11px]">
            <MapPin className="w-3 h-3 text-orange-400" />
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer"
            >
              {BANGALORE_ZONES.map((zone, idx) => (
                <option key={idx} value={zone} className="bg-slate-900 text-white">
                  {zone}
                </option>
              ))}
            </select>
          </div>

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1 bg-slate-950/80 text-white px-2.5 py-0.5 rounded-full border border-white/30 text-[11px]">
            <Globe className="w-3 h-3 text-sky-400" />
            <select
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value as Language)}
              className="bg-transparent font-bold focus:outline-none cursor-pointer text-white"
            >
              <option value="en" className="bg-slate-900 text-white">English</option>
              <option value="ka" className="bg-slate-900 text-white">ಕನ್ನಡ (Kannada)</option>
              <option value="hi" className="bg-slate-900 text-white">हिंदी (Hindi)</option>
            </select>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo & Brand Name */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('catalog')}>
          <TirupatiLogo className="w-10 h-10" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-white">
                Serve<span className="text-orange-500">X</span>
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/40">
                Bangalore (₹)
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-orange-400" />
              {selectedZone === 'All Bangalore' ? 'All Bangalore Zones' : selectedZone}
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== 'catalog') setActiveTab('catalog');
            }}
            placeholder={t.searchPlaceholder}
            className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-2xl border border-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-inner"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-0.5 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          
          {/* AI Want Shortcut */}
          <button
            onClick={() => setActiveTab('ai-want')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black transition-all shadow-lg ${
              activeTab === 'ai-want'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 ring-2 ring-amber-400 shadow-orange-500/30'
                : 'bg-gradient-to-r from-orange-950/80 to-amber-950/80 text-amber-300 border border-orange-500/40 hover:border-amber-400'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>{t.aiWant}</span>
          </button>

          {/* Catalog Tab */}
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'catalog'
                ? 'bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>{t.catalog}</span>
          </button>

          {/* Add New Service */}
          <button
            onClick={openAddServiceModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-black bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 transition-all shadow-md shadow-amber-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.addService}</span>
          </button>

          {/* My Bookings */}
          <button
            onClick={() => setActiveTab('customer-dashboard')}
            className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'customer-dashboard'
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t.myBookings}</span>
            {bookingsCount > 0 && (
              <span className="ml-1 bg-rose-500 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {bookingsCount}
              </span>
            )}
          </button>

          {/* Provider Hub */}
          <button
            onClick={() => setActiveTab('provider-dashboard')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'provider-dashboard'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.providerHub}</span>
          </button>

          {/* Analytics */}
          <button
            onClick={() => setActiveTab('admin')}
            className={`p-2.5 rounded-2xl text-xs font-medium transition-all ${
              activeTab === 'admin'
                ? 'bg-slate-800 text-orange-400 border border-orange-500/40'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
