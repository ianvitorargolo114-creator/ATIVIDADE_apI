const pool = require("../config/db");

const CAMPOS =
  "id, nome, descricao, categoria, preco, quantidade, criado_em, atualizado_em";

async function criar(req, res) {
  const { nome, descricao = null, categoria = "Geral", preco, quantidade } = req.body;

  try {
    const [resultado] = await pool.query(
      "INSERT INTO produtos (nome, descricao, categoria, preco, quantidade) VALUES (?, ?, ?, ?, ?)",
      [nome.trim(), descricao, categoria.trim(), preco, quantidade]
    );

    res.status(201).json({
      mensagem: "Produto cadastrado com sucesso!",
      id: resultado.insertId
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao cadastrar produto" });
  }
}

async function listar(req, res) {
  const { nome, categoria } = req.query;
  const filtros = [];
  const valores = [];

  if (nome) {
    filtros.push("nome LIKE ?");
    valores.push(`%${nome}%`);
  }
  if (categoria) {
    filtros.push("categoria = ?");
    valores.push(categoria);
  }

  const where = filtros.length > 0 ? `WHERE ${filtros.join(" AND ")}` : "";

  try {
    const [produtos] = await pool.query(
      `SELECT ${CAMPOS} FROM produtos ${where} ORDER BY id`,
      valores
    );

    res.json({ total: produtos.length, produtos });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao consultar produtos" });
  }
}

async function buscarPorId(req, res) {
  try {
    const [produtos] = await pool.query(
      `SELECT ${CAMPOS} FROM produtos WHERE id = ?`,
      [req.id]
    );

    if (produtos.length === 0) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    res.json(produtos[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao consultar produto" });
  }
}

async function atualizar(req, res) {
  const { nome, descricao = null, categoria = "Geral", preco, quantidade } = req.body;

  try {
    const [resultado] = await pool.query(
      "UPDATE produtos SET nome = ?, descricao = ?, categoria = ?, preco = ?, quantidade = ? WHERE id = ?",
      [nome.trim(), descricao, categoria.trim(), preco, quantidade, req.id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    res.json({ mensagem: "Produto atualizado com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao atualizar produto" });
  }
}

async function excluir(req, res) {
  try {
    const [resultado] = await pool.query("DELETE FROM produtos WHERE id = ?", [req.id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    res.json({ mensagem: "Produto excluído com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao excluir produto" });
  }
}

module.exports = { criar, listar, buscarPorId, atualizar, excluir };
