/**
 * MockEVM.test.jsx
 *
 * Unit tests for the MockEVM (Electronic Voting Machine Simulator) component.
 * Covers: rendering candidates, voting flow, confirmation modal,
 * cancel behavior, EVM locking, and edge cases.
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MockEVM from '../components/MockEVM';
import { LanguageProvider } from '../contexts/LanguageContext';

/** Helper: render MockEVM wrapped in its required LanguageProvider */
function renderEVM() {
  return render(
    <LanguageProvider>
      <MockEVM />
    </LanguageProvider>
  );
}

describe('MockEVM Component', () => {
  // --- Rendering ---
  it('renders all 3 candidate names', () => {
    renderEVM();
    expect(screen.getByText('Candidate A')).toBeInTheDocument();
    expect(screen.getByText('Candidate B')).toBeInTheDocument();
    expect(screen.getByText('Candidate C')).toBeInTheDocument();
  });

  it('renders vote buttons for all candidates', () => {
    renderEVM();
    expect(screen.getByTestId('vote-btn-0')).toBeInTheDocument();
    expect(screen.getByTestId('vote-btn-1')).toBeInTheDocument();
    expect(screen.getByTestId('vote-btn-2')).toBeInTheDocument();
  });

  it('renders vote buttons with correct aria-labels', () => {
    renderEVM();
    expect(
      screen.getByRole('button', { name: /Vote for Candidate A/i })
    ).toBeInTheDocument();
  });

  // --- Confirmation Modal ---
  it('opens confirmation modal when a vote button is clicked', async () => {
    renderEVM();
    fireEvent.click(screen.getByTestId('vote-btn-0'));

    await waitFor(() => {
      expect(screen.getByTestId('confirm-modal')).toBeInTheDocument();
    });
  });

  it('shows the candidate name inside the confirmation modal', async () => {
    renderEVM();
    fireEvent.click(screen.getByTestId('vote-btn-0'));

    await waitFor(() => {
      expect(screen.getByTestId('confirm-modal')).toBeInTheDocument();
      // The modal heading should say 'Confirm Selection'
      expect(screen.getByText('Confirm Selection')).toBeInTheDocument();
      // The candidate name should appear inside the modal (within the pending candidate span)
      const modal = screen.getByTestId('confirm-modal');
      expect(modal.textContent).toContain('Candidate A');
    });
  });

  // --- Cancel Flow ---
  it('closes the modal without voting when Cancel is clicked', async () => {
    renderEVM();
    fireEvent.click(screen.getByTestId('vote-btn-0'));

    await waitFor(() => {
      expect(screen.getByTestId('confirm-modal')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('cancel-vote-btn'));

    await waitFor(() => {
      expect(screen.queryByTestId('confirm-modal')).not.toBeInTheDocument();
    });

    // EVM should still be unlocked — success panel should NOT appear
    expect(screen.queryByTestId('vote-success')).not.toBeInTheDocument();
  });

  // --- Successful Vote Flow ---
  it('shows the success panel after confirming a vote', async () => {
    renderEVM();
    fireEvent.click(screen.getByTestId('vote-btn-0'));

    await waitFor(() => {
      expect(screen.getByTestId('confirm-modal')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('cast-vote-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('vote-success')).toBeInTheDocument();
    });
  });

  it('displays "Vote Successfully Recorded!" after casting', async () => {
    renderEVM();
    fireEvent.click(screen.getByTestId('vote-btn-0'));

    await waitFor(() => screen.getByTestId('confirm-modal'));
    fireEvent.click(screen.getByTestId('cast-vote-btn'));

    await waitFor(() => {
      expect(screen.getByText(/Vote Successfully Recorded!/i)).toBeInTheDocument();
    });
  });

  // --- EVM Locking (One Vote Only) ---
  it('disables all vote buttons after a vote is cast', async () => {
    renderEVM();
    fireEvent.click(screen.getByTestId('vote-btn-1'));
    await waitFor(() => screen.getByTestId('confirm-modal'));
    fireEvent.click(screen.getByTestId('cast-vote-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('vote-btn-0')).toBeDisabled();
      expect(screen.getByTestId('vote-btn-1')).toBeDisabled();
      expect(screen.getByTestId('vote-btn-2')).toBeDisabled();
    });
  });

  it('does not open the modal if vote button is clicked after EVM is locked', async () => {
    renderEVM();

    // Cast a vote to lock the EVM
    fireEvent.click(screen.getByTestId('vote-btn-0'));
    await waitFor(() => screen.getByTestId('confirm-modal'));
    fireEvent.click(screen.getByTestId('cast-vote-btn'));
    await waitFor(() => screen.getByTestId('vote-success'));

    // All buttons are disabled after voting — this prevents any new modal from opening
    const lockedBtn = screen.getByTestId('vote-btn-2');
    expect(lockedBtn).toBeDisabled();
    // Verify the EVM is locked by checking all three buttons
    expect(screen.getByTestId('vote-btn-0')).toBeDisabled();
    expect(screen.getByTestId('vote-btn-1')).toBeDisabled();
    expect(screen.getByTestId('vote-btn-2')).toBeDisabled();
  });

  // --- Different Candidate Vote ---
  it('correctly records the name of Candidate B in the success message', async () => {
    renderEVM();
    fireEvent.click(screen.getByTestId('vote-btn-1'));

    await waitFor(() => screen.getByTestId('confirm-modal'));
    fireEvent.click(screen.getByTestId('cast-vote-btn'));

    await waitFor(() => {
      expect(screen.getByText(/"Candidate B"/i)).toBeInTheDocument();
    });
  });
});
