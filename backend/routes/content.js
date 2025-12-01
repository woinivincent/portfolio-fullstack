import express from 'express';
import { body, validationResult } from 'express-validator';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Certification from '../models/Certification.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// ============================================
// Middleware para manejar errores de input
// ============================================
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// Manejo de ObjectId inválido (CastError)
const checkNotFound = (data, res, name) => {
  if (!data) {
    return res.status(404).json({
      success: false,
      message: `${name} no encontrada`
    });
  }
};

// ============================================
// EXPERIENCES ROUTES
// ============================================

// GET todas
router.get('/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.json({ success: true, data: experiences });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al obtener experiencias' });
  }
});

// GET por ID
router.get('/experiences/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (checkNotFound(experience, res, 'Experiencia')) return;

    res.json({ success: true, data: experience });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al obtener experiencia' });
  }
});

// POST crear
router.post(
  '/experiences',
  authenticate,
  [
    body('title').notEmpty().withMessage('El título es requerido'),
    body('company').notEmpty().withMessage('La empresa es requerida'),
    body('startDate').notEmpty().withMessage('La fecha de inicio es requerida')
  ],
  validate,
  async (req, res) => {
    try {
      const experience = new Experience(req.body);
      await experience.save();

      res.status(201).json({ success: true, data: experience });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error al crear experiencia' });
    }
  }
);

// PUT actualizar
router.put('/experiences/:id', authenticate, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (checkNotFound(experience, res, 'Experiencia')) return;

    res.json({ success: true, data: experience });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al actualizar experiencia' });
  }
});

// DELETE eliminar
router.delete('/experiences/:id', authenticate, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (checkNotFound(experience, res, 'Experiencia')) return;

    res.json({ success: true, message: 'Experiencia eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al eliminar experiencia' });
  }
});

// ============================================
// EDUCATION ROUTES
// ============================================

router.get('/education', async (req, res) => {
  try {
    const education = await Education.find().sort({ startDate: -1 });
    res.json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener educación' });
  }
});

router.post(
  '/education',
  authenticate,
  [
    body('degree').notEmpty().withMessage('El título es requerido'),
    body('institution').notEmpty().withMessage('La institución es requerida'),
    body('startDate').notEmpty().withMessage('La fecha de inicio es requerida')
  ],
  validate,
  async (req, res) => {
    try {
      const education = new Education(req.body);
      await education.save();
      res.status(201).json({ success: true, data: education });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear educación' });
    }
  }
);

router.put('/education/:id', authenticate, async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (checkNotFound(education, res, 'Educación')) return;

    res.json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar educación' });
  }
});

router.delete('/education/:id', authenticate, async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);

    if (checkNotFound(education, res, 'Educación')) return;

    res.json({ success: true, message: 'Educación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar educación' });
  }
});

// ============================================
// CERTIFICATIONS ROUTES (CORREGIDAS)
// ============================================

router.get('/certifications', async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ issueDate: -1 }); // ⬅ corregido
    res.json({ success: true, data: certifications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener certificaciones' });
  }
});

router.post(
  '/certifications',
  authenticate,
  [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('issuer').notEmpty().withMessage('El emisor es requerido'),
    body('issueDate').notEmpty().withMessage('La fecha de emisión es requerida') // ⬅ corregido
  ],
  validate,
  async (req, res) => {
    try {
      const certification = new Certification(req.body);
      await certification.save();
      res.status(201).json({ success: true, data: certification });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error al crear certificación' });
    }
  }
);

router.put('/certifications/:id', authenticate, async (req, res) => {
  try {
    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certificación no encontrada'
      });
    }

    res.json({ success: true, data: certification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al actualizar certificación' });
  }
});

router.delete('/certifications/:id', authenticate, async (req, res) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certificación no encontrada'
      });
    }

    res.json({ success: true, message: 'Certificación eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al eliminar certificación' });
  }
});

export default router;