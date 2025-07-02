import mongoose from 'mongoose';

const mailTrackingSchema = new mongoose.Schema({
  emailId: { type: String, required: true },
  openedAt: { type: Date, default: Date.now },
  userAgent: { type: String },
});

const MailTracking = mongoose.model('MailTracking', mailTrackingSchema);

export default MailTracking;
