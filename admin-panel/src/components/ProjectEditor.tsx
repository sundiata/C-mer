import React, { useState, useEffect } from 'react';
import { Save, X, Eye, Upload, Calendar, DollarSign, Users, BarChart3, Globe, Target, Search, FileSpreadsheet } from 'lucide-react';

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
  graphData?: {
    title: string;
    bars: { label: string; value: number; color: string; unit?: string }[];
    explanation: string;
  };
}

interface ProjectEditorProps {
  project?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const ProjectEditor: React.FC<ProjectEditorProps> = ({
  project,
  onSave,
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<Project>({
    title: '',
    slug: '',
    description: '',
    detailedDescription: '',
    category: '',
    client: '',
    clientIndustry: '',
    clientSize: '',
    status: 'planning',
    priority: 'medium',
    startDate: new Date().toISOString().split('T')[0],
    budget: 0,
    currency: 'USD',
    progress: 0,
    teamSize: 1,
    projectManager: '',
    technologies: [],
    deliverables: [],
    objectives: [],
    challenges: [],
    results: [],
    featuredImage: '',
    clientLogo: '',
    tags: [],
    isPublic: true,
    isFeatured: false,
    seoTitle: '',
    seoDescription: '',
    socialTitle: '',
    socialDescription: '',
    socialImage: '',
    views: 0,
    likes: 0,
    downloads: 0,
    ...project
  });

  const [tagInput, setTagInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [deliverableInput, setDeliverableInput] = useState('');
  const [objectiveInput, setObjectiveInput] = useState('');
  const [challengeInput, setChallengeInput] = useState('');
  const [resultInput, setResultInput] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const [csvError, setCsvError] = useState<string>('');

  // Data Analytics project categories
  const categories = [
    'Data Analytics Platform',
    'Business Intelligence Dashboard',
    'Machine Learning Solution',
    'Data Visualization',
    'ETL Pipeline',
    'Data Warehouse',
    'Predictive Analytics',
    'Real-time Analytics',
    'Data Migration',
    'Custom Analytics Tool'
  ];

  // Industries
  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Retail',
    'Manufacturing',
    'Education',
    'Government',
    'Non-profit',
    'Media & Entertainment',
    'Real Estate',
    'Transportation',
    'Other'
  ];

  // Company sizes
  const companySizes = [
    'Startup (1-10 employees)',
    'Small (11-50 employees)',
    'Medium (51-200 employees)',
    'Large (201-1000 employees)',
    'Enterprise (1000+ employees)'
  ];

  // Common technologies for data analytics projects
  const suggestedTechnologies = [
    'Python', 'R', 'SQL', 'Tableau', 'Power BI', 'Excel', 'Jupyter',
    'TensorFlow', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy',
    'Apache Spark', 'Hadoop', 'AWS', 'Azure', 'Google Cloud',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Docker', 'Kubernetes',
    'Airflow', 'Kafka', 'Elasticsearch', 'Redis'
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

    // Calculate progress based on status
    if (!isEditing) {
      const statusProgress = {
        planning: 10,
        active: 50,
        'on-hold': 30,
        completed: 100,
        cancelled: 0
      };
      setFormData(prev => ({ ...prev, progress: statusProgress[prev.status] || 0 }));
    }
  }, [formData.title, formData.status, isEditing]);

  const handleInputChange = (field: keyof Project, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addToArray = (field: keyof Project, input: string, setter: (value: string) => void) => {
    if (input.trim() && !(formData[field] as string[]).includes(input.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), input.trim()]
      }));
      setter('');
    }
  };

  const removeFromArray = (field: keyof Project, item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter(i => i !== item)
    }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.title || !formData.description || !formData.category || !formData.client) {
      alert('Please fill in all required fields (Title, Description, Category, Client)');
      return;
    }

    if (formData.budget <= 0) {
      alert('Please enter a valid budget amount');
      return;
    }

    onSave(formData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Project' : 'Create New Project'}
          </h1>
          <p className="text-gray-600 mt-1">
            Document and showcase your data analytics projects
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Project
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
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {[
          { id: 'basic', label: 'Basic Info', icon: BarChart3 },
          { id: 'details', label: 'Project Details', icon: Target },
          { id: 'progress', label: 'Progress & Budget', icon: DollarSign },
          { id: 'seo', label: 'SEO & Social', icon: Globe },
          { id: 'metrics', label: 'Impact Metrics', icon: BarChart3 }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
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

      {/* Basic Info Tab */}
      {activeTab === 'basic' && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Slug
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                    /projects/
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client *
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => handleInputChange('client', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Client company name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Industry
                </label>
                <select
                  value={formData.clientIndustry}
                  onChange={(e) => handleInputChange('clientIndustry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Size
                </label>
                <select
                  value={formData.clientSize}
                  onChange={(e) => handleInputChange('clientSize', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select company size</option>
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="planning">Planning</option>
                  <option value="active">Active</option>
                  <option value="on-hold">On Hold</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Manager
                </label>
                <input
                  type="text"
                  value={formData.projectManager}
                  onChange={(e) => handleInputChange('projectManager', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Project manager name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Size
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.teamSize}
                  onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.projectUrl || ''}
                  onChange={(e) => handleInputChange('projectUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://project-website.com"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief project overview..."
            />
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
                    onClick={() => removeFromArray('tags', tag)}
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
                onKeyPress={(e) => e.key === 'Enter' && addToArray('tags', tagInput, setTagInput)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a tag..."
              />
              <button
                onClick={() => addToArray('tags', tagInput, setTagInput)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Details Tab */}
      {activeTab === 'details' && (
        <div className="p-6 space-y-6">
          {/* Detailed Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Detailed Description
            </label>
            <textarea
              value={formData.detailedDescription}
              onChange={(e) => handleInputChange('detailedDescription', e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="Detailed project description, methodology, and approach..."
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies Used
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.technologies.map(tech => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800"
                  >
                    {tech}
                    <button
                      onClick={() => removeFromArray('technologies', tech)}
                      className="ml-1 text-purple-600 hover:text-purple-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addToArray('technologies', techInput, setTechInput)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add technology..."
                />
                <button
                  onClick={() => addToArray('technologies', techInput, setTechInput)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                >
                  Add
                </button>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Suggested technologies:</p>
                <div className="flex flex-wrap gap-1">
                  {suggestedTechnologies.slice(0, 12).map(tech => (
                    <button
                      key={tech}
                      onClick={() => {
                        if (!formData.technologies.includes(tech)) {
                          setFormData(prev => ({
                            ...prev,
                            technologies: [...prev.technologies, tech]
                          }));
                        }
                      }}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Deliverables
              </label>
              <div className="space-y-2 mb-2">
                {formData.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={deliverable}
                      onChange={(e) => {
                        const newDeliverables = [...formData.deliverables];
                        newDeliverables[index] = e.target.value;
                        setFormData(prev => ({ ...prev, deliverables: newDeliverables }));
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => {
                        const newDeliverables = formData.deliverables.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, deliverables: newDeliverables }));
                      }}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setFormData(prev => ({ ...prev, deliverables: [...prev.deliverables, ''] }))}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add Deliverable
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Objectives */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Objectives
              </label>
              <div className="space-y-2 mb-2">
                {formData.objectives.map((objective, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => {
                        const newObjectives = [...formData.objectives];
                        newObjectives[index] = e.target.value;
                        setFormData(prev => ({ ...prev, objectives: newObjectives }));
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Project objective..."
                    />
                    <button
                      onClick={() => {
                        const newObjectives = formData.objectives.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, objectives: newObjectives }));
                      }}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setFormData(prev => ({ ...prev, objectives: [...prev.objectives, ''] }))}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Objective
              </button>
            </div>

            {/* Challenges */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Challenges Faced
              </label>
              <div className="space-y-2 mb-2">
                {formData.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={challenge}
                      onChange={(e) => {
                        const newChallenges = [...formData.challenges];
                        newChallenges[index] = e.target.value;
                        setFormData(prev => ({ ...prev, challenges: newChallenges }));
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Technical or business challenge..."
                    />
                    <button
                      onClick={() => {
                        const newChallenges = formData.challenges.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, challenges: newChallenges }));
                      }}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setFormData(prev => ({ ...prev, challenges: [...prev.challenges, ''] }))}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Add Challenge
              </button>
            </div>
          </div>

          {/* Results */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Results & Impact
            </label>
            <div className="space-y-2 mb-2">
              {formData.results.map((result, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={result}
                    onChange={(e) => {
                      const newResults = [...formData.results];
                      newResults[index] = e.target.value;
                      setFormData(prev => ({ ...prev, results: newResults }));
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Measurable result or impact..."
                  />
                  <button
                    onClick={() => {
                      const newResults = formData.results.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, results: newResults }));
                    }}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setFormData(prev => ({ ...prev, results: [...prev.results, ''] }))}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Result
            </button>
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  placeholder="https://example.com/project-image.jpg"
                />
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Logo URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.clientLogo}
                  onChange={(e) => handleInputChange('clientLogo', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/client-logo.png"
                />
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress & Budget Tab */}
      {activeTab === 'progress' && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Budget Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Budget & Costs
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget Amount *
                </label>
                <div className="flex">
                  <select
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CAD">CAD</option>
                  </select>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Actual Cost (if completed)
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={formData.actualCost || ''}
                  onChange={(e) => handleInputChange('actualCost', parseFloat(e.target.value) || undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Actual project cost..."
                />
              </div>

              {formData.actualCost && formData.budget > 0 && (
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="text-sm text-gray-600">Budget Variance:</div>
                  <div className={`text-lg font-semibold ${
                    formData.actualCost <= formData.budget ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formData.actualCost <= formData.budget ? 'Under Budget' : 'Over Budget'}
                    ({((formData.actualCost - formData.budget) / formData.budget * 100).toFixed(1)}%)
                  </div>
                </div>
              )}
            </div>

            {/* Progress Tracking */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Progress Tracking
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Progress Percentage
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => handleInputChange('progress', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center text-sm font-medium text-gray-700 mt-1">
                  {formData.progress}%
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated End Date
                </label>
                <input
                  type="date"
                  value={formData.estimatedEndDate || ''}
                  onChange={(e) => handleInputChange('estimatedEndDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Actual End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate || ''}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Project Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Project Statistics
              </h3>

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
                    <div className="text-2xl font-bold text-orange-600">{formData.downloads}</div>
                    <div className="text-sm text-gray-600">Downloads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{formData.teamSize}</div>
                    <div className="text-sm text-gray-600">Team Size</div>
                  </div>
                </div>
              </div>

              {/* Status and Priority Badges */}
              <div className="flex gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(formData.status)}`}>
                  {formData.status}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(formData.priority)}`}>
                  {formData.priority} priority
                </span>
              </div>

              {/* Public/Private Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
                  Make project public
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-700">
                  Feature this project
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEO & Social Tab */}
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

          {/* Links */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project URL
              </label>
              <input
                type="url"
                value={formData.projectUrl || ''}
                onChange={(e) => handleInputChange('projectUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://project-website.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GitHub Repository
              </label>
              <input
                type="url"
                value={formData.githubUrl || ''}
                onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Demo/Case Study URL
              </label>
              <input
                type="url"
                value={formData.demoUrl || ''}
                onChange={(e) => handleInputChange('demoUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://demo.project.com"
              />
            </div>
          </div>
        </div>
      )}

      {/* Impact Metrics Tab */}
      {activeTab === 'metrics' && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Manual Bars Editor */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Project Impact Metrics</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chart Title</label>
                <input
                  type="text"
                  value={formData.graphData?.title || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    graphData: {
                      title: e.target.value,
                      bars: prev.graphData?.bars || [],
                      explanation: prev.graphData?.explanation || ''
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Project Impact Metrics"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Bars</label>
                  <button
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      graphData: {
                        title: prev.graphData?.title || 'Project Impact Metrics',
                        bars: [...(prev.graphData?.bars || []), { label: 'Metric', value: 10, color: '#3B82F6', unit: '%' }],
                        explanation: prev.graphData?.explanation || ''
                      }
                    }))}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Bar
                  </button>
                </div>

                {(formData.graphData?.bars || []).map((bar, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      value={bar.label}
                      onChange={(e) => {
                        const bars = [...(formData.graphData?.bars || [])];
                        bars[idx] = { ...bars[idx], label: e.target.value };
                        setFormData(prev => ({
                          ...prev,
                          graphData: { title: prev.graphData?.title || '', bars, explanation: prev.graphData?.explanation || '' }
                        }));
                      }}
                      className="md:col-span-4 px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Label"
                    />
                    <input
                      type="number"
                      value={bar.value}
                      onChange={(e) => {
                        const bars = [...(formData.graphData?.bars || [])];
                        bars[idx] = { ...bars[idx], value: parseFloat(e.target.value) || 0 };
                        setFormData(prev => ({
                          ...prev,
                          graphData: { title: prev.graphData?.title || '', bars, explanation: prev.graphData?.explanation || '' }
                        }));
                      }}
                      className="md:col-span-3 px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Value"
                    />
                    <input
                      type="text"
                      value={bar.unit || ''}
                      onChange={(e) => {
                        const bars = [...(formData.graphData?.bars || [])];
                        bars[idx] = { ...bars[idx], unit: e.target.value };
                        setFormData(prev => ({
                          ...prev,
                          graphData: { title: prev.graphData?.title || '', bars, explanation: prev.graphData?.explanation || '' }
                        }));
                      }}
                      className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Unit"
                    />
                    <input
                      type="color"
                      value={bar.color}
                      onChange={(e) => {
                        const bars = [...(formData.graphData?.bars || [])];
                        bars[idx] = { ...bars[idx], color: e.target.value };
                        setFormData(prev => ({
                          ...prev,
                          graphData: { title: prev.graphData?.title || '', bars, explanation: prev.graphData?.explanation || '' }
                        }));
                      }}
                      className="md:col-span-2 h-10 px-1 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={() => {
                        const bars = (formData.graphData?.bars || []).filter((_, i) => i !== idx);
                        setFormData(prev => ({
                          ...prev,
                          graphData: { title: prev.graphData?.title || '', bars, explanation: prev.graphData?.explanation || '' }
                        }));
                      }}
                      className="md:col-span-1 px-2 py-2 text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
                <textarea
                  rows={4}
                  value={formData.graphData?.explanation || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    graphData: { title: prev.graphData?.title || '', bars: prev.graphData?.bars || [], explanation: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the insights behind these metrics..."
                />
              </div>
            </div>

            {/* CSV Upload */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileSpreadsheet className="w-5 h-5 mr-2" />
                Import from CSV
              </h3>
              <p className="text-sm text-gray-600">Columns: label,value,color,unit (header optional)</p>
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={async (e) => {
                  try {
                    setCsvError('');
                    const file = e.target.files && e.target.files[0];
                    if (!file) return;
                    const text = await file.text();
                    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
                    let rows = lines.map(l => l.split(',').map(s => s.trim()));
                    // Drop header if non-numeric in value column
                    if (rows.length > 0 && rows[0].length >= 2 && isNaN(Number(rows[0][1]))) {
                      rows = rows.slice(1);
                    }
                    const bars = rows.map(cols => ({
                      label: cols[0] || 'Metric',
                      value: Number(cols[1] || 0),
                      color: cols[2] || '#3B82F6',
                      unit: cols[3] || '%'
                    })).filter(b => !Number.isNaN(b.value));
                    setFormData(prev => ({
                      ...prev,
                      graphData: {
                        title: prev.graphData?.title || 'Project Impact Metrics',
                        bars,
                        explanation: prev.graphData?.explanation || ''
                      }
                    }));
                  } catch (err: any) {
                    console.error('CSV parse error:', err);
                    setCsvError('Failed to parse CSV. Ensure format label,value,color,unit');
                  }
                }}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {csvError && <div className="text-sm text-red-600">{csvError}</div>}
              <div className="text-xs text-gray-500">
                Example:
                <pre className="mt-2 p-2 bg-gray-50 rounded">label,value,color,unit\nSales Increase,35,#3B82F6,%\nCost Reduction,25,#10B981,%</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectEditor;


