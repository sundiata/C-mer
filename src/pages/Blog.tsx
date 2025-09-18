import React, { useState } from 'react';
import { Calendar, User, MessageCircle, ThumbsUp, Share2, Clock, Tag, Search } from 'lucide-react';

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
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'The Future of Data Analytics: Trends to Watch in 2024',
      excerpt: 'Explore the emerging trends that are shaping the future of data analytics and how organizations can prepare for the next wave of innovation.',
      content: `<p>The data analytics landscape is evolving rapidly, with new technologies and methodologies emerging at an unprecedented pace. As we move into 2024, several key trends are set to reshape how organizations approach data analysis and decision-making.</p>

        <h2>1. AI-Driven Analytics</h2>
        <p>Artificial Intelligence is no longer just a buzzword—it's becoming the backbone of modern analytics platforms. Machine learning algorithms are now capable of automating complex data analysis tasks, identifying patterns that human analysts might miss, and providing predictive insights with remarkable accuracy.</p>

        <h2>2. Real-Time Data Processing</h2>
        <p>The demand for real-time insights is growing exponentially. Organizations need to make decisions faster than ever before, and this requires the ability to process and analyze data as it streams in, rather than waiting for batch processing cycles.</p>

        <h2>3. Edge Computing Integration</h2>
        <p>With the proliferation of IoT devices and the need for low-latency processing, edge computing is becoming increasingly important in the analytics ecosystem. Processing data closer to its source reduces latency and bandwidth requirements.</p>

        <h2>4. Augmented Analytics</h2>
        <p>Augmented analytics combines artificial intelligence, machine learning, and natural language processing to make data analysis more accessible to non-technical users. This democratizes data and empowers more people within organizations to make data-driven decisions.</p>

        <p>As these trends continue to evolve, organizations that embrace them will be better positioned to gain competitive advantages through data-driven insights. The key to success lies in building flexible, scalable analytics infrastructures that can adapt to these emerging technologies.</p>`,
      author: 'Dr. Sarah Chen',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Trends',
      tags: ['AI', 'Machine Learning', 'Data Analytics', 'Future Tech'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
      likes: 124,
      comments: [
        {
          id: 1,
          author: 'Data Analyst Pro',
          content: 'Great insights! I particularly agree with the emphasis on real-time processing. Our organization has seen significant improvements after implementing streaming analytics.',
          date: '2024-01-16',
          likes: 8,
          replies: [
            {
              id: 2,
              author: 'Dr. Sarah Chen',
              content: 'Thanks for sharing your experience! Real-time analytics can indeed transform decision-making processes.',
              date: '2024-01-16',
              likes: 3
            }
          ]
        },
        {
          id: 3,
          author: 'Tech Enthusiast',
          content: 'The section on augmented analytics really resonates with me. How do you see this evolving in the next 2-3 years?',
          date: '2024-01-17',
          likes: 5
        }
      ],
      featured: true
    },
    {
      id: 2,
      title: 'Building Effective Data Visualization Dashboards',
      excerpt: 'Learn the principles and best practices for creating dashboards that communicate insights effectively and drive actionable decisions.',
      content: `<p>Data visualization is a critical skill for any data professional. A well-designed dashboard can transform complex data into clear, actionable insights that drive business decisions.</p>

        <h2>Understanding Your Audience</h2>
        <p>The first step in creating an effective dashboard is understanding who will be using it. Different stakeholders have different needs and levels of technical expertise.</p>

        <h2>Key Principles of Dashboard Design</h2>
        <ul>
          <li><strong>Clarity:</strong> Keep it simple and focused on the most important metrics</li>
          <li><strong>Consistency:</strong> Use consistent colors, fonts, and layouts</li>
          <li><strong>Context:</strong> Provide appropriate context for each metric</li>
          <li><strong>Actionability:</strong> Design with specific actions in mind</li>
        </ul>`,
      author: 'Michael Rodriguez',
      date: '2024-01-10',
      readTime: '7 min read',
      category: 'Visualization',
      tags: ['Dashboard', 'Data Visualization', 'UX Design', 'Business Intelligence'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
      likes: 89,
      comments: [
        {
          id: 4,
          author: 'UX Designer',
          content: 'Excellent points about understanding the audience. Too often dashboards are built for data experts rather than business users.',
          date: '2024-01-11',
          likes: 12
        }
      ],
      featured: false
    },
    {
      id: 3,
      title: 'Machine Learning in Business: Practical Applications',
      excerpt: 'Discover real-world applications of machine learning that are driving business value across various industries.',
      content: `<p>Machine learning is no longer confined to research labs—it's actively driving business value across industries. From predictive maintenance to personalized marketing, ML applications are becoming increasingly sophisticated and impactful.</p>

        <h2>Customer Analytics</h2>
        <p>ML algorithms can analyze customer behavior patterns to predict churn, recommend products, and personalize marketing campaigns with remarkable accuracy.</p>

        <h2>Fraud Detection</h2>
        <p>Financial institutions and e-commerce platforms use ML to detect fraudulent transactions in real-time, saving millions in potential losses.</p>`,
      author: 'David Kim',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'Machine Learning',
      tags: ['Machine Learning', 'AI', 'Business Applications', 'Predictive Analytics'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
      likes: 156,
      comments: [
        {
          id: 5,
          author: 'Business Analyst',
          content: 'We implemented ML for churn prediction and saw a 30% reduction in customer turnover. The ROI was incredible.',
          date: '2024-01-06',
          likes: 18
        },
        {
          id: 6,
          author: 'ML Engineer',
          content: 'Great overview! I\'d add that proper feature engineering is often more important than the choice of algorithm.',
          date: '2024-01-07',
          likes: 9
        }
      ],
      featured: true
    }
  ];

  const handleCommentSubmit = (postId: number) => {
    if (!newComment.trim() || !commentAuthor.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now(),
      author: commentAuthor,
      content: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };

    // In a real app, this would be sent to a backend
    console.log('New comment:', { postId, comment: newCommentObj });

    setNewComment('');
    setCommentAuthor('');
  };


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
                <div key={post.id} className="card overflow-hidden cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setSelectedPost(post)}>
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
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Read More
                      </button>
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

      {/* Blog Post Modal/Detail View */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedPost.title}</h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt={selectedPost.author} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-medium text-gray-900">{selectedPost.author}</div>
                  <div className="text-sm text-gray-500 flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{selectedPost.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag) => (
                  <span key={tag} className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />

              <div className="flex items-center space-x-4 mb-8 pt-8 border-t border-gray-200">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
                  <ThumbsUp className="h-5 w-5" />
                  <span>{selectedPost.likes} Likes</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Comments Section */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Comments ({selectedPost.comments.length})
                </h3>

                {/* Add Comment Form */}
                <div className="mb-8">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Share your thoughts..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleCommentSubmit(selectedPost.id)}
                      className="btn-primary"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                  {selectedPost.comments.map((comment) => (
                    <div key={comment.id} className="border-l-4 border-primary-200 pl-4">
                      <div className="flex items-start space-x-3">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt={comment.author} className="w-8 h-8 rounded-full flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900">{comment.author}</span>
                            <span className="text-sm text-gray-500">{comment.date}</span>
                          </div>
                          <p className="text-gray-700 mb-3">{comment.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <button className="flex items-center space-x-1 hover:text-primary-600">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{comment.likes}</span>
                            </button>
                            <button className="hover:text-primary-600">Reply</button>
                          </div>

                          {/* Replies */}
                          {comment.replies && comment.replies.map((reply) => (
                            <div key={reply.id} className="mt-4 ml-8 border-l-2 border-gray-200 pl-4">
                              <div className="flex items-start space-x-3">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=24&h=24&fit=crop&crop=face" alt={reply.author} className="w-6 h-6 rounded-full flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-medium text-gray-900 text-sm">{reply.author}</span>
                                    <span className="text-xs text-gray-500">{reply.date}</span>
                                  </div>
                                  <p className="text-gray-700 text-sm">{reply.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
