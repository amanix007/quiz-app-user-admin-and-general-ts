

const questions = [
  { id: 1, text: 'Qustion one ?' },
];

const answers = [
  { id: 1, text: 'Answer Text', userId: 1, questionId: 1 },
];

export const getQuestions = () => Promise.resolve(questions);

export const getAnswers = () => Promise.resolve(answers);
