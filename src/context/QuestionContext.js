import React, { createContext, useState, useContext } from 'react';

const QuestionContext = createContext();

export function QuestionProvider({ children }) {
  const [currentQuestion, setCurrentQuestion] = useState(0); // Pergunta atual
  const [answers, setAnswers] = useState([]); // Respostas das questões

  // Função para passar para a próxima questão
  const nextQuestion = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, 3)); // Limitamos a 4 questões
  };

  // Função para registrar a resposta
  const setAnswer = (answer) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = answer; // Salva a resposta na posição da pergunta
      return newAnswers;
    });
  };

  return (
    <QuestionContext.Provider value={{ currentQuestion, nextQuestion, setAnswer, answers }}>
      {children}
    </QuestionContext.Provider>
  );
}

export const useQuestion = () => useContext(QuestionContext);
