// src/pages/Home.tsx
import React from 'react';
import Quiz from '../components/Quiz';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">React Quiz App</h1>
      <Quiz />
    </div>
  );
};

export default Home;
