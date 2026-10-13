import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("@fuelflow/shared", () => ({
  FUEL_TYPES: ["petrol", "diesel", "cng", "ev_charging"] as const,
  APP_NAME: "FuelFlow",
  APP_TAGLINE: "Find fuel. Skip the queue.",
  healthResponseSchema: {
    parse: (data: unknown) => data,
  },
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window, "localStorage", {
  writable: true,
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
});