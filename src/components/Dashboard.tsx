import { useEffect, useRef, useState } from "react";
import { ServiceCard } from "./ServiceCard";
import type { ServiceStatus } from "../types";

const SyncFooter = ({ lastSync }: { lastSync: Date | null }) => {
  if (!lastSync)
    return (
      <footer className="p-4 text-red-400 bg-red-950/30 border-t border-red-900/50 mt-auto text-center animate-pulse">
        ⚠️ Dashboard Disconnected from Gateway
      </footer>
    );

  return (
    <footer className="p-4 text-neutral-500 text-sm border-t border-neutral-200 mt-auto">
      <div className="flex justify-between items-center">
        <span>Achterhus Server Tools v1.0</span>
        <span>
          Last Sync: <strong>{lastSync.toLocaleTimeString()}</strong>
        </span>
        <span className="relative flex h-3 w-3 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>
    </footer>
  );
};

const Dashboard = () => {
  const [statuses, setStatuses] = useState<Record<string, ServiceStatus>>({});

  // store the last updated timestamp for each service to prevent unnecessary re-renders
  const lastUpdatedRef = useRef<Record<string, number>>({});

  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    const refreshData = async () => {
      try {
        const manifestResponse = await fetch(
          `/service-status/services.json?t=${Date.now()}`,
        );
        if (!manifestResponse.ok) throw new Error("Gateway error");

        const serviceList: string[] = await manifestResponse.json();

        const statusPromises = serviceList.map(async (serviceName) => {
          const statusResponse = await fetch(
            `/service-status/${serviceName}.json?t=${Date.now()}`,
          );
          const statusData = await statusResponse.json();

          if (statusData.timestamp !== lastUpdatedRef.current[serviceName]) {
            lastUpdatedRef.current[serviceName] = statusData.timestamp;
            return { service: serviceName, ...statusData } as ServiceStatus;
          }
          return null;
        });

        const results = await Promise.all(statusPromises);
        const updates = results.filter(
          (res): res is ServiceStatus => res !== null,
        );

        if (updates.length > 0) {
          setStatuses((prev) => {
            const newState = { ...prev };
            updates.forEach((update) => {
              newState[update.service] = update;
            });
            return newState;
          });
        }
        setLastSync(new Date());
      } catch (error) {
        console.error("Sync failed:", error);
        setLastSync(null);
      }
    };

    refreshData();
    const interval = setInterval(refreshData, 60 * 1000); // Poll every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 p-6 flex flex-col">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tighter">
          ACHTERHUS // OPS
        </h1>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(statuses).map((s) => (
          <ServiceCard key={s.service} service={s} />
        ))}
      </main>

      <SyncFooter lastSync={lastSync} />
    </div>
  );
};

export { Dashboard };
