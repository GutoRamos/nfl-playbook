require('dotenv').config();

// Corrija o caminho para buscar dentro da pasta 'src'
const app = require('./src/app'); 
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
  });
});