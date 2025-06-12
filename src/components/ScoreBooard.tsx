import React from 'react';

interface ScoreBoardProps {
  score: number;
  total: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, total }) => {
  return (
    <div className="text-center text-xl font-semibold">
      Score: {score} / {total}
    </div>
  );
};

export default ScoreBoard;
