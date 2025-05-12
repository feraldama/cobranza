import api from "./api";

export const getRegistrosDiariosCaja = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(
      `/registrodiariocaja?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Error al obtener registros diarios de caja",
      }
    );
  }
};

export const searchRegistrosDiariosCaja = async (
  searchTerm,
  page = 1,
  limit = 10
) => {
  try {
    const response = await api.get(
      `/registrodiariocaja/search?q=${searchTerm}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Error al buscar registros diarios de caja",
      }
    );
  }
};

export const getRegistroDiarioCajaById = async (id) => {
  try {
    const response = await api.get(`/registrodiariocaja/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al obtener el registro" };
  }
};

export const createRegistroDiarioCaja = async (registroData) => {
  try {
    const response = await api.post("/registrodiariocaja", registroData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al crear el registro" };
  }
};

export const updateRegistroDiarioCaja = async (id, registroData) => {
  try {
    const response = await api.put(`/registrodiariocaja/${id}`, registroData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Error al actualizar el registro" }
    );
  }
};

export const deleteRegistroDiarioCaja = async (id) => {
  try {
    const response = await api.delete(`/registrodiariocaja/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al eliminar el registro" };
  }
};
