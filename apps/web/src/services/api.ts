import type { HealthResponse } from "@fuelflow/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let details: unknown;
    try {
      details = await response.json();
    } catch {
      details = undefined;
    }
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status,
      details
    );
  }
  return response.json() as Promise<T>;
}

export const api = {
  async health(): Promise<HealthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse<HealthResponse>(response);
  },
};

export { ApiError };
export type { HealthResponse };