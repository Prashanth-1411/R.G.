import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, ChevronRight, BookOpen } from 'lucide-react';
import { blogPosts } from '../data/blogs';

export const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [pageContent] = useState<Record<string, string>>({
    title: "Health & Homage Blog",
    description: "Educational guides, diagnostic tips, emergency standards, and compassionate homage advice."
  });

  const categories = useMemo(() => {
    return ['All', ...new Set(blogPosts.map(b => b.category))];
  }, []);

  const filteredBlogs = blogPosts.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getBlogImage = (path: string) => {
    if (path.startsWith('B ')) {
      return `/images/Blog/${path}`;
    }
    return path || 'https://images.unsplash.com/photo-1587745416684-47953f16fdd1?w=500';
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent;
      const post = filteredBlogs[ce.detail.index];
      if (post) navigate(`/blog/${post.slug}`);
    };
    window.addEventListener('shortcut:open-blog', handler);
    return () => window.removeEventListener('shortcut:open-blog', handler);
  }, [filteredBlogs, navigate]);

  return (
    <div className="pt-24 pb-20">
      {/* Banner */}
      <div className="bg-brandNavy text-white py-12 sm:py-16 mb-10 sm:mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brandNavy to-brandBlue/35 opacity-90 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-5xl font-black font-raleway tracking-tight">{pageContent.title || "Health & Homage Blog"}</h1>
          <p className="mt-3 sm:mt-4 text-slate-300 font-poppins text-xs sm:text-sm max-w-xl">
            {pageContent.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main List */}
          <div className="lg:col-span-8 space-y-8">
            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl focus:border-brandBlue focus:outline-none bg-white text-sm shadow-premium"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {filteredBlogs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-700 font-raleway">No Articles Found</h3>
                <p className="text-slate-400 text-sm font-poppins mt-2">
                  Try refining your search terms or selecting a different category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filteredBlogs.map((b, idx) => (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-premium border border-slate-100 flex flex-col justify-between hover-lift group"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={getBlogImage(b.featured_image)}
                          alt={b.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-premium duration-500"
                        />
                        <span className="absolute top-4 left-4 bg-brandBlue text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-md font-poppins">
                          {b.category}
                        </span>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold font-poppins">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(b.created_at)}</span>
                        </div>
                        <h3 className="text-lg font-bold text-brandNavy font-raleway group-hover:text-brandBlue transition-colors line-clamp-2">
                          {b.title}
                        </h3>
                        <p className="text-slate-500 text-sm font-poppins leading-relaxed line-clamp-3 text-justify">
                          {b.content.replace(/<[^>]*>/g, '')}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <Link
                        to={`/blog/${b.slug}`}
                        className="inline-flex items-center gap-1 text-brandBlue font-extrabold text-xs tracking-wider uppercase group-hover:text-brandNavy transition-colors font-poppins"
                      >
                        <span>Read Article</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Filters */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-premium">
              <h4 className="font-extrabold text-brandNavy text-base uppercase tracking-wider mb-6 font-raleway border-b border-slate-50 pb-2">
                Categories
              </h4>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2.5 rounded-xl text-left font-bold text-sm tracking-wide transition-premium w-full flex items-center justify-between font-poppins ${
                      selectedCategory === cat
                        ? 'bg-brandBlue text-white shadow-glow-blue'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                  >
                    <span>{cat}</span>
                    <ChevronRight className={`w-4 h-4 opacity-50 ${selectedCategory === cat ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
