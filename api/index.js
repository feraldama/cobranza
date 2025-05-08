require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Importar rutas
const usuarioRoutes = require("./routes/usuario.routes");
// const productoRoutes = require("./routes/producto.routes"); // Ejemplo adicional

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/usuarios", usuarioRoutes);
// app.use("/api/productos", productoRoutes); // Ejemplo adicional

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// Manejo de errores (puedes mejorarlo)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
