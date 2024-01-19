import { useEffect, useState } from 'react';
import { QustionInterface } from '../types/types';

const useQuestions = () => {
  const [questions, setQuestions] = useState<QustionInterface[]>(() => {
    const questionsArray = localStorage.getItem('questions');
    return questionsArray ? JSON.parse(questionsArray) : [];
  });


  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions))
  }, [questions])




  const getQuestions = () => {
    return questions;
  };

  const getSingleQuestion = (id: string): QustionInterface | undefined => {
    return questions.find(q => q.id === id)

  };
  const addQuestion = (newQuestion: QustionInterface) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter(q => q.id !== id)
    );
  };

  return { getQuestions, getSingleQuestion, addQuestion, removeQuestion };
};

export default useQuestions;
