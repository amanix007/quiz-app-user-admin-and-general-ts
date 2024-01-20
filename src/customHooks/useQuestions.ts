import { useEffect, useState } from 'react';
import { QuestionInterface } from '../types/types';

const useQuestions = () => {
  const [questions, setQuestions] = useState<QuestionInterface[]>(() => {
    const questionsArray = localStorage.getItem('questions');
    return questionsArray ? JSON.parse(questionsArray) : [];
  });


  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions))
  }, [questions])




  const getQuestions = () => {
    return questions;
  };

  const getSingleQuestion = (id: string): QuestionInterface | undefined => {
    return questions.find(q => q.id === id)

  };
  const addQuestion = (newQuestion: QuestionInterface) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const updateQuestion = (updatedQuestion: QuestionInterface) => {
    setQuestions(prev => {
      return prev.map(q => {
        if (q.id === updatedQuestion.id) {
          q.questionTitle = updatedQuestion.questionTitle;
        }
        return q;
      })
    })
  };

  const removeQuestion = (id: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter(q => q.id !== id)
    );
  };
  const removeAllQuestions = () => {
    setQuestions(([])
    );
  };
  const addAnswer = (updatedQuestionWithAnswer: QuestionInterface): void => {

    setQuestions(prev => {
      return prev.map(q => {
        if (q.id === updatedQuestionWithAnswer.id) {
          q = updatedQuestionWithAnswer;
        }
        return q;
      })
    })
  };

  return { getQuestions, getSingleQuestion, addQuestion, removeQuestion, addAnswer, updateQuestion, removeAllQuestions };
};

export default useQuestions;
