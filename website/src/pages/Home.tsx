import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Users, Target, Award, TrendingUp, Heart, Search, Calendar, Podcast, BookOpen, FileText, Star, Linkedin, Twitter, Github, Mail, Globe, ChevronLeft, ChevronRight, Pause } from 'lucide-react';

const Home: React.FC = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'John Davis',
      position: 'CTO, TechCorp',
      avatar: 'JD',
      rating: 5,
      text: 'Their analytics platform transformed our decision-making process. We\'ve seen a 40% improvement in operational efficiency and data-driven insights that were previously hidden.'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      position: 'VP of Analytics, DataFlow',
      avatar: 'SC',
      rating: 5,
      text: 'The training programs are exceptional. Our team went from basic data skills to advanced analytics capabilities in just 3 months. Highly recommend!'
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      position: 'CEO, Insight Labs',
      avatar: 'MR',
      rating: 5,
      text: 'Outstanding evaluation services. They helped us identify key performance gaps and implement solutions that increased our ROI by 35%.'
    },
    {
      id: 4,
      name: 'Emily Johnson',
      position: 'Data Director, Analytics Pro',
      avatar: 'EJ',
      rating: 5,
      text: 'Professional, reliable, and results-driven. Their comprehensive approach to data analytics has been a game-changer for our organization.'
    },
    {
      id: 5,
      name: 'David Kim',
      position: 'Head of BI, StatTech',
      avatar: 'DK',
      rating: 5,
      text: 'The continuous support and expertise provided have been invaluable. We\'ve achieved data maturity levels we never thought possible.'
    }
  ];

  // BEGIN copied data and state from About for Benefits/Team sections
  const team = [
    {
      name: 'Masanneh',
      role: 'CEO & Co-Founder',
      bio: 'PhD in Data Science with 15+ years of experience in analytics and machine learning. Former head of data science at Fortune 500 companies.',
      image: '/Masanneh.jpg',
      expertise: ['Machine Learning', 'Big Data', 'Strategy'],
      social: {
        linkedin: 'https://linkedin.com/in/masanneh',
        twitter: 'https://twitter.com/masanneh_ds',
        email: 'masanneh@c-mer.org'
      }
    },
    {
      name: 'Nyima',
      role: 'CTO & Co-Founder',
      bio: 'Expert in cloud architecture and real-time analytics systems. Led development of analytics platforms serving millions of users.',
      image: '/Nyima.jpg',
      expertise: ['Cloud Computing', 'Real-time Analytics', 'System Architecture'],
      social: {
        linkedin: 'https://linkedin.com/in/nyima',
        github: 'https://github.com/nyima',
        email: 'nyima@c-mer.org'
      }
    },
    {
      name: 'Muhammed',
      role: 'Head of Education',
      bio: 'Educational psychologist specializing in adult learning and technical skill development. Published author on data literacy education.',
      image: '/Muhammed.jpg',
      expertise: ['Education Technology', 'Learning Design', 'Data Literacy'],
      social: {
        linkedin: 'https://linkedin.com/in/muhammed',
        researchgate: 'https://researchgate.net/profile/muhammed',
        email: 'muhammed@c-mer.org'
      }
    },
    {
      name: 'Veronica',
      role: 'Lead Data Scientist',
      bio: 'Expert in predictive modeling and business intelligence. Helped companies increase revenue by 40% through data-driven insights.',
      image: '/Veronica.jpg',
      expertise: ['Predictive Analytics', 'Business Intelligence', 'A/B Testing'],
      social: {
        linkedin: 'https://linkedin.com/in/veronica',
        twitter: 'https://twitter.com/veronica_ds',
        email: 'veronica@c-mer.org'
      }
    }
  ];


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
  const [activeBenefit, setActiveBenefit] = useState('insights');

    // const buttonClickeble = () => {
    //   console.log('button clicked');
    // }

    // const navi
  // END copied data/state

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) =>
        (prevIndex + 1) % testimonials.length
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div>
      {/* Hero Section - Full Screen with Video Background */}
      <section className="relative flex items-start overflow-hidden bg-gray-50 py-4 md:py-6">

        {/* Content */}
        <div className="relative z-10 container-max w-full mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Main Content & Some Features */}
            <div className="animate-fade-in text-black space-y-8">
              {/* Main Hero Content */}
              <div>
                <h1 className="text-4xl md:text-6xl lg:text-7x2 font-bold mb-6 drop-shadow-lg">
                  Center For Monitoring,
                  <span className="text-primary-600 font-extrabold"> Evaluation and Research</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-900 mb-8 leading-relaxed drop-shadow-md">
                C-MER | Centre for Monitoring, Evaluation and Research is a research consulting firm dedicated to providing cutting-edge research, monitoring, and evaluation services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/apply" className="btn-primary text-center text-lg px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white shadow-lg">
                    Get Started Today
                    <ArrowRight className="inline-block ml-2 h-6 w-6" />
                  </Link>
                  <button className="btn-secondary flex items-center justify-center text-lg px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 shadow-lg">
                    <Play className="h-6 w-6 mr-2" />
                    Watch Demo
                  </button>
                </div>
              </div>

              {/* Success Metrics - Left Side */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
                  <div className="text-sm text-gray-800 drop-shadow-sm">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-600 mb-2">98%</div>
                  <div className="text-sm text-gray-800 drop-shadow-sm">Client Satisfaction</div>
                </div>
              </div>

              {/* Customer Testimonials - Left Side (Rotating) */}
           
            </div>

            {/* Right Side - Service Boxes & Features */}
            <div className="animate-slide-in space-y-8">
              {/* Hero Boxes - Row Layout */}
              <div className="grid grid-cols-2 gap-4">
                {/* Box 1: Expertise */}
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white border-opacity-20">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-md flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">Expert Analytics</h3>
                  </div>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    Cutting-edge data analytics techniques for strategic business insights.
                  </p>
                </div>

                {/* Box 2: Training */}
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white border-opacity-20">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-secondary-100 rounded-md flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">Professional Training</h3>
                  </div>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    Industry expert-designed training programs for data analytics.
                  </p>
                </div>

                {/* Box 3: Results */}
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white border-opacity-20">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">Measurable Results</h3>
                  </div>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    Track and measure the impact of your data initiatives.
                  </p>
                </div>

                {/* Box 4: Support */}
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white border-opacity-20">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">Ongoing Support</h3>
                  </div>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    Continuous support for your data analytics journey.
                  </p>
                </div>
              </div>

              {/* Feature Highlights - Right Side */}
              {/* <div className="grid grid-cols-1 gap-4">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="text-black font-semibold">Lightning Fast</h4>
                  </div>
                  <p className="text-gray-700 text-sm">Real-time analytics processing with instant insights delivery.</p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-black font-semibold">99.9% Accuracy</h4>
                  </div>
                  <p className="text-gray-700 text-sm">Industry-leading accuracy in data analysis and predictions.</p>
                </div>
              </div> */}

              {/* Progress Indicators - Right Side */}
              {/* <div className="grid grid-cols-1 gap-4">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white text-sm font-medium">Data Processing Speed</span>
                    <span className="text-primary-300 text-sm font-bold">95%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white text-sm font-medium">Client Satisfaction</span>
                    <span className="text-secondary-300 text-sm font-bold">98%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
              </div> */}

              {/* Remaining Achievement Badges - Right Side */}
              <div className="flex flex-wrap gap-3">
                <div className="bg-gradient-to-r from-green-500 to-teal-600 text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  ⚡ 99.9% Uptime
                </div>
                <div className="bg-gradient-to-r from-red-500 to-pink-600 text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  🚀 ISO 27001 Certified
                </div>
              </div>

              {/* Trusted by Leading Companies - Container */}
              <div className="from-blue-50 to-purple-50 rounded-xl p-6">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-black mb-2 drop-shadow-lg">Trusted by Leading Companies</h4>
                  <p className="text-sm text-gray-900 drop-shadow-md">Join thousands of organizations that trust our analytics solutions</p>
                </div>

                <div className="relative overflow-hidden rounded-lg bg-opacity-90 p-4">
                  <div className="flex animate-scroll">
                    {/* First set of logos */}
                    <div className="flex space-x-6 min-w-max items-center">
                      <img src="https://ui-avatars.com/api/?name=TechCorp&background=7b5aa5&color=ffffff&size=64" alt="TechCorp" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                      <img src="https://ui-avatars.com/api/?name=DataFlow&background=ef4444&color=ffffff&size=64" alt="DataFlow" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                      <img src="https://ui-avatars.com/api/?name=Analytics+Pro&background=7b5aa5&color=ffffff&size=64" alt="Analytics Pro" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                      <img src="https://ui-avatars.com/api/?name=Insight+Labs&background=ef4444&color=ffffff&size=64" alt="Insight Labs" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                      <img src="https://ui-avatars.com/api/?name=DataWise&background=7b5aa5&color=ffffff&size=64" alt="DataWise" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                      <img src="https://ui-avatars.com/api/?name=StatTech&background=ef4444&color=ffffff&size=64" alt="StatTech" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                      <img src="https://ui-avatars.com/api/?name=InfoMetrics&background=7b5aa5&color=ffffff&size=64" alt="InfoMetrics" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                      <img src="https://ui-avatars.com/api/?name=QuantData&background=ef4444&color=ffffff&size=64" alt="QuantData" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Duplicate set for seamless scrolling */}
                    <div className="flex space-x-6 min-w-max items-center">
                      <img src="https://ui-avatars.com/api/?name=TechCorp&background=7b5aa5&color=ffffff&size=64" alt="TechCorp" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                      <img src="https://ui-avatars.com/api/?name=DataFlow&background=ef4444&color=ffffff&size=64" alt="DataFlow" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                      <img src="https://ui-avatars.com/api/?name=Analytics+Pro&background=7b5aa5&color=ffffff&size=64" alt="Analytics Pro" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                      <img src="https://ui-avatars.com/api/?name=Insight+Labs&background=ef4444&color=ffffff&size=64" alt="Insight Labs" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                      <img src="https://ui-avatars.com/api/?name=DataWise&background=7b5aa5&color=ffffff&size=64" alt="DataWise" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                      <img src="https://ui-avatars.com/api/?name=StatTech&background=ef4444&color=ffffff&size=64" alt="StatTech" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                      <img src="https://ui-avatars.com/api/?name=InfoMetrics&background=7b5aa5&color=ffffff&size=64" alt="InfoMetrics" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                      <img src="https://ui-avatars.com/api/?name=QuantData&background=ef4444&color=ffffff&size=64" alt="QuantData" className="h-12 w-auto rounded opacity-60 hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <p className="text-xs text-gray-200 drop-shadow-sm">and many more trusted partners worldwide</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section (exact from About) */}
      <section className="pt-4 pb-10 sm:pt-6 sm:pb-12 lg:pt-8 lg:pb-14 bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                  C-MER specializes in comprehensive research, monitoring, and evaluation services across multiple development sectors
                </p>
          </div>

          <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-8 justify-center items-center mt-0 md:mt-0">
            {/* Social Development - raised */}
            <div className="group relative lg:-translate-y-16">
              <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-xl min-h-[140px] sm:min-h-[160px] max-w-sm">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-3 shadow-lg">
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
            <div className="group relative lg:translate-y-10">
              <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-xl min-h-[140px] sm:min-h-[160px] max-w-sm">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl mb-3 shadow-lg">
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
            <div className="group relative lg:-translate-y-14">
              <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-xl min-h-[140px] sm:min-h-[160px] max-w-sm">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-3 shadow-lg">
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
            <div className="group relative lg:translate-y-14">
              <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-xl min-h-[140px] sm:min-h-[160px] max-w-sm">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl mb-3 shadow-lg">
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
            <div className="group relative lg:-translate-y-12">
              <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-xl min-h-[140px] sm:min-h-[160px] max-w-sm">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-3 shadow-lg">
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
            <div className="group relative lg:translate-y-16">
              <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-xl min-h-[140px] sm:min-h-[160px] max-w-sm">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl mb-3 shadow-lg">
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

      {/* Benefits We Offer Section (exact from About) */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
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
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <button
                    key={benefit.id}
                    onClick={() => setActiveBenefit(benefit.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      activeBenefit === benefit.id
                        ? 'border-2 border-gray-300'
                        : 'border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        index % 2 === 0 
                          ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white' 
                          : 'bg-gradient-to-br from-secondary-500 to-secondary-600 text-white'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${activeBenefit === benefit.id ? 'text-gray-900' : 'text-gray-900'}`}>{benefit.title}</h4>
                        <p className={`text-sm ${activeBenefit === benefit.id ? 'text-gray-700' : 'text-gray-600'}`}>{benefit.shortDesc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Benefit Details */}
            <div className="md:col-span-2 lg:col-span-2">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                    {React.createElement(benefits.find(b => b.id === activeBenefit)?.icon || Search, { className: 'w-7 h-7 sm:w-8 sm:h-8 text-white' })}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{benefits.find(b => b.id === activeBenefit)?.title}</h3>
                    <div className="w-12 h-1 sm:w-16 bg-gray-300 rounded-full"></div>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">{benefits.find(b => b.id === activeBenefit)?.fullDesc}</p>

                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Key Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {benefits.find(b => b.id === activeBenefit)?.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${index % 2 === 0 ? 'bg-primary-500' : 'bg-secondary-500'}`}></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button className="bg-black text-white font-semibold py-3 px-6 sm:py-3 sm:px-8 rounded-lg hover:bg-gray-900 active:scale-95 transition-all duration-300 touch-manipulation">
                    <span className="text-sm sm:text-base">Explore {benefits.find(b => b.id === activeBenefit)?.title}</span>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Horizontal Row with Enhanced Photos */}
      <section>
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg sm:text-xl text-gray-600">Industry experts dedicated to your success</p>
          </div>

          {/* Team Row - Horizontal Layout */}
          <div className="flex space-x-6 lg:space-x-8 overflow-x-auto px-2 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {team.map((member, index) => (
              <div
                key={member.name}
                className="flex-shrink-0 w-80 sm:w-96 bg-white rounded-t-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
              >
                {/* Large Photo Section */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Social Icons - Overlay on image */}
                  <div className="absolute bottom-4 left-4 flex space-x-3">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors" title="LinkedIn">
                        <Linkedin className="w-5 h-5 text-gray-700" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors" title="Twitter">
                        <Twitter className="w-5 h-5 text-gray-700" />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors" title="GitHub">
                        <Github className="w-5 h-5 text-gray-700" />
                      </a>
                    )}
                    {member.social.email && (
                      <a href={`mailto:${member.social.email}`} className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors" title="Email">
                        <Mail className="w-5 h-5 text-gray-700" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-3"></div>
                  <p className="text-primary-600 font-semibold text-base sm:text-lg mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                  
                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                  <a href="#" className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors" title="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors" title="Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors" title="Email">
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
          <div className="border-t border-gray-800 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 C-MER. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
