import { TransitionProps } from "@mui/material/transitions";
import { Slide } from "@mui/material";
import { QuestionInterface } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export const createQuestion = (questionTitle: string): QuestionInterface => {
  return {
    id: uuidv4(),
    questionTitle,
    answer: {
      answerHistory: [],
    },
  };
};
export const createAnswer = ({
  question,
  answerString,
}: {
  question: QuestionInterface;
  answerString: string;
}): QuestionInterface => {
  if (
    question.answer.answerHistory.length > 0 &&
    question.answer.answerHistory[0] === answerString
  ) {
    return question;
  }

  question.answer.answerHistory.unshift(answerString);
  return question;
};

export const ModalTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


