import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import BlogPostEditor from '../components/BlogPostEditor';
import apiService from '../services/api';

interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  authorBio: string;
  authorImage: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  publishDate: string;
  featuredImage: string;
  readingTime: number;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  socialTitle: string;
  socialDescription: string;
  socialImage: string;
  views: number;
  likes: number;
  comments: number;
  relatedPosts: number[];
  isFeatured: boolean;
  isBreaking: boolean;
}

const BlogManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>();

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await apiService.listBlogs();
        if (res.success && Array.isArray(res.data)) {
          // Map backend fields to UI model
          const mapped: BlogPost[] = res.data.map((row: any) => ({
            id: row.id,
            title: row.title,
            slug: row.slug,
            content: row.content,
            excerpt: row.excerpt || '',
            author: row.author || '',
            authorBio: row.author_bio || '',
            authorImage: row.author_image || '',
            category: row.category || '',
            tags: row.tags || [],
            status: row.status,
            publishDate: row.publish_date || '',
            featuredImage: row.featured_image || '',
            readingTime: row.reading_time || 0,
            seoTitle: row.seo_title || '',
            seoDescription: row.seo_description || '',
            seoKeywords: row.seo_keywords || [],
            socialTitle: row.social_title || '',
            socialDescription: row.social_description || '',
            socialImage: row.social_image || '',
            views: row.views || 0,
            likes: row.likes || 0,
            comments: row.comments || 0,
            relatedPosts: row.related_posts || [],
            isFeatured: !!row.is_featured,
            isBreaking: !!row.is_breaking,
          }));
          setBlogPosts(mapped);
        }
      } catch (e: any) {
        console.error('Failed to load blog posts:', e);
        setError(e.message || 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreatePost = () => {
    setEditingPost(undefined);
    setShowEditor(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleSavePost = async (post: BlogPost) => {
    try {
      setError('');
      if (post.id) {
        const payload = {
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          author: post.author,
          authorBio: post.authorBio,
          authorImage: post.authorImage,
          category: post.category,
          tags: post.tags,
          status: post.status,
          publishDate: post.publishDate,
          featuredImage: post.featuredImage,
          readingTime: post.readingTime,
          seoTitle: post.seoTitle,
          seoDescription: post.seoDescription,
          seoKeywords: post.seoKeywords,
          socialTitle: post.socialTitle,
          socialDescription: post.socialDescription,
          socialImage: post.socialImage,
          views: post.views,
          likes: post.likes,
          comments: post.comments,
          relatedPosts: post.relatedPosts,
          isFeatured: post.isFeatured,
          isBreaking: post.isBreaking,
          id: post.id
        } as any;

        const res = await apiService.updateBlog(post.id, payload);
        if (res.success) {
          const row = (res as any).data;
          const updated: BlogPost = {
            id: row.id,
            title: row.title,
            slug: row.slug,
            content: row.content,
            excerpt: row.excerpt || '',
            author: row.author || '',
            authorBio: row.author_bio || '',
            authorImage: row.author_image || '',
            category: row.category || '',
            tags: row.tags || [],
            status: row.status,
            publishDate: row.publish_date || '',
            featuredImage: row.featured_image || '',
            readingTime: row.reading_time || 0,
            seoTitle: row.seo_title || '',
            seoDescription: row.seo_description || '',
            seoKeywords: row.seo_keywords || [],
            socialTitle: row.social_title || '',
            socialDescription: row.social_description || '',
            socialImage: row.social_image || '',
            views: row.views || 0,
            likes: row.likes || 0,
            comments: row.comments || 0,
            relatedPosts: row.related_posts || [],
            isFeatured: !!row.is_featured,
            isBreaking: !!row.is_breaking,
          };
          setBlogPosts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
          showToast('Post updated successfully', 'success');
        }
      } else {
        const payload = {
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          author: post.author,
          authorBio: post.authorBio,
          authorImage: post.authorImage,
          category: post.category,
          tags: post.tags,
          status: post.status,
          publishDate: post.publishDate,
          featuredImage: post.featuredImage,
          readingTime: post.readingTime,
          seoTitle: post.seoTitle,
          seoDescription: post.seoDescription,
          seoKeywords: post.seoKeywords,
          socialTitle: post.socialTitle,
          socialDescription: post.socialDescription,
          socialImage: post.socialImage,
          views: post.views,
          likes: post.likes,
          comments: post.comments,
          relatedPosts: post.relatedPosts,
          isFeatured: post.isFeatured,
          isBreaking: post.isBreaking
        } as any;

        const res = await apiService.createBlog(payload);
        if (res.success) {
          const row = res.data as any;
          const created: BlogPost = {
            id: row.id,
            title: row.title,
            slug: row.slug,
            content: row.content,
            excerpt: row.excerpt || '',
            author: row.author || '',
            authorBio: row.author_bio || '',
            authorImage: row.author_image || '',
            category: row.category || '',
            tags: row.tags || [],
            status: row.status,
            publishDate: row.publish_date || '',
            featuredImage: row.featured_image || '',
            readingTime: row.reading_time || 0,
            seoTitle: row.seo_title || '',
            seoDescription: row.seo_description || '',
            seoKeywords: row.seo_keywords || [],
            socialTitle: row.social_title || '',
            socialDescription: row.social_description || '',
            socialImage: row.social_image || '',
            views: row.views || 0,
            likes: row.likes || 0,
            comments: row.comments || 0,
            relatedPosts: row.related_posts || [],
            isFeatured: !!row.is_featured,
            isBreaking: !!row.is_breaking,
          };
          setBlogPosts(prev => [created, ...prev]);
          showToast('Post created successfully', 'success');
        }
      }
      setShowEditor(false);
      setEditingPost(undefined);
    } catch (e: any) {
      console.error('Failed to save post:', e);
      setError(e.message || 'Failed to save post');
      alert(`Failed to save post: ${e.message || 'unknown error'}`);
    }
  };

  const handleCancelEdit = () => {
    setShowEditor(false);
    setEditingPost(undefined);
  };

  const handleDeletePost = (postId: number) => {
    if (!postId) return;
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    apiService
      .deleteBlog(postId)
      .then(res => {
        if ((res as any).success) {
          setBlogPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
          showToast('Post deleted successfully', 'success');
        }
      })
      .catch((e: any) => {
        console.error('Failed to delete post:', e);
        alert(`Failed to delete post: ${e.message || 'unknown error'}`);
      });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (showEditor) {
    return (
      <BlogPostEditor
        post={editingPost}
        onSave={handleSavePost}
        onCancel={handleCancelEdit}
        isEditing={!!editingPost}
      />
    );
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg text-white ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toast.message}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
      )}
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
        <button
          onClick={handleCreatePost}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Post
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading posts...</div>
          ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">{post.title}</div>
                      <div className="flex items-center mt-1">
                        {post.isFeatured && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                            Featured
                          </span>
                        )}
                        {post.isBreaking && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            Breaking
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {post.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {post.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {post.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {post.publishDate ? new Date(post.publishDate).toLocaleDateString() : 'Draft'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="text-yellow-600 hover:text-yellow-900 p-1"
                        title="Edit post"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => post.id && handleDeletePost(post.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Showing {filteredPosts.length} of {blogPosts.length} posts
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
