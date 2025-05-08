import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar con altura fija */}
      <Navbar setMobileOpen={setMobileOpen} />

      {/* Contenedor principal que ocupa el resto */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar ahora con altura completa menos navbar */}
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto p-4 lg:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
