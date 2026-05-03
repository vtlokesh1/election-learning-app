/**
 * Footer.test.jsx
 *
 * Unit tests for the Footer component.
 * Covers: Google service badges, copyright text, and navigation links.
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../components/Footer';

function renderFooter() {
  render(<Footer />);
}

describe('Footer Component', () => {
  it('renders the Google Cloud badge', () => {
    renderFooter();
    expect(screen.getByTestId('google-cloud-badge')).toBeInTheDocument();
  });

  it('renders "Powered by Google Cloud" text in the badge', () => {
    renderFooter();
    const badge = screen.getByTestId('google-cloud-badge');
    expect(badge.textContent).toMatch(/Powered by/i);
    expect(badge.textContent).toMatch(/Google/i);
    expect(badge.textContent).toMatch(/Cloud/i);
  });

  it('renders the Google Antigravity badge', () => {
    renderFooter();
    expect(screen.getByTestId('antigravity-badge')).toBeInTheDocument();
  });

  it('renders "Built with Google Antigravity" in the badge', () => {
    renderFooter();
    const badge = screen.getByTestId('antigravity-badge');
    expect(badge.textContent).toMatch(/Built with/i);
    expect(badge.textContent).toMatch(/Google Antigravity/i);
  });

  it('renders the copyright notice', () => {
    renderFooter();
    const copyright = screen.getByTestId('footer-copyright');
    expect(copyright.textContent).toMatch(/2026 EVM-OS/i);
  });

  it('renders Quick Links navigation section', () => {
    renderFooter();
    expect(screen.getByText(/Quick Links/i)).toBeInTheDocument();
  });

  it('renders the Home quick link', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: /^Home$/i })).toBeInTheDocument();
  });

  it('renders the Quiz quick link', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: /^Quiz$/i })).toBeInTheDocument();
  });

  it('renders the Voter Registration external link', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: /Voter Registration/i })).toBeInTheDocument();
  });
});
