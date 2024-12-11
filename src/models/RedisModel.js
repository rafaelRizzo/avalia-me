// models/RedisModel.js
import { createClient } from 'redis';
import { logger } from '../logger/index.js';

const redisClient = createClient();

class RedisModel {
  static async connect() {
    try {
      await redisClient.connect();
      logger.info('Conectado ao Redis com sucesso!');
    } catch (err) {
      logger.error('Erro ao conectar ao Redis:', err);
    }
  }

  static async setEx(key, expiration, value) {
    try {
      await redisClient.setEx(key, expiration, JSON.stringify(value));
      logger.info(`Dados armazenados no Redis para a chave: ${key}`);
    } catch (err) {
      logger.error('Erro ao armazenar no Redis:', err);
    }
  }

  static async get(key) {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      logger.error('Erro ao recuperar do Redis:', err);
    }
  }

  static async keys(pattern = '*') {
    try {
      return await redisClient.keys(pattern);
    } catch (err) {
      logger.error('Erro ao recuperar as chaves no Redis:', err);
    }
  }
}

export default RedisModel;
