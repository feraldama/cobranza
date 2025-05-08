// src/services/usuarios.service.js
import api from "./api";

export const getUsuarios = async () => {
  try {
    const response = await api.get("/api/usuarios");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al obtener usuarios" };
  }
};

export const getUsuarioById = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al obtener usuario" };
  }
};

export const createUsuario = async (usuarioData) => {
  try {
    const response = await api.post("/usuarios", usuarioData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al crear usuario" };
  }
};

export const updateUsuario = async (id, usuarioData) => {
  try {
    const response = await api.put(`/usuarios/${id}`, usuarioData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al actualizar usuario" };
  }
};

export const deleteUsuario = async (id) => {
  try {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al eliminar usuario" };
  }
};
