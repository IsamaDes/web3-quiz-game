// src/components/Quiz.tsx

// This component fetches questions, displays them one by one, allows the user to select an answer,
// and provides feedback on whether the answer was correct or incorrect.
// It also keeps track of the score and shows the final score when all questions have been answered.
// The component uses React hooks for state management and side effects, and it styles the quiz using Tailwind CSS classes.
// The questions are fetched from a static JSON file, but this can be adapted to fetch from an API in the future.
import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../data/questions';
import type { Question } from '../data/questions';
import { useScore } from '../hooks/useScore';
import ScoreBoard from './ScoreBooard';

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState('');
  
  // Use the custom hook for score management
  const { score, incrementScore, resetScore } = useScore();

  useEffect(() => {
    fetchQuestions().then(setQuestions);
  }, []);

  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    const currentQuestion = questions[currentIndex];
    const isCorrect = option === currentQuestion.correctAnswer;
    setFeedback(isCorrect ? 'Correct!' : 'Incorrect');
    if (isCorrect) incrementScore(); 
        
    setTimeout(() => {
      setFeedback('');
      setSelectedOption(null);
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowScore(false);
    setFeedback('');
    resetScore(); 
  };

  if (questions.length === 0) return <div>Loading...</div>;

  if (showScore) {
    return (
      <div className="p-4 max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <ScoreBoard score={score} total={questions.length} />
        <button 
          onClick={handleRestart}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const current = questions[currentIndex];

  return (
    <div className="p-4 max-w-xl mx-auto">
      {/* Show current score */}
      <div className="mb-4">
        <ScoreBoard score={score} total={questions.length} />
        <p className="text-sm text-gray-600 mt-1">
          Question {currentIndex + 1} of {questions.length}
        </p>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">{current.question}</h2>
      <div className="grid gap-2">
        {current.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={!!selectedOption}
            className={`border p-2 rounded ${
              selectedOption === option
                ? option === current.correctAnswer
                  ? 'bg-green-300'
                  : 'bg-red-300'
                : 'bg-white hover:bg-gray-50'
            } ${!!selectedOption ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && <p className="mt-2 text-lg font-medium">{feedback}</p>}
    </div>
  );
};

export default Quiz;










