const express = require('express');
const authMiddleware = require('../middleware/auth');
const Pet = require('../models/Pet');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Pegar todos os pets (public)
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pets' });
  }
});

// Pegar apenas um pet
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pet' });
  }
});

// Cadastrar um pet (authenticated)
router.post('/', authMiddleware, [
  body('nome').notEmpty().withMessage('Nome do pet é obrigatório'),
  body('tipo').isIn(['gato', 'cachorro', 'passaro', 'roedor', 'peixe', 'reptil']),
  body('sexo').isIn(['Macho', 'Fêmea']),
  body('raca').notEmpty(),
  body('peso').isNumeric(),
  body('local').notEmpty(),
  body('descricao').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const petData = {
      ...req.body,
      userId: req.userId,
      dono: {
        nome: req.body.dono?.nome || req.user.name,
        foto: req.body.dono?.foto || req.user.foto,
        telefone: req.body.dono?.telefone || req.user.phone
      }
    };

    const pet = new Pet(petData);
    await pet.save();
    
    res.status(201).json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar pet' });
  }
});

// Atualizar os dados do pet (authorization: only owner)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    
    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }
    
    if (pet.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ error: 'Você não tem permissão para editar este pet' });
    }
    
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      { ...req.body, userId: req.userId },
      { new: true, runValidators: true }
    );
    
    res.json(updatedPet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar pet' });
  }
});

// Deletar o card do pet (authorization: only owner)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    
    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }
    
    if (pet.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ error: 'Você não tem permissão para deletar este pet' });
    }
    
    await pet.deleteOne();
    res.json({ message: 'Pet removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar pet' });
  }
});

module.exports = router;