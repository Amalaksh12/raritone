'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ShoppingBag, Shield, Zap, Clock, Star, TrendingUp, Mail, Phone, MapPin, Heart, Sparkles, Cpu, Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SearchOverlay from '@/components/SearchOverlay';
import ChatWidget from '@/components/ChatWidget';
import ProductModal from '@/components/ProductModal';
import AddToCartToast from '@/components/AddToCartToast';
import ButterflyScene from '@/components/ButterflyScene';
import { useToast } from '@/components/ToastContainer';
import { useAuth } from '@/contexts/AuthContext';
import { addToCart } from '@/lib/user';

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showCartToast, setShowCartToast] = useState(false);
  const [cartToastItem, setCartToastItem] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, refreshCart, addToLocalCart } = useAuth();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load wishlist
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Categories (3 main categories)
  const categories = [
    { 
      name: "T-Shirts", 
      image: "Raritone Collection/Bold vibe Oversize Tshirt.jpg", 
      count: "15 Items", 
      category: "Tops" 
    },
    { 
      name: "Hoodies", 
      image: "Raritone Collection/Hoddie1(F).jpg", 
      count: "8 Items", 
      category: "Outerwear" 
    },
    { 
      name: "Premium", 
      image: "Raritone Collection/Kiss me again.jpeg", 
      count: "12 Items", 
      category: "Premium" 
    }
  ];

  // Tech Features
  const techFeatures = [
    {
      icon: <Cpu className="w-8 h-8 text-[#014737]" />,
      title: "AI-Powered Fit",
      description: "Advanced algorithms analyze your body measurements for perfect sizing recommendations."
    },
    {
      icon: <Eye className="w-8 h-8 text-[#014737]" />,
      title: "3D Try-On",
      description: "Visualize how clothes look on you with our cutting-edge virtual fitting technology."
    },
    {
      icon: <Shield className="w-8 h-8 text-[#014737]" />,
      title: "Privacy First",
      description: "Your body data is processed locally and never stored on our servers."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#014737]" />,
      title: "Made in India",
      description: "Proudly crafted with premium materials and traditional Indian craftsmanship."
    }
  ];

  // Customer Reviews Data
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "The AI body scan is incredible! Perfect fit every time.",
      avatar: "PS"
    },
    {
      id: 2,
      name: "Arjun Patel",
      rating: 5,
      comment: "Amazing quality and the virtual try-on saved me so much time.",
      avatar: "AP"
    },
    {
      id: 3,
      name: "Sneha Reddy",
      rating: 5,
      comment: "Love the personalized recommendations. Best fashion app!",
      avatar: "SR"
    },
    {
      id: 4,
      name: "Vikram Singh",
      rating: 5,
      comment: "Revolutionary technology. Never buying clothes without this again.",
      avatar: "VS"
    }
  ];

  // Navigate to catalog with category filter
  const handleCategoryClick = (category: string) => {
    navigate(`/catalog?category=${encodeURIComponent(category)}`);
  };

  // Handle add to cart from modal
  const handleAddToCart = async (product: any, quantity: number, size?: string, color?: string) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size,
      imageURL: product.image
    };

    if (user) {
      try {
        await addToCart(user.uid, cartItem);
        await refreshCart();
      } catch (error) {
        console.error('Error adding to cart:', error);
        showToast({
          type: 'error',
          title: 'Error',
          message: 'Failed to add item to cart. Please try again.'
        });
        return;
      }
    } else {
      addToLocalCart(cartItem);
    }

    setCartToastItem(cartItem);
    setShowCartToast(true);
  };

  // Handle add to wishlist
  const handleAddToWishlist = (productId: string) => {
    const currentWishlist = [...wishlist];
    if (!currentWishlist.includes(productId)) {
      currentWishlist.push(productId);
      setWishlist(currentWishlist);
      localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
      
      window.dispatchEvent(new Event('wishlistUpdated'));
      
      showToast({
        type: 'success',
        title: 'Added to Wishlist',
        message: 'Item has been saved to your wishlist!'
      });
    } else {
      const updatedWishlist = currentWishlist.filter(id => id !== productId);
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
      window.dispatchEvent(new Event('wishlistUpdated'));
      
      showToast({
        type: 'info',
        title: 'Removed from Wishlist',
        message: 'Item has been removed from your wishlist.'
      });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f3e9' }}>
      {/* Navigation */}
      <Navbar 
        onSearchOpen={() => setIsSearchOpen(true)}
        onCartOpen={() => {}}
      />

      {/* ENHANCED HERO SECTION WITH PROMINENT BUTTERFLY WINGS */}
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#F9F6ED' }}>
        {/* Enhanced Butterfly Background - More Visible */}
        <div className="absolute inset-0 w-full h-full" style={{ transform: 'scale(1.2)', zIndex: 1 }}>
          <ButterflyScene />
        </div>
        
        {/* Subtle backdrop for logo contrast */}
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(249, 246, 237, 0.3) 0%, transparent 70%)',
          zIndex: 2 
        }} />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-8" style={{ zIndex: 3 }}>
          <div className="p-8 sm:p-12 lg:p-16 animate-fade-in-up">
            {/* Logo */}
            <div className="mb-12 relative">
              {/* Logo backdrop for contrast */}
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl transform scale-110" />
              <img
                src="/IMG-20250305-WA0003-removebg-preview.png"
                alt="RARITONE"
                className="relative mx-auto w-full max-w-sm sm:max-w-3xl h-auto gentle-float brand-logo"
                style={{ 
                  filter: 'drop-shadow(0 0 40px rgba(8, 60, 48, 0.4)) drop-shadow(0 0 80px rgba(167, 203, 184, 0.3))',
                }}
              />
            </div>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl font-light mb-16 opacity-90 animate-slide-in-right" style={{ color: '#083C30' }}>
              Fashion Meets Technology
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-16 animate-scale-in">
              <button
                className="tech-cta-primary font-medium flex items-center space-x-3 justify-center w-full max-w-xs sm:min-w-[260px] px-10 py-5 sm:px-12 sm:py-6 text-sm sm:text-base hover-lift"
                onClick={() => navigate('/scan')}
              >
                <Camera size={isMobile ? 18 : 20} />
                <span>Start Body Scan</span>
              </button>
              
              <button
                className="tech-cta-secondary font-medium flex items-center space-x-3 justify-center w-full max-w-xs sm:min-w-[260px] px-10 py-5 sm:px-12 sm:py-6 text-sm sm:text-base hover-lift"
                onClick={() => navigate('/catalog')}
              >
                <ShoppingBag size={isMobile ? 18 : 20} />
                <span>Browse Collection</span>
              </button>
            </div>

            {/* Privacy Notice */}
            <div className="max-w-lg mx-auto animate-fade-in-up">
              <div className="tech-privacy-card p-5 text-center">
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#083C30' }}>
                  This site uses webcam access to enable AI-powered try-ons. Your camera data is never stored or shared.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TECH FEATURES SECTION */}
      <section className="py-12 sm:py-20" style={{ backgroundColor: '#F9F6ED' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 flex items-center justify-center" style={{ color: '#083C30' }}>
              <Zap className="mr-4" size={isMobile ? 28 : 36} color="#083C30" />
              Revolutionary Technology
            </h2>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto px-4" style={{ color: '#A7CBB8' }}>
              Experience the future of fashion with our cutting-edge AI technology and precision fitting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {techFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="tech-feature-card hover-lift animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center tech-icon-bg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#083C30' }}>{feature.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: '#A7CBB8' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY SECTION */}
      <section className="py-12 sm:py-20" style={{ backgroundColor: 'rgba(167, 203, 184, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 flex items-center justify-center" style={{ color: '#083C30' }}>
              <TrendingUp className="mr-4" size={isMobile ? 28 : 36} color="#083C30" />
              Shop by Category
            </h2>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto px-4" style={{ color: '#A7CBB8' }}>
              Discover our curated collection of premium fashion categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                onClick={() => handleCategoryClick(category.category)}
              >
                <div className="tech-category-card hover-lift">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#083C30]/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-medium text-white text-lg sm:text-xl font-['Urbanist'] mb-1">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-sm font-['Urbanist']">
                        {category.count}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEW SLIDER SECTION */}
      <section className="py-12 sm:py-20 overflow-hidden" style={{ backgroundColor: '#F9F6ED' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 flex items-center justify-center" style={{ color: '#083C30' }}>
              <Star className="mr-4" size={isMobile ? 28 : 36} color="#083C30" />
              What Our Customers Say
            </h2>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto px-4" style={{ color: '#A7CBB8' }}>
              Join thousands of satisfied customers who love our AI-powered fashion experience.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="review-slider flex space-x-6">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="flex-shrink-0 w-80 tech-testimonial-card mx-4"
              >
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold mr-4 font-['Urbanist']" style={{ backgroundColor: '#083C30' }}>
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold font-['Urbanist']" style={{ color: '#083C30' }}>{review.name}</h4>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#083C30" color="#083C30" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic font-['Urbanist'] leading-relaxed" style={{ color: '#A7CBB8' }}>"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="tech-footer" style={{ background: 'linear-gradient(135deg, #F9F6ED 0%, #083C30 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <img
                src="/IMG-20250305-WA0003-removebg-preview.png"
                alt="RARITONE"
                className="h-16 sm:h-20 w-auto mb-6"
              />
              <p className="text-white/80 max-w-md leading-relaxed text-sm sm:text-base font-['Urbanist'] mb-6">
                Revolutionizing fashion with AI-powered body scanning technology. 
                Experience perfect fit and personalized style recommendations across India.
              </p>
              
              {/* Newsletter Signup */}
              <div className="tech-newsletter-section max-w-md">
                <h4 className="font-semibold text-white mb-3 font-['Urbanist']">Stay Updated</h4>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 tech-newsletter-input text-sm"
                  />
                  <button className="tech-newsletter-btn px-4 py-2 text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white mb-6 text-lg font-['Urbanist']">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="/about" className="text-white/70 hover:text-white text-sm sm:text-base transition-all duration-300 font-['Urbanist']">About Us</a></li>
                <li><a href="/contact" className="text-white/70 hover:text-white text-sm sm:text-base transition-all duration-300 font-['Urbanist']">Contact</a></li>
                <li><a href="/faqs" className="text-white/70 hover:text-white text-sm sm:text-base transition-all duration-300 font-['Urbanist']">FAQ</a></li>
                <li><a href="/quick-links" className="text-white/70 hover:text-white text-sm sm:text-base transition-all duration-300 font-['Urbanist']">Privacy Policy</a></li>
                <li><a href="/returns" className="text-white/70 hover:text-white text-sm sm:text-base transition-all duration-300 font-['Urbanist']">Returns & Exchanges</a></li>
                <li><a href="/terms" className="text-white/70 hover:text-white text-sm sm:text-base transition-all duration-300 font-['Urbanist']">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-white mb-6 text-lg font-['Urbanist']">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Mail size={16} className="text-white" />
                  </div>
                  <span className="text-white/80 text-sm sm:text-base font-['Urbanist']">
                    hello@raritone.in
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Phone size={16} className="text-white" />
                  </div>
                  <span className="text-white/80 text-sm sm:text-base font-['Urbanist']">
                    +91 98765 43210
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <span className="text-white/80 text-sm sm:text-base font-['Urbanist']">
                    Mumbai, India
                  </span>
                </div>
              </div>

              {/* Social Icons */}
              <div className="mt-6">
                <h4 className="font-semibold text-white mb-3 font-['Urbanist']">Follow Us</h4>
                <div className="flex space-x-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#083C30] transition-all duration-300 text-white">
                    <span className="text-sm font-bold">IG</span>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#083C30] transition-all duration-300 text-white">
                    <span className="text-sm font-bold">X</span>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#083C30] transition-all duration-300 text-white">
                    <span className="text-sm font-bold">LI</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="elegant-divider"></div>
          
          <div className="text-center">
            <p className="text-white/60 text-xs sm:text-sm font-['Urbanist']">
              © 2025 RARITONE. All rights reserved. | Powered by AI Fashion Technology | Made in India with ❤️
            </p>
          </div>
        </div>
      </footer>

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />

      {/* Add to Cart Toast */}
      <AddToCartToast
        isOpen={showCartToast}
        onClose={() => setShowCartToast(false)}
        item={cartToastItem}
        onViewCart={() => {
          setShowCartToast(false);
          navigate('/cart');
        }}
        onCheckout={() => {
          setShowCartToast(false);
          navigate('/cart');
        }}
      />

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;