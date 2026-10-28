const express = require('express');
const cors = require('cors');
const playRoutes = require('./routes/playRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de Status
app.get('/api/status', (req, res) => {
  res.json({ status: 'API do NFL Playbook rodando com sucesso!' });
});

// Rotas da Aplicação
app.use('/api/plays', playRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;