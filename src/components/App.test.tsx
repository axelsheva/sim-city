import { render, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { App } from "./App";
import { useCityStore } from "../state/store";
import { World } from "../core/world";
import road from "../assets/buildings/road.svg";

describe("App", () => {
  beforeEach(() => {
    useCityStore.setState((s) => ({
      ...s,
      world: new World(),
      buildMode: "Road",
      history: [],
      future: [],
    }));
  });

  afterEach(() => {
    cleanup();
  });

  it("places a road when a cell is clicked", () => {
    const { getByTestId } = render(<App />);
    const cell = getByTestId("cell-0-0");
    fireEvent.click(cell);
    const world = useCityStore.getState().world;
    expect(world.getBuilding(0, 0)?.type).toBe("Road");
    const updatedCell = getByTestId("cell-0-0");
    expect(updatedCell.tagName.toLowerCase()).toBe("image");
    expect(updatedCell.getAttribute("href")).toBe(road);
  });

  it("allows selecting building type and placing it", () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId("tool-residential"));
    const cell = getByTestId("cell-1-1");
    fireEvent.click(cell);
    const world = useCityStore.getState().world;
    expect(world.getBuilding(1, 1)?.type).toBe("Residential");
  });

  it("supports undo and redo of placements", () => {
    const { getByTestId } = render(<App />);
    const cell = getByTestId("cell-2-2");
    fireEvent.click(cell);
    expect(useCityStore.getState().world.getBuilding(2, 2)?.type).toBe("Road");
    fireEvent.click(getByTestId("undo-btn"));
    expect(useCityStore.getState().world.getBuilding(2, 2)).toBeUndefined();
    fireEvent.click(getByTestId("redo-btn"));
    expect(useCityStore.getState().world.getBuilding(2, 2)?.type).toBe("Road");
  });
});
