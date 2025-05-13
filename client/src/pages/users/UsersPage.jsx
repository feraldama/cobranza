import { useEffect, useState, useCallback } from "react";
import {
  getUsuarios,
  deleteUsuario,
  searchUsuarios,
  createUsuario,
  updateUsuario,
} from "../../services/usuarios.service";
import UsersList from "../../components/users/UsersList";
import Pagination from "../../components/common/Pagination";
import { SuccessModal } from "../../components/common/Modal/SuccessModal";

export default function UsuariosPage() {
  const [usuariosData, setUsuariosData] = useState({
    usuarios: [],
    pagination: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingPassword, setEditingPassword] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
  }, [currentPage, appliedSearchTerm, itemsPerPage]);

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
        usuarios: prev.usuarios.filter((usuario) => usuario.UsuarioId !== id),
      }));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreate = () => {
    setCurrentUser(null); // Indica que es un nuevo usuario
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setEditingPassword(false);
    setIsModalOpen(true);
  };

  const handleSubmit = async (userData) => {
    try {
      if (currentUser) {
        await updateUsuario(currentUser.UsuarioId, userData);
        setSuccessMessage("Usuario actualizado exitosamente");
      } else {
        // Crear nuevo usuario
        if (!userData.UsuarioContrasena) {
          throw new Error("La contraseña es requerida para nuevos usuarios");
        }
        const response = await createUsuario(userData);
        setSuccessMessage(response.message || "Usuario creado exitosamente");
      }

      setIsModalOpen(false);
      setShowSuccessModal(true);
      setEditingPassword(false); // Resetear después de enviar
      fetchUsuarios();
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Resetear a la primera página cuando cambia el número de items por página
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-3">Gestión de Usuarios</h1>
      <UsersList
        usuarios={usuariosData.usuarios}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onCreate={handleCreate}
        pagination={usuariosData.pagination}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onKeyPress={handleKeyPress}
        onSearchSubmit={applySearch}
        isModalOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        currentUser={currentUser}
        onSubmit={handleSubmit}
        editingPassword={editingPassword}
        setEditingPassword={setEditingPassword}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={usuariosData.pagination.totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      {/* Modal de éxito - fuera de cualquier container que limite su ancho */}
      {showSuccessModal && (
        <SuccessModal
          message={successMessage}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
}
