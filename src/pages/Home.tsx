import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

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
      <section className="min-h-screen relative flex items-center overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/webbg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 container-max w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Main Content & Some Features */}
            <div className="animate-fade-in text-white space-y-8">
              {/* Main Hero Content */}
              <div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
                  Transform Data into
                  <span className="text-primary-300"> Actionable Insights</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-100 mb-8 leading-relaxed drop-shadow-md">
                  Empower your organization with comprehensive data analytics education and evaluation services.
                  Turn complex data into strategic advantages with our expert-led programs.
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
                  <div className="text-3xl font-bold text-primary-300 mb-2">500+</div>
                  <div className="text-sm text-gray-200 drop-shadow-sm">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-300 mb-2">98%</div>
                  <div className="text-sm text-gray-200 drop-shadow-sm">Client Satisfaction</div>
                </div>
              </div>

              {/* Customer Testimonials - Left Side (Rotating) */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4 transition-all duration-500 ease-in-out">
                    <span className="text-white font-bold text-lg">{testimonials[currentTestimonialIndex].avatar}</span>
                  </div>
                  <div className="transition-all duration-500 ease-in-out">
                    <div className="text-white font-semibold">{testimonials[currentTestimonialIndex].name}</div>
                    <div className="text-gray-300 text-sm">{testimonials[currentTestimonialIndex].position}</div>
                  </div>
                  <div className="ml-auto">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(testimonials[currentTestimonialIndex].rating)}
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-100 italic text-lg leading-relaxed transition-all duration-500 ease-in-out">
                  "{testimonials[currentTestimonialIndex].text}"
                </blockquote>

                {/* Testimonial Indicators */}
                <div className="flex justify-center space-x-2 mt-4">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonialIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonialIndex
                          ? 'bg-white scale-125'
                          : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                      }`}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
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
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">Lightning Fast</h4>
                  </div>
                  <p className="text-gray-200 text-sm">Real-time analytics processing with instant insights delivery.</p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">99.9% Accuracy</h4>
                  </div>
                  <p className="text-gray-200 text-sm">Industry-leading accuracy in data analysis and predictions.</p>
                </div>
              </div>

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
                <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  ⚡ 99.9% Uptime
                </div>
                <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  🚀 ISO 27001 Certified
                </div>
              </div>

              {/* Trusted by Leading Companies - Container */}
              <div className="from-blue-50 to-purple-50 rounded-xl p-6">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Trusted by Leading Companies</h4>
                  <p className="text-sm text-gray-100 drop-shadow-md">Join thousands of organizations that trust our analytics solutions</p>
                </div>

                <div className="relative overflow-hidden rounded-lg bg-opacity-90 p-4">
                  <div className="flex animate-scroll">
                    {/* First set of logos */}
                    <div className="flex space-x-4 min-w-max">
                      <div className="flex items-center justify-center w-24 h-10 bg-primary-100 text-primary-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        TechCorp
                      </div>
                      <div className="flex items-center justify-center w-24 h-10 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        DataFlow
                      </div>
                      <div className="flex items-center justify-center w-24 h-10 bg-green-100 text-green-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        Analytics Pro
                      </div>
                      <div className="flex items-center justify-center w-24 h-10 bg-purple-100 text-purple-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        Insight Labs
                      </div>
                      <div className="flex items-center justify-center w-24 h-10 bg-blue-100 text-blue-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        DataWise
                      </div>
                      <div className="flex items-center justify-center w-24 h-10 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        StatTech
                      </div>
                      <div className="flex items-center justify-center w-24 h-10 bg-orange-100 text-orange-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        InfoMetrics
                      </div>
                      <div className="flex items-center justify-center w-24 h-10 bg-pink-100 text-pink-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        QuantData
                      </div>
                    </div>

                    {/* Duplicate set for seamless scrolling */}
                    <div className="flex space-x-4 min-w-max">
                      <div className="flex items-center justify-center w-24 h-10 bg-primary-100 text-primary-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        TechCorp
                      </div>
                      <div className="flex items-center justify-center w-24 h-10 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        DataFlow
                      </div>
                      <div className="flex items-center justify-center w-24 h-10 bg-green-100 text-green-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        Analytics Pro
                      </div>
                      <div className="flex items-center justify-center w-24 h-10 bg-purple-100 text-purple-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        Insight Labs
                      </div>
                      <div className="flex items-center justify-center w-24 h-10 bg-blue-100 text-blue-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        DataWise
                      </div>
                      <div className="flex items-center justify-center w-24 h-10 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        StatTech
                      </div>
                      <div className="flex items-center justify-center w-24 h-10 bg-orange-100 text-orange-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        InfoMetrics
                      </div>
                      <div className="flex items-center justify-center w-24 h-10 bg-pink-100 text-pink-700 rounded-full text-sm font-medium px-4 shadow-sm">
                        QuantData
                      </div>
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
    </div>
  );
};

export default Home;
