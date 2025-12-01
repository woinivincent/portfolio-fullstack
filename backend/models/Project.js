import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  longDescription: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  technologies: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    enum: ['fullstack', 'frontend', 'backend', 'security', 'mobile', 'other'],
    default: 'fullstack'
  },
  githubUrl: {
    type: String,
    default: ''
  },
  liveUrl: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'archived'],
    default: 'completed'
  },
  order: {
    type: Number,
    default: 0
  },
  highlights: [{
    type: String
  }],
  challenges: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index para búsquedas
projectSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Project', projectSchema);