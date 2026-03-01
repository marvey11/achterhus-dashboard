interface ServiceMetadata {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
}

interface ServiceStatus {
  service: string;
  status: "success" | "error";
  timestamp: string;
  exit_code: number;

  // service-specific metadata (key/value pairs; optional)
  metadata?: Record<string, ServiceMetadata>;
}

export type { ServiceMetadata, ServiceStatus };
