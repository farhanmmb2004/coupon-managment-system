import crypto from 'crypto';

const sessionHandler = (req, res, next) => {
  // Check if session cookie exists
  if (!req.cookies.sessionId) {
    // Generate a unique session ID
    const sessionId = crypto.randomBytes(16).toString('hex');
    
    // Set cookie that expires in 30 days
    res.cookie('sessionId', sessionId, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure: true
    });
    
    req.sessionId = sessionId;
  } else {
    req.sessionId = req.cookies.sessionId;
  }
  
  next();
};

export default sessionHandler;