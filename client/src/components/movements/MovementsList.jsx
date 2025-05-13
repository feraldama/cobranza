import SearchButton from "../common/Input/SearchButton";
import ActionButton from "../common/Button/ActionButton";
import DataTable from "../common/Table/DataTable";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function MovementsList({
  movimientos,
  onDelete,
  onEdit,
  onCreate,
  pagination,
  onSearch,
  searchTerm,
  onKeyPress,
  onSearchSubmit,
}) {
  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Formatear monto
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "DOP",
    }).format(amount);
  };

  // Configuración de columnas para la tabla
  const columns = [
    {
      key: "RegistroDiarioCajaId",
      label: "ID",
    },
    {
      key: "RegistroDiarioCajaFecha",
      label: "Fecha",
      render: (row) => formatDate(row.RegistroDiarioCajaFecha),
    },
    {
      key: "RegistroDiarioCajaDetalle",
      label: "Descripción",
    },
    {
      key: "RegistroDiarioCajaMonto",
      label: "Monto",
      render: (item) => formatAmount(item.RegistroDiarioCajaMonto),
    },
    {
      key: "UsuarioId",
      label: "Usuario",
    },
    {
      key: "CajaId",
      label: "Caja",
    },
    {
      key: "TipoGastoId",
      label: "Tipo Gasto",
    },
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <SearchButton
            searchTerm={searchTerm}
            onSearch={onSearch}
            onKeyPress={onKeyPress}
            onSearchSubmit={onSearchSubmit}
            placeholder="Buscar registros..."
          />
        </div>
        <div className="py-4">
          <ActionButton
            label="Nuevo Registro"
            onClick={onCreate}
            icon={PlusIcon}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Mostrando {movimientos.length} de {pagination?.totalItems} registros
        </div>
      </div>

      <DataTable
        columns={columns}
        data={movimientos}
        onEdit={onEdit}
        onDelete={onDelete}
        emptyMessage="No se encontraron registros"
      />
    </>
  );
}
