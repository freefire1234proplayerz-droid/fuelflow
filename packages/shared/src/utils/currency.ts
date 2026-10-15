export interface CurrencyConfig {
  locale: string;
  currency: string;
  minimumFractionDigits: number;
  maximumFractionDigits: number;
}

export const INDIAN_CURRENCY_CONFIG: CurrencyConfig = {
  locale: 'en-IN',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export function formatCurrency(
  amount: number,
  config: CurrencyConfig = INDIAN_CURRENCY_CONFIG
): string {
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    minimumFractionDigits: config.minimumFractionDigits,
    maximumFractionDigits: config.maximumFractionDigits,
  }).format(amount);
}

export function formatCurrencyCompact(
  amount: number,
  config: CurrencyConfig = INDIAN_CURRENCY_CONFIG
): string {
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    notation: 'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(amount);
}

export const FUEL_TYPE_UNITS: Record<string, { unit: string; unitShort: string }> = {
  petrol: { unit: '₹/L', unitShort: '₹/L' },
  diesel: { unit: '₹/L', unitShort: '₹/L' },
  cng: { unit: '₹/kg', unitShort: '₹/kg' },
  ev_charging: { unit: '₹/kWh', unitShort: '₹/kWh' },
};

export function getFuelUnit(fuelType: string): string {
  return FUEL_TYPE_UNITS[fuelType]?.unit ?? '₹/L';
}

export function getFuelUnitShort(fuelType: string): string {
  return FUEL_TYPE_UNITS[fuelType]?.unitShort ?? '₹/L';
}

export function formatFuelPrice(
  price: number,
  fuelType: string,
  config: CurrencyConfig = INDIAN_CURRENCY_CONFIG
): string {
  const formatted = formatCurrency(price, config);
  const unit = getFuelUnit(fuelType);
  return `${formatted} ${unit}`;
}

export function formatFuelPriceShort(
  price: number,
  fuelType: string,
  config: CurrencyConfig = INDIAN_CURRENCY_CONFIG
): string {
  const formatted = formatCurrency(price, { ...config, minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const unit = getFuelUnitShort(fuelType);
  return `${formatted} ${unit}`;
}