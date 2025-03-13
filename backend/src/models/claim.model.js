import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  couponId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon',
    required: true
  },
  claimedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a compound index to quickly lookup by IP and session
claimSchema.index({ ipAddress: 1, sessionId: 1 });

const Claim = mongoose.model('Claim', claimSchema);
export default Claim;