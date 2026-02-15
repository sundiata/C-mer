import React, { useState, useEffect } from 'react';
import { Save, X, Eye, Upload, Calendar, Tag, Users, BarChart3, Globe, Search } from 'lucide-react';

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

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({
  post,
  onSave,
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: 'DataAnalytics Pro Team',
    authorBio: 'Expert data analytics consultants with years of industry experience.',
    authorImage: '',
    category: '',
    tags: [],
    status: 'draft',
    publishDate: new Date().toISOString().split('T')[0],
    featuredImage: '',
    readingTime: 0,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: [],
    socialTitle: '',
    socialDescription: '',
    socialImage: '',
    views: 0,
    likes: 0,
    comments: 0,
    relatedPosts: [],
    isFeatured: false,
    isBreaking: false,
    ...post
  });

  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [activeTab, setActiveTab] = useState('content');

  // Data Analytics specific categories
  const categories = [
    'Industry Trends',
    'Data Science',
    'Machine Learning',
    'Business Intelligence',
    'Data Visualization',
    'Analytics Tools',
    'Case Studies',
    'Tutorials',
    'Career Advice',
    'Technology Reviews',
    'Regulatory Updates',
    'Success Stories',
    'Educational Content',
    'Research Insights'
  ];

  // Common tags for data analytics
  const suggestedTags = [
    'data analytics', 'machine learning', 'business intelligence', 'data science',
    'artificial intelligence', 'big data', 'data visualization', 'predictive analytics',
    'data mining', 'statistical analysis', 'data engineering', 'data governance',
    'data privacy', 'GDPR', 'data security', 'cloud analytics', 'real-time analytics',
    'data warehouse', 'ETL', 'data pipeline', 'Python', 'R', 'SQL', 'Tableau',
    'Power BI', 'Excel', 'Jupyter', 'TensorFlow', 'PyTorch', 'scikit-learn'
  ];

  useEffect(() => {
    // Auto-generate slug from title
    if (formData.title && !isEditing) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }

    // Auto-generate SEO title if empty
    if (formData.title && !formData.seoTitle) {
      setFormData(prev => ({ ...prev, seoTitle: formData.title }));
    }

    // Estimate reading time (average 200 words per minute)
    const wordCount = formData.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    setFormData(prev => ({ ...prev, readingTime }));
  }, [formData.title, formData.content, isEditing]);

  const handleInputChange = (field: keyof BlogPost, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeywordAdd = () => {
    if (keywordInput.trim() && !formData.seoKeywords.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        seoKeywords: [...prev.seoKeywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const handleKeywordRemove = (keywordToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      seoKeywords: prev.seoKeywords.filter(keyword => keyword !== keywordToRemove)
    }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.title || !formData.content || !formData.category) {
      alert('Please fill in all required fields (Title, Content, Category)');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
          <p className="text-gray-600 mt-1">
            Create engaging content for your data analytics audience
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save {formData.status === 'draft' ? 'Draft' : 'Post'}
          </button>
          <button
            onClick={onCancel}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'content', label: 'Content', icon: BarChart3 },
          { id: 'seo', label: 'SEO & Social', icon: Search },
          { id: 'settings', label: 'Settings', icon: Users }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Post Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter an engaging title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Slug
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                    /blog/
                  </span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="url-friendly-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Publish Date
                </label>
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => handleInputChange('publishDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    onClick={() => handleTagRemove(tag)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTagAdd()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a tag..."
              />
              <button
                onClick={handleTagAdd}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Suggested tags:</p>
              <div className="flex flex-wrap gap-1">
                {suggestedTags.slice(0, 10).map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      if (!formData.tags.includes(tag)) {
                        setFormData(prev => ({
                          ...prev,
                          tags: [...prev.tags, tag]
                        }));
                      }
                    }}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt (Summary)
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief summary of the blog post..."
            />
          </div>

          {/* Content (Rich Text) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content * (Rich Text)
            </label>
            <div className="border border-gray-300 rounded-md">
              <div className="flex flex-wrap items-center gap-2 p-2 border-b border-gray-200 bg-gray-50 text-sm">
                <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded" onClick={() => document.execCommand('bold')}>Bold</button>
                <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded" onClick={() => document.execCommand('italic')}>Italic</button>
                <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded" onClick={() => document.execCommand('underline')}>Underline</button>
                <span className="mx-2 h-5 w-px bg-gray-300" />
                <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded" onClick={() => document.execCommand('insertUnorderedList')}>Bullets</button>
                <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded" onClick={() => document.execCommand('insertOrderedList')}>Numbered</button>
                <span className="mx-2 h-5 w-px bg-gray-300" />
                <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded" onClick={() => document.execCommand('justifyLeft')}>Left</button>
                <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded" onClick={() => document.execCommand('justifyCenter')}>Center</button>
                <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded" onClick={() => document.execCommand('justifyRight')}>Right</button>
                <span className="mx-2 h-5 w-px bg-gray-300" />
                <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded" onClick={() => document.execCommand('formatBlock', false, 'H2')}>H2</button>
                <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded" onClick={() => document.execCommand('formatBlock', false, 'H3')}>H3</button>
                <button type="button" className="px-2 py-1 hover:bg-gray-100 rounded" onClick={() => document.execCommand('removeFormat')}>Clear</button>
              </div>
              <div
                contentEditable
                suppressContentEditableWarning
                className="min-h-[240px] p-3 focus:outline-none prose max-w-none"
                onInput={(e) => handleInputChange('content', (e.target as HTMLDivElement).innerHTML)}
                dangerouslySetInnerHTML={{ __html: formData.content }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Reading time: ~{formData.readingTime} minutes ({formData.content.split(/\s+/).length} words)
            </p>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Featured Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={formData.featuredImage}
                onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEO Tab */}
      {activeTab === 'seo' && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SEO Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Search className="w-5 h-5 mr-2" />
                SEO Settings
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SEO Title ({formData.seoTitle.length}/60)
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                  maxLength={60}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SEO Description ({formData.seoDescription.length}/160)
                </label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                  maxLength={160}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SEO Keywords
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.seoKeywords.map(keyword => (
                    <span
                      key={keyword}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
                    >
                      {keyword}
                      <button
                        onClick={() => handleKeywordRemove(keyword)}
                        className="ml-1 text-green-600 hover:text-green-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleKeywordAdd()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add SEO keyword..."
                  />
                  <button
                    onClick={handleKeywordAdd}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Social Media
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Social Title ({formData.socialTitle.length}/60)
                </label>
                <input
                  type="text"
                  value={formData.socialTitle}
                  onChange={(e) => handleInputChange('socialTitle', e.target.value)}
                  maxLength={60}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Social Description ({formData.socialDescription.length}/160)
                </label>
                <textarea
                  value={formData.socialDescription}
                  onChange={(e) => handleInputChange('socialDescription', e.target.value)}
                  maxLength={160}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Social Image URL
                </label>
                <input
                  type="url"
                  value={formData.socialImage}
                  onChange={(e) => handleInputChange('socialImage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/social-image.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Publishing Options</h3>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-700">
                  Featured Post (appears on homepage)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isBreaking"
                  checked={formData.isBreaking}
                  onChange={(e) => handleInputChange('isBreaking', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isBreaking" className="ml-2 text-sm text-gray-700">
                  Breaking News (highlights post)
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author Bio
                </label>
                <textarea
                  value={formData.authorBio}
                  onChange={(e) => handleInputChange('authorBio', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief biography of the author..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author Image URL
                </label>
                <input
                  type="url"
                  value={formData.authorImage}
                  onChange={(e) => handleInputChange('authorImage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/author.jpg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Analytics & Stats</h3>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{formData.views}</div>
                    <div className="text-sm text-gray-600">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{formData.likes}</div>
                    <div className="text-sm text-gray-600">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{formData.comments}</div>
                    <div className="text-sm text-gray-600">Comments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{formData.readingTime}</div>
                    <div className="text-sm text-gray-600">Min Read</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Related Posts (IDs)
                </label>
                <input
                  type="text"
                  value={formData.relatedPosts.join(', ')}
                  onChange={(e) => handleInputChange('relatedPosts',
                    e.target.value.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
                  )}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1, 5, 12 (comma-separated post IDs)"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostEditor;

