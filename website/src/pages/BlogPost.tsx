import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, MessageCircle, ThumbsUp, Share2, Clock, Tag, ArrowLeft, Linkedin, Twitter, Mail } from 'lucide-react';
import { PUBLIC_API_BASE_URL } from '../config';
import Toast from '../components/Toast';

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
  comments: number;
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError('');
        
        if (!id) {
          setError('No blog post ID provided');
          setLoading(false);
          return;
        }
        
        const url = `${PUBLIC_API_BASE_URL}/blogs/${id}`;
        console.log('Fetching blog post from:', url);
        
        const resp = await fetch(url);
        const data = await resp.json();
        
        console.log('Blog post API response:', data);
        
        if (!resp.ok || !data.success) {
          throw new Error(data.error || `Failed to load blog post (${resp.status})`);
        }
        
        if (!data.data) {
          throw new Error('Blog post data is missing');
        }
        
        // Map the API response to match the component's expected structure
        const row = data.data;
        
        // Handle tags - could be array or JSON string
        let tagsArray: string[] = [];
        if (Array.isArray(row.tags)) {
          tagsArray = row.tags;
        } else if (typeof row.tags === 'string' && row.tags.trim() !== '') {
          try {
            const parsed = JSON.parse(row.tags);
            tagsArray = Array.isArray(parsed) ? parsed : [];
          } catch {
            tagsArray = [];
          }
        }
        
        const mappedPost: BlogPost = {
          id: row.id,
          title: row.title || '',
          excerpt: row.excerpt || '',
          content: row.content || '',
          author: row.author || 'Unknown Author',
          date: row.publish_date || row.created_at || new Date().toISOString(),
          readTime: row.reading_time ? `${row.reading_time} min read` : '5 min read',
          category: row.category || 'General',
          tags: tagsArray,
          image: row.featured_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center',
          likes: row.likes || 0,
          comments: row.comments || 0,
        };
        
        console.log('Mapped blog post:', mappedPost);
        setPost(mappedPost);
      } catch (e: any) {
        const errorMessage = e.message || 'Failed to load blog post';
        setError(errorMessage);
        console.error('Error fetching blog post:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleShare = async (post: BlogPost) => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    
    try {
      if (navigator.share && typeof navigator.share === 'function') {
        await navigator.share({
          title: post.title,
          text: text,
          url: url,
        });
        setToast({ message: 'Link shared successfully!', type: 'success' });
      } else {
        await navigator.clipboard.writeText(url);
        setToast({ message: 'Link copied to clipboard!', type: 'success' });
      }
    } catch (e: any) {
      // User cancelled share or error occurred, still copy to clipboard
      if (e.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(url);
          setToast({ message: 'Link copied to clipboard!', type: 'success' });
        } catch (copyError) {
          console.error('Share failed:', e);
          setToast({ message: 'Unable to share this article', type: 'error' });
        }
      }
    }
  };

  const getShareLinks = (post: BlogPost) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    const text = encodeURIComponent(`Check out this article: ${post.title}`);
    
    return {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error || 'The blog post you\'re looking for doesn\'t exist or has been removed.'}
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-max py-4">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
            
            {/* Author Info */}
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                alt={post.author} 
                className="w-10 h-10 rounded-full" 
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{post.author}</div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {post.date ? (() => {
                        try {
                          const dateObj = new Date(post.date);
                          return isNaN(dateObj.getTime()) ? 'Date not available' : dateObj.toLocaleDateString();
                        } catch {
                          return 'Date not available';
                        }
                      })() : 'Date not available'}
                    </span>
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                >
                  <Tag className="h-3 w-3 inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Featured Image */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center';
              }}
            />

            {/* Article Content */}
            <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <ThumbsUp className="h-5 w-5" />
                  <span>{post.likes} Likes</span>
                </button>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comments} Comments</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {(() => {
                  const links = getShareLinks(post);
                  return (
                    <>
                      <a 
                        href={links.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-600 hover:text-blue-500 transition-colors p-2 rounded-lg hover:bg-gray-100"
                        title="Share on Twitter"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a 
                        href={links.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                        title="Share on LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a 
                        href={links.whatsapp} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-600 hover:text-green-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                        title="Share on WhatsApp"
                      >
                        <Share2 className="h-5 w-5" />
                      </a>
                      <button 
                        onClick={() => handleShare(post)} 
                        className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                        title="Copy link to share"
                      >
                        <Share2 className="h-4 w-4" />
                        <span className="text-sm">Copy Link</span>
                      </button>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default BlogPost;












