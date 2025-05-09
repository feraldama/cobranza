import React from "react";

export default function Buscador({
  searchTerm,
  onSearch,
  onKeyPress,
  onSearchSubmit,
  placeholder = "Buscar...",
  className = "",
}) {
  return (
    <div className="flex items-center flex-column md:flex-row flex-wrap md:space-y-0 py-4 bg-white">
      {/* Barra de búsqueda */}
      <div className="relative">
        <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="table-search-users"
          className="block pl-8 pr-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-70 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          onKeyDown={onKeyPress}
        />
      </div>
      <button
        onClick={onSearchSubmit}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Buscar
      </button>
    </div>
  );
}
