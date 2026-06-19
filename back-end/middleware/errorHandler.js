const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ error: messages.join(', ') });
  }
  
  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(400).json({ error: 'Este e-mail já está cadastrado' });
  }
  
  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Token inválido' });
  }
  
  res.status(500).json({ error: 'Erro interno do servidor' });
};

module.exports = errorHandler;