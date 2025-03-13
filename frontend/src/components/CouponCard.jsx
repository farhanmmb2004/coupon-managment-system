import React from 'react';

const CouponCard = ({ coupon }) => {
  // Format the expiry date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="coupon-card card border-0 p-4 mb-4">
      <div className="card-body text-center">
        <h3 className="mb-3">Your Coupon</h3>
        <div className="coupon-code p-3 mb-3 bg-white rounded">{coupon.code}</div>
        <p className="mb-2">{coupon.description}</p>
        <p className="mb-3">
          Discount: <span className="fw-bold">${coupon.discountAmount.toFixed(2)}</span>
        </p>
        <p className="mb-0">
          Valid until: <span className="text-muted">{formatDate(coupon.expiryDate)}</span>
        </p>
      </div>
    </div>
  );
};

export default CouponCard;