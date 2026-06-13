import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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

  return (
    <div className="pt-20 pb-16 bg-slate-50">
      {/* Banner */}
      <div className="bg-[#0F172A] text-white py-12 sm:py-16 mb-10 sm:mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-black font-inter tracking-tight">{pageContent.title || "Health & Homage Blog"}</h1>
          <p className="mt-3 sm:mt-4 text-slate-400 text-sm max-w-xl font-poppins">{pageContent.description}</p>
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
                className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none bg-white text-sm text-slate-800"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {filteredBlogs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/60 p-8">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-700 font-inter">No Articles Found</h3>
                <p className="text-slate-400 text-sm font-poppins mt-2">Try refining your search terms or selecting a different category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filteredBlogs.map((b) => (
                  <div key={b.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm flex flex-col justify-between group">
                    <div>
                      <div className="relative h-48 overflow-hidden">
                        <img src={getBlogImage(b.featured_image)} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                        <span className="absolute top-4 left-4 bg-[#0F4CFF] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm font-poppins">{b.category}</span>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold font-poppins">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(b.created_at)}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#0F172A] font-inter group-hover:text-[#0F4CFF] transition-colors line-clamp-2">{b.title}</h3>
                        <p className="text-slate-500 text-sm font-poppins leading-relaxed line-clamp-3 text-justify">{b.content.replace(/<[^>]*>/g, '')}</p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button onClick={() => navigate(`/blog/${b.slug}`)} className="inline-flex items-center gap-1 text-[#0F4CFF] font-bold text-xs tracking-wider uppercase group-hover:text-blue-700 transition-colors font-poppins">
                        <span>Read Article</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Filters */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/60 shadow-sm">
              <h4 className="font-extrabold text-[#0F172A] text-base uppercase tracking-wider mb-6 font-inter border-b border-slate-50 pb-2">Categories</h4>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2.5 rounded-xl text-left font-bold text-sm tracking-wide transition-all duration-200 w-full flex items-center justify-between font-poppins ${
                      selectedCategory === cat
                        ? 'bg-[#0F4CFF] text-white shadow-sm'
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
