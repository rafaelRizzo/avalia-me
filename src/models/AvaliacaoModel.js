export default class AtendenteModel {
    constructor({ id, uuid, nome_atendente, empresa_contrato, nome_empresa, nota_atendimento, nota_empresa, obs, ip_client, jwt, status, protocolo_atendimento, data_ultima_alteracao, data_criacao }) {
        this.id = id;
        this.uuid = uuid;
        this.nome_atendente = nome_atendente;
        this.empresa_contrato = empresa_contrato;
        this.nome_empresa = nome_empresa;
        this.nota_atendimento = nota_atendimento;
        this.nota_empresa = nota_empresa;
        this.obs = obs;
        this.ip_client = ip_client;
        this.jwt = jwt;
        this.status = status;
        this.protocolo_atendimento = protocolo_atendimento;
        this.data_ultima_alteracao = data_ultima_alteracao;
        this.data_criacao = data_criacao;
    }

    addAvaliacao({ jwt }) {
        const query = `INSERT INTO avaliacao ( uuid, nome_atendente, empresa_contrato, nome_empresa, nota_atendimento, nota_empresa, jwt, ip_generated, protocolo_atendimento ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [uuid, jwt_decoded.nome_atendente, jwt_decoded.empresa_contrato, jwt_decoded.nome_empresa, jwt_decoded.nota_atendimento, jwt_decoded.nota_empresa, jwt, jwt_decoded.ip_generated, jwt_decoded.protocolo_atendimento];
        try {
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Erro ao inserir avaliação:', err);
                    console.log(result);
                } else {
                    console.log('Avaliação inserida com sucesso!');
                }
            });
        } catch (error) {
            console.error('Erro ao inserir avaliação:', error);

        }
    }

    getAvaliacoes() {
        const query = 'SELECT * FROM avaliacoes';
        try {
            db.query(query, (err, result) => {
                if (err) {
                    console.error('Erro ao localizar avaliacoes:', err);
                } else {
                    console.log('Atendente localizado com sucesso!');
                    console.log(result);
                }
            });
        } catch (error) {
            console.error('Erro ao localizar atendente:', error);
        }
    }

    getAvaliacoesByUUID({ uuid }) {
        const query = 'SELECT * FROM avaliacoes WHERE uuid = ?';
        const values = [uuid];
        try {
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Erro ao localizar avaliação por uuid:', err);
                } else {
                    console.log('Avaliação localizado por uuid com sucesso!');
                    console.log(result);
                }
            });
        } catch (error) {
            console.error('Erro ao localizar avaliação por uuid:', error);
        }
    }

    updateAvaliacao({ jwt, ip_client, nota_atendimento, nota_empresa, obs }) {
        const query = 'UPDATE avaliacao SET nota_atendimento = ?, nota_empresa = ?, obs = ?, ip_client = ? WHERE jwt = ? LIMIT 1';
        const values = [nota_atendimento, nota_empresa, obs, ip_client, jwt];
        try {
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar avaliação por jwt:', err);
                } else {
                    console.log('Avaliação atualizada por jwt com sucesso!');
                    console.log(result);
                }
            });
        } catch (error) {
            console.error('Erro ao atualizar avaliação por jwt:', error);
        }
    }

    removeAvaliacao({ jwt }) {
        const query = 'DELETE FROM atendente WHERE jwt = ?';
        const values = [jwt];

        try {
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Erro ao deletar avaliação por jwt:', err);
                } else {
                    console.log('Avaliação deletado por jwt com sucesso!');
                    console.log(result);
                }
            });
        } catch (error) {
            console.error('Erro ao deletar por avaliação jwt:', error);
        }
    }
}