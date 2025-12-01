import express from 'express';
import Profile from '../models/profile.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/profile
// @desc    Obtener perfil público
// @access  Public
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    
    // Si no existe, crear perfil por defecto
    if (!profile) {
      profile = await Profile.create({});
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error del servidor' 
    });
  }
});

// @route   PUT /api/profile
// @desc    Actualizar perfil
// @access  Private (Admin)
router.put('/', authenticate, isAdmin, async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedAt = Date.now();

    let profile = await Profile.findOne();
    
    if (!profile) {
      profile = await Profile.create(updates);
    } else {
      profile = await Profile.findOneAndUpdate(
        {},
        updates,
        { new: true, runValidators: true }
      );
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error del servidor' 
    });
  }
});

export default router;