import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StationCard } from "./StationCard";
import { DEMO_STATIONS } from "../../utils/demoData";

const FUEL_TYPE_LABELS: Record<string, string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  cng: "CNG",
  ev_charging: "EV Charging",
};

describe("StationCard", () => {
  const station = DEMO_STATIONS[0];

  it("renders station name and address", () => {
    render(<StationCard station={station} />);
    expect(screen.getByText(station.name)).toBeInTheDocument();
    expect(screen.getByText(station.address)).toBeInTheDocument();
  });

  it("shows open/closed badge correctly", () => {
    render(<StationCard station={station} />);
    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByText("Open")).toHaveClass("bg-green-100");
  });

  it("shows closed badge for closed station", () => {
    const closedStation = { ...station, isOpen: false };
    render(<StationCard station={closedStation} />);
    expect(screen.getByText("Closed")).toBeInTheDocument();
    expect(screen.getByText("Closed")).toHaveClass("bg-red-100");
  });

  it("displays rating and review count", () => {
    render(<StationCard station={station} />);
    expect(screen.getByText(`${station.rating.toFixed(1)}`)).toBeInTheDocument();
    expect(screen.getByText(`(${station.reviewCount})`)).toBeInTheDocument();
  });

  it("shows available fuel types", () => {
    render(<StationCard station={station} />);
    station.fuelTypes
      .filter((f) => f.available)
      .forEach((fuel) => {
        const label = FUEL_TYPE_LABELS[fuel.type] || fuel.type;
        expect(screen.getByText(label)).toBeInTheDocument();
      });
  });

  it("calls onSelect when clicked", () => {
    const handleSelect = vi.fn();
    render(<StationCard station={station} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText(station.name));
    expect(handleSelect).toHaveBeenCalledWith(station);
  });

  it("shows distance and last updated info", () => {
    const stationWithDistance = { ...station, distance: 2.5 };
    render(<StationCard station={stationWithDistance} />);
    expect(screen.getByText("2.5 km away")).toBeInTheDocument();
    expect(screen.getByText(/Updated/i)).toBeInTheDocument();
  });
});