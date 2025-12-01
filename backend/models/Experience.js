import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    default: ''
  },
  endDate: {
    type: String,
    default: 'Present'
  },
  description: {
    type: String,
    required: true
  },
  responsibilities: [{
    type: String
  }],
  achievements: [{
    type: String
  }],
  technologies: [{
    type: String
  }],
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'freelance', 'contract', 'internship'],
    default: 'full-time'
  },
  location: {
    type: String,
    default: ''
  },
  current: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Experience', experienceSchema);
