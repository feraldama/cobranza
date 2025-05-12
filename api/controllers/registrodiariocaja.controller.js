const RegistroDiarioCaja = require("../models/registrodiariocaja.model");

exports.getAllRegistros = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { registros, total } = await RegistroDiarioCaja.getAllPaginated(
      limit,
      offset
    );

    res.json({
      data: registros,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRegistroById = async (req, res) => {
  try {
    const registro = await RegistroDiarioCaja.getById(req.params.id);
    if (!registro) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchRegistros = async (req, res) => {
  try {
    const { q: searchTerm } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    if (!searchTerm || searchTerm.trim() === "") {
      return res
        .status(400)
        .json({ error: "El término de búsqueda no puede estar vacío" });
    }

    const { registros, total } = await RegistroDiarioCaja.search(
      searchTerm,
      limit,
      offset
    );

    res.json({
      data: registros,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error en searchRegistros:", error);
    res.status(500).json({ error: "Error al buscar registros" });
  }
};
