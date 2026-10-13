import { describe, it, expect } from "vitest";
import { healthResponseSchema } from "./validators";
import { formatTimestamp, isValidCoordinate } from "./utils";

describe("shared validators", () => {
  it("healthResponseSchema parses valid health response", () => {
    const validResponse = {
      status: "ok" as const,
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    };
    const parsed = healthResponseSchema.parse(validResponse);
    expect(parsed.status).toBe("ok");
    expect(parsed.timestamp).toBe(validResponse.timestamp);
    expect(parsed.version).toBe("1.0.0");
  });

  it("healthResponseSchema rejects invalid status", () => {
    const invalidResponse = {
      status: "error",
      timestamp: new Date().toISOString(),
    };
    expect(() => healthResponseSchema.parse(invalidResponse)).toThrow();
  });

  it("healthResponseSchema rejects invalid timestamp", () => {
    const invalidResponse = {
      status: "ok" as const,
      timestamp: "not-a-date",
    };
    expect(() => healthResponseSchema.parse(invalidResponse)).toThrow();
  });
});

describe("shared utils", () => {
  it("formatTimestamp returns valid ISO string", () => {
    const result = formatTimestamp();
    expect(() => new Date(result).toISOString()).not.toThrow();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  it("formatTimestamp accepts custom date", () => {
    const date = new Date("2024-01-15T10:30:00.000Z");
    const result = formatTimestamp(date);
    expect(result).toBe("2024-01-15T10:30:00.000Z");
  });

  it("isValidCoordinate returns true for valid coordinates", () => {
    expect(isValidCoordinate(0, 0)).toBe(true);
    expect(isValidCoordinate(90, 180)).toBe(true);
    expect(isValidCoordinate(-90, -180)).toBe(true);
    expect(isValidCoordinate(40.7128, -74.006)).toBe(true); // NYC
  });

  it("isValidCoordinate returns false for invalid coordinates", () => {
    expect(isValidCoordinate(91, 0)).toBe(false);
    expect(isValidCoordinate(-91, 0)).toBe(false);
    expect(isValidCoordinate(0, 181)).toBe(false);
    expect(isValidCoordinate(0, -181)).toBe(false);
  });
});