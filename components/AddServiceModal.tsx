'use client';

import React, { useState } from 'react';
import { ServiceItem, ServiceCategory } from '@/types';
import { X, PlusCircle, Sparkles, CheckCircle } from 'lucide-react';

interface AddServiceModalProps {
  categories: ServiceCategory[];
  onClose: () => void;
  onAddService: (newService: ServiceItem) => void;
}

export const AddServiceModal: React.FC<AddServiceModalProps> = ({
  categories,
  onClose,
  onAddService,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('Home & Technical');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(499);
  const [priceType, setPriceType] = useState<'hourly' | 'fixed' | 'project' | 'daily'>('hourly');
  const [unit, setUnit] = useState('hr');
  const [tags, setTags] = useState('Bangalore, Verified, Quick');
  const [icon, setIcon] = useState('Wrench');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !price) {
      alert('Please fill out all required fields.');
      return;
    }

    const createdService: ServiceItem = {
      id: `srv-custom-${Date.now()}`,
      title,
      category,
      description,
      price,
      priceType,
      unit,
      rating: 5.0,
      reviewsCount: 1,
      icon,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      providersCount: 5,
      popular: true,
    };

    onAddService(createdService);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 text-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl border border-orange-500/30">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 p-6 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-bold shadow-lg">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Add New Service to Catalog</h2>
              <p className="text-xs text-amber-100">Instantly list services available in Bangalore (₹)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-950/50 text-slate-300 hover:text-white hover:bg-slate-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Service Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Bangalore Authentic Dosa Cook & Catering"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none placeholder-slate-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Price in Indian Rupees (₹) *
              </label>
              <input
                type="number"
                min="10"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Pricing Rate Type
              </label>
              <select
                value={priceType}
                onChange={(e) => setPriceType(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="hourly">Hourly Rate (₹/hr)</option>
                <option value="fixed">Fixed Per Job (₹/job)</option>
                <option value="daily">Daily Shift (₹/day)</option>
                <option value="project">Project Batch (₹/project)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Price Unit Label
              </label>
              <input
                type="text"
                placeholder="e.g. hr, visit, day, item"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Description & Scope of Work *
            </label>
            <textarea
              rows={3}
              placeholder="Describe what is included in this service..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none placeholder-slate-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Search Tags (Comma Separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Bangalore, Indiranagar, Catering, Quick"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:opacity-95 text-slate-950 font-black rounded-2xl shadow-xl shadow-orange-500/30 transition-all text-sm flex items-center justify-center gap-2 mt-4"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Publish Service To Live Catalog</span>
          </button>
        </form>
      </div>
    </div>
  );
};
