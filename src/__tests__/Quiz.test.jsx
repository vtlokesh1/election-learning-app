import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Quiz from '../components/Quiz';
import { LanguageProvider } from '../contexts/LanguageContext';

vi.mock('canvas-confetti', () => {
  return { default: vi.fn() };
});

describe('Quiz Component', () => {
  it('renders the quiz and correctly updates score on correct answer', async () => {
    render(
      <LanguageProvider>
        <Quiz />
      </LanguageProvider>
    );
    
    // Check if the title is present
    expect(screen.getByText(/Test Your/i)).toBeInTheDocument();
    expect(screen.getByText(/Knowledge/i)).toBeInTheDocument();
    
    // Find the first question
    expect(screen.getByText(/What is the minimum voting age in India?/i)).toBeInTheDocument();
    
    // Answer correctly (18)
    const button = screen.getByText('18');
    fireEvent.click(button);
    
    // Check if success message appears
    expect(screen.getByText(/Brilliant! That's correct./i)).toBeInTheDocument();
    
    // Score should be 1
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
