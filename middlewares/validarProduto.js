// Valida o corpo das requisições POST e PUT de produtos.
function validarProduto(req, res, next) {
  const { nome, descricao, categoria, preco, quantidade } = req.body || {};
  const erros = [];

  if (typeof nome !== "string" || nome.trim() === "") {
    erros.push("Nome não pode ser vazio");
  } else if (nome.trim().length > 100) {
    erros.push("Nome deve ter no máximo 100 caracteres");
  }

  if (descricao !== undefined && descricao !== null) {
    if (typeof descricao !== "string" || descricao.length > 255) {
      erros.push("Descrição deve ser um texto de até 255 caracteres");
    }
  }

  if (categoria !== undefined) {
    if (typeof categoria !== "string" || categoria.trim() === "" || categoria.length > 50) {
      erros.push("Categoria deve ser um texto de 1 a 50 caracteres");
    }
  }

  if (typeof preco !== "number" || !Number.isFinite(preco) || preco < 0) {
    erros.push("Preço inválido");
  }

  if (!Number.isInteger(quantidade) || quantidade < 0) {
    erros.push("Quantidade inválida");
  }

  if (erros.length > 0) {
    return res.status(400).json({ erro: erros[0], detalhes: erros });
  }

  next();
}

module.exports = validarProduto;
