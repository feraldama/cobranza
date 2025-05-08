const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.getAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.getById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email y contraseña son requeridos",
      });
    }

    const usuario = await Usuario.findByEmail(email);

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    // Comparación directa (texto plano)
    if (password !== usuario.UsuarioContrasena) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    // Crear payload seguro
    const payload = {
      id: usuario.UsuarioID,
      email: usuario.UsuarioCorreo,
      isAdmin: usuario.UsuarioIsAdmin,
      estado: usuario.UsuarioEstado,
    };

    // Generar token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    res.json({
      success: true,
      token,
      user: {
        id: usuario.UsuarioID,
        email: usuario.UsuarioCorreo,
        nombre: usuario.UsuarioNombre,
        isAdmin: usuario.UsuarioIsAdmin,
        estado: usuario.UsuarioEstado,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
};
// Más controladores según necesites
