import React, { useState, useEffect } from 'react';
import { Users, Target, Award, TrendingUp, Heart, Search, Calendar, Podcast, BookOpen, FileText, Star, Linkedin, Twitter, Github, Mail, Globe, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const About: React.FC = () => {
  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'PhD in Data Science with 15+ years of experience in analytics and machine learning. Former head of data science at Fortune 500 companies.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
      expertise: ['Machine Learning', 'Big Data', 'Strategy'],
      social: {
        linkedin: 'https://linkedin.com/in/sarah-chen',
        twitter: 'https://twitter.com/sarahchen_ds',
        email: 'sarah.chen@c-mer.org'
      }
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'Expert in cloud architecture and real-time analytics systems. Led development of analytics platforms serving millions of users.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
      expertise: ['Cloud Computing', 'Real-time Analytics', 'System Architecture'],
      social: {
        linkedin: 'https://linkedin.com/in/michael-rodriguez',
        github: 'https://github.com/mrodriguez',
        email: 'michael.rodriguez@c-mer.org'
      }
    },
    {
      name: 'Dr. Emily Johnson',
      role: 'Head of Education',
      bio: 'Educational psychologist specializing in adult learning and technical skill development. Published author on data literacy education.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
      expertise: ['Education Technology', 'Learning Design', 'Data Literacy'],
      social: {
        linkedin: 'https://linkedin.com/in/emily-johnson',
        researchgate: 'https://researchgate.net/profile/emily-johnson',
        email: 'emily.johnson@c-mer.org'
      }
    },
    {
      name: 'David Kim',
      role: 'Lead Data Scientist',
      bio: 'Expert in predictive modeling and business intelligence. Helped companies increase revenue by 40% through data-driven insights.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
      expertise: ['Predictive Analytics', 'Business Intelligence', 'A/B Testing'],
      social: {
        linkedin: 'https://linkedin.com/in/david-kim',
        twitter: 'https://twitter.com/davidkim_ds',
        email: 'david.kim@c-mer.org'
      }
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from course development to student support.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our passion for data and education drives us to create transformative learning experiences.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of collaboration and building strong partnerships with our students.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We continuously innovate our methods and tools to stay at the forefront of analytics education.'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Students Trained' },
    { number: '95%', label: 'Job Placement Rate' },
    { number: '150+', label: 'Partner Companies' },
    { number: '50+', label: 'Expert Instructors' }
  ];

  const photos = [
    {
      id: 1,
      src: '/api/placeholder/500/500',
      borderClass: 'border-blue-400',
      shapeClass: 'rounded-2xl',
      title: 'Innovation',
      description: 'Pushing boundaries in data analytics'
    },
    {
      id: 2,
      src: '/api/placeholder/500/500',
      borderClass: 'border-green-400',
      shapeClass: 'rounded-2xl',
      title: 'Growth',
      description: 'Scaling solutions for global impact'
    },
    {
      id: 3,
      src: '/api/placeholder/500/500',
      borderClass: 'border-purple-400',
      shapeClass: 'rounded-2xl',
      title: 'Excellence',
      description: 'Delivering quality in every project'
    }
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [activeBenefit, setActiveBenefit] = useState('insights');
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  // Team navigation functions
  const scrollToTeam = (index: number) => {
    const container = document.getElementById('team-container');
    if (container) {
      const cardWidth = 416; // w-96 + space-x-8 = 384 + 32 = 416px
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentTeamIndex(index);
    }
  };

  const nextTeam = () => {
    const nextIndex = (currentTeamIndex + 1) % team.length;
    scrollToTeam(nextIndex);
  };

  const prevTeam = () => {
    const prevIndex = currentTeamIndex === 0 ? team.length - 1 : currentTeamIndex - 1;
    scrollToTeam(prevIndex);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScroll) return;

    const interval = setInterval(() => {
      nextTeam();
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [currentTeamIndex, isAutoScroll]);

  const benefits = [
    {
      id: 'insights',
      title: 'Insights Search',
      icon: Search,
      shortDesc: 'Advanced search capabilities for comprehensive insights',
      fullDesc: 'Our powerful Insights Search engine allows you to discover valuable research findings, data analysis, and expert opinions from our extensive knowledge base. Access real-time information, trending topics, and in-depth analysis across multiple development sectors.',
      features: [
        'Real-time search across all publications',
        'Advanced filtering by sector and topic',
        'Exportable results and citations',
        'Personalized recommendations',
        'Integration with external databases'
      ]
    },
    {
      id: 'events',
      title: 'Events',
      icon: Calendar,
      shortDesc: 'Exclusive events and networking opportunities',
      fullDesc: 'Join our exclusive events designed to connect professionals, share knowledge, and foster collaboration in the development sector. From webinars and workshops to conferences and networking sessions, our events provide valuable learning opportunities and professional connections.',
      features: [
        'Webinars with industry experts',
        'Annual conferences and summits',
        'Workshops and training sessions',
        'Networking opportunities',
        'Virtual and in-person events'
      ]
    },
    {
      id: 'podcasts',
      title: 'C-MER Podcasts',
      icon: Podcast,
      shortDesc: 'Expert discussions and industry insights',
      fullDesc: 'Dive deep into development topics with our expert-led podcast series. Each episode features in-depth discussions, interviews with thought leaders, and practical insights that you can apply to your work in monitoring, evaluation, and research.',
      features: [
        'Weekly expert interviews',
        'Case study discussions',
        'Industry trend analysis',
        'Practical implementation tips',
        'Global perspectives on development'
      ]
    },
    {
      id: 'blog',
      title: 'Perspective Blog',
      icon: BookOpen,
      shortDesc: 'Thought leadership and expert perspectives',
      fullDesc: 'Our Perspective Blog features thought-provoking articles, research insights, and expert opinions on the latest trends and challenges in monitoring, evaluation, and development. Written by our team of experienced professionals and guest contributors.',
      features: [
        'Weekly thought leadership articles',
        'Research methodology insights',
        'Industry best practices',
        'Guest expert contributions',
        'Interactive discussions and comments'
      ]
    },
    {
      id: 'publications',
      title: 'Publications',
      icon: FileText,
      shortDesc: 'Comprehensive research reports and whitepapers',
      fullDesc: 'Access our extensive collection of research reports, whitepapers, case studies, and analytical publications. Our publications cover a wide range of development topics and provide actionable insights for practitioners, policymakers, and researchers.',
      features: [
        'Research reports and whitepapers',
        'Case studies and impact assessments',
        'Policy briefs and recommendations',
        'Methodological guides',
        'Annual reports and reviews'
      ]
    },
    {
      id: 'spotlight',
      title: 'Spotlight',
      icon: Star,
      shortDesc: 'Featured projects and success stories',
      fullDesc: 'Discover our featured projects, success stories, and innovative solutions that have made a real impact in communities worldwide. Our Spotlight section showcases the transformative work we\'ve accomplished with our partners.',
      features: [
        'Featured project showcases',
        'Success story highlights',
        'Impact measurement results',
        'Partner testimonials',
        'Innovative solution spotlights'
      ]
    }
  ];

  const companyCards = [
    {
      id: 1,
      title: 'Mission',
      icon: '🚀',
      color: 'green',
      content: 'C-MER\'s mission is to support partners in effectively and successfully solving social problems to improve the well-being of the people they aim to benefit globally. Our expertise is dedicated to creating development impact in various sectors, including health, agriculture, food security, governance, education, livelihoods, youth, women, and environmental management.'
    },
    {
      id: 2,
      title: 'Vision',
      icon: '🎯',
      color: 'secondary',
      content: 'C-MER\'s Vision is to become a leading, dynamic socio-economic development consultancy firm that contributes to creating a better world by strengthening transformative processes for community development.'
    },
    {
      id: 3,
      title: 'History',
      icon: '📚',
      color: 'blue',
      content: 'Founded with a mission to lead in market and economic research, C-MER has evolved significantly over the years. From its early days, C-MER has been committed to providing data-driven insights and research solutions to help businesses, governments, and individuals make informed decisions. Here\'s a look back at some of our key milestones.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) =>
        (prevIndex + 1) % companyCards.length
      );
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [companyCards.length]);

  return (
    <div className="bg-white">
      {/* About Our Company */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Photo Grid */}
            <div className="space-y-6">

              {/* Premium Glassmorphism Gallery */}
              <div className="relative">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-primary-200/30 rounded-full blur-xl"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary-200/20 rounded-full blur-2xl"></div>
                  <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200/25 rounded-full blur-lg"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10 justify-center items-start">
                  {photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className={`group relative transition-all duration-700 ${
                        index === 0 ? 'lg:-translate-y-8' : // First card up more
                        index === 1 ? 'lg:translate-y-0' :  // Middle card normal
                        'lg:translate-y-8'                 // Last card down more
                      }`}
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      {/* 3D Card Container */}
                      <div className="relative transform transition-all duration-700 ease-out group-hover:scale-105 group-hover:-rotate-y-6 group-hover:rotate-x-2">
                        {/* Glassmorphism card */}
                        <div className="relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden flex-1 max-w-xs">
                          {/* Animated background gradient */}
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${
                            photo.borderClass.includes('blue') ? 'from-blue-500/20 to-blue-600/30' :
                            photo.borderClass.includes('green') ? 'from-green-500/20 to-green-600/30' :
                            photo.borderClass.includes('purple') ? 'from-purple-500/20 to-purple-600/30' :
                            'from-orange-500/20 to-orange-600/30'
                          }`}></div>

                          {/* Floating particles effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                            <div className="absolute top-4 left-4 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                            <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse delay-300"></div>
                            <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-700"></div>
                            <div className="absolute top-10 left-8 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-500"></div>
                          </div>

                          {/* Icon container */}
                          <div className="relative w-full h-32 rounded-2xl overflow-hidden mb-6 flex items-center justify-center group/icon">
                            {/* Icon */}
                            <div className={`text-6xl transition-all duration-700 group-hover:scale-110 ${
                              photo.borderClass.includes('blue') ? 'text-blue-400' :
                              photo.borderClass.includes('green') ? 'text-green-400' :
                              photo.borderClass.includes('purple') ? 'text-purple-400' :
                              'text-orange-400'
                            }`}>
                              {photo.borderClass.includes('blue') ? '🚀' :
                               photo.borderClass.includes('green') ? '📈' :
                               photo.borderClass.includes('purple') ? '💡' :
                               '🎯'}
                            </div>

                            {/* Animated background */}
                            <div className={`absolute inset-0 rounded-2xl transition-all duration-700 group-hover:scale-105 ${
                              photo.borderClass.includes('blue') ? 'bg-blue-500/10' :
                              photo.borderClass.includes('green') ? 'bg-green-500/10' :
                              photo.borderClass.includes('purple') ? 'bg-purple-500/10' :
                              'bg-orange-500/10'
                            }`}></div>
                          </div>

                          {/* Content with glassmorphism - Always visible */}
                          <div className="relative z-10 text-center">
                            <h4 className="text-black font-bold text-xl mb-3">
                              {photo.title}
                            </h4>
                            <p className="text-gray-700 text-base leading-relaxed">
                              {photo.description}
                            </p>

                            {/* Always visible accent */}
                            <div className={`inline-block mt-4 px-6 py-3 rounded-full border transition-all duration-500 group-hover:scale-105 ${
                              photo.borderClass.includes('blue') ? 'bg-blue-100 border-blue-400 text-blue-900' :
                              photo.borderClass.includes('green') ? 'bg-green-100 border-green-400 text-green-900' :
                              photo.borderClass.includes('purple') ? 'bg-purple-100 border-purple-400 text-purple-900' :
                              'bg-orange-100 border-orange-400 text-orange-900'
                            }`}>
                              <span className="text-sm font-medium">Explore →</span>
                            </div>
                          </div>
                        </div>

                        {/* 3D Shadow effect */}
                        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 transform translate-x-2 translate-y-2 ${
                          photo.borderClass.includes('blue') ? 'bg-blue-500/20' :
                          photo.borderClass.includes('green') ? 'bg-green-500/20' :
                          photo.borderClass.includes('purple') ? 'bg-purple-500/20' :
                          'bg-orange-500/20'
                        } blur-lg`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rotating Company Cards - Single Display */}
              <div className="mt-20">
                <div className="p-6">
                  {/* Card Header with Icon and Title */}
                  <div className="flex items-center mb-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-4 shadow-lg transition-all duration-500 ease-in-out ${
                      currentCardIndex === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                      currentCardIndex === 1 ? 'bg-gradient-to-br from-secondary-500 to-primary-500' :
                      'bg-gradient-to-br from-green-500 to-green-600'
                    }`}>
                      <span className="text-2xl">{companyCards[currentCardIndex].icon}</span>
                    </div>
                    <div className="transition-all duration-500 ease-in-out">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{companyCards[currentCardIndex].title}</h3>
                      <div className={`w-12 h-1 rounded-full transition-all duration-500 ease-in-out ${
                        currentCardIndex === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                        currentCardIndex === 1 ? 'bg-gradient-to-r from-secondary-500 to-primary-500' :
                        'bg-gradient-to-r from-green-500 to-green-600'
                      }`}></div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="transition-all duration-500 ease-in-out">
                    <p className="text-gray-700 text-base leading-relaxed">
                      {companyCards[currentCardIndex].content}
                    </p>
                  </div>

                  {/* Card Indicators */}
                  <div className="flex justify-center space-x-3 mt-6">
                    {companyCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCardIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentCardIndex
                            ? `scale-125 shadow-lg ${
                                currentCardIndex === 0 ? 'bg-blue-500' :
                                currentCardIndex === 1 ? 'bg-secondary-500' :
                                'bg-green-500'
                              }`
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`View ${companyCards[index].title}`}
                      />
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ease-out ${
                          currentCardIndex === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                          currentCardIndex === 1 ? 'bg-gradient-to-r from-secondary-500 to-primary-500' :
                          'bg-gradient-to-r from-green-500 to-green-600'
                        }`}
                        style={{ width: `${((currentCardIndex + 1) / companyCards.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Company Information */}
            <div className="space-y-8">
              {/* Main Title */}
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Welcome to the Centre for Monitoring, Evaluation, and Research
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-8"></div>
              </div>

              {/* Company Introduction */}
              <div className="space-y-6">
                {/* C-MER Highlight */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mb-6 shadow-lg">
                    <span className="text-2xl font-bold text-white">C-MER</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Centre for Monitoring, Evaluation and Research
                  </h3>
                </div>

                {/* Description */}
                <div className="max-w-2xl mx-auto">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
                    is a research consulting firm dedicated to providing <strong className="text-primary-600">cutting-edge research, monitoring, and evaluation services</strong>.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
                    Our work revolves around delivering both <strong className="text-secondary-600">quantitative and qualitative research</strong>, primarily focusing on monitoring, evaluation, and research.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed text-center">
                    We employ a combination of <strong className="text-green-600">summative and formative evaluations</strong> to enhance our services.
                  </p>
                </div>

                {/* Key Focus Areas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-4 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-300">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <div className="w-6 h-6 bg-primary-500 rounded-full"></div>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Research</h4>
                    <p className="text-sm text-gray-600">Cutting-edge research methodologies</p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-300">
                    <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <div className="w-6 h-6 bg-secondary-500 rounded-full"></div>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Monitoring</h4>
                    <p className="text-sm text-gray-600">Comprehensive monitoring services</p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-300">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Evaluation</h4>
                    <p className="text-sm text-gray-600">Impact assessment & evaluation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="section-padding bg-white text-gray-900">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* What We Do Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container-max">
          <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                  C-MER specializes in comprehensive research, monitoring, and evaluation services across multiple development sectors
                </p>
          </div>

          <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-8 justify-center items-center">
            {/* Social Development - HIGH BAR */}
            <div className="group relative lg:-translate-y-20">
              <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-xl min-h-[140px] sm:min-h-[160px] max-w-sm">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-3 shadow-lg">
                    <span className="text-xl sm:text-2xl">🌍</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Social Development</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    Comprehensive social development programs focusing on community empowerment, poverty reduction, and sustainable development initiatives.
                  </p>
                </div>
              </div>
            </div>

            {/* Socio-economic Growth and Development - LOW BAR */}
            <div className="group relative lg:translate-y-20">
              <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-xl min-h-[140px] sm:min-h-[160px] max-w-sm">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mb-3 shadow-lg">
                    <span className="text-lg sm:text-xl">📈</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Socio-economic Growth</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    Economic development strategies and programs designed to promote sustainable growth, job creation, and improved living standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Policy - HIGH BAR */}
            <div className="group relative lg:-translate-y-20">
              <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-xl min-h-[140px] sm:min-h-[160px] max-w-sm">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-3 shadow-lg">
                    <span className="text-lg sm:text-xl">📋</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Policy Development</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Policy research, analysis, and development services to support evidence-based decision making and effective governance.
                  </p>
                </div>
              </div>
            </div>

            {/* Training - LOW BAR */}
            <div className="group relative lg:translate-y-20">
              <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-xl min-h-[140px] sm:min-h-[160px] max-w-sm">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl mb-3 shadow-lg">
                    <span className="text-lg sm:text-xl">🎓</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Training Programs</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Capacity building and training programs designed to enhance skills in research, monitoring, evaluation, and development practices.
                  </p>
                </div>
              </div>
            </div>

            {/* Evaluation Packages - HIGH BAR */}
            <div className="group relative lg:-translate-y-20">
              <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-xl min-h-[140px] sm:min-h-[160px] max-w-sm">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl mb-3 shadow-lg">
                    <span className="text-lg sm:text-xl">📊</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Evaluation Packages</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Comprehensive evaluation services including impact assessment, program evaluation, and performance measurement packages.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Collection - LOW BAR */}
            <div className="group relative lg:translate-y-20">
              <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-xl min-h-[140px] sm:min-h-[160px] max-w-sm">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl mb-3 shadow-lg">
                    <span className="text-lg sm:text-xl">📱</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Data Collection</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Advanced data collection methodologies including surveys, interviews, focus groups, and digital data collection solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits We Offer Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container-max">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Benefits We Offer</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the comprehensive resources and tools available to support your research and development journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Benefits Navigation */}
            <div className="md:col-span-2 lg:col-span-1 space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Explore Our Resources</h3>
              {benefits.map((benefit) => {
                const IconComponent = benefit.icon;
                return (
                  <button
                    key={benefit.id}
                    onClick={() => setActiveBenefit(benefit.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      activeBenefit === benefit.id
                        ? 'border-2 border-primary-200'
                        : 'border border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activeBenefit === benefit.id
                          ? 'text-primary-600'
                          : 'text-gray-600'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${
                          activeBenefit === benefit.id ? 'text-primary-900' : 'text-gray-900'
                        }`}>
                          {benefit.title}
                        </h4>
                        <p className={`text-sm ${
                          activeBenefit === benefit.id ? 'text-primary-700' : 'text-gray-600'
                        }`}>
                          {benefit.shortDesc}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Benefit Details */}
            <div className="md:col-span-2 lg:col-span-2">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                    {React.createElement(benefits.find(b => b.id === activeBenefit)?.icon || Search, {
                      className: "w-7 h-7 sm:w-8 sm:h-8 text-white"
                    })}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                      {benefits.find(b => b.id === activeBenefit)?.title}
                    </h3>
                    <div className="w-12 h-1 sm:w-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
                  {benefits.find(b => b.id === activeBenefit)?.fullDesc}
                </p>

                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Key Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {benefits.find(b => b.id === activeBenefit)?.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-3 px-6 sm:py-3 sm:px-8 rounded-lg hover:shadow-lg active:scale-95 transition-all duration-300 touch-manipulation">
                    <span className="text-sm sm:text-base">Explore {benefits.find(b => b.id === activeBenefit)?.title}</span>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container-max">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Industry experts dedicated to your success
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4">
              <button
                onClick={prevTeam}
                className="w-14 h-14 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center transition-all duration-300 border border-gray-200 touch-manipulation"
                title="Previous team member"
              >
                <ChevronLeft className="w-7 h-7 sm:w-6 sm:h-6 text-gray-600" />
              </button>

              <button
                onClick={nextTeam}
                className="w-14 h-14 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center transition-all duration-300 border border-gray-200 touch-manipulation"
                title="Next team member"
              >
                <ChevronRight className="w-7 h-7 sm:w-6 sm:h-6 text-gray-600" />
              </button>

              <button
                onClick={() => setIsAutoScroll(!isAutoScroll)}
                className={`w-14 h-14 sm:w-12 sm:h-12 rounded-full shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center transition-all duration-300 border touch-manipulation ${
                  isAutoScroll
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
                title={isAutoScroll ? 'Pause auto-scroll' : 'Start auto-scroll'}
              >
                {isAutoScroll ? <Pause className="w-7 h-7 sm:w-6 sm:h-6" /> : <Play className="w-7 h-7 sm:w-6 sm:h-6" />}
              </button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center sm:justify-end space-x-2">
              {team.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToTeam(index)}
                  className={`w-4 h-4 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${
                    index === currentTeamIndex
                      ? 'bg-primary-500 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500'
                  }`}
                  title={`Go to ${team[index].name}`}
                />
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div id="team-container" className="flex space-x-8 overflow-x-auto px-4 hide-scrollbar" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              {team.map((member, index) => (
                <div key={member.name} className="flex-shrink-0 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-200/50 hover:shadow-3xl hover:scale-105 transition-all duration-500 animate-slide-in group" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="text-center relative">
                    {/* Decorative background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 rounded-3xl"></div>

                    {/* Profile Picture */}
                    <div className="relative mb-6">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                        <img
                          src={member.image}
                          alt={member.name}
                          className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover bg-gradient-to-br from-gray-200 to-gray-300 mx-auto ring-4 ring-white shadow-xl group-hover:ring-primary-100 transition-all duration-500"
                        />
                        {/* Status indicator */}
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                      </div>

                      {/* Social Media Icons - Positioned around the image */}
                      <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 touch-manipulation"
                            title="LinkedIn"
                          >
                            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                          </a>
                        )}
                        {member.social.twitter && (
                          <a
                            href={member.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-full flex items-center justify-center hover:from-sky-500 hover:to-sky-600 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 touch-manipulation"
                            title="Twitter"
                          >
                            <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                          </a>
                        )}
                        {member.social.github && (
                          <a
                            href={member.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full flex items-center justify-center hover:from-gray-800 hover:to-gray-900 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 touch-manipulation"
                            title="GitHub"
                          >
                            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                          </a>
                        )}
                        {member.social.researchgate && (
                          <a
                            href={member.social.researchgate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 touch-manipulation"
                            title="ResearchGate"
                          >
                            <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                          </a>
                        )}
                        {member.social.email && (
                          <a
                            href={`mailto:${member.social.email}`}
                            className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 touch-manipulation"
                            title="Email"
                          >
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">{member.name}</h3>
                      <div className="w-12 h-1 sm:w-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 group-hover:w-16 sm:group-hover:w-20 transition-all duration-300"></div>
                      <p className="text-primary-600 font-semibold text-base sm:text-lg mb-4">{member.role}</p>
                      <p className="text-gray-600 text-sm mb-6 leading-relaxed px-2">{member.bio}</p>

                      {/* Expertise Tags */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.expertise.map((skill) => (
                          <span key={skill} className="px-4 py-2 bg-white text-primary-700 rounded-full text-xs font-semibold border border-primary-200/50 hover:shadow-md transition-all duration-300 hover:scale-105">
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-sm"></div>
                      <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-secondary-500/10 to-primary-500/10 rounded-full blur-sm"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Be part of a community of data professionals who are transforming industries
            through analytics education and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/apply" className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Start Your Journey
            </a>
            <a href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

