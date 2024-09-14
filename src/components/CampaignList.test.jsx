import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import CampaignList from './CampaignList';

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

vi.mock('../utils/request', () => ({
  fetchCampaignList: vi.fn(),
}));

describe('CampaignList', () => {
  it('renders loading state', () => {
    useQuery.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(
      <MemoryRouter>
        <CampaignList />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('renders campaign list', async () => {
    const mockCampaigns = [
      { id: 1, name: 'Campaign 1' },
      { id: 2, name: 'Campaign 2' },
    ];

    useQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: mockCampaigns,
    });

    render(
      <MemoryRouter>
        <CampaignList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Campaign 1')).toBeDefined();
      expect(screen.getByText('ID: 1')).toBeDefined();
      expect(screen.getByText('Campaign 2')).toBeDefined();
      expect(screen.getByText('ID: 2')).toBeDefined();
    });
  });

  it('handles error state', async () => {
    useQuery.mockReturnValue({
      isLoading: false,
      error: new Error('Failed to fetch campaign list'),
      data: null,
    });

    render(
      <MemoryRouter>
        <CampaignList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeDefined();
      expect(screen.getByText('Failed to fetch campaign list')).toBeDefined();
    });
  });
});