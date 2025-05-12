const express = require("express");
const router = express.Router();
const registroDiarioCajaController = require("../controllers/registrodiariocaja.controller");
const authMiddleware = require("../middlewares/auth");

// Rutas protegidas (requieren autenticación)
router.get("/", authMiddleware, registroDiarioCajaController.getAllRegistros);
router.get(
  "/search",
  authMiddleware,
  registroDiarioCajaController.searchRegistros
);
router.get(
  "/:id",
  authMiddleware,
  registroDiarioCajaController.getRegistroById
);

module.exports = router;
