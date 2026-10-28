const Play = require('../models/Play');

// Listar todas as jogadas
exports.getPlays = async (req, res) => {
  try {
    const plays = await Play.find().sort({ createdAt: -1 });
    res.json(plays);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogadas.' });
  }
};

// Buscar uma jogada por ID
exports.getPlayById = async (req, res) => {
  try {
    const play = await Play.findById(req.params.id);
    if (!play) {
      return res.status(404).json({ error: 'Jogada não encontrada.' });
    }
    res.json(play);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a jogada.' });
  }
};

// Criar uma nova jogada
exports.createPlay = async (req, res) => {
  try {
    const newPlay = new Play(req.body);
    await newPlay.save();
    res.status(201).json(newPlay);
  } catch (error) {
    console.error('Erro ao salvar:', error);
    res.status(400).json({ error: 'Erro ao salvar a jogada no banco.', details: error.message });
  }
};