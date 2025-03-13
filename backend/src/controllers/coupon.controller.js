import Coupon from '../models/coupon.model.js';
import Claim from '../models/claim.model.js';

// Get the next available coupon in round-robin fashion
const getCoupon = async (req, res) => {
  try {
    // Find all active coupons
    const activeCoupons = await Coupon.find({ 
      isActive: true,
      expiryDate: { $gt: new Date() }
    }).sort({ code: 1 });

    if (!activeCoupons.length) {
      return res.status(404).json({
        success: false,
        message: 'No active coupons available at this time.'
      });
    }

    // Find the most recently claimed coupon (if any)
    const lastClaim = await Claim.findOne().sort({ claimedAt: -1 });
    
    let nextCouponIndex = 0;
    if (lastClaim) {
      // find the index of the last claimcoupon
      const lastClaimedCouponIndex = activeCoupons.findIndex(
        coupon => coupon._id.toString() === lastClaim.couponId.toString()
      );
      
      // If found than take the next one (round-robin)
      if (lastClaimedCouponIndex !== -1) {
        nextCouponIndex = (lastClaimedCouponIndex + 1) % activeCoupons.length;
      }
    }

    // Get the next coupon in sequence
    const nextCoupon = activeCoupons[nextCouponIndex];

    // Record this claim
    await Claim.create({
      ipAddress: req.ip,
      sessionId: req.sessionId,
      couponId: nextCoupon._id
    });

    // Return the coupon to the user
    return res.status(200).json({
      success: true,
      message: 'Coupon claimed successfully!',
      coupon: {
        code: nextCoupon.code,
        description: nextCoupon.description,
        discountAmount: nextCoupon.discountAmount,
        expiryDate: nextCoupon.expiryDate
      }
    });
  } catch (error) {
    console.error('Error claiming coupon:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.'
    });
  }
};

// Admin function to add new coupons
//currently not in used 
const addCoupon = async (req, res) => {
  try {
    const { code, description, discountAmount, expiryDate } = req.body;
    
    // Validate input
    if (!code || !description || !discountAmount || !expiryDate) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    
    // Create the coupon
    const newCoupon = await Coupon.create({
      code,
      description,
      discountAmount,
      expiryDate: new Date(expiryDate)
    });
    
    return res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      coupon: newCoupon
    });
  } catch (error) {
    console.error('Error creating coupon:', error);
    
    // Check for duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A coupon with this code already exists'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating the coupon'
    });
  }
};

export { getCoupon, addCoupon };