import AvaliacaoModel from '../models/AvaliacaoModel.js';
import { v7 as uuidv7 } from 'uuid';

class AvaliacaoController {
  async criarAvaliacao(req, res) {
    try {
      const { nome_atendente, nome_empresa, ip_generated, protocolo_atendimento } = req.body;

      // Gerar UUID
      const uuid = uuidv7();

      // Criar avaliação no banco
      const avaliacao = {
        uuid, nome_atendente, nome_empresa, ip_generated, protocolo_atendimento,
      };

      await AvaliacaoModel.criarAvaliacao(avaliacao);

      res.status(201).json({
        message: 'Avaliação criada com sucesso',
        uuid,
      });
    } catch (error) {
      // Log detalhado apenas para desenvolvedores (em ambiente de desenvolvimento)
      if (process.env.NODE_ENV === 'development') {
        console.error(error);  // Loga o erro completo no console, incluindo stack trace
      } else {
        console.error(error.message); // Loga apenas a mensagem simples no console
      }
      res.status(500).json({ message: 'Erro ao criar avaliação', error: error.message });
    }
  }

  async validarJWT(req, res) {
    try {
      const { uuid } = req.params;

      // Validar JWT no model
      const decoded = await AvaliacaoModel.validarJWT(uuid);

      res.status(200).json({ message: 'JWT válido', decoded });
    } catch (error) {
      // Log detalhado apenas para desenvolvedores (em ambiente de desenvolvimento)
      if (process.env.NODE_ENV === 'development') {
        console.error(error);  // Loga o erro completo no console, incluindo stack trace
      } else {
        console.error(error.message); // Loga apenas a mensagem simples no console
      }
      const status = error.message === 'Avaliação não encontrada' ? 404 : 401;
      res.status(status).json({ message: error.message });
    }
  }

  async listarAvaliacoes(req, res) {
    try {
      const { data_inicial, data_final, status, nome_atendente, nome_empresa } = req.query;

      const filtros = {
        data_inicial,
        data_final,
        status,
        nome_atendente,
        nome_empresa,
      };

      // Filtrar e listar as avaliações
      const avaliacoes = await AvaliacaoModel.listarAvaliacoes(filtros);

      res.status(200).json({ message: 'Avaliações listadas com sucesso', data: avaliacoes });
    } catch (error) {
      // Log detalhado apenas para desenvolvedores (em ambiente de desenvolvimento)
      if (process.env.NODE_ENV === 'development') {
        console.error(error);  // Loga o erro completo no console, incluindo stack trace
      } else {
        console.error(error.message); // Loga apenas a mensagem simples no console
      }
      res.status(500).json({ message: 'Erro ao listar avaliações', error: error.message });
    }
  }
}

export default new AvaliacaoController();
