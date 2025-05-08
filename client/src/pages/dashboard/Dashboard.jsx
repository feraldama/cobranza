import React from "react";
import { useAuth } from "../../contexts/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <h1>Panel de Control</h1>
      {user && (
        <div className="user-info">
          <h2>Bienvenido, {user.nombre}</h2>
          <p>Este es tu panel de administración</p>
        </div>
      )}
      <div className="dashboard-content">
        <section className="stats-section">
          <h3>Estadísticas</h3>
          <div className="stats-grid">
            <div className="stat-card">Total usuarios: 25</div>
            <div className="stat-card">Registros hoy: 3</div>
            <div className="stat-card">Activos: 18</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
