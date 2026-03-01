interface ServiceStatus {
  service: string;
  status: "success" | "error";
  timestamp: string;
  exit_code: number;
}

export type { ServiceStatus };
