<template>
  <main class="app">
    <!-- Barra Superior de Autenticação -->
    <header class="navbar">
      <div class="logo">NFL Playbook</div>
      <div class="user-controls">
        <template v-if="currentUser">
          <span class="user-name">Treinador: <strong>{{ currentUser.name }}</strong></span>
          <button @click="handleLogout" class="btn-logout">Sair</button>
        </template>
        <template v-else>
          <button @click="showAuthModal = true" class="btn-login">Entrar / Cadastrar</button>
        </template>
      </div>
    </header>

    <h1>NFL Playbook & Tactical Analyzer</h1>

    <PlayCanvas @savePlay="saveNewPlay" />
    <PlayList :plays="plays" :loading="loading" />

    <!-- Modal de Autenticação -->
    <AuthModal
      v-if="showAuthModal"
      @close="showAuthModal = false"
      @authSuccess="onAuthSuccess"
    />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PlayCanvas from './components/PlayCanvas.vue';
import PlayList from './components/PlayList.vue';
import AuthModal from './components/AuthModal.vue';
import { playService, authService } from './services/api';

const plays = ref([]);
const loading = ref(true);
const showAuthModal = ref(false);
const currentUser = ref(null);

const loadPlays = async () => {
  loading.value = true;
  try {
    plays.value = await playService.getAllPlays();
  } catch (error) {
    console.error('Erro ao carregar jogadas:', error);
  } finally {
    loading.value = false;
  }
};

const saveNewPlay = async (playData) => {
  if (!currentUser.value) {
    alert('Você precisa estar logado para salvar uma jogada.');
    showAuthModal.value = true;
    return;
  }

  try {
    await playService.createPlay(playData);
    await loadPlays();
    alert('Jogada salva com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar jogada:', error);
    alert(error.response?.data?.error || 'Erro ao comunicar com o servidor.');
  }
};

const onAuthSuccess = (user) => {
  currentUser.value = user;
};

const handleLogout = () => {
  authService.logout();
  currentUser.value = null;
};

onMounted(() => {
  currentUser.value = authService.getCurrentUser();
  loadPlays();
});
</script>

<style>
body { margin: 0; background-color: #121212; color: white; font-family: Arial, sans-serif; }
.app { text-align: center; padding-bottom: 40px; }

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #1a1a1a;
  border-bottom: 1px solid #333;
}

.logo { font-size: 18px; font-weight: bold; color: #ffeb3b; }
.user-controls { display: flex; align-items: center; gap: 15px; }
.user-name { font-size: 14px; }

.btn-login, .btn-logout {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

.btn-login { background-color: #013369; color: white; }
.btn-logout { background-color: #d50a0a; color: white; }
</style>  