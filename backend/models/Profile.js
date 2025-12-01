import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Vicente Woinilowicz'
  },
  title: {
    type: String,
    default: 'Full-Stack Developer & Cybersecurity Specialist'
  },
  subtitle: {
    type: String,
    default: 'Desarrollador Web & Especialista en Seguridad'
  },
  bio: {
    type: String,
    default: 'Desarrollador Full-Stack con experiencia en MERN stack, .NET Core y PHP, especializándome en Ciberseguridad.'
  },
  description: {
    type: String,
    default: 'Passionate about building secure applications from the ground up.'
  },
  profileImage: {
    type: String,
    default: '/assets/profile.jpg'
  },
  cvUrl: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: 'Buenos Aires, Argentina'
  },
  socialLinks: {
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    email: { type: String, default: '' },
    twitter: { type: String, default: '' }
  },
  skills: {
    languages: [{ type: String }],
    frontend: [{ type: String }],
    backend: [{ type: String }],
    databases: [{ type: String }],
    security: [{ type: String }],
    tools: [{ type: String }],
    other: [{ type: String }]
  },
  stats: {
    yearsExperience: { type: Number, default: 2 },
    projectsCompleted: { type: Number, default: 0 },
    certifications: { type: Number, default: 0 }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Profile', profileSchema);