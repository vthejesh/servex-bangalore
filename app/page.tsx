'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { ServiceCard } from '@/components/ServiceCard';
import { ServiceModal } from '@/components/ServiceModal';
import { AIWantBuilder } from '@/components/AIWantBuilder';
import { ProviderRegistrationModal } from '@/components/ProviderRegistrationModal';
import { ProviderDashboard } from '@/components/ProviderDashboard';
import { CustomerDashboard } from '@/components/CustomerDashboard';
import { AdminOverview } from '@/components/AdminOverview';
import { AstraCosmicBackground } from '@/components/AstraCosmicBackground';
import { AddServiceModal } from '@/components/AddServiceModal';
import { EditServiceModal } from '@/components/EditServiceModal';
import { UPIPaymentModal } from '@/components/UPIPaymentModal';
import { InvoiceModal } from '@/components/InvoiceModal';
import { ReviewModal } from '@/components/ReviewModal';
import { INITIAL_SERVICES, INITIAL_PROVIDERS } from '@/data/servicesData';
import { Language, TRANSLATIONS } from '@/data/translations';
import { ServiceItem, ServiceCategory, ProviderProfile, Booking } from '@/types';
import { 
  Sparkles, 
  Search, 
  PlusCircle
} from 'lucide-react';

const CATEGORIES: ServiceCategory[] = [
  'Home & Technical',
  'IT & Software',
  'Health & Fitness',
  'Security & Guarding',
  'Logistics & Wholesale',
  'Cleaning & Sanitation',
  'Creative & Media',
  'Business & Legal',
  'Automotive & Transport',
  'Education & Tutoring',
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    'catalog' | 'ai-want' | 'customer-dashboard' | 'provider-dashboard' | 'admin'
  >('catalog');

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedZone, setSelectedZone] = useState<string>('All Bangalore');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [pendingBooking, setPendingBooking] = useState<Omit<Booking, 'id' | 'createdAt'> | null>(null);
  const [invoiceBooking, setInvoiceBooking] = useState<Booking | null>(null);
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [isProviderRegisterOpen, setIsProviderRegisterOpen] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // State stores with LocalStorage Persistence
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [providers, setProviders] = useState<ProviderProfile[]>(INITIAL_PROVIDERS);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'bk-101',
      serviceId: 'home-2',
      serviceTitle: 'Electrical Rewiring & Circuit Fixtures',
      category: 'Home & Technical',
      providerId: 'prov-101',
      providerName: 'Rajesh Sambhani',
      customerName: 'Aravind Kumar',
      customerPhone: '+91 98765 12345',
      customerAddress: 'Indiranagar 100ft Road, Bangalore',
      scheduledDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      scheduledTime: '10:00 AM',
      status: 'Confirmed',
      totalCost: 399,
      notes: 'Fix main breaker trip in bedroom.',
      createdAt: new Date().toISOString(),
    },
  ]);

  // Load persisted services on mount
  useEffect(() => {
    try {
      const savedServices = localStorage.getItem('servex_bengaluru_services_v1');
      if (savedServices) {
        const parsed = JSON.parse(savedServices);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setServices(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading local storage services:', e);
    }
  }, []);

  // Save services helper
  const saveServicesState = (updatedList: ServiceItem[]) => {
    setServices(updatedList);
    try {
      localStorage.setItem('servex_bengaluru_services_v1', JSON.stringify(updatedList));
    } catch (e) {
      console.error('Error saving services to local storage:', e);
    }
  };

  // CRUD Actions
  const handleAddService = (newSrv: ServiceItem) => {
    const newList = [newSrv, ...services];
    saveServicesState(newList);
  };

  const handleUpdateService = (updatedSrv: ServiceItem) => {
    const newList = services.map((s) => (s.id === updatedSrv.id ? updatedSrv : s));
    saveServicesState(newList);
  };

  const handleDeleteService = (serviceId: string) => {
    const newList = services.filter((s) => s.id !== serviceId);
    saveServicesState(newList);
  };

  // Filtered Services logic (Category + Zone + Search)
  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      const matchesCategory = selectedCategory === 'All' || srv.category === selectedCategory;
      const matchesZone = selectedZone === 'All Bangalore' || srv.tags.some((t) => t.toLowerCase().includes(selectedZone.toLowerCase())) || srv.description.toLowerCase().includes(selectedZone.toLowerCase());
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        srv.title.toLowerCase().includes(q) ||
        srv.description.toLowerCase().includes(q) ||
        srv.category.toLowerCase().includes(q) ||
        srv.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesZone && matchesSearch;
    });
  }, [services, selectedCategory, selectedZone, searchQuery]);

  // Initiate Booking -> Trigger UPI Payment Modal
  const handleInitiateBooking = (newBooking: Omit<Booking, 'id' | 'createdAt'>) => {
    setSelectedService(null);
    setPendingBooking(newBooking);
  };

  // Complete Payment -> Save Booking
  const handleCompletePayment = (paymentMethod: string) => {
    if (!pendingBooking) return;

    const created: Booking = {
      ...pendingBooking,
      id: `bk-${Date.now()}`,
      notes: `${pendingBooking.notes || ''} [Paid via ${paymentMethod}]`.trim(),
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [created, ...prev]);
    setPendingBooking(null);
    setActiveTab('customer-dashboard');
  };

  const handleBulkBook = (bulkBookings: Omit<Booking, 'id' | 'createdAt'>[]) => {
    const newItems: Booking[] = bulkBookings.map((item, idx) => ({
      ...item,
      id: `bk-ai-${Date.now()}-${idx}`,
      createdAt: new Date().toISOString(),
    }));
    setBookings((prev) => [...newItems, ...prev]);
  };

  const handleRegisterProvider = (newProv: Omit<ProviderProfile, 'id' | 'completedJobs' | 'isVerified'>) => {
    const created: ProviderProfile = {
      ...newProv,
      id: `prov-${Date.now()}`,
      completedJobs: 0,
      isVerified: true,
    };
    setProviders((prev) => [created, ...prev]);
  };

  const handleUpdateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
  };

  const handleSubmitReview = (bookingId: string, rating: number, comment: string) => {
    const targetBooking = bookings.find((b) => b.id === bookingId);
    if (targetBooking) {
      setServices((prev) =>
        prev.map((s) => {
          if (s.id === targetBooking.serviceId) {
            const newCount = s.reviewsCount + 1;
            const newRating = (s.rating * s.reviewsCount + rating) / newCount;
            return { ...s, rating: newRating, reviewsCount: newCount };
          }
          return s;
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      
      {/* OpenAI GPT Astra Animated Cosmic Background */}
      <AstraCosmicBackground />

      {/* Global Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        openProviderRegisterModal={() => setIsProviderRegisterOpen(true)}
        openAddServiceModal={() => setIsAddServiceOpen(true)}
        bookingsCount={bookings.length}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Tab 1: 100+ Services Catalog */}
        {activeTab === 'catalog' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Hero Astra Banner */}
            <div className="relative rounded-3xl bg-gradient-to-r from-slate-950 via-orange-950/80 to-slate-950 p-8 sm:p-12 text-white overflow-hidden border border-orange-500/30 shadow-2xl backdrop-blur-md">
              <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="max-w-2xl relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/40 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
                  <span>Bangalore 100+ Services ({selectedZone})</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  {t.heroTitle} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400">
                    From Carpentry to AI Developers
                  </span>
                </h1>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {t.heroSubtitle}
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('ai-want')}
                    className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 hover:opacity-95 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-orange-500/25 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                    <span>{t.aiWant}</span>
                  </button>

                  <button
                    onClick={() => setIsAddServiceOpen(true)}
                    className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl border border-orange-500/30 transition-all flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4 text-orange-400" />
                    <span>{t.addService}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Category Pills Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {t.selectCategory} ({services.length} Total Services)
                </h3>
                {selectedCategory !== 'All' && (
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="text-xs text-orange-400 hover:underline font-bold"
                  >
                    Reset Filter (Show All {services.length})
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === 'All'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-lg shadow-orange-500/30 ring-2 ring-amber-400'
                      : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {t.allServices} ({services.length})
                </button>

                {CATEGORIES.map((cat, idx) => {
                  const catCount = services.filter((s) => s.category === cat).length;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                        selectedCategory === cat
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-lg shadow-orange-500/30 ring-2 ring-amber-400'
                          : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {cat} ({catCount})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Result Counter */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Showing <span className="font-bold text-amber-300">{filteredServices.length}</span> services in Indian Rupees (₹)
                {searchQuery && <span> for search "<span className="text-orange-400">{searchQuery}</span>"</span>}
              </p>
            </div>

            {/* 100+ Services Grid */}
            {filteredServices.length === 0 ? (
              <div className="bg-slate-900/80 rounded-3xl p-12 text-center border border-slate-800">
                <Search className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">No matching services found</h3>
                <p className="text-xs text-slate-400 mt-1">Try searching another keyword or add a new service!</p>
                <button
                  onClick={() => setIsAddServiceOpen(true)}
                  className="mt-4 px-5 py-2.5 bg-orange-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  + Add New Service Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredServices.map((srv) => (
                  <ServiceCard
                    key={srv.id}
                    service={srv}
                    onBookNow={(s) => setSelectedService(s)}
                    onEditService={(s) => setEditingService(s)}
                    onDeleteService={handleDeleteService}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: AI Want Assistant */}
        {activeTab === 'ai-want' && (
          <AIWantBuilder
            services={services}
            onBulkBook={handleBulkBook}
          />
        )}

        {/* Tab 3: Customer Dashboard */}
        {activeTab === 'customer-dashboard' && (
          <CustomerDashboard
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onExploreServices={() => setActiveTab('catalog')}
            onOpenInvoice={(b) => setInvoiceBooking(b)}
            onOpenReview={(b) => setReviewBooking(b)}
          />
        )}

        {/* Tab 4: Provider Dashboard */}
        {activeTab === 'provider-dashboard' && (
          <ProviderDashboard
            providers={providers}
            bookings={bookings}
            services={services}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            openRegisterModal={() => setIsProviderRegisterOpen(true)}
          />
        )}

        {/* Tab 5: Admin Stats */}
        {activeTab === 'admin' && (
          <AdminOverview
            services={services}
            providers={providers}
            bookings={bookings}
            categories={CATEGORIES}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs py-8 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="font-extrabold text-white">ServeX Bangalore E-Commerce Marketplace</p>
          <p className="text-slate-400">
            100+ Services in Indian Rupees (₹) • Multi-Language (English / ಕನ್ನಡ / हिंदी) • Instant UPI & WhatsApp Dispatch
          </p>
          <p className="text-[10px] text-slate-600">© 2026 ServeX Bangalore. All rights reserved.</p>
        </div>
      </footer>

      {/* Booking Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          providers={providers}
          onClose={() => setSelectedService(null)}
          onConfirmBooking={handleInitiateBooking}
        />
      )}

      {/* UPI Payment Gateway Modal */}
      {pendingBooking && (
        <UPIPaymentModal
          serviceTitle={pendingBooking.serviceTitle}
          amount={pendingBooking.totalCost}
          customerName={pendingBooking.customerName}
          onClose={() => setPendingBooking(null)}
          onPaymentSuccess={handleCompletePayment}
        />
      )}

      {/* Invoice Modal */}
      {invoiceBooking && (
        <InvoiceModal
          booking={invoiceBooking}
          onClose={() => setInvoiceBooking(null)}
        />
      )}

      {/* Review Submission Modal */}
      {reviewBooking && (
        <ReviewModal
          booking={reviewBooking}
          onClose={() => setReviewBooking(null)}
          onSubmitReview={handleSubmitReview}
        />
      )}

      {/* Add Custom Service Modal */}
      {isAddServiceOpen && (
        <AddServiceModal
          categories={CATEGORIES}
          onClose={() => setIsAddServiceOpen(false)}
          onAddService={handleAddService}
        />
      )}

      {/* Edit Service Modal */}
      {editingService && (
        <EditServiceModal
          service={editingService}
          categories={CATEGORIES}
          onClose={() => setEditingService(null)}
          onUpdateService={handleUpdateService}
        />
      )}

      {/* Provider Onboarding Modal */}
      {isProviderRegisterOpen && (
        <ProviderRegistrationModal
          categories={CATEGORIES}
          onClose={() => setIsProviderRegisterOpen(false)}
          onRegisterProvider={handleRegisterProvider}
        />
      )}
    </div>
  );
}
