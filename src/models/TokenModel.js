import jwt from 'jsonwebtoken';
import { logger } from '../logger/index.js';

class TokenModel {
  static generate(data) {
    try {
      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
      });
      logger.info(`Token gerado com sucesso: ${token}`);
      return token;
    } catch (error) {
      logger.error(`Erro ao gerar token: ${error}`);
      throw new Error('Erro ao gerar token');
    }
  }

  static verify(token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (error) {
      logger.error(`Erro ao verificar token: ${error}`);
      return false;
    }
  }

  static decode(token) {
    try {
      return jwt.decode(token);
    } catch (error) {
      logger.error(`Erro ao decodificar token: ${error}`);
      return null;
    }
  }
}

export default TokenModel;
