// src/services/usuarios.service.js
import api from "./api";

export const getUsuarios = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/usuarios?page=${page}&limit=${limit}`);
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
    // Eliminar contraseña vacía si no se quiere cambiar
    if (usuarioData.UsuarioContrasena === "") {
      delete usuarioData.UsuarioContrasena;
    }

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

export const searchUsuarios = async (searchTerm, page = 1, limit = 10) => {
  try {
    const response = await api.get(
      `/usuarios/search?q=${searchTerm}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al buscar usuarios" };
  }
};
