    const mongoose = require('mongoose');

// Subdocumento: Ponto individual de uma rota
const PointSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  action: { type: String, default: 'run' }
}, { _id: false });

// Subdocumento: Jogador individual no campo
const PlayerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ['offense', 'defense'], required: true },
  position: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  route: [PointSchema],
  assignment: { type: String, default: '' }
}, { _id: false });

// Schema Principal: A Jogada Completa
const PlaySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Pass', 'Run', 'Play Action', 'Trick'], default: 'Pass' },
  offenseFormation: { type: String, default: 'Shotgun' },
  defenseCoverage: { type: String, default: 'Cover 2' },
  players: [PlayerSchema],
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Play', PlaySchema);