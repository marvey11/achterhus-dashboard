import { useEffect, useRef, useState } from "react";
import type { ServiceStatus } from "../types/ServiceStatus";

interface ApiResponse {
  server: string;
  timestamp: string;
  services: ServiceStatus[];
}

export const useStatus = (url: string, intervalMs: number = 30000) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = async (isManual = false) => {
    if (isManual) setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const json = await response.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true); // Initial load

    timerRef.current = setInterval(() => {
      fetchData(false); // Background updates
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [url, intervalMs]);

  return { data, loading, error, refetch: () => fetchData(true) };
};
