import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CampaginDetails from './CampaignDetails';

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

vi.mock('../utils/request', () => ({
  fetchCampaignDetails: vi.fn(),
}));

describe('CampaginDetails', () => {
  it('renders loading state', () => {
    useQuery.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(
      <MemoryRouter initialEntries={['/campaign/1']}>
        <Routes>
          <Route path="/campaign/:id" element={<CampaginDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('renders campaign details', async () => {
    const mockCampaign = {
      impressions: 1000,
      clicks: 50,
      users: 200,
      ctr: 0.014,
    };

    useQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: mockCampaign,
    });

    render(
      <MemoryRouter initialEntries={['/campaign/1']}>
        <Routes>
          <Route path="/campaign/:id" element={<CampaginDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Campaign Details')).toBeDefined();
      expect(screen.getByText('Impressions')).toBeDefined();
      expect(screen.getByText('1000')).toBeDefined();
      expect(screen.getByText('Clicks')).toBeDefined();
      expect(screen.getByText('50')).toBeDefined();
      expect(screen.getByText('Users')).toBeDefined();
      expect(screen.getByText('200')).toBeDefined();
      expect(screen.getByText('CTR')).toBeDefined();
      expect(screen.getByText('0.014')).toBeDefined();
    });
  });

  it('handles error state', async () => {
    useQuery.mockReturnValue({
      isLoading: false,
      error: new Error('Failed to fetch campaign details'),
      data: null,
    });

    render(
      <MemoryRouter initialEntries={['/campaign/1']}>
        <Routes>
          <Route path="/campaign/:id" element={<CampaginDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Error')).toBeDefined();
      expect(screen.queryByText('Failed to fetch campaign details')).toBeDefined();
    });
  });
});