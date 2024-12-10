import mysql from 'mysql2/promise';

// URL de conexão MySQL no formato: mysql://USER:PASSWORD@HOST:PORT/DATABASE
const connectionUrl = process.env.DB_URL_CONNECTION;

if (!connectionUrl) {
    throw new Error('DB_URL_CONNECTION não está definida no arquivo .env');
}

const db = mysql.createPool({
    uri: connectionUrl,
    waitForConnections: true,    // Esperar por conexões disponíveis
    connectionLimit: 10,         // Número máximo de conexões no pool
    queueLimit: 0                // Número máximo de requisições na fila (0 = ilimitado)
});

export default db;
