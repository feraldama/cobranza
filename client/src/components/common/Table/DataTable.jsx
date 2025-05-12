import React from "react";

const DataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  emptyMessage = "No se encontraron registros",
  actions = true,
  customActions,
  getStatusColor,
  getStatusText,
}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-6 py-3">
                {column.label}
              </th>
            ))}
            {actions && (
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4">
                  {column.render ? (
                    column.render(item)
                  ) : column.status ? (
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          getStatusColor?.(item[column.key]) || "bg-gray-500"
                        } mr-2`}
                      ></div>
                      {getStatusText?.(item[column.key]) || item[column.key]}
                    </div>
                  ) : (
                    item[column.key]
                  )}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4">
                  {customActions ? (
                    customActions(item)
                  ) : (
                    <>
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="font-medium text-blue-600 hover:underline mr-4"
                        >
                          Editar
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="font-medium text-red-600 hover:underline"
                        >
                          Eliminar
                        </button>
                      )}
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mensaje cuando no hay resultados */}
      {data.length === 0 && (
        <div className="p-4 text-center text-gray-500">{emptyMessage}</div>
      )}
    </div>
  );
};

export default DataTable;
