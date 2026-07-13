# 🐾 PetzMatch

[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React_Router-6.14-orange)](https://reactrouter.com/)
[![Vite](https://img.shields.io/badge/Vite-4.5-646CFF)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.22-000000)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248)](https://mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Encontre o parceiro ideal para o seu pet de forma segura e transparente.**

---
<br>

## 📌 Nome do Projeto

**PetzMatch**

<img width="1024" height="1024" alt="petzmatch logo" src="https://github.com/user-attachments/assets/88836050-eb19-45da-9f06-95662bbb5ff9" />

---
<br>


## 💡 Descrição do Sistema

O **PetzMatch** é uma plataforma web full-stack que conecta tutores de animais de estimação interessados em cruzamentos responsáveis, especialmente para animais de raça pura. O sistema oferece um ambiente confiável e verificado, eliminando a dependência de grupos não regulamentados em redes sociais.

### Funcionalidades Principais

- **Cadastro e autenticação de usuários** com JWT
- **CRUD completo de pets** (criar, listar, editar, excluir)
- **Busca e filtros** por tipo de animal e sexo
- **Visualização detalhada** com galeria de fotos e status de saúde
- **Autorização**: apenas o dono pode editar/excluir seu pet
- **Perfil personalizado** com lista de pets do usuário
- **Chat mockado** para demonstração da interface

---
<br>


## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** – Biblioteca para construção da interface
- **React Router DOM 6** – Roteamento entre as páginas
- **Bootstrap 5** – Estilização e componentes responsivos
- **Context API** – Gerenciamento de estado global
- **Vite** – Ferramenta de build e desenvolvimento
- **Axios** – Cliente HTTP para consumo da API
- **Material Icons** – Ícones para navegação e ações

### Backend
- **Node.js** – Ambiente de execução
- **Express** – Framework web
- **MongoDB Atlas** – Banco de dados cloud
- **Mongoose** – ODM para modelagem de dados
- **JWT** – Autenticação baseada em tokens
- **bcryptjs** – Hash de senhas
- **express-validator** – Validação de dados

---
<br>


## 📱 Telas Desenvolvidas

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/login` | `Login` | Tela de login com e-mail e senha |
| `/register` | `Register` | Tela de cadastro de novo usuário |
| `/home` | `Home` | Página principal com carrossel, categorias e pets próximos |
| `/explorar` | `Explorar` | Busca avançada com filtros por tipo e sexo |
| `/chat` | `Chat` | Lista de conversas simuladas (mock visual) |
| `/perfil` | `Perfil` | Dados do usuário, menu e lista de pets |
| `/cadastro-pet` | `CadastroPet` | Formulário para cadastrar um novo pet |
| `/editar-pet/:id` | `EditarPet` | Edição de dados do pet |
| `/detalhes/:id` | `DetalhesPet` | Visualização detalhada do pet |
| `/categoria/:tipo` | `Categoria` | Pets de um tipo específico com filtro |

---
<br>


## 📁 Estrutura do Projeto

```
Entrega1+2-PetzMatch/
├── front-end/ # Aplicação React
│ ├── public/
│ │ └── img/ # Imagens estáticas (pets, avatares, ícones)
│ ├── src/
│ │ ├── components/
│ │ │ ├── layout/
│ │ │ │ ├── Header.jsx
│ │ │ │ └── MobileHeader.jsx
│ │ │ ├── BottomNav.jsx
│ │ │ ├── CadastroPet.jsx
│ │ │ ├── Categoria.jsx
│ │ │ ├── Chat.jsx
│ │ │ ├── DetalhesPet.jsx
│ │ │ ├── EditarPet.jsx
│ │ │ ├── Explorar.jsx
│ │ │ ├── Home.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── Perfil.jsx
│ │ │ ├── PetCard.jsx
│ │ │ ├── Register.jsx
│ │ │ └── Welcome.jsx
│ │ ├── contexts/
│ │ │ ├── AuthContext.jsx
│ │ │ └── PetContext.jsx
│ │ ├── services/
│ │ │ └── api.js # Configuração do Axios
│ │ ├── styles/
│ │ │ └── style.css
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js
│ └── README.md
│
└── back-end/ # API Node.js
├── config/
│ └── db.js # Conexão com MongoDB
├── middleware/
│ ├── auth.js # Autenticação JWT
│ └── errorHandler.js # Tratamento de erros
├── models/
│ ├── User.js # Modelo de usuário
│ └── Pet.js # Modelo de pet
├── routes/
│ ├── auth.js # Rotas de autenticação
│ ├── users.js # Rotas de usuário
│ └── pets.js # Rotas de pets
├── .env.example
├── package.json
├── seed.js # Script para popular o banco
└── server.js
```
---
<br>


## 🗄️ Modelagem do Banco de Dados

### Coleção `users`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `_id` | ObjectId | Identificador único |
| `name` | String | Nome do usuário |
| `email` | String | E-mail (único) |
| `password` | String | Senha hasheada |
| `phone` | String | Telefone (opcional) |
| `foto` | String | Caminho da foto de perfil |
| `createdAt` | Date | Data de criação |

<br>

### Coleção `pets`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `_id` | ObjectId | Identificador único |
| `nome` | String | Nome do pet |
| `tipo` | String | `gato`, `cachorro`, `passaro`, `roedor`, `peixe`, `reptil` |
| `sexo` | String | `Macho` ou `Fêmea` |
| `raca` | String | Raça do animal |
| `peso` | Number | Peso em kg |
| `idade` | String | Idade formatada |
| `local` | String | Localização |
| `descricao` | String | Descrição do pet |
| `fotos` | Array | Lista de URLs das imagens |
| `saude.pedigree` | Boolean | Possui pedigree? |
| `saude.exames` | String | `Em análise`, `Aprovado` ou `Reprovado` |
| `saude.vacinas` | String | `Em análise`, `Em dia` ou `Atrasado` |
| `dono.nome` | String | Nome do tutor |
| `dono.foto` | String | Foto do tutor |
| `dono.telefone` | String | Telefone do tutor |
| `userId` | ObjectId | Referência ao usuário dono |
| `createdAt` | Date | Data de criação |

<br>

### Relacionamento

- Um **usuário** pode ter **vários pets** (relacionamento 1:N via `userId`)

---
<br>


## 🔌 API Endpoints

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/auth/register` | Cadastrar novo usuário |
| `POST` | `/api/auth/login` | Login e retorno de token JWT |

<br>

### Usuários (Autenticado)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/users/me` | Buscar perfil do usuário logado |
| `PUT` | `/api/users/me` | Atualizar perfil do usuário |

<br>

### Pets

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/api/pets` | Listar todos os pets | ❌ |
| `GET` | `/api/pets/:id` | Buscar pet por ID | ❌ |
| `POST` | `/api/pets` | Criar novo pet | ✅ |
| `PUT` | `/api/pets/:id` | Atualizar pet (após verificação de dono) | ✅ |
| `DELETE` | `/api/pets/:id` | Excluir pet (após verificação de dono) | ✅ |

<br>

### Health Check

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/health` | Verificar status da API |

---
<br>


## 🚀 Instruções para Rodar o Projeto

### Pré‑requisitos

- Node.js (versão 16 ou superior)
- npm (geralmente já incluso com o Node)
- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratuita)


### Passo a Passo

--- 

<br>

#### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/petzmatch.git
cd Entrega1+2-PetzMatch
```

<br>

---


#### 2. Clonar o repositório

```bash
cd back-end
npm install
```

- Crie um arquivo .env na pasta back-end com as seguintes variáveis:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<usuario>:<senha>@cluster0.xxxxx.mongodb.net/petzmatch?retryWrites=true&w=majority
JWT_SECRET=chave_secreta_muito_segura
```
- Substitua <usuario> e <senha> pelas credenciais do seu banco.
- Substitua cluster0.xxxxx pelo endereço real do seu cluster no MongoDB Atlas.

<br>

---


#### 3. Popular o Banco de Dados (Seed)

```bash
npm run seed
```

Este comando irá:

- Criar 6 usuários mockados
- Inserir 22 pets com imagens
- Associar cada pet ao seu respectivo dono

<br>

---



#### 4. Iniciar o Backend

```bash
npm run dev
```
- O servidor estará disponível em http://localhost:5000

<br>

---



#### 5. Configurar o Frontend

- Em um novo terminal:
```bash
cd front-end
npm install
```

<br>

---



#### 6. Iniciar o Frontend

```bash
npm run dev
```
- A aplicação estará disponível em http://localhost:5173

<br>

---



## 📊 Dados Iniciais para Teste

A aplicação já vem com usuários pré-cadastrados e seus respectivos pets. Utilize as credenciais abaixo para testar diferentes perfis:

| Usuário | E-mail | Senha | Pets (quantidade) |
|---------|--------|-------|-------------------|
| **Fernanda Travassos** | `fernanda.lua.travassos@gmail.com` | `123456` | 5 |
| **Alice Armstrong** | `alice@petzmatch.com` | `123456` | 3 |
| **Lucas Kaliel** | `lucas@petzmatch.com` | `123456` | 2 |
| **Cardan Greenbriar** | `cardan@petzmatch.com` | `123456` | 3 |
| **Amy Farias** | `amy@petzmatch.com` | `123456` | 4 |
| **Ravi Pierre** | `ravi@petzmatch.com` | `123456` | 4 |

> **Dica:** Faça login com cada um desses usuários para ver como o perfil exibe apenas os pets pertencentes àquele tutor. Isso demonstra a funcionalidade de autorização e filtragem por usuário.

---
<br>


## ✅ Funcionalidades Implementadas

| Funcionalidade | Status | Descrição |
|----------------|--------|-----------|
| Cadastro de usuários | ✅ | Via tela de registro com validação |
| Autenticação JWT | ✅ | Login com token de acesso |
| CRUD de pets | ✅ | Criar, listar, editar e excluir |
| Autorização por dono | ✅ | Apenas o tutor pode editar/excluir seu pet |
| Busca com filtros | ✅ | Por tipo e sexo na tela Explorar |
| Perfil do usuário | ✅ | Dados pessoais e lista de pets |
| Galeria de fotos | ✅ | Visualização com múltiplas imagens |
| Status de saúde | ✅ | Exames, vacinas e pedigree |
| Chat mockado | ✅ | Interface simulada para demonstração |
| Banco de dados | ✅ | MongoDB Atlas com persistência real |

---
<br>


## 🎨 Layout e Estilização

- **Mobile-first**: otimizado para dispositivos móveis (largura máxima de 480px)
- **Bottom navigation**: menu inferior fixo para navegação rápida
- **Grid responsivo**: cards em 2 colunas adaptáveis
- **Bootstrap**: utilizado apenas para carrossel e classes utilitárias `.row`, `.col-6`
- **CSS customizado**: todo o restante da estilização no arquivo `style.css`
- **Material Icons**: ícones da Google para navegação e ações

---
<br>


## 📝 Notas Adicionais

1. **Simulação de aplicativo mobile**: o projeto foi desenvolvido para simular um app mobile, com layout adaptado e navegação inferior.
2. **Dados persistidos**: todos os dados são armazenados no MongoDB Atlas, garantindo persistência real.
3. **Segurança**: senhas são hasheadas com bcrypt e autenticação é feita via JWT.
4. **Validações**: campos obrigatórios e formatos são validados tanto no frontend quanto no backend.

---
<br>


## 📄 Licença

Este projeto é de uso educacional, desenvolvido como parte do componente curricular **Criar Serviços Web com REST** – CESED / Unifacisa.

---
<br>
