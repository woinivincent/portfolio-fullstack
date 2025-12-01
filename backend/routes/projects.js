import express from 'express';
import Project from '../models/Project.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/projects
// @desc    Obtener todos los proyectos
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    
    let query = {};
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    const projects = await Project.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error obteniendo proyectos:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error del servidor' 
    });
  }
});

// @route   GET /api/projects/:id
// @desc    Obtener un proyecto por ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ 
        success: false,
        message: 'Proyecto no encontrado' 
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error obteniendo proyecto:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error del servidor' 
    });
  }
});

// @route   POST /api/projects
// @desc    Crear nuevo proyecto
// @access  Private (Admin)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error creando proyecto:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error del servidor' 
    });
  }
});

// @route   PUT /api/projects/:id
// @desc    Actualizar proyecto
// @access  Private (Admin)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ 
        success: false,
        message: 'Proyecto no encontrado' 
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error actualizando proyecto:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error del servidor' 
    });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Eliminar proyecto
// @access  Private (Admin)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ 
        success: false,
        message: 'Proyecto no encontrado' 
      });
    }

    res.json({
      success: true,
      message: 'Proyecto eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando proyecto:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error del servidor' 
    });
  }
});

export default router;