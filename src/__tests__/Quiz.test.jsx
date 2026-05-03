/**
 * Quiz.test.jsx
 *
 * Unit tests for the Quiz component.
 * Covers: rendering, correct/incorrect answer selection, score tracking,
 * results display, and quiz reset behavior.
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Quiz from '../components/Quiz';
import { LanguageProvider } from '../contexts/LanguageContext';

// Suppress confetti canvas errors in jsdom environment
vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

/** Helper: render Quiz wrapped in its required LanguageProvider */
function renderQuiz() {
  return render(
    <LanguageProvider>
      <Quiz />
    </LanguageProvider>
  );
}

describe('Quiz Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- Rendering ---
  it('renders the quiz section heading', () => {
    renderQuiz();
    expect(screen.getByText(/Test Your/i)).toBeInTheDocument();
    expect(screen.getByText(/Knowledge/i)).toBeInTheDocument();
  });

  it('renders the first question about minimum voting age', () => {
    renderQuiz();
    expect(
      screen.getByText(/What is the minimum voting age in India\?/i)
    ).toBeInTheDocument();
  });

  it('renders all answer options for the first question', () => {
    renderQuiz();
    // The first question has options: 16, 18, 21, 25
    expect(screen.getByText('16')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('21')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  // --- Correct Answer ---
  it('shows success feedback when the correct answer is selected', () => {
    renderQuiz();
    // Correct answer for Q1 is "18"
    fireEvent.click(screen.getByText('18'));
    expect(screen.getByText(/Brilliant! That's correct\./i)).toBeInTheDocument();
  });

  it('increments score to 1 after selecting the correct answer', () => {
    renderQuiz();
    fireEvent.click(screen.getByText('18'));
    // Score display should show "1"
    expect(screen.getByTestId('quiz-score').textContent).toBe('1');
  });

  // --- Wrong Answer ---
  it('shows failure feedback when an incorrect answer is selected', () => {
    renderQuiz();
    // "16" is incorrect for Q1
    fireEvent.click(screen.getByText('16'));
    expect(screen.getByText(/Not quite! The correct answer is:/i)).toBeInTheDocument();
  });

  it('does not increment score when wrong answer is selected', () => {
    renderQuiz();
    fireEvent.click(screen.getByText('16'));
    expect(screen.getByTestId('quiz-score').textContent).toBe('0');
  });

  // --- Answer Locking ---
  it('disables all options after an answer is selected for that question', () => {
    renderQuiz();
    fireEvent.click(screen.getByText('18'));
    // Get all option buttons for question 0 via data-testid
    const option0 = screen.getByTestId('option-0-0'); // "16"
    const option1 = screen.getByTestId('option-0-1'); // "18"
    expect(option0).toBeDisabled();
    expect(option1).toBeDisabled();
  });

  // --- Progress ---
  it('shows "See Results" button after all 5 questions are answered', () => {
    renderQuiz();

    // Answer all 5 questions (any answer)
    const questionTestIds = [0, 1, 2, 3, 4];
    questionTestIds.forEach((qIndex) => {
      // Click the first option (index 0) for each question
      const btn = screen.getByTestId(`option-${qIndex}-0`);
      fireEvent.click(btn);
    });

    expect(screen.getByTestId('see-results-btn')).toBeInTheDocument();
  });

  // --- Results Screen ---
  it('shows the results screen after clicking "See Results"', async () => {
    renderQuiz();

    // Answer all questions
    [0, 1, 2, 3, 4].forEach((qIndex) => {
      fireEvent.click(screen.getByTestId(`option-${qIndex}-0`));
    });
    fireEvent.click(screen.getByTestId('see-results-btn'));

    // Results screen may be wrapped in animation, use findByTestId for async rendering
    const resultsScreen = await screen.findByTestId('results-screen');
    expect(resultsScreen).toBeInTheDocument();
  });

  it('shows a result title ("Perfect Score!" or "Great Effort!") on results screen', async () => {
    renderQuiz();

    [0, 1, 2, 3, 4].forEach((qIndex) => {
      fireEvent.click(screen.getByTestId(`option-${qIndex}-0`));
    });
    fireEvent.click(screen.getByTestId('see-results-btn'));

    const resultTitle = await screen.findByTestId('result-title');
    expect(resultTitle.textContent).toMatch(/Perfect Score!|Great Effort!/);
  });

  // --- Reset ---
  it('resets the quiz when "Take Quiz Again" button is clicked', async () => {
    renderQuiz();

    // Answer all questions and go to results
    [0, 1, 2, 3, 4].forEach((qIndex) => {
      fireEvent.click(screen.getByTestId(`option-${qIndex}-0`));
    });
    fireEvent.click(screen.getByTestId('see-results-btn'));

    // Wait for results screen
    const resetBtn = await screen.findByTestId('reset-quiz-btn');
    fireEvent.click(resetBtn);

    // Quiz should reset: first question visible again, score = 0
    expect(
      screen.getByText(/What is the minimum voting age in India\?/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId('quiz-score').textContent).toBe('0');
  });
});

