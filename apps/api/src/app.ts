import express from "express";
import cors from "cors";
import helmet from "helmet";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import healthRouter from "./routes/health";
import { env } from "./config/env";

export function createApp(): express.Application {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(requestLogger);

  app.use("/api", healthRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export function startServer(app: express.Application): void {
  const port = env.PORT;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port} in ${env.NODE_ENV} mode`);
  });
}