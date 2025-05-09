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
      db.query(
        "SELECT * FROM usuario WHERE UsuarioId = ?",
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results.length > 0 ? results[0] : null);
        }
      );
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
  getAllPaginated: (limit, offset) => {
    return new Promise((resolve, reject) => {
      // Consulta para obtener los usuarios paginados
      db.query(
        "SELECT * FROM usuario LIMIT ? OFFSET ?",
        [limit, offset],
        (err, results) => {
          if (err) return reject(err);

          // Consulta para contar el total de usuarios
          db.query(
            "SELECT COUNT(*) as total FROM usuario",
            (err, countResult) => {
              if (err) return reject(err);

              resolve({
                usuarios: results,
                total: countResult[0].total,
              });
            }
          );
        }
      );
    });
  },

  search: (term, limit, offset) => {
    return new Promise((resolve, reject) => {
      const searchQuery = `
      SELECT * FROM usuario 
      WHERE CONCAT(UsuarioNombre, ' ', UsuarioApellido) LIKE ? 
      OR UsuarioCorreo LIKE ? 
      OR UsuarioId LIKE ?
      LIMIT ? OFFSET ?
    `;
      const searchValue = `%${term}%`;

      db.query(
        searchQuery,
        [searchValue, searchValue, searchValue, limit, offset],
        (err, results) => {
          if (err) return reject(err);

          // Si no hay resultados, devolver array vacío
          if (!results || results.length === 0) {
            return resolve({
              usuarios: [],
              total: 0,
            });
          }

          // Consulta para contar el total de resultados
          const countQuery = `
          SELECT COUNT(*) as total FROM usuario 
          WHERE CONCAT(UsuarioNombre, ' ', UsuarioApellido) LIKE ? 
          OR UsuarioCorreo LIKE ? 
          OR UsuarioId LIKE ?
        `;

          db.query(
            countQuery,
            [searchValue, searchValue, searchValue],
            (err, countResult) => {
              if (err) return reject(err);

              resolve({
                usuarios: results,
                total: countResult[0]?.total || 0,
              });
            }
          );
        }
      );
    });
  },
};

module.exports = Usuario;
