import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart3, Users, FolderOpen, BookOpen, Send } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: BarChart3 },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Apply', href: '/apply', icon: Send },
  ];

  const isActive = (href: string) => location.pathname === href;
  const isHomePage = location.pathname === '/';

  return (
    <div className={`min-h-screen bg-gray-50`}>
      {/* Navigation Header */}
      <header className={`sticky top-0 z-[100] mx-4 my-2 transition-all duration-300 bg-transparent`}>
        <div className="container-max">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/c-mer.png"
                alt="Company logo"
                className="h-30 w-30 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-md text-lg font-semibold transition-colors duration-200 ${
                      isActive(item.href)
                        ? isHomePage
                          ? 'text-black bg-white/30'
                          : 'text-primary-800 bg-primary-50'
                        : isHomePage
                          ? 'text-black hover:text-black hover:bg-white/20'
                          : 'text-primary-700 hover:text-primary-800 hover:bg-primary-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="tracking-wide">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              className={`md:hidden p-2 rounded-md transition-colors duration-200 ${
                isHomePage
                  ? 'text-black hover:text-black hover:bg-white/20'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className={`md:hidden border-t z-[100] ${
              isHomePage ? 'border-white border-opacity-30' : 'border-gray-200'
            }`}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-md text-lg font-semibold transition-colors duration-200 ${
                        isActive(item.href)
                          ? isHomePage
                            ? 'text-black bg-white/30'
                            : 'text-primary-800 bg-primary-50'
                          : isHomePage
                            ? 'text-black hover:text-black hover:bg-white/20'
                            : 'text-primary-700 hover:text-primary-800 hover:bg-primary-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-6 w-6" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-16 md:pb-0">
        {children}
      </main>

      {/* Bottom Tab Navigation - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] shadow-2xl border-t-2 border-gray-200">
        <div className={`grid grid-cols-5 h-16 ${
          isHomePage ? 'bg-black bg-opacity-30 backdrop-blur-lg border-white border-opacity-30' : 'bg-white'
        }`}>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isItemActive = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center justify-center py-2 px-1 transition-all duration-200 ${
                  isItemActive
                    ? isHomePage
                      ? 'text-white bg-white bg-opacity-30 rounded-lg mx-1 my-1'
                      : 'text-primary-600 bg-primary-50 rounded-lg mx-1 my-1'
                    : isHomePage
                      ? 'text-white hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg mx-1 my-1'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg mx-1 my-1'
                }`}
              >
                <Icon className={`h-6 w-6 mb-1 ${
                  isItemActive
                    ? isHomePage
                      ? 'text-white'
                      : 'text-primary-600'
                    : isHomePage
                      ? 'text-white'
                      : 'text-gray-700'
                }`} />
                <span className={`text-xs font-medium ${
                  isItemActive
                    ? isHomePage
                      ? 'text-white'
                      : 'text-primary-600'
                    : isHomePage
                      ? 'text-white'
                      : 'text-gray-700'
                }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
