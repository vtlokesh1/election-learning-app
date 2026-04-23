import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import { LanguageProvider } from '../contexts/LanguageContext';

// Mock canvas-confetti to prevent canvas errors in jsdom
vi.mock('canvas-confetti', () => {
  return { default: vi.fn() };
});

describe('App Component', () => {
  it('renders the main hero title correctly', () => {
    render(<App />);
    const titleElement = screen.getByText(/Empower Your/i);
    expect(titleElement).toBeInTheDocument();
    
    const subtitleElement = screen.getByText(/Democratic Voice/i);
    expect(subtitleElement).toBeInTheDocument();
  });
});
