const express = require('express');
const router = express.Router();
const playController = require('../controllers/playController');
const authMiddleware = require('../middlewares/authMiddleware'); // 1. Importar o middleware

// Rotas públicas
router.get('/', playController.getPlays);
router.get('/:id', playController.getPlayById);

// Rota protegida por JWT
router.post('/', authMiddleware, playController.createPlay); // 2. Adicionar o middleware aqui

module.exports = router;