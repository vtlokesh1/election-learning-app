/**
 * Navbar.test.jsx
 *
 * Unit tests for the Navbar component.
 * Covers: rendering navigation links, the app logo, and the theme toggle button.
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from '../components/Navbar';
import { LanguageProvider } from '../contexts/LanguageContext';

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

function renderNavbar(isDarkMode = true) {
  const setIsDarkMode = vi.fn();
  render(
    <LanguageProvider>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </LanguageProvider>
  );
  return { setIsDarkMode };
}

describe('Navbar Component', () => {
  it('renders the EVM-OS brand logo text', () => {
    renderNavbar();
    // The logo text "EVM-OS" should be present
    expect(screen.getAllByText(/EVM-OS/i).length).toBeGreaterThan(0);
  });

  it('renders a navigation element with the correct aria-label', () => {
    renderNavbar();
    // The main nav has aria-label="Main navigation"
    const nav = screen.getByRole('navigation', { name: /Main navigation/i });
    expect(nav).toBeInTheDocument();
  });

  it('renders the theme toggle button with an accessible label', () => {
    renderNavbar();
    // The toggle button has aria-label="Toggle Theme"
    const toggleBtn = screen.getByRole('button', { name: /Toggle Theme/i });
    expect(toggleBtn).toBeInTheDocument();
  });

  it('calls setIsDarkMode when the theme toggle is clicked', () => {
    const { setIsDarkMode } = renderNavbar(true);
    // Click the specifically labeled theme toggle button
    const toggleBtn = screen.getByRole('button', { name: /Toggle Theme/i });
    fireEvent.click(toggleBtn);
    expect(setIsDarkMode).toHaveBeenCalled();
  });

  it('renders the Quiz navigation link', () => {
    renderNavbar();
    expect(screen.getByText(/Quiz/i)).toBeInTheDocument();
  });
});
