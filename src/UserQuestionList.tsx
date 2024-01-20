import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import * as Yup from "yup";
import useQuestions from "./customHooks/useQuestions";

import { QuestionInterface } from "./types/types";
import React, { useState } from "react";
import { useFormik } from "formik";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import { ModalTransition, createAnswer } from "./misc/common";
import { theme } from "./theme/theme";
import { isEmpty } from "lodash";
const UserQuestionList = () => {
  const [initialValues, setInitialValues] = useState({
    answer: "",
  });
  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionInterface | null>(null);

  const { getQuestions, addAnswer } = useQuestions();

  const questions = getQuestions();

  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      answer: Yup.string().required("Answer is required !"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(`answer: ${values.answer}`);

      if (selectedQuestion) {
        addAnswer(
          createAnswer({
            question: selectedQuestion,
            answerString: values.answer,
          })
        );
        handleClose();
        resetForm();
      }
    },
  });
  const openAnswerAddModal = (question: QuestionInterface) => {
    setInitialValues((prev) => ({
      ...prev,
      answer:
        question.answer.answerHistory.length > 0
          ? question.answer.answerHistory[0]
          : "",
    }));
    setSelectedQuestion(question);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {questions.length > 0 ? (
        <>
          <h1>Questions</h1>
          <List
            sx={{ width: "100%", maxWidth: 720, bgcolor: "background.paper" }}
          >
            {questions.map((question: QuestionInterface) => {
              return (
                <>
                  <ListItem
                    sx={{ cursor: "pointer" }}
                    onClick={() => openAnswerAddModal(question)}
                    alignItems="flex-start"
                    key={question.id}
                    secondaryAction={
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        // onClick={() => openAnswerAddModal(question)}
                      >
                        {question.answer.answerHistory.length > 0
                          ? "Update"
                          : "Add"}{" "}
                        answer
                      </Button>
                    }
                  >
                    <ListItemAvatar>
                      <ListItemIcon>
                        <QuestionAnswerIcon />
                      </ListItemIcon>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Question: ${question.questionTitle}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {question.answer.answerHistory.length > 0
                              ? `Answer: ${question.answer.answerHistory[0]}`
                              : ""}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              );
            })}
          </List>
        </>
      ) : (
        <p>No Question Found</p>
      )}

      <Dialog
        TransitionComponent={ModalTransition}
        keepMounted
        maxWidth={"md"}
        fullScreen={true}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          // onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          //   event.preventDefault();
          //   const formData = new FormData(event.currentTarget);
          //   const formJson = Object.fromEntries((formData as any).entries());
          //   const qustion = formJson.qustion;

          //   handleClose();
          // },

          onSubmit: formik.handleSubmit,
        }}
      >
        <DialogTitle>Add Answer to this question</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontWeight: 700,
              fontSize: "2rem",
              mt: 2,
            }}
          >
            {selectedQuestion?.questionTitle}
          </DialogContentText>
          <form
            style={{
              width: "100%",
              marginTop: theme.spacing(1),
            }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              multiline
              rows={4}
              // defaultValue="Write your question here..."
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="answer"
              label="Enter answer"
              name="answer"
              autoComplete="answer"
              autoFocus
              value={formik.values.answer}
              onChange={formik.handleChange}
              error={formik.touched.answer && Boolean(formik.errors.answer)}
              helperText={formik.touched.answer && formik.errors.answer}
            />
          </form>
          {!isEmpty(selectedQuestion) &&
          selectedQuestion?.answer?.answerHistory.length < 2 ? (
            <p>
              <strong>No edit history available</strong>
            </p>
          ) : (
            <>
              <p>
                <strong>
                  Answer Edit history : (
                  {selectedQuestion?.answer.answerHistory.length})
                </strong>
              </p>
              <ol>
                {selectedQuestion?.answer.answerHistory.map((history, i) => (
                  <li style={{ marginBottom: 4 }} key={history + i}>
                    {history}
                  </li>
                ))}
              </ol>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          {
            <Button type="submit" variant="contained" color="primary">
              {!isEmpty(selectedQuestion) &&
              selectedQuestion?.answer?.answerHistory?.length > 0
                ? "Update"
                : "Add"}{" "}
              Answer
            </Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserQuestionList;
