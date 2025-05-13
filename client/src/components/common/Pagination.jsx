import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  // Calcular el rango de páginas a mostrar
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Número máximo de páginas visibles alrededor de la actual

    // Siempre mostrar la primera página
    pageNumbers.push(1);

    // Calcular el rango alrededor de la página actual
    let startPage = Math.max(2, currentPage - maxVisiblePages);
    let endPage = Math.min(totalPages - 1, currentPage + maxVisiblePages);

    // Asegurarse de que mostramos suficientes páginas si estamos cerca de los extremos
    if (currentPage <= maxVisiblePages) {
      endPage = Math.min(2 * maxVisiblePages + 1, totalPages - 1);
    } else if (currentPage >= totalPages - maxVisiblePages) {
      startPage = Math.max(totalPages - 2 * maxVisiblePages, 2);
    }

    // Agregar puntos suspensivos si hay un salto entre la primera página y el rango
    if (startPage > 2) {
      pageNumbers.push("...");
    }

    // Agregar páginas en el rango calculado
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Agregar puntos suspensivos si hay un salto entre el rango y la última página
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }

    // Siempre mostrar la última página si hay más de una página
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center">
        <label className="mr-2 text-sm text-gray-600">Mostrar:</label>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <nav className="inline-flex rounded-md shadow">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Anterior
        </button>

        {pageNumbers.map((number, index) => (
          <button
            key={number === "..." ? `ellipsis-${index}` : number}
            onClick={() => number !== "..." && onPageChange(number)}
            disabled={number === "..."}
            className={`px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium ${
              currentPage === number
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700 hover:bg-gray-50"
            } ${number === "..." ? "cursor-default" : "cursor-pointer"}`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Siguiente
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
