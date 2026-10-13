import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MapPlaceholder } from "./MapPlaceholder";
import { DEMO_STATIONS } from "../../utils/demoData";

describe("MapPlaceholder", () => {
  it("renders map section with title", () => {
    render(<MapPlaceholder stations={DEMO_STATIONS} />);
    expect(screen.getByText(/Map View/i)).toBeInTheDocument();
    expect(screen.getByText(/Interactive Map/i)).toBeInTheDocument();
    expect(screen.getByText(/Map integration coming soon/i)).toBeInTheDocument();
  });

  it("shows station buttons for first 3 stations", () => {
    render(<MapPlaceholder stations={DEMO_STATIONS} />);
    expect(screen.getByText("Shell City Center")).toBeInTheDocument();
    expect(screen.getByText("BP Highway Station")).toBeInTheDocument();
    expect(screen.getByText("TotalEnergies Green Hub")).toBeInTheDocument();
  });

  it("shows count of additional stations when more than 3", () => {
    render(<MapPlaceholder stations={DEMO_STATIONS} />);
    expect(screen.getByText("+2 more stations")).toBeInTheDocument();
  });

  it("does not show selected station panel when none selected", () => {
    render(<MapPlaceholder stations={DEMO_STATIONS} />);
    expect(screen.queryByRole("button", { name: /Close station info/i })).not.toBeInTheDocument();
  });

  it("shows selected station panel when station is selected", () => {
    const selectedStation = DEMO_STATIONS[0];
    render(<MapPlaceholder stations={DEMO_STATIONS} selectedStation={selectedStation} />);
    expect(screen.getByRole("button", { name: /Close station info/i })).toBeInTheDocument();
  });

  it("calls onStationClick when station button is clicked", () => {
    const onStationClick = vi.fn();
    render(<MapPlaceholder stations={DEMO_STATIONS} onStationClick={onStationClick} />);
    fireEvent.click(screen.getByText("Shell City Center"));
    expect(onStationClick).toHaveBeenCalledWith(DEMO_STATIONS[0]);
  });

  it("shows distance and rating in selected station panel", () => {
    const selectedStation = { ...DEMO_STATIONS[0], distance: 1.5 };
    render(<MapPlaceholder stations={DEMO_STATIONS} selectedStation={selectedStation} />);
    expect(screen.getByText("1.5 km")).toBeInTheDocument();
    expect(screen.getByText(`${selectedStation.rating.toFixed(1)}`)).toBeInTheDocument();
  });

  it("has close button in selected station panel", () => {
    const selectedStation = DEMO_STATIONS[0];
    render(<MapPlaceholder stations={DEMO_STATIONS} selectedStation={selectedStation} />);
    expect(screen.getByRole("button", { name: /Close station info/i })).toBeInTheDocument();
  });
});