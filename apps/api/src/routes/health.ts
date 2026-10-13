import { Router, Response, RequestHandler } from "express";
import { healthResponseSchema } from "@fuelflow/shared/validators";
import type { HealthResponse } from "@fuelflow/shared/types";

const router: Router = Router();

const healthHandler: RequestHandler = (_req, res: Response<HealthResponse>) => {
  const response = healthResponseSchema.parse({
    status: "ok" as const,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
  res.status(200).json(response);
};

router.get("/health", healthHandler);

export default router;