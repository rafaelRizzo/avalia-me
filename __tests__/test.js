import axios from 'axios'; // Usando axios para fazer requisições HTTP
import { expect } from 'chai'; // Chai para asserções
import { logger } from './../src/logger/index.js';

const API_URL = 'http://localhost:3000'; // Porta padrão do servidor

describe('Testando a rota CREATE para avaliação', function () {
    // Aumenta o tempo limite do teste para evitar falhas por timeout
    this.timeout(5000);

    it('Deve gerar uma avaliação e retornar status 201', async () => {
        const body = {
            nome_atendente: 'João Silva',
            nome_empresa: 'Empresa XYZ',
            ip_generated: '1.1.1.1',
            protocolo_atendimento: '123456789',
        };

        try {
            const response = await axios.post(`${API_URL}/generate`, body, {
                headers: { 'Content-Type': 'application/json' },
            });

            const data = response.data;
            logger.info('Resposta da API:', data);

            // Validações
            expect(response.status).to.equal(201);
            expect(data.message).to.equal('Avaliação criada com sucesso');
            expect(data).to.have.property('uuid'); // Verifica se o UUID foi gerado
        } catch (error) {
            logger.error('Erro na requisição:', error.response?.data || error.message);
            throw error;
        }
    });
});
