<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card">
      <h2>{{ isRegister ? 'Criar Conta no Playbook' : 'Acessar o Playbook' }}</h2>

      <form @submit.prevent="handleSubmit">
        <div v-if="isRegister" class="form-group">
          <label>Nome do Treinador</label>
          <input v-model="form.name" type="text" required placeholder="Ex: Vince Lombardi" />
        </div>

        <div class="form-group">
          <label>E-mail</label>
          <input v-model="form.email" type="email" required placeholder="coach@nfl.com" />
        </div>

        <div class="form-group">
          <label>Senha</label>
          <input v-model="form.password" type="password" required placeholder="******" />
        </div>

        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? 'Processando...' : (isRegister ? 'Cadastrar' : 'Entrar') }}
        </button>
      </form>

      <div class="toggle-mode">
        <span @click="isRegister = !isRegister">
          {{ isRegister ? 'Já possui conta? Faça login' : 'Não tem conta? Cadastre-se' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { authService } from '../services/api';

const emit = defineEmits(['authSuccess', 'close']);

const isRegister = ref(false);
const loading = ref(false);
const form = ref({ name: '', email: '', password: '' });

const handleSubmit = async () => {
  loading.value = true;
  try {
    let data;
    if (isRegister.value) {
      data = await authService.register(form.value);
    } else {
      data = await authService.login({
        email: form.value.email,
        password: form.value.password
      });
    }
    emit('authSuccess', data.user);
    emit('close');
  } catch (error) {
    alert(error.response?.data?.error || 'Erro ao realizar autenticação.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-card {
  background-color: #1e1e1e;
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 380px;
  border: 1px solid #333;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  text-align: left;
}

h2 { margin-top: 0; color: #ffffff; font-size: 20px; text-align: center; margin-bottom: 20px; }
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
label { font-size: 13px; color: #ccc; }
input { padding: 10px; background: #2a2a2a; border: 1px solid #444; color: white; border-radius: 4px; font-size: 14px; }
input:focus { outline: none; border-color: #013369; }

.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #013369;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-submit:hover { background-color: #002244; }
.toggle-mode { text-align: center; margin-top: 18px; font-size: 13px; color: #888; }
.toggle-mode span { color: #ffeb3b; cursor: pointer; text-decoration: underline; }
</style>