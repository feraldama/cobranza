import { useEffect, useState, useCallback } from "react";
import {
  getUsuarios,
  deleteUsuario,
  searchUsuarios,
} from "../../services/usuarios.service";
import UsersList from "../../components/users/UsersList";
import Pagination from "../../components/common/Pagination";

export default function UsuariosPage() {
  const [usuariosData, setUsuariosData] = useState({
    usuarios: [],
    pagination: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // <-- Este estado mantendrá lo que escribes
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(""); // <-- Este es el término que se usa para buscar
  const itemsPerPage = 10;

  const fetchUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      let data;
      if (appliedSearchTerm) {
        data = await searchUsuarios(
          appliedSearchTerm,
          currentPage,
          itemsPerPage
        );
      } else {
        data = await getUsuarios(currentPage, itemsPerPage);
      }
      setUsuariosData({
        usuarios: data.data,
        pagination: data.pagination,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, appliedSearchTerm]);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const applySearch = () => {
    setAppliedSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      applySearch();
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUsuario(id);
      setUsuariosData((prev) => ({
        ...prev,
        usuarios: prev.usuarios.filter((usuario) => usuario.id !== id),
      }));
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-3">Gestión de Usuarios</h1>
      <UsersList
        usuarios={usuariosData.usuarios}
        onDelete={handleDelete}
        pagination={usuariosData.pagination}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onKeyPress={handleKeyPress}
        onSearchSubmit={applySearch}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={usuariosData.pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
