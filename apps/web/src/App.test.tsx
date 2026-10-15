import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("renders search panel with location input", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Enter address, city, or PIN code/i)).toBeInTheDocument();
  });

  it("shows station list with demo stations", () => {
    render(<App />);
    DEMO_STATIONS.forEach((station) => {
      expect(screen.getAllByText(station.name).length).toBeGreaterThan(0);
    });
  });

  it("displays map component section when map tab is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Map/i }));
    expect(screen.getByText(/Loading map/i)).toBeInTheDocument();
  });

  it("has accessible heading structure", () => {
    render(<App />);
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("map component renders without errors", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Map/i }));
    expect(screen.getByText(/Loading map/i)).toBeInTheDocument();
  });
});