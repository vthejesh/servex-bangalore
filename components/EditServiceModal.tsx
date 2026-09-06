'use client';

import React, { useState } from 'react';
import { ServiceItem, ServiceCategory } from '@/types';
import { X, Edit3, CheckCircle } from 'lucide-react';

interface EditServiceModalProps {
  service: ServiceItem | null;
  categories: ServiceCategory[];
  onClose: () => void;
  onUpdateService: (updatedService: ServiceItem) => void;
}

export const EditServiceModal: React.FC<EditServiceModalProps> = ({
  service,
  categories,
  onClose,
  onUpdateService,
}) => {
  if (!service) return null;

  const [title, setTitle] = useState(service.title);
  const [category, setCategory] = useState<ServiceCategory>(service.category);
  const [description, setDescription] = useState(service.description);
  const [price, setPrice] = useState<number>(service.price);
  const [unit, setUnit] = useState(service.unit);
  const [tags, setTags] = useState(service.tags.join(', '));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !price) return;

    onUpdateService({
      ...service,
      title,
      category,
      description,
      price,
      unit,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 text-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl border border-sky-500/30">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 p-6 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-sky-400 flex items-center justify-center font-bold shadow-lg">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Edit Service Listing</h2>
              <p className="text-xs text-sky-200">Update pricing, description, or tags in ₹</p>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
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
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
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
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Unit Label
            </label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Description *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 hover:opacity-95 text-white font-black rounded-2xl shadow-xl shadow-sky-500/30 transition-all text-sm flex items-center justify-center gap-2 mt-4"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Save Service Changes</span>
          </button>
        </form>
      </div>
    </div>
  );
};
