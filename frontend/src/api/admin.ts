const API_BASE = import.meta.env.VITE_API_URL || '';

function getToken(): string | null {
  return localStorage.getItem('token');
}

async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<any> {
  const token = getToken();
  const headers: Record<string, string> = { ...(options.headers as Record<string, string> || {}) };
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  if (res.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/admin/login';
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// Auth
export async function login(email: string, password: string) {
  return apiFetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getProfile() {
  return apiFetch('/api/profile');
}

// Settings
export async function getSettings() {
  return apiFetch('/api/settings');
}

export async function updateSettings(data: Record<string, any>) {
  return apiFetch('/api/settings', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Navbar
export async function getNavbarItems() {
  return apiFetch('/api/navbar');
}

export async function createNavbarItem(data: Record<string, any>) {
  return apiFetch('/api/navbar', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateNavbarItem(id: number, data: Record<string, any>) {
  return apiFetch(`/api/navbar/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteNavbarItem(id: number) {
  return apiFetch(`/api/navbar/${id}`, { method: 'DELETE' });
}

export async function reorderNavbar(items: { id: number; order: number }[]) {
  return apiFetch('/api/navbar/reorder', {
    method: 'PUT',
    body: JSON.stringify({ items }),
  });
}

// Sliders
export async function getSliders() {
  return apiFetch('/api/sliders');
}

export async function createSlider(data: Record<string, any>) {
  return apiFetch('/api/sliders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateSlider(id: number, data: Record<string, any>) {
  return apiFetch(`/api/sliders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteSlider(id: number) {
  return apiFetch(`/api/sliders/${id}`, { method: 'DELETE' });
}

// Pages
export async function getPages() {
  return apiFetch('/api/pages');
}

export async function getPage(id: number) {
  return apiFetch(`/api/pages/${id}`);
}

export async function createPage(data: Record<string, any>) {
  return apiFetch('/api/pages', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updatePage(id: number, data: Record<string, any>) {
  return apiFetch(`/api/pages/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deletePage(id: number) {
  return apiFetch(`/api/pages/${id}`, { method: 'DELETE' });
}

// Sections
export async function getSections(pageId?: number) {
  const q = pageId ? `?pageId=${pageId}` : '';
  return apiFetch(`/api/sections${q}`);
}

export async function getSection(id: number) {
  return apiFetch(`/api/sections/${id}`);
}

export async function createSection(data: Record<string, any>) {
  return apiFetch('/api/sections', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateSection(id: number, data: Record<string, any>) {
  return apiFetch(`/api/sections/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteSection(id: number) {
  return apiFetch(`/api/sections/${id}`, { method: 'DELETE' });
}

export async function reorderSections(sections: { id: number; position: number }[]) {
  return apiFetch('/api/sections/reorder', {
    method: 'PUT',
    body: JSON.stringify({ sections }),
  });
}

// Services
export async function getServices() {
  return apiFetch('/api/services');
}

export async function getService(id: number) {
  return apiFetch(`/api/services/${id}`);
}

export async function createService(data: Record<string, any>) {
  return apiFetch('/api/services', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateService(id: number, data: Record<string, any>) {
  return apiFetch(`/api/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteService(id: number) {
  return apiFetch(`/api/services/${id}`, { method: 'DELETE' });
}

// Testimonials
export async function getTestimonials() {
  return apiFetch('/api/testimonials');
}

export async function createTestimonial(data: Record<string, any>) {
  return apiFetch('/api/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTestimonial(id: number, data: Record<string, any>) {
  return apiFetch(`/api/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTestimonial(id: number) {
  return apiFetch(`/api/testimonials/${id}`, { method: 'DELETE' });
}

// Blog
export async function getBlogPosts() {
  return apiFetch('/api/blog');
}

export async function getBlogPost(id: number) {
  return apiFetch(`/api/blog/${id}`);
}

export async function createBlogPost(data: Record<string, any>) {
  return apiFetch('/api/blog', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateBlogPost(id: number, data: Record<string, any>) {
  return apiFetch(`/api/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteBlogPost(id: number) {
  return apiFetch(`/api/blog/${id}`, { method: 'DELETE' });
}

// Locations (Service Areas)
export async function getLocations() {
  return apiFetch('/api/locations');
}

export async function getLocation(id: number) {
  return apiFetch(`/api/locations/${id}`);
}

export async function createLocation(data: Record<string, any>) {
  return apiFetch('/api/locations', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateLocation(id: number, data: Record<string, any>) {
  return apiFetch(`/api/locations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteLocation(id: number) {
  return apiFetch(`/api/locations/${id}`, { method: 'DELETE' });
}

// Contact Leads
export async function getContactLeads() {
  return apiFetch('/api/contact-leads');
}

export async function updateContactLead(id: number, data: Record<string, any>) {
  return apiFetch(`/api/contact-leads/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteContactLead(id: number) {
  return apiFetch(`/api/contact-leads/${id}`, { method: 'DELETE' });
}

// Media
export async function getMedia() {
  return apiFetch('/api/media');
}

export async function uploadMedia(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return apiFetch('/api/media/upload', {
    method: 'POST',
    body: formData,
  });
}

export async function deleteMedia(id: number) {
  return apiFetch(`/api/media/${id}`, { method: 'DELETE' });
}

// Activity Logs
export async function getActivityLogs(limit = 50, offset = 0) {
  return apiFetch(`/api/activity-logs?limit=${limit}&offset=${offset}`);
}

// Users
export async function getUsers() {
  return apiFetch('/api/users');
}

export async function createUser(data: Record<string, any>) {
  return apiFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateUser(id: number, data: Record<string, any>) {
  return apiFetch(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteUser(id: number) {
  return apiFetch(`/api/users/${id}`, { method: 'DELETE' });
}

export function getMediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  const base = API_BASE || window.location.origin;
  return `${base}/${path.replace(/^\//, '')}`;
}
