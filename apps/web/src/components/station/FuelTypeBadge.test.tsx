import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FuelTypeBadge, FuelTypeFilterChip } from "./FuelTypeBadge";

describe("FuelTypeBadge", () => {
  it("renders available fuel with price", () => {
    render(
      <FuelTypeBadge
        fuel={{
          type: "petrol",
          available: true,
          price: 1.899,
          unit: "€/L",
          lastReported: new Date().toISOString(),
        }}
      />
    );
    expect(screen.getByText("Petrol")).toBeInTheDocument();
  });

  it("renders unavailable fuel", () => {
    render(
      <FuelTypeBadge
        fuel={{
          type: "cng",
          available: false,
          price: undefined,
          unit: "€/kg",
          lastReported: new Date().toISOString(),
        }}
      />
    );
    expect(screen.getByText("CNG")).toBeInTheDocument();
    expect(screen.getByText("Unavailable")).toBeInTheDocument();
  });

  it("applies correct color classes for each fuel type", () => {
    const { rerender } = render(
      <FuelTypeBadge
        fuel={{
          type: "petrol",
          available: true,
          price: 1.899,
          unit: "€/L",
          lastReported: new Date().toISOString(),
        }}
      />
    );
    expect(screen.getByText("Petrol")).toBeInTheDocument();

    rerender(
      <FuelTypeBadge
        fuel={{
          type: "diesel",
          available: true,
          price: 1.759,
          unit: "€/L",
          lastReported: new Date().toISOString(),
        }}
      />
    );
    expect(screen.getByText("Diesel")).toBeInTheDocument();

    rerender(
      <FuelTypeBadge
        fuel={{
          type: "ev_charging",
          available: true,
          price: 0.45,
          unit: "€/kWh",
          lastReported: new Date().toISOString(),
        }}
      />
    );
    expect(screen.getByText("EV Charging")).toBeInTheDocument();
  });
});

describe("FuelTypeFilterChip", () => {
  it("renders with correct label and icon", () => {
    render(
      <FuelTypeFilterChip
        type="petrol"
        selected={true}
        onChange={vi.fn()}
      />
    );
    expect(screen.getByText("Petrol")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("calls onChange when clicked", () => {
    const onChange = vi.fn();
    render(
      <FuelTypeFilterChip
        type="diesel"
        selected={false}
        onChange={onChange}
      />
    );
    screen.getByRole("checkbox").click();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("applies selected styles when selected", () => {
    render(
      <FuelTypeFilterChip
        type="ev_charging"
        selected={true}
        onChange={vi.fn()}
      />
    );
    expect(screen.getByText("EV Charging")).toBeInTheDocument();
  });
});