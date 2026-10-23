# API de Estoque de Produtos

API CRUD de produtos feita com Node.js, Express e MySQL.

## Estrutura

    app.js                       servidor e configuração geral
    config/db.js                 conexão com o MySQL
    routes/produtos.js           definição das rotas
    controllers/                 lógica de cada rota
    middlewares/                 validação de ID e do corpo da requisição
    database/script.sql          criação do banco, da tabela e dados de exemplo

## Como rodar

1. Instale as dependências:

       npm install

2. Abra o MySQL Workbench e execute o arquivo `database/script.sql` para criar o banco `estoquedb`, a tabela `produtos` e alguns dados de exemplo.

3. Copie o arquivo `.env.example` para `.env` e ajuste os dados de conexão (usuário e senha do MySQL, se tiver).

4. Inicie o servidor:

       npm start

5. Abra http://localhost:3000 no navegador.

## Rotas

| Método | Rota | Descrição |
| ------ | ---- | --------- |
| POST | /produtos | cadastra um produto |
| GET | /produtos | lista os produtos (aceita filtros) |
| GET | /produtos/:id | busca um produto pelo ID |
| PUT | /produtos/:id | atualiza um produto |
| DELETE | /produtos/:id | exclui um produto |

### Filtros na listagem

- `GET /produtos?nome=teclado` busca produtos cujo nome contém o texto
- `GET /produtos?categoria=Periféricos` filtra por categoria
- Os dois podem ser combinados

### Corpo para POST e PUT

    {
      "nome": "Teclado mecânico",
      "descricao": "Switch azul, layout ABNT2",
      "categoria": "Periféricos",
      "preco": 149.90,
      "quantidade": 20
    }

`nome`, `preco` e `quantidade` são obrigatórios. `descricao` é opcional e `categoria` assume "Geral" quando não é enviada.

### Respostas de erro

- `400` dados inválidos, ID inválido ou JSON malformado
- `404` produto ou rota não encontrada
- `500` erro interno ao acessar o banco
