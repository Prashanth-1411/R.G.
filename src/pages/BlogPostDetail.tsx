import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft, BookOpen, Clock } from 'lucide-react';
import { blogPosts } from '../data/blogs';

export const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => blogPosts.find(b => b.slug === slug) ?? null, [slug]);

  if (!post) {
    return (
      <div className="max-w-xl mx-auto px-4 py-32 text-center space-y-4">
        <BookOpen className="w-16 h-16 text-slate-300 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-700 font-raleway">Article Not Found</h2>
        <p className="text-slate-400 font-poppins">The post you are searching for might have been archived or removed by the administrator.</p>
        <Link to="/blog" className="inline-flex items-center gap-1 text-brandBlue font-bold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </div>
    );
  }

  const getBlogImage = (path: string) => {
    if (path.startsWith('B ')) {
      return `/images/Blog/${path}`;
    }
    return path || 'https://images.unsplash.com/photo-1587745416684-47953f16fdd1?w=800';
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <article className="pt-24 pb-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 mb-6 text-slate-500 hover:text-brandBlue font-bold text-sm tracking-wide transition-colors font-poppins"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog List</span>
        </Link>

        {/* Blog Container */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-premium border border-slate-100">
          {/* Header Image */}
          <div className="relative h-64 sm:h-[450px]">
            <img
              src={getBlogImage(post.featured_image)}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
              <span className="bg-brandBlue text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-md font-poppins inline-block">
                {post.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black font-raleway leading-snug">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Metadata Bar */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap gap-4 text-xs font-semibold text-slate-400 font-poppins bg-slate-50">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Published: {formatDate(post.created_at)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Read Time: 3 mins</span>
            </div>
          </div>

          {/* Main Body HTML / Content */}
          <div className="p-6 sm:p-10 font-poppins text-slate-700 leading-relaxed text-sm sm:text-base space-y-6 text-justify whitespace-pre-line">
            {post.content}
          </div>

          {/* Tags Footer */}
          {post.tags && (
            <div className="px-6 sm:px-10 pb-8 flex flex-wrap gap-2 items-center">
              <Tag className="w-4 h-4 text-slate-400 shrink-0" />
              {post.tags.split(',').map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-semibold">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
