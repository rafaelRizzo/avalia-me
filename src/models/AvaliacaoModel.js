import { v7 as uuid } from 'uuid';
import TokenModel from './TokenModel.js'; // Para a geração e verificação de token
import RedisModel from './RedisModel.js'; // Para a interação com Redis
import { logger } from '../logger/index.js';

class AvaliacaoModel {
  static async createAvaliacao({ nome_atendente, nome_empresa, protocolo }) {
    const uuid_generated = uuid();  // Gerar UUID único para a avaliação

    const data_sign = {
      uuid_generated,
      nome_atendente,
      nome_empresa,
      protocolo,
    };

    try {
      // Gerar o token JWT
      const token = TokenModel.generate(data_sign);

      const dataToStore = {
        uuid: uuid_generated,
        token: token
      };

      // Armazenar UUID e Token no Redis com expiração de 60 segundos
      await RedisModel.setEx(uuid_generated, 60, dataToStore);

      // Retornar os dados da avaliação criada
      return { uuid_generated, token };
    } catch (error) {
      logger.error(`Erro ao criar avaliação: ${error}`);
      throw new Error('Erro ao criar a avaliação');
    }
  }

  static async verifyTokenAndUUID(uuid, token) {
    try {
      // Recuperar os dados armazenados no Redis
      const storedData = await RedisModel.get(uuid);
      if (!storedData) {
        logger.warn('UUID não encontrado ou expirado');
        return { valid: false, message: 'UUID inválido ou expirado' };
      }

      // Verificar se o token é válido
      if (!TokenModel.verify(token)) {
        logger.warn('Token inválido');
        return { valid: false, message: 'Token inválido' };
      }

      // Verificar se o UUID no Redis corresponde ao UUID passado
      if (uuid !== storedData.uuid) {
        logger.warn('UUID não corresponde ao UUID no token');
        return { valid: false, message: 'UUID inválido' };
      }

      return { valid: true, message: 'UUID e token válidos' };
    } catch (err) {
      logger.error('Erro ao verificar UUID e token:', err);
      return { valid: false, message: 'Erro ao verificar UUID e token' };
    }
  }

  static async listValidUUIDs() {
    try {
      // Recuperar todas as chaves armazenadas no Redis
      const keys = await RedisModel.keys('*');
      if (keys.length === 0) {
        return { validData: [], message: 'Nenhum UUID encontrado no Redis.' };
      }

      const validData = [];

      // Verificar a validade de cada UUID
      for (let key of keys) {
        const storedData = await RedisModel.get(key);
        if (!storedData) continue;

        const { token, uuid: storedUuid } = storedData;
        if (TokenModel.verify(token) && key === storedUuid) {
          validData.push(storedData);
        }
      }

      return { validData, message: validData.length > 0 ? 'UUIDs válidos encontrados.' : 'Nenhum UUID válido encontrado.' };
    } catch (err) {
      logger.error('Erro ao listar UUIDs no Redis:', err);
      return { validData: [], message: 'Erro ao listar UUIDs' };
    }
  }
}

export default AvaliacaoModel;
