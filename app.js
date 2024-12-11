import 'dotenv/config';
import express from 'express';
import { createClient } from 'redis';
import AvaliacaoRoutes from './src/routes/AvaliacaoRoutes.js'; // Remova as chaves aqui

const app = express();
app.use(express.json());

// Criando o cliente Redis
const redisClient = createClient();
redisClient.connect()
  .then(() => console.log('Conectado ao Redis com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao Redis:', err));

// Usando as rotas
app.use('/', AvaliacaoRoutes);

// Iniciando o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
