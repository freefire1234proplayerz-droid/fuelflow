export interface HealthResponse {
  status: "ok";
  timestamp: string;
  version?: string;
}

export type HealthStatus = HealthResponse["status"];
