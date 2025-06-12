// src/components/Quiz.tsx

// This component fetches questions, displays them one by one, allows the user to select an answer,
// and provides feedback on whether the answer was correct or incorrect.
// It also keeps track of the score and shows the final score when all questions have been answered.
// The component uses React hooks for state management and side effects, and it styles the quiz using Tailwind CSS classes.
// The questions are fetched from a static JSON file, but this can be adapted to fetch from an API in the future.
import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../data/questions';
import type { Question } from '../data/questions';

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchQuestions().then(setQuestions);
  }, []);

  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    const currentQuestion = questions[currentIndex];
    const isCorrect = option === currentQuestion.correctAnswer;
    setFeedback(isCorrect ? 'Correct!' : 'Incorrect');
    if (isCorrect) setScore(prev => prev + 1);
    
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

  if (questions.length === 0) return <div>Loading...</div>;

  if (showScore) return <div className="p-4 text-xl">Your score: {score}/{questions.length}</div>;

  const current = questions[currentIndex];

  return (
    <div className="p-4 max-w-xl mx-auto">
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
                : 'bg-white'
            }`}
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

        