import React from 'react';
import { render } from '@testing-library/react';
import { GuestDashboard } from '../components/pages/guest-pages/GuestDashboard';

describe('<GuestDashboard /> test suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('check-in is rendered with proper labels', () => {
    const { getByText } = render(<GuestDashboard />);

    const input = getByText(/Guest Name/i);
    expect(input.type).toBe('text');
    expect(input.placeholder).toBe('Guest Name');
  });
});
