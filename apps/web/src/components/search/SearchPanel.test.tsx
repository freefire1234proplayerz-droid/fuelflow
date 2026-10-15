import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchPanel } from "./SearchPanel";
import { DEFAULT_FILTERS } from "../../types/station";

describe("SearchPanel", () => {
  const createDefaultProps = () => ({
    filters: DEFAULT_FILTERS,
    onFiltersChange: vi.fn(),
    onSortChange: vi.fn(),
    onSearch: vi.fn(),
    loading: false,
    demoMode: true,
  });

  let defaultProps: ReturnType<typeof createDefaultProps>;

  beforeEach(() => {
    defaultProps = createDefaultProps();
  });

  it("renders search panel with title", () => {
    render(<SearchPanel {...defaultProps} />);
    expect(screen.getByText(/Find Fuel Stations/i)).toBeInTheDocument();
  });

  it("shows demo mode notice", () => {
    render(<SearchPanel {...defaultProps} />);
    expect(screen.getByText(/Demo Mode:/i)).toBeInTheDocument();
    expect(screen.getByText(/simulated for demonstration purposes/i)).toBeInTheDocument();
  });

  it("renders location input (disabled in demo mode)", () => {
    render(<SearchPanel {...defaultProps} />);
    const locationInput = screen.getByLabelText(/Location/i);
    expect(locationInput).toBeInTheDocument();
    expect(locationInput).toBeDisabled();
    expect(screen.getByText(/Location search is disabled in demo mode/i)).toBeInTheDocument();
  });

  it("renders all fuel type filter chips", () => {
    render(<SearchPanel {...defaultProps} />);
    expect(screen.getByRole("checkbox", { name: /Petrol/i })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /Diesel/i })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /CNG/i })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /EV Charging/i })).toBeChecked();
  });

  it("calls onFiltersChange when fuel type checkbox is toggled", () => {
    render(<SearchPanel {...defaultProps} />);
    const cngCheckbox = screen.getByRole("checkbox", { name: /CNG/i });
    fireEvent.click(cngCheckbox);
    expect(defaultProps.onFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({
        fuelTypes: ["petrol", "diesel", "ev_charging"],
      })
    );
  });

  it("renders distance and rating selects", () => {
    render(<SearchPanel {...defaultProps} />);
    expect(screen.getByLabelText(/Maximum Distance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Minimum Rating/i)).toBeInTheDocument();
  });

  it("renders open only checkbox", () => {
    render(<SearchPanel {...defaultProps} />);
    expect(screen.getByRole("checkbox", { name: /Open now only/i })).not.toBeChecked();
  });

  it("calls onSearch when search button is clicked", () => {
    render(<SearchPanel {...defaultProps} />);
    const searchButton = screen.getByRole("button", { name: /Search Stations/i });
    fireEvent.click(searchButton);
    expect(defaultProps.onSearch).toHaveBeenCalled();
  });

  it("calls onFiltersChange and onSortChange with default values when reset is clicked", () => {
    const customFilters = { ...DEFAULT_FILTERS, maxDistance: 50, minRating: 4.0 };
    const props = { ...defaultProps, filters: customFilters };
    render(<SearchPanel {...props} />);
    const resetButton = screen.getByRole("button", { name: /Reset/i });
    fireEvent.click(resetButton);
    expect(props.onFiltersChange).toHaveBeenCalledWith(DEFAULT_FILTERS);
    expect(props.onSortChange).toHaveBeenCalledWith("distance");
  });

  it("disables buttons when loading", () => {
    const customFilters = { ...DEFAULT_FILTERS, maxDistance: 50, minRating: 4.0 };
    const loadingProps = { ...defaultProps, filters: customFilters, loading: true };
    render(<SearchPanel {...loadingProps} />);
    expect(screen.getByRole("button", { name: /Searching.../i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeDisabled();
  });
});