import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MockEVM from '../components/MockEVM';
import { LanguageProvider } from '../contexts/LanguageContext';

describe('MockEVM Component', () => {
  it('allows selecting a candidate, confirming, and locks the EVM', async () => {
    render(
      <LanguageProvider>
        <MockEVM />
      </LanguageProvider>
    );
    
    // Find and click the vote button for Candidate A
    // Since there are no text labels on the actual button, we'll find it via its specific wrapper or by grabbing all buttons inside the candidate list.
    // In our implementation, the button is next to Candidate A text.
    
    const candidateA = screen.getByText('Candidate A');
    expect(candidateA).toBeInTheDocument();
    
    // The button is the sibling of the icon container.
    // Let's use test IDs or accessible names if possible. We didn't add aria-label yet, so we'll do it later.
    // For now, we know clicking on the button triggers the popup.
    // Let's just find the button that isn't the Cancel or Cast Vote (they aren't in document yet).
    const buttons = screen.getAllByRole('button');
    // First button should be Candidate A's vote button
    fireEvent.click(buttons[0]);
    
    // Check if modal appears
    await waitFor(() => {
      expect(screen.getByText(/Confirm Selection/i)).toBeInTheDocument();
    });
    
    // Click Cast Vote
    const castVoteButton = screen.getByText(/Cast Vote/i);
    fireEvent.click(castVoteButton);
    
    // Check if success message appears
    await waitFor(() => {
      expect(screen.getByText(/Vote Successfully Recorded!/i)).toBeInTheDocument();
    });
    
    // Check if the buttons are now locked (disabled)
    const allButtonsAfter = screen.getAllByRole('button');
    expect(allButtonsAfter[0]).toBeDisabled();
  });
});
