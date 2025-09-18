import React, { useState } from 'react';
import { ExternalLink, Calendar, Users, TrendingUp, Award, ArrowRight, BarChart3, Target, DollarSign, Clock } from 'lucide-react';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(1);

  const projects = [
    {
      id: 1,
      title: 'Retail Analytics Transformation',
      client: 'Global Retail Corp',
      category: 'retail',
      description: 'Implemented comprehensive analytics solution that increased sales by 35% and reduced inventory costs by 25%.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center',
      results: [
        '35% increase in sales revenue',
        '25% reduction in inventory costs',
        '50% improvement in demand forecasting accuracy',
        'Real-time inventory tracking system'
      ],
      technologies: ['Python', 'Tableau', 'AWS', 'Machine Learning'],
      duration: '6 months',
      team: '8 members',
      status: 'completed',
      featured: true,
      graphData: {
        title: 'Project Impact Metrics',
        bars: [
          { label: 'Sales Increase', value: 35, color: '#3B82F6', unit: '%' },
          { label: 'Cost Reduction', value: 25, color: '#10B981', unit: '%' },
          { label: 'Efficiency Gain', value: 50, color: '#F59E0B', unit: '%' },
          { label: 'ROI', value: 280, color: '#EF4444', unit: '%' }
        ],
        explanation: 'This bar chart illustrates the comprehensive impact of our retail analytics transformation project. The sales increase of 35% represents the direct revenue growth achieved through optimized pricing strategies and personalized recommendations. The 25% cost reduction primarily comes from improved inventory management and reduced stockouts. The 50% efficiency gain reflects faster data processing and decision-making capabilities, while the 280% ROI demonstrates the exceptional financial return on the analytics investment.'
      }
    },
    {
      id: 2,
      title: 'Healthcare Data Platform',
      client: 'Medical Center Network',
      category: 'healthcare',
      description: 'Built a secure healthcare analytics platform for patient data analysis and treatment optimization.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center',
      results: [
        '40% improvement in treatment outcomes',
        '30% reduction in administrative costs',
        'Enhanced patient care coordination',
        'HIPAA-compliant data security'
      ],
      technologies: ['R', 'SQL', 'Power BI', 'Azure'],
      duration: '8 months',
      team: '12 members',
      status: 'completed',
      featured: true,
      graphData: {
        title: 'Healthcare Analytics Performance',
        bars: [
          { label: 'Treatment Outcomes', value: 40, color: '#10B981', unit: '%' },
          { label: 'Cost Reduction', value: 30, color: '#3B82F6', unit: '%' },
          { label: 'Patient Satisfaction', value: 65, color: '#F59E0B', unit: '%' },
          { label: 'Data Processing Speed', value: 85, color: '#EF4444', unit: '%' }
        ],
        explanation: 'The healthcare analytics platform demonstrates significant improvements across multiple key performance indicators. The 40% improvement in treatment outcomes reflects better patient care through data-driven decision making. Administrative cost reduction of 30% was achieved through process automation and optimized resource allocation. Patient satisfaction increased by 65% due to faster response times and personalized care approaches. The 85% improvement in data processing speed ensures real-time access to critical patient information.'
      }
    },
    {
      id: 3,
      title: 'Financial Risk Assessment',
      client: 'Investment Bank',
      category: 'finance',
      description: 'Developed advanced risk assessment models for portfolio management and fraud detection.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop&crop=center',
      results: [
        '$2.3M savings in fraud prevention',
        '60% faster risk assessment',
        'Improved regulatory compliance',
        'Real-time monitoring dashboard'
      ],
      technologies: ['Python', 'TensorFlow', 'PostgreSQL', 'React'],
      duration: '4 months',
      team: '6 members',
      status: 'completed',
      featured: false,
      graphData: {
        title: 'Financial Risk Management Metrics',
        bars: [
          { label: 'Risk Assessment Speed', value: 60, color: '#3B82F6', unit: '%' },
          { label: 'Fraud Detection Accuracy', value: 92, color: '#10B981', unit: '%' },
          { label: 'Compliance Score', value: 98, color: '#F59E0B', unit: '%' },
          { label: 'System Uptime', value: 99.9, color: '#EF4444', unit: '%' }
        ],
        explanation: 'The financial risk assessment system showcases exceptional performance across all critical metrics. The 60% improvement in risk assessment speed allows for near real-time portfolio monitoring and rapid response to market changes. Fraud detection accuracy of 92% significantly reduces financial losses while maintaining low false positive rates. The 98% compliance score ensures adherence to regulatory requirements, while 99.9% system uptime guarantees continuous availability of critical financial data.'
      }
    },
    {
      id: 4,
      title: 'Manufacturing IoT Analytics',
      client: 'Industrial Solutions Inc',
      category: 'manufacturing',
      description: 'IoT data analytics platform for predictive maintenance and production optimization.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&crop=center',
      results: [
        '45% reduction in downtime',
        '30% increase in production efficiency',
        'Predictive maintenance alerts',
        'Real-time equipment monitoring'
      ],
      technologies: ['IoT Sensors', 'Kafka', 'Spark', 'Grafana'],
      duration: '9 months',
      team: '10 members',
      status: 'ongoing',
      featured: true,
      graphData: {
        title: 'Manufacturing IoT Performance Metrics',
        bars: [
          { label: 'Downtime Reduction', value: 45, color: '#10B981', unit: '%' },
          { label: 'Production Efficiency', value: 30, color: '#3B82F6', unit: '%' },
          { label: 'Maintenance Cost Savings', value: 40, color: '#F59E0B', unit: '%' },
          { label: 'Equipment Lifespan', value: 25, color: '#EF4444', unit: '%' }
        ],
        explanation: 'The IoT analytics platform delivers significant operational improvements for manufacturing facilities. The 45% reduction in downtime is achieved through predictive maintenance that anticipates equipment failures before they occur. Production efficiency increased by 30% through optimized scheduling and resource allocation. Maintenance costs were reduced by 40% by moving from reactive to predictive maintenance strategies. Equipment lifespan was extended by 25% through better monitoring and timely interventions.'
      }
    },
    {
      id: 5,
      title: 'E-commerce Personalization',
      client: 'Online Retailer',
      category: 'retail',
      description: 'Machine learning-powered recommendation system and customer segmentation analysis.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center',
      results: [
        '28% increase in conversion rate',
        '40% improvement in customer retention',
        'Personalized shopping experience',
        'Advanced customer segmentation'
      ],
      technologies: ['Python', 'Scikit-learn', 'MongoDB', 'Redis'],
      duration: '5 months',
      team: '7 members',
      status: 'completed',
      featured: false,
      graphData: {
        title: 'E-commerce Personalization Results',
        bars: [
          { label: 'Conversion Rate', value: 28, color: '#3B82F6', unit: '%' },
          { label: 'Customer Retention', value: 40, color: '#10B981', unit: '%' },
          { label: 'Average Order Value', value: 35, color: '#F59E0B', unit: '%' },
          { label: 'Customer Lifetime Value', value: 55, color: '#EF4444', unit: '%' }
        ],
        explanation: 'The e-commerce personalization platform demonstrates outstanding performance in key business metrics. The 28% increase in conversion rate was achieved through highly targeted product recommendations based on user behavior and preferences. Customer retention improved by 40% through personalized email campaigns and loyalty programs. Average order value increased by 35% due to effective cross-selling and upselling recommendations. Customer lifetime value grew by 55% as a result of deeper customer engagement and satisfaction.'
      }
    },
    {
      id: 6,
      title: 'Supply Chain Optimization',
      client: 'Logistics Company',
      category: 'logistics',
      description: 'End-to-end supply chain analytics for route optimization and demand forecasting.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&crop=center',
      results: [
        '25% reduction in transportation costs',
        '35% improvement in delivery times',
        'Real-time shipment tracking',
        'Automated inventory management'
      ],
      technologies: ['Python', 'GIS', 'Tableau', 'AWS Lambda'],
      duration: '7 months',
      team: '9 members',
      status: 'ongoing',
      featured: false,
      graphData: {
        title: 'Supply Chain Optimization Metrics',
        bars: [
          { label: 'Cost Reduction', value: 25, color: '#10B981', unit: '%' },
          { label: 'Delivery Time Improvement', value: 35, color: '#3B82F6', unit: '%' },
          { label: 'Route Efficiency', value: 45, color: '#F59E0B', unit: '%' },
          { label: 'Inventory Turnover', value: 30, color: '#EF4444', unit: '%' }
        ],
        explanation: 'The supply chain optimization project delivers comprehensive improvements across all operational metrics. Transportation costs were reduced by 25% through optimized routing and load consolidation strategies. Delivery times improved by 35% using predictive analytics for demand forecasting and route optimization. Route efficiency increased by 45% through advanced algorithms that consider multiple variables including traffic, weather, and fuel consumption. Inventory turnover improved by 30% through better demand forecasting and automated replenishment systems.'
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'retail', name: 'Retail', count: projects.filter(p => p.category === 'retail').length },
    { id: 'healthcare', name: 'Healthcare', count: projects.filter(p => p.category === 'healthcare').length },
    { id: 'finance', name: 'Finance', count: projects.filter(p => p.category === 'finance').length },
    { id: 'manufacturing', name: 'Manufacturing', count: projects.filter(p => p.category === 'manufacturing').length },
    { id: 'logistics', name: 'Logistics', count: projects.filter(p => p.category === 'logistics').length }
  ];

  const selectedProjectData = projects.find(p => p.id === selectedProject) || projects[0];

  // Bar Graph Component
  const BarGraph: React.FC<{ data: any }> = ({ data }) => {
    const maxValue = Math.max(...data.bars.map((bar: any) => bar.value));

  return (
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">{data.title}</h3>
        <div className="space-y-4">
          {data.bars.map((bar: any, index: number) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-32 text-sm font-medium text-gray-700 truncate">
                {bar.label}
          </div>
              <div className="flex-1">
                <div className="relative h-8 bg-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full rounded-lg transition-all duration-1000 ease-out"
                    style={{
                      width: `${(bar.value / maxValue) * 100}%`,
                      backgroundColor: bar.color
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-end pr-2">
                      <span className="text-white font-bold text-sm">
                        {bar.value}{bar.unit}
                    </span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            ))}
          </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Analysis & Insights</h4>
          <p className="text-gray-700 leading-relaxed">{data.explanation}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="container-max">
          <div className="py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
              Our <span className="text-primary-600">Projects</span> Portfolio
            </h1>
            <p className="text-lg text-gray-600 text-center mt-2 max-w-2xl mx-auto">
              Explore our comprehensive analytics projects with detailed insights and performance metrics
            </p>
          </div>
        </div>
          </div>

      {/* Main Content with Sidebar */}
      <div className="container-max py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Projects List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary-600" />
                Projects
              </h2>
              <div className="space-y-2">
                {projects.map((project) => (
              <button
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedProject === project.id
                        ? 'bg-primary-100 border-l-4 border-primary-600 text-primary-900'
                        : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                        selectedProject === project.id ? 'bg-primary-600' : 'bg-gray-400'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate">{project.title}</h3>
                        <p className="text-xs text-gray-500 truncate">{project.client}</p>
                        <div className="flex items-center mt-1">
                          <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                            project.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                          }`}></span>
                          <span className="text-xs text-gray-500 capitalize">{project.category}</span>
                        </div>
                      </div>
                    </div>
              </button>
            ))}
              </div>
            </div>
          </div>

          {/* Main Content - Project Details */}
          <div className="lg:col-span-3 space-y-8">
            {/* Project Header */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedProjectData.category === 'retail' ? 'bg-blue-100 text-blue-800' :
                      selectedProjectData.category === 'healthcare' ? 'bg-green-100 text-green-800' :
                      selectedProjectData.category === 'finance' ? 'bg-yellow-100 text-yellow-800' :
                      selectedProjectData.category === 'manufacturing' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedProjectData.category.charAt(0).toUpperCase() + selectedProjectData.category.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedProjectData.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedProjectData.status === 'completed' ? '✓ Completed' : '⟳ Ongoing'}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {selectedProjectData.title}
                  </h1>
                  <p className="text-lg text-primary-600 font-medium">{selectedProjectData.client}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {selectedProjectData.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {selectedProjectData.team}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {selectedProjectData.description}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectData.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                </div>
              </div>

              {/* Key Results */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProjectData.results.map((result, index) => (
                    <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{result}</span>
                    </div>
                  ))}
          </div>
        </div>
            </div>

            {/* Bar Graph Section - Second Position */}
            <BarGraph data={selectedProjectData.graphData} />

            {/* Project Image */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={selectedProjectData.image}
                alt={`${selectedProjectData.title} - ${selectedProjectData.category} project`}
                className="w-full h-64 md:h-80 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;


