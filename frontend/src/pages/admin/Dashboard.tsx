import React, { useState, useEffect } from 'react';
import { Truck, Users, Star, MessageSquare, Eye, TrendingUp, Activity, FileText } from 'lucide-react';
import { getSettings, getNavbarItems, getSliders, getServices, getTestimonials, getContactLeads, getMedia, getBlogPosts } from '../../api/admin';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    services: 0, sliders: 0, testimonials: 0, leads: 0,
    media: 0, pages: 0, blog: 0, navbar: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getServices().then(d => d.length).catch(() => 0),
      getSliders().then(d => d.length).catch(() => 0),
      getTestimonials().then(d => d.length).catch(() => 0),
      getContactLeads().then(d => d.length).catch(() => 0),
      getMedia().then(d => d.length).catch(() => 0),
      getNavbarItems().then(d => d.length).catch(() => 0),
      getBlogPosts().then(d => d.length).catch(() => 0),
      (async () => {
        try {
          const leads = await getContactLeads();
          setRecentLeads(leads.slice(0, 5));
          return leads.length;
        } catch { return 0; }
      })(),
    ]).then(([sv, sl, te, l, m, n, b]) => {
      setStats({ services: sv, sliders: sl, testimonials: te, leads: l, media: m, pages: sv, blog: b, navbar: n });
      setLoading(false);
    });
  }, []);

  const statCards = [
    { label: 'Services', value: stats.services, icon: Truck, color: 'bg-brand-500' },
    { label: 'Hero Sliders', value: stats.sliders, icon: Eye, color: 'bg-purple-500' },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, color: 'bg-gold-500' },
    { label: 'Contact Leads', value: stats.leads, icon: MessageSquare, color: 'bg-emerald-500' },
    { label: 'Media Files', value: stats.media, icon: Activity, color: 'bg-cyan-500' },
    { label: 'Nav Items', value: stats.navbar, icon: FileText, color: 'bg-rose-500' },
    { label: 'Blog Posts', value: stats.blog, icon: FileText, color: 'bg-indigo-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-800 font-display mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-navy-100 shadow-soft">
            <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-navy-800 font-display">{loading ? '...' : card.value}</p>
            <p className="text-xs text-navy-400 font-medium mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-2xl border border-navy-100 shadow-soft p-6">
          <h2 className="text-lg font-bold text-navy-800 font-display mb-4">Recent Contact Leads</h2>
          {recentLeads.length === 0 ? (
            <p className="text-sm text-navy-400">No leads yet.</p>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead: any) => (
                <div key={lead.id} className="flex items-center justify-between p-3 rounded-xl bg-navy-50">
                  <div>
                    <p className="text-sm font-semibold text-navy-700">{lead.name}</p>
                    <p className="text-xs text-navy-400">{lead.email} • {lead.phone}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg ${
                    lead.status === 'new' ? 'bg-brand-100 text-brand-700' :
                    lead.status === 'contacted' ? 'bg-gold-100 text-gold-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-navy-100 shadow-soft p-6">
          <h2 className="text-lg font-bold text-navy-800 font-display mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Service', href: '/admin/services' },
              { label: 'Upload Media', href: '/admin/media' },
              { label: 'Edit Slider', href: '/admin/sliders' },
              { label: 'New Blog Post', href: '/admin/blog' },
              { label: 'Edit Settings', href: '/admin/settings' },
              { label: 'View Leads', href: '/admin/contact-leads' },
            ].map((action, i) => (
              <a
                key={i}
                href={action.href}
                className="p-3 rounded-xl bg-navy-50 hover:bg-brand-50 hover:text-brand-600 transition-colors text-sm font-semibold text-navy-700 text-center"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
