require("dotenv").config();
const express = require("express");
const produtosRouter = require("./routes/produtos");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de controle de estoque funcionando!",
    rotas: "/produtos"
  });
});

app.use("/produtos", produtosRouter);

// JSON malformado no corpo da requisição
app.use((erro, req, res, next) => {
  if (erro.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "JSON inválido no corpo da requisição" });
  }
  console.error(erro);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

// Rota inexistente
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`);
});
