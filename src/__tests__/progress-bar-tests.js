import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import V1 from '../progress-bar-exercise/v1';

describe('v1 progress-bar component', () => {
  it('render the progress-bar button components correctly', () => {
    render(<V1 />);
    const progressBar = screen.getByTestId('progress-bar');

    expect(progressBar).toHaveStyle('width: 0%');
    expect(progressBar).toBeVisible();
    expect(screen.getByText('START REQUEST')).not.toBeDisabled();
    expect(screen.getByText('FINISH REQUEST')).toBeDisabled();
  });

  it('start request updates progress correctly to 90%', async () => {
    jest.useFakeTimers();
    render(<V1 />);
    const startRequestButton = screen.getByText('START REQUEST');

    expect(startRequestButton).toBeVisible();
    await fireEvent.click(startRequestButton);
    const progressBar = screen.getByTestId('progress-bar');

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    await waitFor(() => {
      expect(progressBar).toHaveStyle('width: 90%');
    });
  });

  it('finish request and have progress bar show 100%', async () => {
    jest.useFakeTimers();
    render(<V1 />);

    const startRequestButton = screen.getByText('START REQUEST');
    const finishRequestButton = screen.getByText('FINISH REQUEST');

    expect(startRequestButton).toBeVisible();
    await fireEvent.click(startRequestButton);
    const progressBar = screen.getByTestId('progress-bar');

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    await waitFor(() => {
      expect(progressBar).toHaveStyle('width: 90%');
    });

    await fireEvent.click(finishRequestButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(progressBar).toHaveStyle('width: 100%');
    });
  });

  it('check if breakpoints checkbox is displayed and can click', () => {
    render(<V1 />);

    expect(screen.getByText('Toggle Breakpoints')).toBeVisible();

    const checkbox = screen.getByTestId('breakpointToggle');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });

  it('check if breakpoints checkbox is working correctly', async () => {
    jest.useFakeTimers();
    render(<V1 />);

    expect(screen.getByText('Toggle Breakpoints')).toBeVisible();

    const checkbox = screen.getByTestId('breakpointToggle');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);

    const startRequestButton = screen.getByText('START REQUEST');
    await fireEvent.click(startRequestButton);
    const progressBar = screen.getByTestId('progress-bar');

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    await waitFor(() => {
      expect(progressBar).toHaveClass('slow-animation');
    });
  });
});
