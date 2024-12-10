export default class AtendenteModel {
    constructor({ id, name, id_avaliacao, status, data_criacao }) {
        this.id = id;
        this.name = name;
        this.id_avaliacao = id_avaliacao;
        this.status = status;
        this.data_criacao = data_criacao;
    }

    addUser({ name, id_avaliacao, status }) {
        const query = 'INSERT INTO atendente (name, id_avaliacao, status) VALUES (?, ?, ?)';
        const values = [name, id_avaliacao, status];

        try {
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Erro ao inserir atendente:', err);
                    console.log(result);
                } else {
                    console.log('Atendente inserido com sucesso!');
                }
            });
        } catch (error) {
            console.error('Erro ao inserir atendente:', error);

        }
    }

    getUsers() {
        const query = 'SELECT * FROM atendente';
        try {
            db.query(query, (err, result) => {
                if (err) {
                    console.error('Erro ao localizar atendente:', err);
                } else {
                    console.log('Atendente localizado com sucesso!');
                    console.log(result);
                }
            });
        } catch (error) {
            console.error('Erro ao localizar atendente:', error);

        }
    }

    getUserById({ id_atendente }) {
        const query = 'SELECT * FROM atendente WHERE id_atendente = ? LIMIT 1';
        const values = [id_atendente];
        try {
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Erro ao localizar atendente por id:', err);
                } else {
                    console.log('Atendente localizado por id com sucesso!');
                    console.log(result);
                }
            });
        } catch (error) {
            console.error('Erro ao localizar atendente por id:', error);

        }
    }

    updateUser({ name, id_avaliacao, status, id }) {
        const query = 'UPDATE atendente SET name = ?, id_avaliacao = ?, status = ? WHERE id_atendente = ?';
        const values = [name, id_avaliacao, status, id];

        try {
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar atendente por id:', err);
                } else {
                    console.log('Atendente atualizado por id com sucesso!');
                    console.log(result);
                }
            });
        } catch (error) {
            console.error('Erro ao atualizar atendente por id:', error);

        }
    }

    removeUser({ id }) {
        const query = 'DELETE FROM atendente WHERE id_atendente = ?';
        const values = [id];

        try {
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Erro ao deletar atendente por id_atendente:', err);
                } else {
                    console.log('Atendente deletado por id_atendente com sucesso!');
                    console.log(result);
                }
            });
        } catch (error) {
            console.error('Erro ao deletar atendente por id_atendente:', error);

        }
    }
}