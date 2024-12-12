import fetch from 'node-fetch'; // Usando node-fetch para fazer requisições HTTP
import { expect } from 'chai'; // Chai para asserções
import { createServer } from 'http'; // Para iniciar um servidor HTTP
import AvaliacaoController from '../src/controllers/AvaliacaoController.js'; // Ajuste conforme necessário
import { logger } from './../src/logger/index.js';

describe('Testando a rota CREATE para avaliação', () => {
    let testServer;

    before(() => {
        // Inicia o servidor antes de rodar os testes
        testServer = createServer(AvaliacaoController);
        testServer.listen(3001);
    });

    after(() => {
        // Fecha o servidor após os testes
        testServer.close();
    });

    it('Deve gerar uma avaliação e retornar status 201', async () => {
        const body = {
            nome_atendente: 'João Silva',
            nome_empresa: 'Empresa XYZ',
            // ip_generated: '192.168.0.1',
            protocolo_atendimento: '123456789'
        };

        const response = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        logger.info("data", data);
        expect(response.status).to.equal(201);
        expect(data.message).to.equal('Avaliação criada com sucesso');
        expect(data).to.have.property('uuid'); // Verifica se o UUID foi gerado
    });
});
