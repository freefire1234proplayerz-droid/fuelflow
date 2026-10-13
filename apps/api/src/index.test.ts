import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { app } from "./index";

describe("Health endpoint", () => {
  it("GET /api/health returns 200 with correct structure", async () => {
    const response = await request(app).get("/api/health").expect(200);

    expect(response.body).toHaveProperty("status", "ok");
    expect(response.body).toHaveProperty("timestamp");
    expect(typeof response.body.timestamp).toBe("string");
    expect(new Date(response.body.timestamp).toISOString()).toBe(response.body.timestamp);
    if (response.body.version) {
      expect(typeof response.body.version).toBe("string");
    }
  });

  it("GET /api/health timestamp is valid ISO 8601", async () => {
    const response = await request(app).get("/api/health").expect(200);
    const timestamp = response.body.timestamp;
    expect(() => new Date(timestamp).toISOString()).not.toThrow();
  });
});

describe("Error handling", () => {
  it("GET /api/unknown returns 404", async () => {
    await request(app).get("/api/unknown").expect(404);
  });

  it("GET /unknown returns 404", async () => {
    await request(app).get("/unknown").expect(404);
  });
});

describe("Request logging", () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("logs request with method, path, status, responseTime, contentLength (no headers)", async () => {
    await request(app).get("/api/unknown").expect(404);

    expect(consoleSpy).toHaveBeenCalled();
    const logCall = consoleSpy.mock.calls.find((call) => {
      const msg = call[0];
      return typeof msg === "string" && msg.includes('"method"');
    });
    expect(logCall).toBeDefined();

    const logEntry = JSON.parse(logCall[0]);
    expect(logEntry).toHaveProperty("method", "GET");
    expect(logEntry).toHaveProperty("path", "/api/unknown");
    expect(logEntry).toHaveProperty("status", "404");
    expect(logEntry).toHaveProperty("responseTime");
    expect(logEntry).toHaveProperty("contentLength");
    expect(logEntry).not.toHaveProperty("requestHeaders");
    expect(logEntry).not.toHaveProperty("responseHeaders");
  });

  it("skips logging for /api/health endpoint", async () => {
    await request(app).get("/api/health").expect(200);

    const logCall = consoleSpy.mock.calls.find((call) => {
      const msg = call[0];
      return typeof msg === "string" && msg.includes('"method"');
    });
    expect(logCall).toBeUndefined();
  });
});