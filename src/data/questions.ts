/*
 * Feature: Setup Question Data
 * Description: This module provides the JSON structure and a utility function to load questions
 * Source: Static JSON file (local) - can be adapted to API later
 */

//Typescript interface for a question
// This file defines the structure of a question and provides a sample set of questions.
// It can be used to fetch questions in a quiz application or similar use cases.
// Note: This is a static data file. In a real application, you might fetch this from an API or database.


export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  category?: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
    category: "Geography"
  },
  {
    id: 2,
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correctAnswer: "JavaScript",
    category: "Technology"
  },
  {
    id: 3,
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "Jane Austen", "Ernest Hemingway"],
    correctAnswer: "Harper Lee",
    category: "Literature"
  }
];

// Utility to get all questions
export const fetchQuestions = async (): Promise<Question[]> => {
  // Simulate async fetch. Replace with real API call if needed.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(questions);
    }, 500);
  });
};
