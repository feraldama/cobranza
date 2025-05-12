const db = require("../config/db");

const RegistroDiarioCaja = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM registrodiariocaja", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM registrodiariocaja WHERE RegistroDiarioCajaId = ?",
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results.length > 0 ? results[0] : null);
        }
      );
    });
  },

  getAllPaginated: (limit, offset) => {
    return new Promise((resolve, reject) => {
      // Consulta para obtener los registros paginados
      db.query(
        "SELECT * FROM registrodiariocaja ORDER BY RegistroDiarioCajaFecha DESC LIMIT ? OFFSET ?",
        [limit, offset],
        (err, results) => {
          if (err) return reject(err);

          // Consulta para contar el total de registros
          db.query(
            "SELECT COUNT(*) as total FROM registrodiariocaja",
            (err, countResult) => {
              if (err) return reject(err);

              resolve({
                registros: results,
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
        SELECT * FROM registrodiariocaja 
        WHERE CONCAT(RegistroDiarioCajaId, ' ', Descripcion) LIKE ? 
        OR RegistroDiarioCajaFecha LIKE ?
        LIMIT ? OFFSET ?
      `;
      const searchValue = `%${term}%`;

      db.query(
        searchQuery,
        [searchValue, searchValue, limit, offset],
        (err, results) => {
          if (err) return reject(err);

          // Si no hay resultados, devolver array vacío
          if (!results || results.length === 0) {
            return resolve({
              registros: [],
              total: 0,
            });
          }

          // Consulta para contar el total de resultados
          const countQuery = `
            SELECT COUNT(*) as total FROM registrodiariocaja 
            WHERE CONCAT(RegistroDiarioCajaId, ' ', Descripcion) LIKE ? 
            OR RegistroDiarioCajaFecha LIKE ?
          `;

          db.query(
            countQuery,
            [searchValue, searchValue],
            (err, countResult) => {
              if (err) return reject(err);

              resolve({
                registros: results,
                total: countResult[0]?.total || 0,
              });
            }
          );
        }
      );
    });
  },
};

module.exports = RegistroDiarioCaja;
