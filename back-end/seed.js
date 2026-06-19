require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Pet = require('./models/Pet');
const connectDB = require('./config/db');

// Lista de usuários
const usersData = [
  { name: 'Fernanda Travassos', email: 'fernanda.lua.travassos@gmail.com', password: '123456', phone: '(83) 99609-8944', foto: '/img/avatar.png.jpg' },
  { name: 'Alice Armstrong', email: 'alice@petzmatch.com', password: '123456', phone: '(83) 99999-9999', foto: '/img/aliceAvatar.png.jpg' },
  { name: 'Lucas Kaliel', email: 'lucas@petzmatch.com', password: '123456', phone: '(83) 98888-8888', foto: '/img/lucasAvatar.png.jpg' },
  { name: 'Cardan Greenbriar', email: 'cardan@petzmatch.com', password: '123456', phone: '(83) 91234-5678', foto: '/img/cardangreenbriar.png.jpg' },
  { name: 'Amy Farias', email: 'amy@petzmatch.com', password: '123456', phone: '(83) 98734-9802', foto: '/img/amyAvatar.png.jpg' },
  { name: 'Ravi Pierre', email: 'ravi@petzmatch.com', password: '123456', phone: '(83) 99734-4202', foto: '/img/raviAvatar.png.jpg' }
];

// Pets – todos os campos agora usam valores válidos e tipos em minúsculo
const mockPets = [
  // Fernanda
  { nome: 'Luna', tipo: 'gato', sexo: 'Fêmea', raca: 'Siamês', peso: 3.2, idade: '1 ano', local: 'Campina Grande, PB', descricao: 'Luna é uma gatinha que gosta de usar chapéus...', fotos: ['/img/luna.png.jpg', '/img/luna2.png.jpg', '/img/luna3.png.jpg'], donoNome: 'Fernanda Travassos', saude: { pedigree: true, exames: 'Aprovado', vacinas: 'Em dia' } },
  { nome: 'Baltazar', tipo: 'gato', sexo: 'Macho', raca: 'Branquinho', peso: 3, idade: '1 ano', local: 'Campina Grande, PB', descricao: 'Baltazar é um gatinho que gosta muito de acompanhar seus donos...', fotos: ['/img/homofobico.png.jpg'], donoNome: 'Fernanda Travassos', saude: { pedigree: true, exames: 'Aprovado', vacinas: 'Em dia' } },
  { nome: 'Kaligula', tipo: 'gato', sexo: 'Macho', raca: 'Laranjinha', peso: 2, idade: '4 meses', local: 'Campina Grande, PB', descricao: 'Kaligula é um gatinho filhote que gosta de brincar com bolinhas...', fotos: ['/img/laranjinha.png.jpg'], donoNome: 'Fernanda Travassos', saude: { pedigree: true, exames: 'Aprovado', vacinas: 'Em análise' } },
  { nome: 'Assustada Da Silva', tipo: 'cachorro', sexo: 'Fêmea', raca: 'Capa Preta', peso: 5, idade: '2 anos', local: 'Campina Grande, PB', descricao: 'Mel é uma cachorrinha assustada e brincalhona...', fotos: ['/img/assustadoDaSilva.png.jpg'], donoNome: 'Fernanda Travassos', saude: { pedigree: true, exames: 'Aprovado', vacinas: 'Em dia' } },
  { nome: 'Lebre de Março', tipo: 'roedor', sexo: 'Macho', raca: 'Fuzzy Lop', peso: 1.8, idade: '1 ano', local: 'Campina Grande, PB', descricao: 'Coelhinho marrom de pelagem macia...', fotos: ['/img/lebreMarco.png.jpg'], donoNome: 'Fernanda Travassos', saude: { pedigree: false, exames: 'Aprovado', vacinas: 'Em dia' } },

  // Alice
  { nome: 'Era', tipo: 'passaro', sexo: 'Fêmea', raca: 'Calopsita', peso: 0.1, idade: '1 ano', local: 'Campina Grande, PB', descricao: 'Era é uma calopsita muito cantora...', fotos: ['/img/era.png.jpg'], donoNome: 'Alice Armstrong', saude: { pedigree: false, exames: 'Em análise', vacinas: 'Em análise' } },
  { nome: 'Amora', tipo: 'gato', sexo: 'Fêmea', raca: 'Siamês', peso: 3, idade: '9 meses', local: 'João Pessoa, PB', descricao: 'Amora adora quando escovam seu pelo...', fotos: ['/img/siames.png.jpg'], donoNome: 'Alice Armstrong', saude: { pedigree: true, exames: 'Aprovado', vacinas: 'Em dia' } },
  { nome: 'Joca', tipo: 'roedor', sexo: 'Macho', raca: 'Coelho', peso: 1, idade: '8 meses', local: 'João Pessoa, PB', descricao: 'Coelhinho calmo que gosta de banho...', fotos: ['/img/coelhinhoskincare.png.jpg'], donoNome: 'Alice Armstrong', saude: { pedigree: false, exames: 'Aprovado', vacinas: 'Em dia' } },

  // Lucas
  { nome: 'Bochechas', tipo: 'roedor', sexo: 'Fêmea', raca: 'Hamster Sírio', peso: 0.15, idade: '8 meses', local: 'Campina Grande, PB', descricao: 'Hamster ativo que adora rodinha...', fotos: ['/img/bochechas.png.jpg'], donoNome: 'Lucas Kaliel', saude: { pedigree: false, exames: 'Aprovado', vacinas: 'Em análise' } },
  { nome: 'Bluy', tipo: 'passaro', sexo: 'Macho', raca: 'Passarinho azul', peso: 0.15, idade: '5 meses', local: 'Campina Grande, PB', descricao: 'Bluy é um passarinho muito amigável...', fotos: ['/img/sillyBlue.png.jpg'], donoNome: 'Lucas Kaliel', saude: { pedigree: false, exames: 'Aprovado', vacinas: 'Em dia' } },

  // Cardan
  { nome: 'Phainon', tipo: 'cachorro', sexo: 'Macho', raca: 'Golden Retriever', peso: 32, idade: '2 anos', local: 'João Pessoa, PB', descricao: 'Golden dócil e brincalhão...', fotos: ['/img/golden.png.jpg'], donoNome: 'Cardan Greenbriar', saude: { pedigree: true, exames: 'Aprovado', vacinas: 'Em dia' } },
  { nome: 'Marry', tipo: 'gato', sexo: 'Fêmea', raca: 'Branquinha', peso: 2, idade: '1 ano', local: 'João Pessoa, PB', descricao: 'Gosta de tomar banho e comer comidas diferentes...', fotos: ['/img/mary.png.jpg'], donoNome: 'Cardan Greenbriar', saude: { pedigree: true, exames: 'Aprovado', vacinas: 'Em dia' } },
  { nome: 'Víbora', tipo: 'reptil', sexo: 'Fêmea', raca: 'Cobra do Milharal', peso: 0.9, idade: '3 anos', local: 'João Pessoa, PB', descricao: 'Cobra calma e curiosa...', fotos: ['/img/vibora1.png.jpg', '/img/vibora2.png.jpg'], donoNome: 'Cardan Greenbriar', saude: { pedigree: false, exames: 'Aprovado', vacinas: 'Em análise' } },

  // Amy
  { nome: 'Garfield', tipo: 'gato', sexo: 'Macho', raca: 'Laranja', peso: 2, idade: '6 meses', local: 'João Pessoa, PB', descricao: 'Gosta de usar roupinhas...', fotos: ['/img/garfield.png.jpg'], donoNome: 'Amy Farias', saude: { pedigree: true, exames: 'Aprovado', vacinas: 'Em dia' } },
  { nome: 'Heva', tipo: 'cachorro', sexo: 'Fêmea', raca: 'Schnauzer', peso: 3, idade: '1 ano', local: 'João Pessoa, PB', descricao: 'Adora deitar ao sol...', fotos: ['/img/schnauzer.png.jpg'], donoNome: 'Amy Farias', saude: { pedigree: true, exames: 'Aprovado', vacinas: 'Em dia' } },
  { nome: 'Goldie', tipo: 'peixe', sexo: 'Fêmea', raca: 'Peixe Dourado', peso: 0.2, idade: '1 ano', local: 'João Pessoa, PB', descricao: 'Peixinha dourada brilhante...', fotos: ['/img/goldenFish.png.jpg'], donoNome: 'Amy Farias', saude: { pedigree: false, exames: 'Aprovado', vacinas: 'Em análise' } },
  { nome: 'Kaito', tipo: 'peixe', sexo: 'Macho', raca: 'Carpa Koi', peso: 1.2, idade: '5 anos', local: 'João Pessoa, PB', descricao: 'Carpa koi de beleza hipnotizante...', fotos: ['/img/koiFish.png.jpg'], donoNome: 'Amy Farias', saude: { pedigree: false, exames: 'Aprovado', vacinas: 'Em análise' } },

  // Ravi
  { nome: 'Pipoca', tipo: 'cachorro', sexo: 'Macho', raca: 'Bichon frisé', peso: 2, idade: '6 meses', local: 'Campina Grande, PB', descricao: 'Pequenino e brincalhão...', fotos: ['/img/fluffy.png.jpg'], donoNome: 'Ravi Pierre', saude: { pedigree: true, exames: 'Aprovado', vacinas: 'Em dia' } },
  { nome: 'Loki', tipo: 'cachorro', sexo: 'Macho', raca: 'Boiadeiro de Berna', peso: 3, idade: '2 anos', local: 'João Pessoa, PB', descricao: 'Peludo e gosta de ter o pelo escovado...', fotos: ['/img/bernerse.png.jpg'], donoNome: 'Ravi Pierre', saude: { pedigree: true, exames: 'Aprovado', vacinas: 'Em dia' } },
  { nome: 'Gekko', tipo: 'reptil', sexo: 'Macho', raca: 'Gecko Leopardo', peso: 0.06, idade: '1 ano', local: 'João Pessoa, PB', descricao: 'Gecko ativo e divertido...', fotos: ['/img/gekko1.png.jpg', '/img/gekko2.png.jpg'], donoNome: 'Ravi Pierre', saude: { pedigree: false, exames: 'Aprovado', vacinas: 'Em análise' } },
  { nome: 'SirFroggo', tipo: 'reptil', sexo: 'Macho', raca: 'Sapo Pac-Man', peso: 0.4, idade: '2 anos', local: 'João Pessoa, PB', descricao: 'Sapo elegante e de apetite voraz...', fotos: ['/img/sirFroggo.png.jpg'], donoNome: 'Ravi Pierre', saude: { pedigree: false, exames: 'Aprovado', vacinas: 'Em análise' } }
];

async function seedDatabase() {
  try {
    await User.deleteMany({});
    await Pet.deleteMany({});
    console.log('Cleared existing data');

    const userMap = new Map();
    for (const userData of usersData) {
      const user = new User(userData);
      await user.save();
      userMap.set(userData.name, user);
      console.log(`User created: ${user.email}`);
    }

    for (const petData of mockPets) {
      const owner = userMap.get(petData.donoNome);
      if (!owner) {
        console.error(`Owner not found: ${petData.donoNome}`);
        continue;
      }
      const pet = new Pet({
        nome: petData.nome,
        tipo: petData.tipo,
        sexo: petData.sexo,
        raca: petData.raca,
        peso: petData.peso,
        idade: petData.idade,
        local: petData.local,
        descricao: petData.descricao,
        fotos: petData.fotos,
        saude: petData.saude,
        dono: {
          nome: owner.name,
          foto: owner.foto,
          telefone: owner.phone
        },
        userId: owner._id
      });
      await pet.save();
    }

    console.log(`${mockPets.length} mock pets inserted with correct owners and valid enum values.`);
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  connectDB().then(() => seedDatabase());
}

module.exports = { seedDatabase };