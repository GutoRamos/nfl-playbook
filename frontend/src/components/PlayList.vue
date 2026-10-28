<template>
  <div class="list-container">
    <h2>Jogadas Salvas no Playbook</h2>
    <div v-if="loading">Carregando jogadas...</div>
    <div v-else-if="plays.length === 0">Nenhuma jogada cadastrada.</div>

    <div v-else class="cards-grid">
      <div v-for="play in plays" :key="play._id" class="play-card">
        <h3>{{ play.title }}</h3>
        <p><strong>Formação:</strong> {{ play.offenseFormation }}</p>
        <p><strong>Cobertura:</strong> {{ play.defenseCoverage }}</p>
        <p><strong>Jogadores:</strong> {{ play.players ? play.players.length : 0 }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  plays: { type: Array, required: true },
  loading: { type: Boolean, default: false }
});
</script>

<style scoped>
.list-container { max-width: 800px; margin: 0 auto; text-align: left; }
.cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 15px; margin-top: 15px; }
.play-card { background-color: #2a2a2a; border-left: 4px solid #013369; padding: 15px; border-radius: 6px; }
.play-card h3 { margin-top: 0; color: #ffeb3b; }
</style>