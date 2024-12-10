import db from "../config/db.js";

class AuthModel {

    verificaIDAtendente(id_avaliacao) {
        const query = `SELECT * FROM atendente WHERE id_avaliacao = ?`;
        try {
            return db.query(query, [id_avaliacao]);
        } catch (error) {
            logger.error(error);
            return false;
        }
    }

}

export default new AuthModel();