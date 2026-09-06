'use client';

import React, { useState } from 'react';
import { ServiceItem, AIWantRequest, Booking } from '@/types';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  ShoppingBag,
  Zap
} from 'lucide-react';

interface AIWantBuilderProps {
  services: ServiceItem[];
  onBulkBook: (bookings: Omit<Booking, 'id' | 'createdAt'>[]) => void;
}

export const AIWantBuilder: React.FC<AIWantBuilderProps> = ({ services, onBulkBook }) => {
  const [prompt, setPrompt] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [result, setResult] = useState<AIWantRequest | null>(null);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('Indiranagar, Bangalore');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const samplePrompts = [
    "I need an electrician for my Koramangala office, a personal gym trainer 3 times a week, and a security guard for 2 days.",
    "Opening a new store in Whitefield: I need a software developer for website, a graphic designer, and a wholesale market supplier.",
    "Need a plumber for pipe leak in Indiranagar, home deep cleaning, and mobile car mechanic."
  ];

  const handleParseAIWant = (inputPrompt: string) => {
    const textToAnalyze = inputPrompt || prompt;
    if (!textToAnalyze.trim()) return;

    setIsParsing(true);
    setBookedSuccess(false);

    setTimeout(() => {
      const lower = textToAnalyze.toLowerCase();
      const matched: AIWantRequest['matchedServices'] = [];

      services.forEach((srv) => {
        const titleLower = srv.title.toLowerCase();
        const tagMatch = srv.tags.some((t) => lower.includes(t.toLowerCase()));

        if (
          lower.includes(titleLower) ||
          tagMatch ||
          (lower.includes('carpenter') && titleLower.includes('carpentry')) ||
          (lower.includes('plumber') && titleLower.includes('plumbing')) ||
          (lower.includes('electrician') && titleLower.includes('electrical')) ||
          (lower.includes('developer') && titleLower.includes('developer')) ||
          (lower.includes('gym') && titleLower.includes('gym')) ||
          (lower.includes('trainer') && titleLower.includes('trainer')) ||
          (lower.includes('security') && titleLower.includes('security')) ||
          (lower.includes('guard') && titleLower.includes('guard')) ||
          (lower.includes('supplier') && titleLower.includes('supplier')) ||
          (lower.includes('wholesale') && titleLower.includes('wholesale')) ||
          (lower.includes('clean') && titleLower.includes('clean')) ||
          (lower.includes('mechanic') && titleLower.includes('mechanic')) ||
          (lower.includes('tutor') && titleLower.includes('tutor'))
        ) {
          if (matched.length < 5 && !matched.some((m) => m.service.id === srv.id)) {
            matched.push({
              service: srv,
              estimatedCost: srv.price,
              notes: `Auto-extracted requirement matching "${srv.title}"`,
            });
          }
        }
      });

      if (matched.length === 0) {
        const fallbackIds = ['home-2', 'it-1', 'sec-1', 'health-1', 'log-1'];
        fallbackIds.forEach((id) => {
          const s = services.find((srv) => srv.id === id);
          if (s && matched.length < 3) {
            matched.push({
              service: s,
              estimatedCost: s.price,
              notes: `Suggested popular service in Bangalore`,
            });
          }
        });
      }

      const totalCost = matched.reduce((acc, curr) => acc + curr.estimatedCost, 0);

      setResult({
        rawPrompt: textToAnalyze,
        matchedServices: matched,
        totalEstimatedCost: totalCost,
        urgency: lower.includes('urgent') || lower.includes('immediately') || lower.includes('today') ? 'High' : 'Medium',
      });

      setIsParsing(false);
    }, 900);
  };

  const handleConfirmAll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!result || result.matchedServices.length === 0) return;
    if (!userName || !userPhone || !userAddress) {
      alert('Please provide your name, phone number, and Bangalore address.');
      return;
    }

    const bookingsToCreate: Omit<Booking, 'id' | 'createdAt'>[] = result.matchedServices.map((item) => ({
      serviceId: item.service.id,
      serviceTitle: item.service.title,
      category: item.service.category,
      providerName: 'AI Matched Bangalore Professional',
      customerName: userName,
      customerPhone: userPhone,
      customerAddress: userAddress,
      scheduledDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      scheduledTime: '10:00 AM',
      status: 'Confirmed',
      totalCost: item.estimatedCost,
      notes: `AI Want Assistant bundle prompt: "${result.rawPrompt}"`,
    }));

    onBulkBook(bookingsToCreate);
    setBookedSuccess(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in relative z-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-orange-950 to-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-orange-500/30 relative overflow-hidden">
        
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <Sparkles className="w-6 h-6 animate-spin-slow text-amber-400" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-amber-300">
            AI Service Request Engine (Bangalore)
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white max-w-2xl">
          Raise Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400">AI Want</span>
        </h1>
        
        <p className="mt-3 text-sm text-slate-300 max-w-2xl leading-relaxed">
          Type your requirements in plain English or Kannada! Whether you need a carpenter, electrician, gym trainer, security guard, software dev, or market wholesaler in Bangalore — our AI extracts matching services in Indian Rupees (₹) for instant booking.
        </p>

        {/* Input Form */}
        <div className="mt-8 relative">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. I need an electrician for my office in HSR Layout, a gym trainer 3 times a week, and a security guard..."
            className="w-full bg-slate-950/90 text-white placeholder-slate-500 p-4 pr-36 rounded-2xl border border-orange-500/30 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm shadow-inner resize-none"
          />

          <button
            onClick={() => handleParseAIWant(prompt)}
            disabled={isParsing || !prompt.trim()}
            className="absolute right-3 bottom-4 px-5 py-2.5 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 hover:opacity-95 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
          >
            {isParsing ? (
              <>
                <Zap className="w-4 h-4 animate-spin text-slate-950" />
                <span>Parsing...</span>
              </>
            ) : (
              <>
                <span>Extract AI Want</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Sample Prompts */}
        <div className="mt-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Try Sample Prompts:</p>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(sp);
                  handleParseAIWant(sp);
                }}
                className="text-xs bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl border border-slate-700/60 transition-colors text-left line-clamp-1"
              >
                "{sp}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Parsed Results */}
      {result && (
        <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-orange-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-black text-white">AI Service Bundle Breakdown</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Matched <span className="font-bold text-amber-300">{result.matchedServices.length} services</span> in Bangalore (₹)
              </p>
            </div>

            <div className="bg-slate-950 text-white px-4 py-2 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Bundle Estimate</span>
                <span className="text-xl font-black text-amber-400">₹{result.totalEstimatedCost.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Service Items Grid */}
          <div className="space-y-3">
            {result.matchedServices.map((item, idx) => (
              <div key={idx} className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 hover:border-orange-500/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-black text-sm">
                    #{idx + 1}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-300 uppercase bg-amber-500/10 px-2 py-0.5 rounded-md">
                      {item.service.category}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{item.service.title}</h4>
                    <p className="text-xs text-slate-400">{item.notes}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-amber-400">₹{item.estimatedCost.toLocaleString('en-IN')}</span>
                  <span className="text-[11px] text-slate-500 block">/{item.service.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {bookedSuccess ? (
            <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 p-6 rounded-2xl text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2 animate-bounce" />
              <h4 className="text-lg font-bold text-white">All {result.matchedServices.length} Services Booked Successfully!</h4>
              <p className="text-xs mt-1">Check your "My Bookings" tab to track order status and professional dispatch in Bangalore.</p>
            </div>
          ) : (
            <form onSubmit={handleConfirmAll} className="space-y-4 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Fast Checkout For Entire AI Bundle
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="Mobile Phone Number *"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Bangalore Address *"
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 hover:opacity-95 text-slate-950 font-black rounded-2xl shadow-xl shadow-orange-500/25 text-sm flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Book Entire Bundle (₹{result.totalEstimatedCost.toLocaleString('en-IN')})</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
