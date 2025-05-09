import React from "react";
import { useAuth } from "../../contexts/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <main className="py-6 px-12 space-y-12 bg-gray-100 min-h-screen w-full">
      {/* Sección de Bienvenida */}
      {user && (
        <section className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800">Panel de Control</h1>
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-blue-600">
              Bienvenido, {user.nombre}
            </h2>
            <p className="text-gray-600 mt-1">
              Este es tu panel de administración
            </p>
          </div>
        </section>
      )}

      {/* Sección de Navegación */}
      <section className="flex flex-col md:grid md:grid-cols-4 bg-white divide-y md:divide-y-0 md:divide-x w-full rounded-lg shadow-md">
        <div className="flex px-8 py-5 cursor-pointer text-gray-900 items-center hover:bg-gray-100">
          <svg
            className="text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            width="48px"
            fill="#5f6368"
          >
            <path d="M212-241v-339h60v339h-60Zm242 0v-339h60v339h-60ZM80-121v-60h800v60H80Zm608-120v-339h60v339h-60ZM80-640v-53l400-228 400 228v53H80Zm134-60h532-532Zm0 0h532L480-852 214-700Z" />
          </svg>
          <div className="ml-3">
            <div className="font-medium leading-6 text-gray-600">Resumen</div>
            <div className="mt-0.5 text-sm text-gray-500">
              Vista general del sistema
            </div>
          </div>
        </div>
        <div className="flex px-8 py-5 cursor-pointer text-gray-900 items-center hover:bg-gray-100">
          <svg
            className="text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            width="48px"
            fill="#5f6368"
          >
            <path d="M480.09-490q28.91 0 49.41-20.59 20.5-20.59 20.5-49.5t-20.59-49.41q-20.59-20.5-49.5-20.5t-49.41 20.59q-20.5 20.59-20.5 49.5t20.59 49.41q20.59 20.5 49.5 20.5ZM480-159q133-121 196.5-219.5T740-552q0-117.79-75.29-192.9Q589.42-820 480-820t-184.71 75.1Q220-669.79 220-552q0 75 65 173.5T480-159Zm0 79Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
          </svg>
          <div className="ml-3">
            <div className="font-medium leading-6 text-gray-600">Usuarios</div>
            <div className="mt-0.5 text-sm text-gray-500">
              Gestión de usuarios del sistema
            </div>
          </div>
        </div>
        <div className="flex px-8 py-5 cursor-pointer text-gray-900 items-center hover:bg-gray-100">
          <svg
            className="text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            width="48px"
            fill="#5f6368"
          >
            <path d="M562-524h268v-186H562v186Zm135-37-105-79v-40l104 79 104-79v40l-103 79ZM60-120q-24 0-42-18T0-180v-600q0-24 18-42t42-18h840q24 0 42 18t18 42v600q0 24-18 42t-42 18H60Zm531-60h309v-600H60v600h7q44-69 112.5-109T329-329q81 0 149.5 40T591-180ZM329-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM143-180h372q-35.61-42.27-84.3-65.64Q382-269 329-269t-101.5 23.5Q179-222 143-180Zm186-280q-25.5 0-42.75-17.25T269-520q0-25.5 17.25-42.75T329-580q25.5 0 42.75 17.25T389-520q0 25.5-17.25 42.75T329-460Zm151-20Z" />
          </svg>
          <div className="ml-3">
            <div className="font-medium leading-6 text-gray-600">Reportes</div>
            <div className="mt-0.5 text-sm text-gray-500">
              Generación de reportes
            </div>
          </div>
        </div>
        <div className="flex px-8 py-5 cursor-pointer text-gray-900 items-center hover:bg-gray-100 bg-blue-50 border-l-gray-100 border-b-blue-500 border-b-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            width="48px"
            fill="#4880d7"
          >
            <path d="M212-241v-339h60v339h-60Zm242 0v-339h60v339h-60ZM80-121v-60h800v60H80Zm608-120v-339h60v339h-60ZM80-640v-53l400-228 400 228v53H80Zm134-60h532-532Zm0 0h532L480-852 214-700Z" />
          </svg>
          <div className="ml-3">
            <div className="font-medium leading-6 text-blue-600">
              Configuración
            </div>
            <div className="mt-0.5 text-sm text-gray-500">
              Ajustes del sistema
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Contenido Principal */}
      <div className="flex flex-col h-full w-full mx-auto space-y-6">
        <section className="flex flex-col mx-auto bg-white rounded-lg p-6 shadow-md space-y-6 w-full">
          {/* Barra de búsqueda y acciones */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <form className="flex flex-row md:col-span-3 w-full relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
              </div>

              <input
                type="search"
                id="default-search"
                className="flex-grow p-4 ps-12 text-sm text-gray-900 border border-gray-100 rounded-l bg-gray-50"
                placeholder="Buscar en el sistema..."
                required
              />
              <button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-600 font-medium text-base px-4 py-2 rounded-r"
              >
                Buscar
              </button>
            </form>

            <div className="col-span-1 flex items-center">
              <button className="w-full h-full px-4 py-2 rounded bg-blue-500 text-white font-medium hover:bg-blue-600">
                Nueva acción
              </button>
            </div>
          </div>

          {/* Tarjetas de estadísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full min-w-0">
            <div className="flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
              <div className="flex flex-col items-center space-y-2">
                <div className="text-6xl font-bold tracking-tight leading-none text-blue-500">
                  25
                </div>
                <div className="text-lg font-medium text-blue-500">
                  Usuarios totales
                </div>
              </div>
            </div>
            <div className="flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
              <div className="flex flex-col items-center space-y-2">
                <div className="text-6xl font-bold tracking-tight leading-none text-amber-500">
                  3
                </div>
                <div className="text-lg font-medium text-amber-600">
                  Nuevos hoy
                </div>
              </div>
            </div>
            <div className="flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
              <div className="flex flex-col items-center space-y-2">
                <div className="text-6xl font-bold tracking-tight leading-none text-green-500">
                  18
                </div>
                <div className="text-lg font-medium text-green-600">
                  Activos
                </div>
              </div>
            </div>
            <div className="flex flex-col px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
              <div className="flex flex-col items-center space-y-2">
                <div className="text-6xl font-bold tracking-tight leading-none text-primary-900">
                  4
                </div>
                <div className="text-lg font-medium text-primary-900">
                  Administradores
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
