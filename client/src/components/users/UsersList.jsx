import { useEffect, useState } from "react";
import SearchButton from "../common/Input/SearchButton";
import ActionButton from "../common/Button/ActionButton";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function UsuariosList({
  usuarios,
  onDelete,
  onEdit,
  onCreate,
  pagination,
  onSearch,
  searchTerm,
  onKeyPress,
  onSearchSubmit,
  isModalOpen,
  onCloseModal,
  currentUser,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    UsuarioId: "",
    UsuarioContrasena: "",
    UsuarioNombre: "",
    UsuarioApellido: "",
    UsuarioCorreo: "",
    UsuarioIsAdmin: "N",
    UsuarioEstado: "A",
    LocalId: 1,
  });

  // Inicializar formData cuando currentUser cambia
  useEffect(() => {
    if (currentUser) {
      setFormData({
        UsuarioId: currentUser.UsuarioId,
        UsuarioNombre: currentUser.UsuarioNombre,
        UsuarioApellido: currentUser.UsuarioApellido,
        UsuarioCorreo: currentUser.UsuarioCorreo,
        UsuarioIsAdmin: currentUser.UsuarioIsAdmin,
        UsuarioEstado: currentUser.UsuarioEstado,
        LocalId: currentUser.LocalId,
      });
    } else {
      // Resetear para nuevo usuario
      setFormData({
        UsuarioId: "",
        UsuarioNombre: "",
        UsuarioApellido: "",
        UsuarioCorreo: "",
        UsuarioIsAdmin: "N",
        UsuarioEstado: "A",
        LocalId: 1,
      });
    }
  }, [currentUser]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Determinar el estado visual
  const getEstadoVisual = (estado) => {
    return estado === "A" ? "Activo" : "Inactivo";
  };

  // Determinar el color del estado
  const getEstadoColor = (estado) => {
    return estado === "A" ? "bg-green-500" : "bg-red-500";
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <>
      {/* Barra superior de búsqueda y acciones */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <SearchButton
            searchTerm={searchTerm}
            onSearch={onSearch}
            onKeyPress={onKeyPress}
            onSearchSubmit={onSearchSubmit}
            placeholder="Buscar usuarios"
          />
        </div>
        <div className="py-4">
          <ActionButton
            label="Nuevo Usuario"
            onClick={onCreate}
            icon={PlusIcon}
            // className="text-red-500"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Mostrando {usuarios.length} de {pagination?.totalItems} usuarios
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Usuario
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Admin
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Local
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr
                key={usuario.UsuarioId}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {usuario.UsuarioId}
                </td>
                <td className="px-6 py-4">
                  {usuario.UsuarioNombre} {usuario.UsuarioApellido}
                </td>
                <td className="px-6 py-4">{usuario.UsuarioCorreo || "-"}</td>
                <td className="px-6 py-4">
                  {usuario.UsuarioIsAdmin === "S" ? "Sí" : "No"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${getEstadoColor(
                        usuario.UsuarioEstado
                      )} mr-2`}
                    ></div>
                    {getEstadoVisual(usuario.UsuarioEstado)}
                  </div>
                </td>
                <td className="px-6 py-4">{usuario.LocalId}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onEdit(usuario)}
                    className="font-medium text-blue-600 hover:underline mr-4"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mensaje cuando no hay resultados */}
        {usuarios.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No se encontraron usuarios
          </div>
        )}
      </div>

      {/* Modal para crear/editar */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleBackdropClick}
        >
          <div className="relative w-full max-w-2xl max-h-full">
            <form
              onSubmit={handleSubmit}
              className="relative bg-white rounded-lg shadow"
            >
              <div className="flex items-start justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  {currentUser
                    ? `Editar usuario: ${currentUser.UsuarioId}`
                    : "Crear nuevo usuario"}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                  onClick={onCloseModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-6 gap-6">
                  {/* Campos del formulario... */}
                  {!currentUser && (
                    <>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="UsuarioId"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          ID de Usuario
                        </label>
                        <input
                          type="text"
                          name="UsuarioId"
                          id="UsuarioId"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                          value={formData.UsuarioId}
                          onChange={handleInputChange}
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="UsuarioContrasena"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Contraseña
                        </label>
                        <input
                          type="password"
                          name="UsuarioContrasena"
                          id="UsuarioContrasena"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                          value={formData.UsuarioContrasena || ""}
                          onChange={handleInputChange}
                          required={!currentUser}
                          placeholder={
                            currentUser ? "Dejar en blanco para no cambiar" : ""
                          }
                        />
                      </div>
                    </>
                  )}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="UsuarioNombre"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="UsuarioNombre"
                      id="UsuarioNombre"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      value={formData.UsuarioNombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="UsuarioApellido"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="UsuarioApellido"
                      id="UsuarioApellido"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      value={formData.UsuarioApellido}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="UsuarioCorreo"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="UsuarioCorreo"
                      id="UsuarioCorreo"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      value={formData.UsuarioCorreo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="LocalId"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Local ID
                    </label>
                    <input
                      type="number"
                      name="LocalId"
                      id="LocalId"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      value={formData.LocalId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="UsuarioIsAdmin"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      ¿Es administrador?
                    </label>
                    <select
                      name="UsuarioIsAdmin"
                      id="UsuarioIsAdmin"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      value={formData.UsuarioIsAdmin}
                      onChange={handleInputChange}
                    >
                      <option value="S">Sí</option>
                      <option value="N">No</option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="UsuarioEstado"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Estado
                    </label>
                    <select
                      name="UsuarioEstado"
                      id="UsuarioEstado"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      value={formData.UsuarioEstado}
                      onChange={handleInputChange}
                    >
                      <option value="A">Activo</option>
                      <option value="I">Inactivo</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center p-6 space-x-3 border-t border-gray-200 rounded-b">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {currentUser ? "Guardar cambios" : "Crear usuario"}
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                  onClick={onCloseModal}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
