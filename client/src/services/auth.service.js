import api from "./api";

export const login = async (credentials) => {
  try {
    const response = await api.post("/usuarios/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al iniciar sesión" };
  }
};

export const getAuthUser = async () => {
  try {
    const response = await api.get("/usuarios/me");
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
