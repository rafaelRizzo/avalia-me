import { logger } from '../logger/index.js';
import AvaliacaoModel from '../models/AvaliacaoModel.js'; // Importando o modelo de avaliação

class AvaliacaoController {
  async create(req, res) {
    const { nome_atendente, nome_empresa, protocolo } = req.body;

    try {
      // Criar avaliação através do AvaliacaoModel
      const { uuid_generated, token } = await AvaliacaoModel.createAvaliacao({ nome_atendente, nome_empresa, protocolo });

      // Enviar resposta com UUID gerado e o token
      res.json({ uuid_generated, token });

    } catch (error) {
      logger.error(`Erro ao gerar avaliação: ${error}`);
      res.status(500).json('Erro ao gerar a avaliação');
    }
  }

  async verify(req, res) {
    const { uuid } = req.params;
    const { token } = req.body;  // O token será enviado no corpo da requisição

    try {
      // Verificar a validade do UUID e do token
      const { valid, message } = await AvaliacaoModel.verifyTokenAndUUID(uuid, token);

      if (!valid) {
        return res.status(400).json(message);
      }

      return res.status(200).json(message);

    } catch (error) {
      logger.error(`Erro ao verificar avaliação: ${error}`);
      res.status(500).json('Erro ao verificar avaliação');
    }
  }

  async listValidUUID(req, res) {
    try {
      // Listar UUIDs válidos
      const { validData, message } = await AvaliacaoModel.listValidUUIDs();

      if (validData.length === 0) {
        return res.status(200).json(message);
      }

      return res.status(200).json(validData);

    } catch (error) {
      logger.error(`Erro ao listar UUIDs válidos: ${error}`);
      res.status(500).json('Erro ao listar UUIDs');
    }
  }
}

export default new AvaliacaoController();  // Exporta a instância já criada
