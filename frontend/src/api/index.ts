const API_BASE = import.meta.env.VITE_API_URL || '';

export interface NavbarItem {
  id: number;
  menu_name: string;
  menu_link: string;
  order: number;
  label: string;
  link: string;
  sort_order: number;
}

export interface SliderItem {
  id: number;
  image: string;
  title: string;
  description: string;
  button_text: string | null;
  button_link: string | null;
  order: number;
  is_active: boolean | number;
  image_url: string;
  subtitle: string;
  sort_order: number;
}

export interface PageItem {
  id: number;
  page_name: string;
  heading: string;
  content: string;
  image: string | null;
  banner_image: string | null;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string | null;
  service_type: string;
  status: string;
  order: number;
  image_url: string | null;
  is_active: boolean | number;
  sort_order: number;
}

export interface SiteSettings {
  logo: string | null;
  logo_width: number;
}

async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<any> {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = { ...(options.headers as Record<string, string> || {}) };
  if (token && !(options.body instanceof FormData)) {
    headers['Authorization'] = 'Bearer ' + token;
  }
  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export function getMediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  const base = API_BASE || window.location.origin;
  return `${base}/${path.replace(/^\//, '')}`;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    return await apiFetch('/api/settings');
  } catch {
    return { logo: null, logo_width: 96 };
  }
}

export async function getNavbarItems(): Promise<NavbarItem[]> {
  try {
    return await apiFetch('/api/navbar');
  } catch {
    return [];
  }
}

export async function getSliders(): Promise<SliderItem[]> {
  try {
    return await apiFetch('/api/sliders');
  } catch {
    return [];
  }
}

export async function getPages(): Promise<PageItem[]> {
  try {
    return await apiFetch('/api/pages');
  } catch {
    return [];
  }
}

export async function getPageByName(name: string): Promise<PageItem | null> {
  try {
    return await apiFetch(`/api/pages/${name}`);
  } catch {
    return null;
  }
}

export async function getServices(): Promise<ServiceItem[]> {
  try {
    return await apiFetch('/api/services');
  } catch {
    return [];
  }
}

export interface TestimonialItem {
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

export interface BlogPostItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  featured_image: string | null;
  category: string;
  tags: string;
  meta_title: string;
  meta_description: string;
  status: string;
  created_at: string;
}

export interface LocationItem {
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

export async function getTestimonials(approvedOnly = true): Promise<TestimonialItem[]> {
  try {
    const q = approvedOnly ? '?approved=1' : '';
    return await apiFetch(`/api/testimonials${q}`);
  } catch {
    return [];
  }
}

export async function getBlogPosts(publishedOnly = true): Promise<BlogPostItem[]> {
  try {
    const q = publishedOnly ? '?published=1' : '';
    return await apiFetch(`/api/blog${q}`);
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostItem | null> {
  try {
    return await apiFetch(`/api/blog/slug/${slug}`);
  } catch {
    return null;
  }
}

export async function getLocations(activeOnly = true): Promise<LocationItem[]> {
  try {
    const q = activeOnly ? '?active=1' : '';
    return await apiFetch(`/api/locations${q}`);
  } catch {
    return [];
  }
}

export async function getLocationBySlug(slug: string): Promise<LocationItem | null> {
  try {
    return await apiFetch(`/api/locations/slug/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
}

export const API_BASE_URL = API_BASE;
