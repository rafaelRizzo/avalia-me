Sistema de avaliação

Funcionamento resumido: Será feito o back na branch main e o front-end na branch front, o sistema será gerador de Link com um JWT expirável na URL, através desse JWT será inserido a avaliação no banco de dados, a authenticação para gerar um Link será atraves de um campo na tabela de usuarios, que é denominado id_avaliacao, caso quem esteja fazendo a requisição para gerar o Link de uma avaliação será validado se existe o id passado no banco e será gerado com os dados fundamentas para a inserção, encondando no JWT.

Será um CREATE E READ simples mas bem estruturado e com um pequeno painel ADMIN para cada empresa e um ADMIN.

Esse sistema de avaliação está sendo feito sob uma demanda interna da empresa e estará de livre uso sob a LICENÇA MIT, basta clonar o repositório e fazer a configuração do lado do seu servidor.

Fluxograma base:

<img src="./public/fluxograma.png" width="500"/>

Para o auth, deve ser passado o id único(id_avaliacao) no Headers Auth Bearer que é gerado na criação de um usuário pelo back que estará criptografado, estará salvo na tabela de usuários.

Se localizar o usuário vou gerar um JWT encodando as seguintes informações:

`id_atendente -> Pego na tabela`

`nome_atendente -> Pego na tabela`

`id_avaliacao -> Pego na tabela`

`empresa -> Será passado no Body`

`protocolo_atendimento -> Será passado no Body`

Esse JWT expirará em 24 horas, e ele será a informação principal para gerar a URL de avaliação pois será via GET params, exemplo:

`https://avalia-me/{JWT}`

Todos os JWT’s serão armazenados em uma outra tabela que fará FK com as tabela de avaliações, assim que ele for expirado, automaticamente será deletada do banco de dados (rodará a cada 1 hora já que o token é valido por 1 dia).

Sobre o INSERT da nota imagino que já pegou como vai funcionar, vou mandar o JWT e como meu servidor tem a chave para descriptografar consigo pegar os dados encodados e dar o update com as informações na tabela de avaliações.

Estrutuda do banco:

CREATE DATABASE sistema_avaliacao;

USE sistema_avaliacao;

CREATE TABLE atendente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    id_avaliacao VARCHAR(255) NOT NULL,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    jwt TEXT DEFAULT NULL,
    empresa_contrao INT NOT NULL,
    role ENUM('admin', 'client') DEFAULT 'client',
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL,
    nome_atendente VARCHAR(255) NOT NULL,
    empresa_contrato INT NOT NULL,
    empresa VARCHAR(255) NOT NULL,
    jwt TEXT NOT NULL,
    status ENUM('pendente', 'avaliado') DEFAULT 'pendente',
    protocolo_atendimento VARCHAR(255) NOT NULL,
    data_ultima_alteracao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE avaliacoes_pendentes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jwt TEXT NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);


@ Dev Full Stack ASTERISK | NEXTJS | NODEJS | MYSQL ~  Rafael Rizzo Breschi

Faça uma doação <3

PIX Chave aleatória: `f96b5084-db1d-4051-85c1-70a7e235c2c6`