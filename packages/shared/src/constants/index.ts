export const FUEL_TYPES = ["petrol", "diesel", "cng", "ev_charging"] as const;

export type FuelType = (typeof FUEL_TYPES)[number];

export const APP_NAME = "FuelFlow";
export const APP_TAGLINE = "Find fuel. Skip the queue.";
