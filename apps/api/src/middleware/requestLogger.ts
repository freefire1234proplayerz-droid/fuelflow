import { Request, Response, RequestHandler } from "express";
import morgan, { StreamOptions } from "morgan";

const morganStream: StreamOptions = {
  write: (message: string) => {
    console.log(message.trim());
  },
};

export const requestLogger: RequestHandler = morgan(
  (tokens, req: Request, res: Response) => {
    const logData = {
      method: tokens.method(req, res),
      path: tokens.url(req, res),
      status: tokens.status(req, res),
      responseTime: `${tokens["response-time"](req, res)} ms`,
      contentLength: tokens.res(req, res, "content-length") || "0",
    };
    return JSON.stringify(logData);
  },
  {
    stream: morganStream,
    skip: (req: Request) => req.originalUrl === "/api/health" || req.url === "/api/health",
  }
);