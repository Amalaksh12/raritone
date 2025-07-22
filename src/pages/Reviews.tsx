import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, User, Calendar, ThumbsUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ToastContainer';
import Navbar from '@/components/Navbar';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

const Reviews = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);

  // Mock reviews data
  const mockReviews: Review[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Priya Sharma',
      rating: 5,
      title: 'Amazing AI Technology!',
      comment: 'The body scan feature is incredible. Perfect fit every time and the quality is outstanding. Highly recommend!',
      date: '2024-12-15',
      helpful: 12,
      verified: true
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Arjun Patel',
      rating: 5,
      title: 'Revolutionary Shopping Experience',
      comment: 'Never thought online shopping could be this accurate. The virtual try-on saved me so much time and hassle.',
      date: '2024-12-10',
      helpful: 8,
      verified: true
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Sneha Reddy',
      rating: 4,
      title: 'Great Quality, Fast Delivery',
      comment: 'Love the personalized recommendations. The AI really understands my style preferences. Minor issue with delivery timing.',
      date: '2024-12-05',
      helpful: 5,
      verified: false
    },
    {
      id: '4',
      userId: 'user4',
      userName: 'Vikram Singh',
      rating: 5,
      title: 'Best Fashion App Ever!',
      comment: 'The technology is mind-blowing. Perfect measurements, great quality clothes, and excellent customer service.',
      date: '2024-11-28',
      helpful: 15,
      verified: true
    }
  ];

  useEffect(() => {
    setReviews(mockReviews);
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      showToast({
        type: 'warning',
        title: 'Login Required',
        message: 'Please login to submit a review.'
      });
      return;
    }

    if (newReview.rating === 0) {
      showToast({
        type: 'warning',
        title: 'Rating Required',
        message: 'Please select a star rating.'
      });
      return;
    }

    if (!newReview.comment.trim()) {
      showToast({
        type: 'warning',
        title: 'Comment Required',
        message: 'Please write a review comment.'
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const review: Review = {
        id: Date.now().toString(),
        userId: user.uid,
        userName: user.displayName || 'Anonymous User',
        rating: newReview.rating,
        title: newReview.title,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0],
        helpful: 0,
        verified: false
      };

      setReviews(prev => [review, ...prev]);
      setNewReview({ rating: 0, title: '', comment: '' });
      setLoading(false);

      showToast({
        type: 'success',
        title: 'Review Submitted!',
        message: 'Thank you for your feedback. Your review has been posted.'
      });
    }, 1500);
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive && onRate ? () => onRate(star) : undefined}
            onMouseEnter={interactive ? () => setHoveredRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
            className={interactive ? 'cursor-pointer transition-colors' : 'cursor-default'}
            disabled={!interactive}
          >
            <Star
              size={interactive ? 24 : 16}
              className={`${
                star <= (interactive ? (hoveredRating || rating) : rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Customer Reviews"
        showBackButton={true}
      />

      <div className="pt-16 max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">Customer Reviews</h1>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                {renderStars(Math.round(parseFloat(averageRating)))}
                <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
              </div>
              <span className="text-gray-600">({reviews.length} reviews)</span>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Share your experience with RARITONE and help others discover the future of fashion technology.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Write Review Form */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Write a Review</h2>
                
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <Label className="text-gray-900 mb-2 block">Rating</Label>
                    {renderStars(newReview.rating, true, (rating) => setNewReview({...newReview, rating}))}
                  </div>

                  <div>
                    <Label htmlFor="title" className="text-gray-900">Review Title</Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Summarize your experience"
                      value={newReview.title}
                      onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                      className="mt-1 border-gray-300 focus:border-black focus:ring-black"
                    />
                  </div>

                  <div>
                    <Label htmlFor="comment" className="text-gray-900">Your Review</Label>
                    <textarea
                      id="comment"
                      placeholder="Tell us about your experience with RARITONE..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      required
                      rows={4}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || !user}
                    className="w-full bg-black text-white hover:bg-gray-800 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>{user ? 'Submit Review' : 'Login to Review'}</span>
                      </>
                    )}
                  </Button>

                  {!user && (
                    <p className="text-sm text-gray-600 text-center">
                      Please login to submit a review
                    </p>
                  )}
                </form>
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border rounded-lg p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={20} className="text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900">{review.userName}</h3>
                            {review.verified && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            {renderStars(review.rating)}
                            <span className="text-sm text-gray-500 flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {review.title && (
                      <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                    )}
                    
                    <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                    
                    <div className="flex items-center justify-between">
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
                        <ThumbsUp size={16} />
                        <span className="text-sm">Helpful ({review.helpful})</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {reviews.length === 0 && (
                <div className="text-center py-12">
                  <Star size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-600">Be the first to share your experience with RARITONE!</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reviews;