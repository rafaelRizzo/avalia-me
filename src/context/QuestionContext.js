"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';

const QuestionContext = createContext();

export function QuestionProvider({ children }) {
  const [currentQuestion, setCurrentQuestion] = useState(0); // Pergunta atual
  const [answers, setAnswers] = useState([]); // Respostas das questões
  const [loading, setLoading] = useState(true); // Estado de carregamento

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

  // Simula um carregamento (por exemplo, validação de UUID)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); // Após o carregamento, define o loading como false
    }, 1000);

    return () => clearTimeout(timeout); // Limpa o timeout quando o componente for desmontado
  }, []);

  return (
    <QuestionContext.Provider value={{ currentQuestion, nextQuestion, setAnswer, answers, loading }}>
      {children}
    </QuestionContext.Provider>
  );
}

export const useQuestion = () => {
  const context = useContext(QuestionContext);

  if (!context) {
    throw new Error("useQuestion must be used within a QuestionProvider");
  }

  return context;
};
