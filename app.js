import 'dotenv/config';

import express from 'express';

import cors from 'cors';
import UserRoutes from './src/routes/UserRoutes.js';
import { logger } from './src/logger/index.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", UserRoutes);


app.listen(process.env.PORT || 3000, () => {
    logger.info(`Servidor rodando na porta ${process.env.PORT}`);
});
