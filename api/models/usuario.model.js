const db = require("../config/db");

const Usuario = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM usuario", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM usuario WHERE id = ?", [id], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM usuario WHERE UsuarioId = ? LIMIT 1",
        [email],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  },
  // Más métodos según necesites (create, update, delete, etc.)
};

module.exports = Usuario;
