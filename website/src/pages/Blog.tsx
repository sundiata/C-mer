import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PUBLIC_API_BASE_URL } from '../config';
import { Calendar, User, MessageCircle, ThumbsUp, Share2, Clock, Tag, Search, Linkedin, Twitter, Mail } from 'lucide-react';
import Toast from '../components/Toast';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  likes: number;
  comments: Comment[];
  featured: boolean;
}

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleShare = async (post: BlogPost) => {
    try {
      const url = `${window.location.origin}/blog/${post.id}`;
      const shareData = {
        title: post.title,
        text: post.excerpt || post.title,
        url
      } as any;
      if (navigator.share && typeof navigator.share === 'function') {
        await (navigator as any).share(shareData);
        setToast({ message: 'Link shared successfully!', type: 'success' });
      } else {
        await navigator.clipboard.writeText(url);
        setToast({ message: 'Link copied to clipboard!', type: 'success' });
      }
    } catch (e: any) {
      // User cancelled share or error occurred, still copy to clipboard
      if (e.name !== 'AbortError') {
        try {
          const url = `${window.location.origin}/blog/${post.id}`;
          await navigator.clipboard.writeText(url);
          setToast({ message: 'Link copied to clipboard!', type: 'success' });
        } catch (copyError) {
          console.error('Share failed:', e);
          setToast({ message: 'Unable to share this article', type: 'error' });
        }
      }
    }
  };

  const getPostUrl = (post: BlogPost) => {
    return `${window.location.origin}/blog/${post.id}`;
  };

  const getShareLinks = (post: BlogPost) => {
    const url = encodeURIComponent(getPostUrl(post));
    const title = encodeURIComponent(post.title);
    const text = encodeURIComponent(post.excerpt || post.title);
    return {
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`
    };
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError('');
        const url = `${PUBLIC_API_BASE_URL}/blogs`;
        // eslint-disable-next-line no-console
        console.log('Blog API URL:', url);
        const resp = await fetch(url);
        const data = await resp.json();
        // eslint-disable-next-line no-console
        console.log('Blog API raw response here we come:', data);
        if (!resp.ok || !data.success) throw new Error(data.error || `Failed to load blogs (${resp.status})`);
        const mapped: BlogPost[] = (data.data || []).map((row: any) => ({
          id: row.id,
          title: row.title,
          excerpt: row.excerpt || '',
          content: row.content || '',
          author: row.author || '',
          date: row.publish_date || '',
          readTime: row.reading_time ? `${row.reading_time} min read` : '',
          category: row.category || 'General',
          tags: row.tags || [],
          image: row.featured_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
          likes: row.likes || 0,
          comments: [],
          featured: !!row.is_featured,
        }));
        // eslint-disable-next-line no-console
        console.log('Blogs mapped count:', mapped.length, mapped);
        setBlogPosts(mapped);
      } catch (e: any) {
        setError(e.message || 'Failed to load blogs');
        // eslint-disable-next-line no-console
        console.error('Blog load error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // (hardcoded demo posts removed)



  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter buttons
  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category.toLowerCase())))];

  return (
    <div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Data Analytics <span className="text-primary-600">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Stay updated with the latest insights, trends, and best practices in data analytics,
              machine learning, and business intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 lg:mb-0">
              Latest Articles {filteredPosts.length > 0 && `(${filteredPosts.length})`}
            </h2>

            {/* Search Bar */}
            <div className="relative mb-4 lg:mb-0 lg:mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full lg:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
                }`}
              >
                {category === 'all' ? 'All Topics' : category.charAt(0).toUpperCase() + category.slice(1)}
                {category !== 'all' && ` (${blogPosts.filter(p => p.category.toLowerCase() === category).length})`}
              </button>
            ))}
          </div>

          {/* Search Results Info */}
          {(searchQuery || selectedCategory !== 'all') && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800 font-medium">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                    {searchQuery && ` for "${searchQuery}"`}
                    {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                  </span>
                </div>
                {(searchQuery || selectedCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          )}

          {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
              <div key={post.id} className="card overflow-hidden hover:shadow-xl transition-shadow">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center';
                    }}
                  />
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {post.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments.length}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(post);
                        }}
                        className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                        title="Share this article"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => navigate(`/blog/${post.id}`)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || selectedCategory !== 'all'
                  ? 'Try adjusting your search terms or filters'
                  : 'No articles are available at the moment'
                }
              </p>
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-primary-600 text-white mt-16 lg:mt-20">
        <div className="container-max">
          {/* Main Footer Content */}
          <div className="py-12 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-6">
                  <img src="/c-mer.png" alt="C-MER Logo" className="h-12 w-12 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">C-MER</h3>
                    <p className="text-gray-300 text-sm">Centre for Monitoring, Evaluation and Research</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                  A research consulting firm dedicated to providing cutting-edge research, monitoring, and evaluation services across multiple development sectors.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors" title="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors" title="Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors" title="Email">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="/projects" className="text-gray-300 hover:text-white transition-colors">Our Projects</a></li>
                  <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="/apply" className="text-gray-300 hover:text-white transition-colors">Apply</a></li>
                  <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Our Services</h4>
                <ul className="space-y-3">
                  <li><span className="text-gray-300">Research & Analytics</span></li>
                  <li><span className="text-gray-300">Monitoring & Evaluation</span></li>
                  <li><span className="text-gray-300">Data Collection</span></li>
                  <li><span className="text-gray-300">Impact Assessment</span></li>
                  <li><span className="text-gray-300">Training & Capacity Building</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/20 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-300 text-sm mb-4 md:mb-0">
                © 2024 C-MER. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
