import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search, Calendar, DollarSign } from 'lucide-react';
import ProjectEditor from '../components/ProjectEditor';
import apiService from '../services/api';

interface Project {
  id?: number;
  title: string;
  slug: string;
  description: string;
  detailedDescription: string;
  category: string;
  client: string;
  clientIndustry: string;
  clientSize: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate?: string;
  estimatedEndDate?: string;
  budget: number;
  actualCost?: number;
  currency: string;
  progress: number;
  teamSize: number;
  projectManager: string;
  technologies: string[];
  deliverables: string[];
  objectives: string[];
  challenges: string[];
  results: string[];
  featuredImage: string;
  clientLogo: string;
  projectUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  tags: string[];
  isPublic: boolean;
  isFeatured: boolean;
  seoTitle: string;
  seoDescription: string;
  socialTitle: string;
  socialDescription: string;
  socialImage: string;
  views: number;
  likes: number;
  downloads: number;
  graphData?: { title: string; bars: { label: string; value: number; color: string; unit?: string }[]; explanation: string };
}

const ProjectManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await apiService.listProjects();
        if (res.success) {
          const mapped = res.data.map((row: any) => ({
            id: row.id,
            title: row.title,
            slug: row.slug,
            description: row.description || '',
            detailedDescription: row.description || '',
            category: row.category || '',
            client: row.client || '',
            clientIndustry: '',
            clientSize: '',
            status: (row.status || 'planning'),
            priority: 'medium',
            startDate: '',
            endDate: undefined,
            estimatedEndDate: undefined,
            budget: 0,
            actualCost: undefined,
            currency: 'USD',
            progress: 0,
            teamSize: 0,
            projectManager: '',
            technologies: row.technologies || [],
            deliverables: [],
            objectives: [],
            challenges: [],
            results: row.results || [],
            featuredImage: row.image || '',
            clientLogo: '',
            projectUrl: '',
            githubUrl: '',
            demoUrl: '',
            tags: [],
            isPublic: true,
            isFeatured: !!row.featured,
            seoTitle: row.title,
            seoDescription: row.description || '',
            socialTitle: row.title,
            socialDescription: row.description || '',
            socialImage: row.image || '',
            views: 0,
            likes: 0,
            downloads: 0,
            graphData: row.graphData || { title: 'Project Impact Metrics', bars: [], explanation: '' },
          } as Project));
          setProjects(mapped);
        }
      } catch (e: any) {
        setError(e.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateProject = () => {
    setEditingProject(undefined);
    setShowEditor(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowEditor(true);
  };

  const handleSaveProject = async (project: Project) => {
    try {
      setError('');
      const payload = {
        title: project.title,
        slug: project.slug,
        client: project.client,
        category: project.category,
        description: project.description || project.detailedDescription || '',
        image: project.featuredImage || '',
        technologies: project.technologies || [],
        duration: '',
        team: project.projectManager || '',
        status: project.status,
        featured: project.isFeatured,
        results: project.results || [],
        graphData: project.graphData && project.graphData.bars && project.graphData.bars.length > 0
          ? project.graphData
          : { title: 'Project Impact Metrics', bars: [{ label: 'Metric A', value: 25, color: '#3B82F6', unit: '%' }], explanation: '' }
      } as any;

      if (project.id) {
        const res = await apiService.updateProject(project.id, payload);
        if ((res as any).success) {
          const row = (res as any).data;
          setProjects(prev => prev.map(p => (p.id === row.id ? { ...project } : p)));
          showToast('Project updated successfully', 'success');
        }
      } else {
        const res = await apiService.createProject(payload);
        if ((res as any).success) {
          const row = (res as any).data;
          setProjects(prev => [{ ...project, id: row.id }, ...prev]);
          showToast('Project created successfully', 'success');
        }
      }

      setShowEditor(false);
      setEditingProject(undefined);
    } catch (e: any) {
      setError(e.message || 'Failed to save project');
      showToast(e.message || 'Failed to save project', 'error');
      alert(`Failed to save project: ${e.message || 'unknown error'}`);
    }
  };

  const handleCancelEdit = () => {
    setShowEditor(false);
    setEditingProject(undefined);
  };

  const handleDeleteProject = (projectId: number) => {
    if (!projectId) return;
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    apiService.deleteProject(projectId)
      .then((res: any) => {
        if (res.success) {
          setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
          showToast('Project deleted successfully', 'success');
        }
      })
      .catch((e: any) => {
        setError(e.message || 'Failed to delete project');
        showToast(e.message || 'Failed to delete project', 'error');
        alert(`Failed to delete project: ${e.message || 'unknown error'}`);
      });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (showEditor) {
    return (
      <ProjectEditor
        project={editingProject}
        onSave={handleSaveProject}
        onCancel={handleCancelEdit}
        isEditing={!!editingProject}
      />
    );
  }

  return (
    <div className="space-y-6">
      {(loading || error) && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          {loading && <div className="text-sm text-gray-600">Loading projects...</div>}
          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>
      )}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg text-white ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toast.message}
        </div>
      )}
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
        <button
          onClick={handleCreateProject}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Project
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
                placeholder="Search projects..."
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
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleEditProject(project)}
                  className="p-1 text-gray-400 hover:text-yellow-500"
                  title="Edit project"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => project.id && handleDeleteProject(project.id)}
                  className="p-1 text-gray-400 hover:text-red-500"
                  title="Delete project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Client:</span>
                <span className="font-medium">{project.client}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{project.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Budget:</span>
                <span className="font-medium flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {project.budget.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(project.startDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {projects.filter(p => p.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Budget</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
