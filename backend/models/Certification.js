import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  issuer: {
    type: String,
    required: true
  },
  issueDate: {
    type: String,   // ⬅ ANTES era "date"
    required: true
  },
  expiryDate: {
    type: String,
    default: 'No expiration'
  },
  credentialId: {
    type: String,
    default: ''
  },
  credentialUrl: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  skills: [{
    type: String
  }],
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Certification', certificationSchema);
