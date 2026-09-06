'use client';

import React, { useState } from 'react';
import { Booking } from '@/types';
import { X, Star, CheckCircle, MessageSquare } from 'lucide-react';

interface ReviewModalProps {
  booking: Booking | null;
  onClose: () => void;
  onSubmitReview: (bookingId: string, rating: number, comment: string) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  booking,
  onClose,
  onSubmitReview,
}) => {
  if (!booking) return null;

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReview(booking.id, rating, comment);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full shadow-2xl border border-orange-500/30">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 p-6 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Rate & Review Service</h2>
              <p className="text-xs text-amber-100">{booking.serviceTitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-950/50 text-slate-300 hover:text-white hover:bg-slate-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-10 text-center flex flex-col items-center justify-center space-y-2">
            <CheckCircle className="w-12 h-12 text-emerald-400 animate-bounce" />
            <h3 className="text-xl font-bold text-white">Thank You for Your Feedback!</h3>
            <p className="text-xs text-slate-300">Your review helps improve Bangalore service quality.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Star Rating selector */}
            <div className="text-center space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Star Rating
              </label>

              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-amber-400 font-bold">
                {rating === 5 ? '⭐ 5/5 Excellent' : rating === 4 ? '👍 4/5 Very Good' : rating === 3 ? '👌 3/5 Average' : '👎 Poor'}
              </p>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Your Review & Feedback
              </label>
              <textarea
                rows={3}
                placeholder="Share your experience with this provider in Bangalore..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none placeholder-slate-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-slate-950 font-black rounded-2xl shadow-lg hover:opacity-95 transition-all text-xs"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
