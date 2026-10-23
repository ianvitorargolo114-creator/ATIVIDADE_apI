CREATE DATABASE IF NOT EXISTS estoquedb;

USE estoquedb;

CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NULL,
    categoria VARCHAR(50) NOT NULL DEFAULT 'Geral',
    preco DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO produtos (nome, descricao, categoria, preco, quantidade) VALUES
('Teclado mecânico', 'Switch azul, layout ABNT2', 'Periféricos', 149.90, 20),
('Mouse sem fio', 'Sensor óptico 1600 DPI', 'Periféricos', 59.90, 35),
('Monitor 24"', 'Full HD, painel IPS', 'Monitores', 799.00, 8);
