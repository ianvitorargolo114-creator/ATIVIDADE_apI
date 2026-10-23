// Garante que o parâmetro :id seja um inteiro positivo.
function validarId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  req.id = id;
  next();
}

module.exports = validarId;
