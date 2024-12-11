import 'dotenv/config';
import { logger } from './../logger/index.js';
import db from './../config/db.js';
import { v7 as uuid } from 'uuid';
import jwt, { decode } from 'jsonwebtoken';

// Cliente irá acessar o site e vai passar o jwt na url automaticamente, depois de ter passado o NEXTJS vai ter uma req server side para validar se o token ainda é valido e não já não foi respondida, só assim ela vai ser renderizada para o cliente, a url irá mudar do jwt para o uuid da avaliação para que não seja possivel acessar a url direto, evitando fraudes.
// A url da avaliação é gerada pelo servidor e não pelo cliente, pois o cliente não tem acesso ao servidor, então o servidor gera a url e envia para o cliente.

class AvaliacaoController {
    async generate(req, res) {

        const { nome_atendente, nome_empresa, protocolo } = req.body;

        // Gerando um ID unico para a avaliação
        const uuid_generated = uuid();

        const data_sign = {
            uuid_generated,
            nome_atendente,
            nome_empresa,
            protocolo,
        }

        try {
            const token = jwt.sign(data_sign, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES
            });

            logger.info(`Token gerado com sucesso: ${token}`);

            logger.info(`Dados decoded do token: ${JSON.stringify(jwt.decode(token))}`);
        } catch (error) {
            logger.error(`Erro ao gerar token de acesso: ${error}`);
        }

    }

    async insertAvaliacao(req, res) {
        logger.info('Um cliente respondeu a uma avaliação');
        const { uuid } = req.body;
        let jwt = req.headers.authorization;
        jwt = jwt.replace('Bearer ', '');


        logger.info(`Token recebido: ${token}`)
        logger.info(`UUID recebido: ${uuid_body}`)

        logger.info('Decodificando token...');
        try {
            const decoded = jwt.decode(token);

            logger.info('Token decodificado.');

            // acessar o uuid_generated dentro do token decoded
            const uuid_generated = decoded.uuid_generated;

            // comparar o uuid_body com o uuid_generated
            logger.info('Comparando uuid com o token...');
            if (uuid_body !== uuid_generated) {
                logger.warn('uuid inválido');
            } else {
                logger.info('uuid válido continunando...');
                logger.info('Inserindo avaliação no banco de dados...');

                logger.info('Inserção  concluída!');;
            }
        } catch (error) {
            logger.error(`Erro ao decodificar token: ${error}`);
        }
    }
}

let teste = new AvaliacaoController();
teste.insertAvaliacao();
// export default new AvaliacaoController();