const express = require('express');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Pegar o perfil atual
router.get('/me', authMiddleware, async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      foto: req.user.foto
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

// Atualizar o perfil do usuário
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const { name, phone, foto } = req.body;
    
    if (name) req.user.name = name;
    if (phone) req.user.phone = phone;
    if (foto) req.user.foto = foto;
    
    await req.user.save();
    
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      foto: req.user.foto
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});

module.exports = router;