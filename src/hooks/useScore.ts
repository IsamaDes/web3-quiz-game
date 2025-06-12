// src/hooks/useScore.ts
import { useState, useCallback } from 'react';

export const useScore = () => {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const incrementScore = useCallback(() => {
    setScore(prev => prev + 1);
  }, []);

  const resetScore = useCallback(() => {
    setScore(0);
  }, []);

  const setTotal = useCallback((total: number) => {
    setTotalQuestions(total);
  }, []);

  const getPercentage = useCallback(() => {
    if (totalQuestions === 0) return 0;
    return Math.round((score / totalQuestions) * 100);
  }, [score, totalQuestions]);

  const getGrade = useCallback(() => {
    const percentage = getPercentage();
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }, [getPercentage]);

  return {
    score,
    totalQuestions,
    incrementScore,
    resetScore,
    setTotal,
    getPercentage,
    getGrade,
  };
};

// src/components/ScoreBoard.tsx

// src/components/Quiz.tsx (CORRECTED IMPORT)
