import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  field: {
    type: String,
    default: ''
  },
  period: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    default: ''
  },
  endDate: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  achievements: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Education', educationSchema);