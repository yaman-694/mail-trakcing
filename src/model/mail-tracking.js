import mongoose from 'mongoose';

const mailTrackingSchema = new mongoose.Schema({
  emailId: { type: String, required: true, unique: true },
  userAgent: { type: String },
  openMailCount: { type: Number, default: 1 },
}, {
  timestamps: true,
});

const MailTracking = mongoose.model('MailTracking', mailTrackingSchema);

export default MailTracking;
