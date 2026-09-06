export type ServiceCategory = 
  | 'Home & Technical'
  | 'IT & Software'
  | 'Health & Fitness'
  | 'Security & Guarding'
  | 'Logistics & Wholesale'
  | 'Cleaning & Sanitation'
  | 'Creative & Media'
  | 'Business & Legal'
  | 'Automotive & Transport'
  | 'Education & Tutoring';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  price: number;
  priceType: 'hourly' | 'fixed' | 'project' | 'daily';
  unit: string;
  rating: number;
  reviewsCount: number;
  icon: string;
  tags: string[];
  providersCount: number;
  popular?: boolean;
}

export interface ProviderProfile {
  id: string;
  name: string;
  businessName?: string;
  email: string;
  phone: string;
  category: ServiceCategory;
  servicesOffered: string[]; // Service IDs or titles
  rate: number;
  rateType: 'hourly' | 'fixed' | 'daily';
  location: string;
  rating: number;
  completedJobs: number;
  bio: string;
  isVerified: boolean;
  avatarUrl: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  category: ServiceCategory;
  providerId?: string;
  providerName?: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  totalCost: number;
  notes?: string;
  createdAt: string;
}

export interface AIWantRequest {
  rawPrompt: string;
  matchedServices: {
    service: ServiceItem;
    estimatedCost: number;
    notes: string;
  }[];
  totalEstimatedCost: number;
  urgency: 'Low' | 'Medium' | 'High' | 'Immediate';
}
