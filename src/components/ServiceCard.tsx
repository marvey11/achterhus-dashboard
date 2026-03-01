import type { ServiceMetadata, ServiceStatus } from "../types";

const STALE_THRESHOLD_MS = 24 * 60 * 60 * 1000; // 24 hours

const getServiceState = (service: ServiceStatus) => {
  const lastUpdate = new Date(service.timestamp).getTime();
  const now = Date.now();
  const isStale = now - lastUpdate > STALE_THRESHOLD_MS;

  if (isStale) return "stale";
  return service.status; // "success" or "error"
};

interface ServiceCardProps {
  service: ServiceStatus;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const state = getServiceState(service); // Uses the logic we built earlier

  const statusStyles: Record<string, string> = {
    success: "border-green-500/30 bg-green-500/5 text-green-400",
    error: "border-red-500/30 bg-red-500/5 text-red-400",
    stale: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400",
    default: "border-gray-500/30 bg-gray-500/5 text-gray-400",
  };

  const currentStyle = statusStyles[state] || statusStyles.default;

  return (
    <div
      className={`rounded-xl border p-4 transition-all hover:scale-[1.02] ${currentStyle}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 capitalize">
            {service.service.replace(/-/g, " ")}
          </h3>
          <p className="text-xs opacity-70">Exit Code: {service.exit_code}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xl" role="img" aria-label={state}>
            {state === "success" ? "✅" : state === "error" ? "❌" : "⚠️"}
          </span>
        </div>
      </div>

      <MetadataGrid metadata={service.metadata} />

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] tracking-wider uppercase">
        <span>Last Update</span>
        <span>{new Date(service.timestamp).toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

const MetadataGrid = ({
  metadata,
}: {
  metadata?: Record<string, ServiceMetadata>;
}) => {
  if (!metadata) return null;

  return (
    <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/5 pt-4">
      {Object.entries(metadata).map(([key, item]) => (
        <div key={key} className="flex flex-col">
          <span className="text-[10px] font-medium text-neutral-500 uppercase">
            {item.label}
          </span>
          <span className="font-mono text-sm text-neutral-800">
            {item.value}
            {item.unit || ""}
          </span>
        </div>
      ))}
    </div>
  );
};

export { ServiceCard };
