export function formatTimestamp(date: Date = new Date()): string {
  return date.toISOString();
}

export function isValidCoordinate(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

export {
  INDIAN_CURRENCY_CONFIG,
  formatCurrency,
  formatCurrencyCompact,
  getFuelUnit,
  getFuelUnitShort,
  formatFuelPrice,
  formatFuelPriceShort,
  FUEL_TYPE_UNITS,
} from './currency';