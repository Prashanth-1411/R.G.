export interface AmbulanceService {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  image_path: string;
  features: string[];
  order: number;
}

export interface FuneralService {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  image_path: string;
  features: string[];
  order: number;
}

export interface ServiceArea {
  id: number;
  name: string;
  slug: string;
  description: string;
  content_html: string;
  faqs: { question: string; answer: string }[];
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  is_active: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string;
  meta_title: string;
  meta_description: string;
  status: 'draft' | 'published';
  created_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  content: string;
  rating: number;
  verification_url: string;
  is_approved: boolean;
  order: number;
  created_at: string;
}

export interface Booking {
  id: number;
  name: string;
  phone: string;
  pickup_location: string;
  destination: string;
  service_type: 'Ambulance' | 'Funeral';
  service_name: string;
  booking_date: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

export interface ContactLead {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  requirements: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  created_at: string;
}

export interface WhatsAppLead {
  id: number;
  phone: string;
  source_page: string;
  prefilled_message: string;
  created_at: string;
}

export interface SEOPage {
  id: number;
  page_name: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
  schema_markup: any;
  faq_schema: any;
  page_content?: Record<string, string>;
}
