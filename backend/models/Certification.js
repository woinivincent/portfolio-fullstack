import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  issuer: {
    type: String,
    required: false
  },
  issueDate: {
    type: String,   // ⬅ ANTES era "date"
    required: false
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
