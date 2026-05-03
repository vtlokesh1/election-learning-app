/**
 * App.test.jsx
 *
 * Integration tests for the top-level App component.
 * Verifies that the app renders key structural elements correctly.
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Prevent canvas errors from confetti library in jsdom
vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

describe('App Component', () => {
  it('renders the hero title "Empower Your"', () => {
    render(<App />);
    expect(screen.getByText(/Empower Your/i)).toBeInTheDocument();
  });

  it('renders the hero title "Democratic Voice"', () => {
    render(<App />);
    expect(screen.getByText(/Democratic Voice/i)).toBeInTheDocument();
  });

  it('renders the main navigation landmark', () => {
    render(<App />);
    // The app has a main nav with aria-label="Main navigation"
    const mainNav = screen.getByRole('navigation', { name: /Main navigation/i });
    expect(mainNav).toBeInTheDocument();
  });

  it('renders the footer copyright notice', () => {
    render(<App />);
    expect(screen.getByTestId('footer-copyright')).toBeInTheDocument();
  });

  it('renders the Google Cloud badge in the footer', () => {
    render(<App />);
    expect(screen.getByTestId('google-cloud-badge')).toBeInTheDocument();
  });

  it('renders the Google Antigravity badge in the footer', () => {
    render(<App />);
    expect(screen.getByTestId('antigravity-badge')).toBeInTheDocument();
  });
});
