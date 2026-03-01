import type { ServiceStatus } from "../types";

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
      className={`p-4 rounded-xl border transition-all hover:scale-[1.02] ${currentStyle}`}
    >
      <div className="flex justify-between items-start">
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

      <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] uppercase tracking-wider">
        <span>Last Update</span>
        <span>{new Date(service.timestamp).toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export { ServiceCard };
