import { z } from "zod";
import type { HealthResponse } from "../types";

export const healthResponseSchema: z.ZodType<HealthResponse> = z.object({
  status: z.literal("ok"),
  timestamp: z.string().datetime(),
  version: z.string().optional(),
});

export type HealthResponseInput = z.input<typeof healthResponseSchema>;
export type HealthResponseOutput = z.output<typeof healthResponseSchema>;
