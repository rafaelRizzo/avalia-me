export default class UserModel {
    constructor({ id, username, password, jwt, empresa_contrato, role, status, data_criacao }) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.jwt = jwt;
        this.empresa_contrao = empresa_contrato;
        this.role = role;
        this.status = status;
        this.data_criacao = data_criacao;
    }

    addUser({ username, password, empresa_contrato }) {
        const query = 'INSERT INTO usuario (username, password, empresa_contrato) VALUES (?, ?, ?)';
        const values = [username, password, empresa_contrato];

        try {
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Erro ao inserir usuário:', err);
                    console.log(result);
                } else {
                    console.log('Usuário inserido com sucesso!');
                }
            });
        } catch (error) {
            console.error('Erro ao inserir usuário:', error);

        }
    }

    getUsers() {
        const query = 'SELECT * FROM usuarios';
        try {
            db.query(query, (err, result) => {
                if (err) {
                    console.error('Erro ao localizar usuário:', err);
                } else {
                    console.log('Usuário localizado com sucesso!');
                    console.log(result);
                }
            });
        } catch (error) {
            console.error('Erro ao localizar usuário:', error);

        }
    }

    getUserById({ id }) {
        const query = 'SELECT * FROM atendente WHERE id = ? LIMIT 1';
        const values = [id];
        try {
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Erro ao localizar usuário por id:', err);
                } else {
                    console.log('Usuário localizado por id com sucesso!');
                    console.log(result);
                }
            });
        } catch (error) {
            console.error('Erro ao localizar usuário por id:', error);

        }
    }

    updateUser({ username, password, empresa_contrato, role, status, id }) {
        const query = 'UPDATE atendente SET nome = ?, id_avaliacao = ?, status = ?, id_atendente = ? WHERE id = ?';
        const values = [username, password, empresa_contrato, role, status, id];

        try {
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar usuário por id:', err);
                } else {
                    console.log('Usuário atualizado por id com sucesso!');
                    console.log(result);
                }
            });
        } catch (error) {
            console.error('Erro ao atualizar usuário por id:', error);

        }
    }

    removeUser({ id }) {
        const query = 'DELETE FROM usuarios WHERE id = ?';
        const values = [id];

        try {
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Erro ao deletar usuário por id:', err);
                } else {
                    console.log('Usuário deletado por id com sucesso!');
                    console.log(result);
                }
            });
        } catch (error) {
            console.error('Erro ao deletar usuário por id:', error);

        }
    }
}