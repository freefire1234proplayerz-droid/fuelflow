import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { DEMO_STATIONS } from "./utils/demoData";

describe("App", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("renders the app header with name and tagline", () => {
    render(<App />);
    expect(screen.getByText("FuelFlow")).toBeInTheDocument();
    expect(screen.getByText("Find fuel. Skip the queue.")).toBeInTheDocument();
  });

  it("shows health indicator", () => {
    render(<App />);
    expect(screen.getByText(/Online|Offline|Checking/i)).toBeInTheDocument();
  });

  it("displays demo mode notice", () => {
    render(<App />);
    expect(screen.getAllByText(/Demo Mode:/i).length).toBeGreaterThan(0);
  });

  it("renders search panel with location input", () => {
    render(<App />);
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
  });

  it("shows station list with demo stations", () => {
    render(<App />);
    DEMO_STATIONS.forEach((station) => {
      expect(screen.getAllByText(station.name).length).toBeGreaterThan(0);
    });
  });

  it("displays map placeholder section", () => {
    render(<App />);
    expect(screen.getByText(/Map View/i)).toBeInTheDocument();
    expect(screen.getByText(/Interactive Map/i)).toBeInTheDocument();
    expect(screen.getByText(/Map integration coming soon/i)).toBeInTheDocument();
  });

  it("shows footer with demo data notice", () => {
    render(<App />);
    expect(screen.getByText(/Demo Data Notice/i)).toBeInTheDocument();
    expect(screen.getByText(/simulated for demonstration purposes only/i)).toBeInTheDocument();
  });

  it("has accessible heading structure", () => {
    render(<App />);
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("map placeholder shows station buttons", () => {
    render(<App />);
    const stationButtons = screen.getAllByText("Shell City Center");
    expect(stationButtons.length).toBeGreaterThan(0);
    expect(screen.getAllByText("BP Highway Station").length).toBeGreaterThan(0);
    expect(screen.getAllByText("TotalEnergies Green Hub").length).toBeGreaterThan(0);
  });
});