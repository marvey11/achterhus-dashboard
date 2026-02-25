interface ServiceStatus {
  service: string;
  status: "success" | "error" | "running";
  last_run: string;
  message: string;
  files_processed?: number;
}

export type { ServiceStatus };
