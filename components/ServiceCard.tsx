'use client';

import React, { memo } from 'react';
import { ServiceItem } from '@/types';
import { 
  Star, 
  ArrowRight, 
  Wrench, 
  Zap, 
  Hammer, 
  Wind, 
  Paintbrush, 
  Key, 
  Cpu, 
  Layers, 
  Sun, 
  Home, 
  Code, 
  Layout, 
  Smartphone, 
  Figma, 
  Cloud, 
  ShieldAlert, 
  BarChart3, 
  ShoppingBag, 
  TrendingUp, 
  Database, 
  Dumbbell, 
  Heart, 
  Activity, 
  Apple, 
  UserCheck, 
  Smile, 
  Sparkles, 
  Trophy, 
  Stethoscope, 
  Shield, 
  ShieldCheck, 
  Video, 
  FileText, 
  Lock, 
  Truck, 
  Award, 
  Search, 
  Store, 
  Package, 
  Navigation, 
  Box, 
  Move, 
  Thermometer, 
  HardHat, 
  Printer, 
  Briefcase, 
  Bug, 
  Droplet, 
  Maximize, 
  Flame, 
  Trash2, 
  Camera, 
  PenTool, 
  Mic, 
  Volume2, 
  Compass, 
  Share2, 
  Radio, 
  Calculator, 
  Building, 
  PieChart, 
  BookOpen, 
  Edit3, 
  CheckSquare, 
  CheckCircle, 
  User, 
  Grid, 
  BatteryCharging, 
  Scissors, 
  Globe, 
  Music
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Wrench, Zap, Hammer, Wind, Paintbrush, Key, Cpu, Layers, Sun, Home,
  Code, Layout, Smartphone, Figma, Cloud, ShieldAlert, BarChart3, ShoppingBag,
  TrendingUp, Database, Dumbbell, Heart, Activity, Apple, UserCheck, Smile,
  Sparkles, Trophy, Stethoscope, Shield, ShieldCheck, Video, FileText, Lock,
  Truck, Award, Search, Store, Package, Navigation, Box, Move, Thermometer,
  HardHat, Printer, Briefcase, Bug, Droplet, Maximize, Flame, Trash2, Camera,
  PenTool, Mic, Volume2, Compass, Share2, Radio, Calculator, Building, PieChart,
  BookOpen, Edit3, CheckSquare, CheckCircle, User, Grid, BatteryCharging,
  Scissors, Globe, Music
};

interface ServiceCardProps {
  service: ServiceItem;
  onBookNow: (service: ServiceItem) => void;
  onEditService: (service: ServiceItem) => void;
  onDeleteService: (serviceId: string) => void;
}

export const ServiceCard = memo<ServiceCardProps>(({
  service,
  onBookNow,
  onEditService,
  onDeleteService,
}) => {
  const IconComponent = ICON_MAP[service.icon] || Wrench;

  return (
    <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 hover:border-orange-500/50 shadow-xl hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Card Header */}
        <div className="p-5 pb-3">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-orange-400 group-hover:text-amber-300 group-hover:scale-105 transition-transform border border-slate-700/60 shadow-inner">
              <IconComponent className="w-6 h-6" />
            </div>

            <div className="flex items-center gap-1.5">
              {/* Rating Badge */}
              <div className="flex items-center gap-1 bg-amber-500/10 text-amber-300 px-2.5 py-1 rounded-xl border border-amber-500/30 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{service.rating.toFixed(1)}</span>
              </div>

              {/* Edit Action */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditService(service);
                }}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                title="Edit service details"
              >
                <Edit3 className="w-3.5 h-3.5 text-sky-400" />
              </button>

              {/* Delete Action */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Are you sure you want to remove "${service.title}"?`)) {
                    onDeleteService(service.id);
                  }
                }}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                title="Delete service"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              </button>
            </div>
          </div>

          <span className="inline-block text-[10px] font-extrabold tracking-wider text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg uppercase mb-2 border border-amber-500/20">
            {service.category}
          </span>

          <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
            {service.title}
          </h3>

          <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Tags */}
        <div className="px-5 py-2 flex flex-wrap gap-1.5 border-t border-slate-800/80">
          {service.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[10px] font-medium text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-700/50">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Price & Action */}
      <div className="p-5 pt-3 bg-slate-950/70 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Bangalore Price</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-amber-400">₹{service.price.toLocaleString('en-IN')}</span>
            <span className="text-xs text-slate-400">/{service.unit}</span>
          </div>
        </div>

        <button
          onClick={() => onBookNow(service)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 rounded-2xl text-xs font-black transition-all shadow-md shadow-orange-500/20 group/btn"
        >
          <span>Book Now</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';
