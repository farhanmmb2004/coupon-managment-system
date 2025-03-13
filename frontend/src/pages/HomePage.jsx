import React, { useState, useEffect } from 'react';
import CouponCard from '../components/CouponCard';
import LoadingSpinner from '../components/LoadingSpinner';
import MessageAlert from '../components/MessageAlert';
import { couponService } from '../services/api';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState(null);
  const [timerText, setTimerText] = useState('');
  const [countdown, setCountdown] = useState(null);

  // Function to claim a coupon
  const handleClaimCoupon = async () => {
    setLoading(true);
    setError(null);
    setCoupon(null);
    
    try {
      const response = await couponService.claimCoupon();
      
      if (response.success) {
        setCoupon(response.coupon);
      } else {
        setError(response.message || 'Failed to claim coupon');
        
        // Check if there's a cooldown period mentioned in the error
        if (response.message && response.message.includes('minutes')) {
          const minutes = parseInt(response.message.match(/(\d+) minutes/)[1]);
          if (!isNaN(minutes)) {
            startCountdown(minutes);
          }
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Start countdown timer
  const startCountdown = (minutes) => {
    // Clear any existing countdown
    if (countdown) {
      clearInterval(countdown);
    }
    
    // Convert minutes to seconds
    let totalSeconds = minutes * 60;
    
    // Update timer text immediately
    updateTimerText(totalSeconds);
    
    // Start interval
    const interval = setInterval(() => {
      totalSeconds -= 1;
      
      if (totalSeconds <= 0) {
        clearInterval(interval);
        setTimerText('You can claim a new coupon now!');
        setCountdown(null);
      } else {
        updateTimerText(totalSeconds);
      }
    }, 1000);
    
    setCountdown(interval);
  };
  
  // Update timer text
  const updateTimerText = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    setTimerText(`Try again in ${mins}:${secs < 10 ? '0' : ''}${secs}`);
  };
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (countdown) {
        clearInterval(countdown);
      }
    };
  }, [countdown]);

  return (
    <div className="container py-5">
      <h1 className="page-title">Round-Robin Coupon Distribution</h1>
      
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card mb-4 border-0 shadow-sm status-card">
            <div className="card-body p-4">
              <h4 className="card-title mb-3">Get Your Coupon</h4>
              <p className="card-text">
                Click the button below to claim your exclusive discount coupon. 
                Each user is limited to one coupon per hour.
              </p>
              <div className="d-grid">
                <button 
                  className="btn btn-primary btn-lg claim-button" 
                  onClick={handleClaimCoupon}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Claim Coupon'}
                </button>
              </div>
              
              {loading && <LoadingSpinner />}
            </div>
          </div>
          
          {coupon && <CouponCard coupon={coupon} />}
          
          {error && (
            <MessageAlert 
              message={error} 
              timerText={timerText} 
              variant="warning"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;