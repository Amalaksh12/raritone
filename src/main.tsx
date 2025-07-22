'use client';

import React, { useState, useEffect, memo } from 'react';
import { Search, ShoppingBag, User, Menu, X, Heart, ArrowLeft, Camera, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/LoginModal';

interface NavbarProps {
  onSearchOpen: () => void;
  onCartOpen: () => void;
  pageTitle?: string;
  showBackButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = memo(({ onSearchOpen, onCartOpen, pageTitle, showBackButton = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, cart, logout } = useAuth();

  // Only enable scroll animations on homepage
  const isHomepage = location.pathname === '/';

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navbar visibility on scroll
  useEffect(() => {
    if (!isHomepage) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

  // Close menu when clicking outside or on route change
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        const target = event.target as Element;
        if (!target.closest('[data-menu-container]')) {
          setIsMenuOpen(false);
        }
      }
    };

    // Load wishlist count from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistCount(JSON.parse(savedWishlist).length);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Update wishlist count when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistCount(JSON.parse(savedWishlist).length);
      } else {
        setWishlistCount(0);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlistUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleStorageChange);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleProfileClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
    if (user) {
      setIsProfileOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleMenuClick = () => {
    if (isProfileOpen) setIsProfileOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  const menuItems = [
    { label: 'Shop', path: '/catalog', icon: ShoppingBag },
    { label: 'Body Scan', path: '/scan', icon: Camera },
    { label: 'Settings', path: '/settings', icon: Settings }
  ];

  return (
    <>
      {/* FUTURISTIC TECH NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-500 tech-navbar ${
          isHomepage ? (isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0') : 'translate-y-0 opacity-100'
        }`}
        data-menu-container
        style={{ 
          background: 'rgba(249, 246, 237, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(8, 60, 48, 0.1)',
          boxShadow: '0 4px 20px rgba(8, 60, 48, 0.08)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left - Back Button or Menu */}
            <div className="flex items-center w-32 sm:w-40">
              {showBackButton ? (
                <button
                  onClick={handleBackClick}
                  className="flex items-center space-x-3 px-6 py-3 transition-all duration-300 rounded-2xl hover:bg-white/50 min-h-[48px] tech-nav-button"
                >
                  <ArrowLeft size={22} className="text-[#083C30]" />
                  {!isMobile && <span className="text-sm font-medium font-['Urbanist']" style={{ color: '#083C30' }}>Back</span>}
                </button>
              ) : (
                <button
                  onClick={handleMenuClick}
                  className="flex items-center space-x-3 px-6 py-3 transition-all duration-300 rounded-2xl hover:bg-white/50 relative min-h-[48px] tech-nav-button"
                >
                  {/* Hamburger to Cross Animation */}
                  <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                    <span
                      className={`absolute w-5 h-0.5 bg-[#083C30] rounded-full transition-all duration-300 ${
                        isMenuOpen ? 'rotate-45' : '-translate-y-1'
                      }`}
                    />
                    <span
                      className={`absolute w-5 h-0.5 bg-[#083C30] rounded-full transition-all duration-300 ${
                        isMenuOpen ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    <span
                      className={`absolute w-5 h-0.5 bg-[#083C30] rounded-full transition-all duration-300 ${
                        isMenuOpen ? '-rotate-45' : 'translate-y-1'
                      }`}
                    />
                  </div>
                  
                  {!isMobile && (
                    <span className="text-sm font-medium font-['Urbanist']" style={{ color: '#083C30' }}>
                      {isMenuOpen ? 'Close' : 'Menu'}
                    </span>
                  )}
                </button>
              )}
            </div>

            {/* Center - Logo or Page Title */}
            <div className="flex-1 flex justify-center items-center relative">
              {pageTitle ? (
                <div
                  className="relative cursor-pointer flex items-center justify-center h-20 w-full max-w-md"
                  onClick={handleTitleClick}
                >
                  <h1 className="font-medium text-xl sm:text-2xl font-['Urbanist'] transition-all duration-300" style={{ color: '#083C30' }}>
                    {pageTitle}
                  </h1>
                </div>
              ) : (
                <img
                  src="/IMG-20250305-WA0003-removebg-preview.png"
                  alt="RARITONE"
                  className="cursor-pointer transition-all duration-300 brand-logo"
                  onClick={() => navigate('/')}
                  style={{
                    height: isMobile ? '56px' : '72px',
                    width: 'auto',
                    maxWidth: isMobile ? '240px' : '360px',
                    objectFit: 'contain'
                  }}
                />
              )}
            </div>

            {/* Right - Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 w-32 sm:w-40 justify-end">
              <button
                onClick={onSearchOpen}
                className="tech-nav-icon transition-all duration-300 p-3 rounded-2xl hover:bg-white/50 min-h-[48px] min-w-[48px] flex items-center justify-center hover:scale-105"
              >
                <Search size={22} />
              </button>
              
              <button 
                onClick={() => navigate('/wishlist')}
                className="relative tech-nav-icon transition-all duration-300 p-3 rounded-2xl hover:bg-white/50 min-h-[48px] min-w-[48px] flex items-center justify-center hover:scale-105"
              >
                <Heart size={22} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium" style={{ backgroundColor: '#083C30' }}>
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate('/cart')}
                className="relative tech-nav-icon transition-all duration-300 p-3 rounded-2xl hover:bg-white/50 min-h-[48px] min-w-[48px] flex items-center justify-center hover:scale-105"
              >
                <ShoppingBag size={22} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium" style={{ backgroundColor: '#083C30' }}>
                    {cartItemsCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={handleProfileClick}
                className="tech-nav-icon transition-all duration-300 p-3 rounded-2xl hover:bg-white/50 min-h-[48px] min-w-[48px] flex items-center justify-center hover:scale-105"
              >
                <User size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Glass Dropdown Menu */}
        {isMenuOpen && (
          <div className="mt-2 mx-6 animate-fade-in-up" style={{
            background: 'rgba(8, 60, 48, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(220, 208, 168, 0.4)',
            borderRadius: '1.5rem',
            boxShadow: '0 20px 60px rgba(8, 60, 48, 0.4)'
          }}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 sm:py-8">
              <div className="flex justify-center gap-6 sm:gap-12 flex-wrap">
                {menuItems.map((item, index) => (
                  <div key={item.label} className="transition-all duration-300">
                    <button
                      onClick={() => {
                        navigate(item.path);
                        setIsMenuOpen(false);
                      }}
                      className="text-center transition-all duration-300 flex flex-col items-center px-4 py-6 sm:px-6 sm:py-8 space-y-3 sm:space-y-4 rounded-2xl hover:bg-white/20 hover:scale-105 hover-lift animate-slide-in-right"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(220, 208, 168, 0.2)' }}>
                        <item.icon size={24} style={{ color: 'rgb(220, 208, 168)' }} />
                      </div>
                      <span className="font-medium text-sm sm:text-base font-['Urbanist'] text-white">{item.label}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Profile Sidebar */}
      {isProfileOpen && user && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsProfileOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full z-50 w-full max-w-md rounded-l-2xl transition-none animate-slide-in-right" style={{
            background: 'rgba(249, 246, 237, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(8, 60, 48, 0.1)',
            boxShadow: '0 20px 60px rgba(8, 60, 48, 0.15)'
          }}>
            <div className="p-6 sm:p-8 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl sm:text-2xl font-medium font-['Urbanist']" style={{ color: '#083C30' }}>
                  Profile
                </h2>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="transition-all duration-300 p-3 rounded-2xl hover:bg-white/20 min-h-[48px] min-w-[48px] flex items-center justify-center hover:scale-105 tech-close-btn"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-8">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-6">
                  <div className="rounded-full flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 tech-profile-avatar">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User size={24} className="text-[#083C30]" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg sm:text-xl font-['Urbanist']" style={{ color: '#083C30' }}>
                      {user.displayName || 'User'}
                    </h3>
                    <p className="text-sm sm:text-base font-['Urbanist']" style={{ color: '#A7CBB8' }}>
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                {[
                  { label: 'Profile Info', path: '/profile' },
                  { label: 'Order History', path: '/orders' },
                  { label: 'Saved Items', path: '/wishlist' },
                ].map((action, index) => (
                  <button
                    key={action.label}
                    onClick={() => {
                      navigate(action.path);
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left rounded-2xl transition-all duration-300 hover:bg-white/20 hover:scale-102 px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base font-['Urbanist'] hover-lift animate-fade-in-up tech-profile-btn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {action.label}
                  </button>
                ))}
                
                <button
                  onClick={() => {
                    logout();
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left text-red-600 hover:bg-red-50 border-2 border-red-600 rounded-2xl transition-all duration-300 hover:scale-102 px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base font-['Urbanist'] hover-lift animate-fade-in-up"
                  style={{ animationDelay: '0.4s' }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;