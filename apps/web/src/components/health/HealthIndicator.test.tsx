import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HealthIndicator } from "./HealthIndicator";
import type { HealthResponse } from "@fuelflow/shared/types";

describe("HealthIndicator", () => {
  it("shows loading state", () => {
    render(<HealthIndicator health={null} loading={true} error={null} />);
    expect(screen.getByText(/Checking.../i)).toBeInTheDocument();
  });

  it("shows error state with retry button", () => {
    const onRetry = vi.fn();
    render(
      <HealthIndicator
        health={null}
        loading={false}
        error={new Error("Connection failed")}
        onRetry={onRetry}
      />
    );
    expect(screen.getByText(/API Offline/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Retry connection/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Retry connection/i }));
    expect(onRetry).toHaveBeenCalled();
  });

  it("shows error state without retry button when not provided", () => {
    render(
      <HealthIndicator
        health={null}
        loading={false}
        error={new Error("Connection failed")}
      />
    );
    expect(screen.getByText(/API Offline/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Retry connection/i })).not.toBeInTheDocument();
  });

  it("shows online state with health data", () => {
    const health: HealthResponse = {
      status: "ok",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    };
    render(<HealthIndicator health={health} loading={false} error={null} />);
    expect(screen.getByText(/API Online/i)).toBeInTheDocument();
    expect(screen.getByText("1.0.0")).toBeInTheDocument();
  });

  it("shows online state without version", () => {
    const health: HealthResponse = {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
    render(<HealthIndicator health={health} loading={false} error={null} />);
    expect(screen.getByText(/API Online/i)).toBeInTheDocument();
    expect(screen.queryByText("1.0.0")).not.toBeInTheDocument();
  });

  it("shows unknown state when health is null and not loading", () => {
    render(<HealthIndicator health={null} loading={false} error={null} />);
    expect(screen.getByText(/Unknown/i)).toBeInTheDocument();
  });
});