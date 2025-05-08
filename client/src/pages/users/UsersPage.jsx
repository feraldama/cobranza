// src/pages/usuarios/UsuariosPage.jsx
import { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario } from "../../services/usuarios.service";
import UsersList from "../../components/users/UsersList";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUsuario(id);
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Gestión de Usuarios</h1>
      <UsersList usuarios={usuarios} onDelete={handleDelete} />
    </div>
  );
}
