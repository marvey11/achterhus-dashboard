import type { ServiceStatus } from "../types/ServiceStatus";

interface ServiceCardProps {
  service: ServiceStatus;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className={`card ${service.status}`}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>{service.service}</h3>
        <span className={`dot ${service.status}`} />
      </div>

      <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>{service.message}</p>

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: "10px",
          fontSize: "0.8rem",
        }}
      >
        {service.files_processed !== undefined && (
          <span className="badge">📦 {service.files_processed} files</span>
        )}
        <span className="badge">
          🕒 {new Date(service.last_run).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};
