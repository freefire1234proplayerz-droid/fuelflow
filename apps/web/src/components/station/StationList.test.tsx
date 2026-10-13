import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StationList } from "./StationList";
import { DEMO_STATIONS } from "../../utils/demoData";

describe("StationList", () => {
  it("renders loading skeleton when loading", () => {
    render(<StationList stations={[]} loading={true} />);
    expect(screen.getByRole("status", { name: /Loading stations/i })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(6);
  });

  it("shows empty message when no stations", () => {
    render(<StationList stations={[]} loading={false} emptyMessage="Custom empty message" />);
    expect(screen.getByText("Custom empty message")).toBeInTheDocument();
  });

  it("shows default empty message when no stations and no custom message", () => {
    render(<StationList stations={[]} loading={false} />);
    expect(screen.getByText("No stations found matching your criteria.")).toBeInTheDocument();
  });

  it("renders station cards for each station", () => {
    render(<StationList stations={DEMO_STATIONS} />);
    DEMO_STATIONS.forEach((station) => {
      expect(screen.getByText(station.name)).toBeInTheDocument();
    });
  });

  it("calls onSelectStation when station is clicked", () => {
    const onSelectStation = vi.fn();
    render(<StationList stations={DEMO_STATIONS} onSelectStation={onSelectStation} />);
    fireEvent.click(screen.getByText(DEMO_STATIONS[0].name));
    expect(onSelectStation).toHaveBeenCalledWith(DEMO_STATIONS[0]);
  });

  it("has correct role and aria-label", () => {
    render(<StationList stations={DEMO_STATIONS} />);
    expect(screen.getByRole("list", { name: /Fuel stations/i })).toBeInTheDocument();
  });

  it("applies responsive grid classes", () => {
    render(<StationList stations={DEMO_STATIONS} />);
    const list = screen.getByRole("list");
    expect(list).toHaveClass("grid-cols-1");
    expect(list).toHaveClass("sm:grid-cols-2");
    expect(list).toHaveClass("lg:grid-cols-3");
  });
});