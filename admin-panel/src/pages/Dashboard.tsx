import React from 'react';
import apiService from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  FileText,
  FolderOpen,
  Mail,
  TrendingUp,
  Eye,
  Clock,
  Activity,
  BarChart3,
  Settings
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleNewBlogPost = () => {
    navigate('/blog');
    // You could also trigger the blog post creation modal here
  };

  const handleAddProject = () => {
    navigate('/projects');
    // You could also trigger the project creation modal here
  };

  const handleViewContacts = () => {
    navigate('/contacts');
  };

  const handleViewSettings = () => {
    navigate('/settings');
  };

  const [stats, setStats] = React.useState([
    { title: 'Users', value: '—', change: '', icon: Users, color: 'bg-blue-500' },
    { title: 'Blog Posts', value: '—', change: '', icon: FileText, color: 'bg-green-500' },
    { title: 'Projects', value: '—', change: '', icon: FolderOpen, color: 'bg-purple-500' },
    { title: 'Contact Forms', value: '—', change: '', icon: Mail, color: 'bg-orange-500' }
  ]);
  const [recent, setRecent] = React.useState<{ projects: any[]; blogs: any[]; contacts: any[] }>({ projects: [], blogs: [], contacts: [] });
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    (async () => {
      try {
        const res = await apiService.getDashboardSummary();
        if ((res as any).success) {
          const s = (res as any).data.summary;
          setStats([
            { title: 'Users', value: String(s.totalUsers), change: '', icon: Users, color: 'bg-blue-500' },
            { title: 'Blog Posts', value: String(s.totalBlogs), change: '', icon: FileText, color: 'bg-green-500' },
            { title: 'Projects', value: String(s.totalProjects), change: '', icon: FolderOpen, color: 'bg-purple-500' },
            { title: 'Contact Forms', value: String(s.totalContacts), change: '', icon: Mail, color: 'bg-orange-500' }
          ]);
          setRecent((res as any).data.recent);
        }
      } catch (e: any) {
        setError(e.message || 'Failed to load dashboard');
      }
    })();
  }, []);

  const recentActivity = [
    { action: 'New blog post published', time: '2 hours ago', type: 'blog' },
    { action: 'Contact form submitted', time: '4 hours ago', type: 'contact' },
    { action: 'Project updated', time: '1 day ago', type: 'project' },
    { action: 'New user registered', time: '2 days ago', type: 'user' },
    { action: 'Settings updated', time: '3 days ago', type: 'settings' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Traffic Overview</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium">Page Views</span>
              </div>
              <span className="text-2xl font-bold">45,231</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm font-medium">Unique Visitors</span>
              </div>
              <span className="text-2xl font-bold">12,847</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-orange-500 mr-2" />
                <span className="text-sm font-medium">Avg. Session</span>
              </div>
              <span className="text-2xl font-bold">3m 42s</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {error && <div className="text-sm text-red-600">{error}</div>}
            {recent.projects.map((p) => (
              <div key={`p-${p.id}`} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center"><Activity className="w-4 h-4 text-purple-500 mr-3" /><span className="text-sm text-gray-700">Project: {p.title}</span></div>
                <span className="text-xs text-gray-500">{new Date(p.created_at).toLocaleString()}</span>
              </div>
            ))}
            {recent.blogs.map((b) => (
              <div key={`b-${b.id}`} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center"><Activity className="w-4 h-4 text-green-500 mr-3" /><span className="text-sm text-gray-700">Blog: {b.title}</span></div>
                <span className="text-xs text-gray-500">{new Date(b.created_at).toLocaleString()}</span>
              </div>
            ))}
            {recent.contacts.map((c) => (
              <div key={`c-${c.id}`} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center"><Activity className="w-4 h-4 text-blue-500 mr-3" /><span className="text-sm text-gray-700">Contact: {c.first_name} {c.last_name}</span></div>
                <span className="text-xs text-gray-500">{new Date(c.submitted_at).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={handleNewBlogPost}
            className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
          >
            <FileText className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">New Blog Post</span>
          </button>
          <button
            onClick={handleAddProject}
            className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 cursor-pointer"
          >
            <FolderOpen className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">Add Project</span>
          </button>
          <button
            onClick={handleViewContacts}
            className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 cursor-pointer"
          >
            <Mail className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">View Contacts</span>
          </button>
          <button
            onClick={handleViewSettings}
            className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 cursor-pointer"
          >
            <Settings className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
