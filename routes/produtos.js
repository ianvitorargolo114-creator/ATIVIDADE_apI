const express = require("express");
const controller = require("../controllers/produtosController");
const validarId = require("../middlewares/validarId");
const validarProduto = require("../middlewares/validarProduto");

const router = express.Router();

router.post("/", validarProduto, controller.criar);
router.get("/", controller.listar);
router.get("/:id", validarId, controller.buscarPorId);
router.put("/:id", validarId, validarProduto, controller.atualizar);
router.delete("/:id", validarId, controller.excluir);

module.exports = router;
