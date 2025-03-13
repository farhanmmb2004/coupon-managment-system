import Claim from '../models/claim.model.js';

const COOLDOWN_PERIOD = 60 * 60 * 1000; // 1 hour in milliseconds

const rateLimiter = async (req, res, next) => {
  const ipAddress = req.ip;
  const sessionId = req.cookies.sessionId || 'anonymous';

  try {
    // Find the most recent claim by this IP or session
    const recentClaim = await Claim.findOne({
      $or: [
        { ipAddress: ipAddress },
        { sessionId: sessionId }
      ]
    }).sort({ claimedAt: -1 });

    if (recentClaim) {
      const timeSinceClaim = Date.now() - new Date(recentClaim.claimedAt).getTime();
      
      if (timeSinceClaim < COOLDOWN_PERIOD) {
        const timeRemaining = Math.ceil((COOLDOWN_PERIOD - timeSinceClaim) / 60000); // minutes
        return res.status(429).json({
          success: false,
          message: `Please wait ${timeRemaining} minutes before claiming another coupon.`
        });
      }
    }
    
    next();
  } catch (error) {
    console.error('Rate limiter error:', error);
    next(error);
  }
};

export default rateLimiter;