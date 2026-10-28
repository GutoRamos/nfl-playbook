import api from './api';

export const playService = {
  // Buscar todas as jogadas
  async getAllPlays() {
    const response = await api.get('/plays');
    return response.data;
  },

  // Buscar uma jogada por ID
  async getPlayById(id) {
    const response = await api.get(`/plays/${id}`);
    return response.data;
  },

  // Criar uma nova jogada
  async createPlay(playData) {
    const response = await api.post('/plays', playData);
    return response.data;
  },
};