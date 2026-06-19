const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome do pet é obrigatório'],
    trim: true
  },
  tipo: {
    type: String,
    required: [true, 'Tipo é obrigatório'],
    enum: ['gato', 'cachorro', 'passaro', 'roedor', 'peixe', 'reptil']
  },
  sexo: {
    type: String,
    required: [true, 'Sexo é obrigatório'],
    enum: ['Macho', 'Fêmea']
  },
  raca: {
    type: String,
    required: [true, 'Raça é obrigatória']
  },
  peso: {
    type: Number,
    required: [true, 'Peso é obrigatório'],
    min: 0
  },
  idade: {
    type: String,
    required: true
  },
  local: {
    type: String,
    required: [true, 'Localização é obrigatória']
  },
  descricao: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  fotos: {
    type: [String],
    default: ['/img/avatar.png.jpg']
  },
  saude: {
    pedigree: {
      type: Boolean,
      default: false
    },
    exames: {
      type: String,
      enum: ['Em análise', 'Aprovado', 'Reprovado'],
      default: 'Em análise'
    },
    vacinas: {
      type: String,
      enum: ['Em análise', 'Em dia', 'Atrasado'],
      default: 'Em análise'
    }
  },
  dono: {
    nome: {
      type: String,
      required: true
    },
    foto: {
      type: String,
      default: '/img/avatar.png.jpg'
    },
    telefone: {
      type: String,
      default: ''
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Transforma _id em id e remove campos internos
petSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Pet', petSchema);