<template>
  <div class="canvas-container">
    <div class="controls">
      <input v-model="playTitle" placeholder="Nome da Jogada (ex: Hail Mary Blitz)" />
      <select v-model="offenseFormation">
        <option value="Shotgun">Shotgun</option>
        <option value="Singleback">Singleback</option>
        <option value="I-Form">I-Form</option>
        <option value="Gun Bunch">Gun Bunch</option>
      </select>
      <button @click="handleSave">Salvar Jogada</button>
    </div>

    <!-- Campo SVG -->
    <div class="field-container">
      <svg width="800" height="400" viewBox="0 0 800 400">
        <!-- Relvado -->
        <rect width="800" height="400" fill="#2e7d32" />
        <line x1="100" y1="0" x2="100" y2="400" stroke="white" stroke-width="2" stroke-dasharray="5,5" />
        <line x1="700" y1="0" x2="700" y2="400" stroke="white" stroke-width="2" stroke-dasharray="5,5" />

        <!-- Rota de Teste -->
        <polyline
          points="650,300 650,150 500,50"
          fill="none"
          stroke="#ffeb3b"
          stroke-width="3"
          stroke-dasharray="4"
        />

        <!-- Jogadores -->
        <g v-for="player in players" :key="player.id">
          <!-- Ataque -->
          <circle
            v-if="player.type === 'offense'"
            :cx="player.x"
            :cy="player.y"
            r="16"
            fill="#013369"
            stroke="white"
            stroke-width="2"
          />
          <!-- Defesa -->
          <text
            v-else
            :x="player.x - 8"
            :y="player.y + 8"
            fill="#d50a0a"
            font-weight="bold"
            font-size="22"
          >X</text>

          <text
            :x="player.x - 10"
            :y="player.y + 32"
            fill="white"
            font-size="12"
          >{{ player.position }}</text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['savePlay']);

const playTitle = ref('');
const offenseFormation = ref('Shotgun');

const players = ref([
  { id: 'qb_1', type: 'offense', position: 'QB', x: 400, y: 350, route: [] },
  { id: 'wr_z', type: 'offense', position: 'WR', x: 650, y: 300, route: [{ x: 650, y: 150 }, { x: 500, y: 50 }] },
  { id: 'cb_1', type: 'defense', position: 'CB', x: 650, y: 250, route: [], assignment: 'Man' }
]);

const handleSave = () => {
  if (!playTitle.value) {
    alert('Digite o nome da jogada.');
    return;
  }

  emit('savePlay', {
    title: playTitle.value,
    category: 'Pass',
    offenseFormation: offenseFormation.value,
    defenseCoverage: 'Cover 0 Blitz',
    players: players.value
  });

  playTitle.value = '';
};
</script>

<style scoped>
.canvas-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}
.controls { display: flex; gap: 10px; }
input, select, button { padding: 8px 12px; font-size: 14px; }
button { background-color: #013369; color: white; border: none; cursor: pointer; border-radius: 4px; }
.field-container { border: 4px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.5); }
</style>