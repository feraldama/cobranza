import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar ocupa todo el ancho */}
      <Navbar setMobileOpen={setMobileOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar ahora está dentro del contenedor principal */}
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto p-4 lg:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
