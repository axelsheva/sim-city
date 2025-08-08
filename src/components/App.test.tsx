import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { App } from './App';
import { useCityStore } from '../state/store';
import { World } from '../core/world';

describe('App', () => {
  beforeEach(() => {
    useCityStore.setState((s) => ({ ...s, world: new World() }));
  });

  it('places a road when a cell is clicked', () => {
    const { getByTestId } = render(<App />);
    const cell = getByTestId('cell-0-0');
    fireEvent.click(cell);
    const world = useCityStore.getState().world;
    expect(world.getBuilding(0, 0)?.type).toBe('Road');
    const updatedCell = getByTestId('cell-0-0');
    expect(updatedCell.getAttribute('fill')).toBe('#666');
  });
});
