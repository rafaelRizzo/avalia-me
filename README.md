Sistema de avaliação

Esse sistema de avaliação está sendo feito sob uma demanda interna da empresa e estará de livre uso sob a LICENÇA MIT, basta clonar o repositório e fazer a configuração do lado do seu servidor.

Tecnologias utilizadas:
NODEJS, REDIS, MYSQL, JWT, UUID, EXPRESS

ESTRUTURA DAS PASTAS: 
MODELO MVC

MODEL -> CONTROLA A ACESSO AOS DADOS DO BANCO DE DADOS E LOGICAS MAIS COMPLEXAS (BAIXO NIVEL)
VIEW -> ROTAS DA API
CONTROLLER -> MODELO DO NEGOCIO, LOGICAS, BUSINESS, VALIDAÇÕES, ETC

Estutura do banco:

CREATE DATABASE sistema_avaliacao;

USE sistema_avaliacao;

CREATE TABLE avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL,
    nome_atendente VARCHAR(255) NOT NULL,
    empresa_contrato INT NOT NULL,
    nome_empresa VARCHAR(255) NOT NULL,
    nota_atendimento INT NOT NULL,
    nota_empresa INT NOT NULL,
    obs VARCHAR(1000) NOT NULL,
    ip_generated VARCHAR(255) NOT NULL,
    ip_client VARCHAR(255) NOT NULL,
    jwt TEXT NOT NULL,
    status ENUM('pendente', 'avaliado') DEFAULT 'pendente',
    protocolo_atendimento VARCHAR(255) NOT NULL,
    data_ultima_alteracao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

@ Dev Full Stack ASTERISK | NEXTJS | NODEJS | MYSQL ~  Rafael Rizzo Breschi

Faça uma doação <3

PIX Chave aleatória: `f96b5084-db1d-4051-85c1-70a7e235c2c6`