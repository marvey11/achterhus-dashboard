import type { ServiceStatus } from "../types/ServiceStatus";

const statusColors = {
  success: "#00ff88",
  error: "#ff4444",
  running: "#44aaff",
};

interface ServiceCardProps {
  service: ServiceStatus;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div style={{ borderLeft: `5px solid ${statusColors[service.status]}` }}>
      <h3>{service.service}</h3>
      <p>{service.message}</p>
      {service.files_processed !== undefined && (
        <div className="badge">Files: {service.files_processed}</div>
      )}
    </div>
  );
};
