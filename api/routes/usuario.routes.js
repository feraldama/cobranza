const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");
const authMiddleware = require("../middlewares/auth");

// Rutas públicas (no requieren autenticación)
router.post("/login", usuarioController.login);

// Rutas protegidas (requieren autenticación)
router.get("/", authMiddleware, usuarioController.getAllUsuarios);
router.get("/:id", authMiddleware, usuarioController.getUsuarioById);

// Más rutas según necesites

module.exports = router;
