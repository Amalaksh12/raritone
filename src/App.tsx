import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Scan from './pages/Scan';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import Terms from './pages/Terms';
import Returns from './pages/Returns';
import Shipping from './pages/Shipping';
import QuickLinks from './pages/QuickLinks';
import Reviews from './pages/Reviews';
import NotFound from './pages/NotFound';
import SearchOverlay from './components/SearchOverlay';
import ChatWidget from './components/ChatWidget';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index onSearchOpen={() => setIsSearchOpen(true)} />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/quick-links" element={<QuickLinks />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
      
      <ChatWidget />
    </div>
  );
}

export default App;