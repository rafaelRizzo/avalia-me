import express from 'express';
import AvaliacaoRoutes from './src/routes/AvaliacaoRoutes.js';
import './src/config/db.js'; // Conexão com o banco de dados

const app = express();

// Middlewares
app.use(express.json());

// Rotas
app.use('/', AvaliacaoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
