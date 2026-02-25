// src/components/Dashboard.tsx
import { useStatus } from "../hooks/useStatus";
import { ServiceCard } from "./ServiceCard";

const Dashboard = () => {
  const { data, loading, error } = useStatus("/api/mission-control/", 15000); // 15s polling

  if (loading && !data)
    return <div className="loader">Initializing Achterhus...</div>;

  return (
    <main style={{ padding: "2rem" }}>
      <header
        style={{
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>🚀 Mission Control</h1>
        <span className="status-dot">Live Updates Enabled</span>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {data?.services.map((svc) => (
          <ServiceCard key={svc.service} service={svc} />
        ))}
      </div>
    </main>
  );
};

export { Dashboard };
