import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  IconButton,
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

import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthInterface, QuestionInterface } from "./types/types";
import { theme } from "./theme/theme";

import useQuestions from "./customHooks/useQuestions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ModalTransition, createQuestion } from "./misc/common";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import DummyQuestions from "../dummy-data-questions.json";

interface PropsInterface {
  Auth: AuthInterface;
}
const AdminQuestionList = (props: PropsInterface) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.Auth.roleType !== "admin") {
      navigate("/login");
    }
  }, [props.Auth.roleType]);
  const {
    getQuestions,
    addQuestion,
    removeQuestion,
    updateQuestion,
    removeAllQuestions,
  } = useQuestions();

  const questions = getQuestions();

  const [questionActionType, setquestionActionType] = React.useState<
    "add" | "update" | ""
  >("add");
  const [deleteModalopen, setDeleteModalopen] = React.useState(false);

  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionInterface | null>(null);

  const handleDeleteModalClickOpen = (question: QuestionInterface) => {
    setSelectedQuestion(question);
    setDeleteModalopen(true);
  };

  const handleDeleteModalClickClose = (action: "delete" | "cancel") => {
    if (action === "delete") {
      if (selectedQuestion) {
        removeQuestion(selectedQuestion.id);
      }
    }
    setDeleteModalopen(false);
  };

  const [open, setOpen] = React.useState(false);
  const [initialValues, setInitialValues] = useState({
    question: "",
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      question: Yup.string().required("Question is required !"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(`question: ${values.question}`);

      console.log("questionActionType:", questionActionType);
      if (questionActionType === "add") {
        addQuestion(createQuestion(values.question));
        handleClose();
        resetForm();
      } else if (questionActionType === "update") {
        console.log("selectedQuestion:", selectedQuestion);
        if (selectedQuestion) {
          selectedQuestion.questionTitle = values.question;
          updateQuestion(selectedQuestion);
          handleClose();
          resetForm();
        }
      }
    },
  });
  const openQuestionAddModal = () => {
    setquestionActionType("add");
    setOpen(true);

    setInitialValues({
      question: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateQuestionModal = (question: QuestionInterface) => {
    setquestionActionType("update");
    setSelectedQuestion(question);
    setOpen(true);
    setInitialValues({
      question: question.questionTitle,
    });
  };
  const addDummyQuestions = () => {
    DummyQuestions.forEach((q) => {
      addQuestion(q);
    });
  };
  const deleteAllQuestions = () => {
    removeAllQuestions();
  };
  return (
    <div>
      <Button
        color="primary"
        variant="outlined"
        onClick={addDummyQuestions}
        sx={{
          mt: 2,
        }}
      >
        Add Dummy Questions
      </Button>
      <Button
        color="primary"
        variant="outlined"
        onClick={deleteAllQuestions}
        sx={{
          mt: 2,
          ml:2
        }}
      >
        Delete All Questions
      </Button>
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
                    alignItems="flex-start"
                    key={question.id}
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => updateQuestionModal(question)}
                        >
                          <EditIcon sx={{ color: theme.palette.error.main }} />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteModalClickOpen(question)}
                        >
                          <DeleteIcon
                            sx={{ color: theme.palette.error.main }}
                          />
                        </IconButton>
                      </>
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

                  {/* <ListItem
                    key={question.id}
                    // onClick={() => handleAnswerClick(question.id)}
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => updateQuestionModal(question)}
                        >
                          <EditIcon sx={{ color: theme.palette.error.main }} />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteModalClickOpen(question)}
                        >
                          <DeleteIcon
                            sx={{ color: theme.palette.error.main }}
                          />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemIcon>
                      <ChevronRightIcon />
                    </ListItemIcon>
                    <ListItemText primary={question.questionTitle} />
                  </ListItem> */}
                </>
              );
            })}
          </List>
        </>
      ) : (
        <p>No Question Found</p>
      )}
      <Button
        color="primary"
        variant="contained"
        onClick={openQuestionAddModal}
        sx={{
          mt: 2,
        }}
      >
        Add Question
      </Button>

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
        <DialogTitle>
          {questionActionType === "add" ? "Add" : "Update"} Question
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {questionActionType === "add" ? "Enter" : "Update"} your detailed
            question.
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
              id="question"
              label={
                questionActionType === "add"
                  ? "Enter Question"
                  : "Update Question"
              }
              name="question"
              autoComplete="question"
              autoFocus
              value={formik.values.question}
              onChange={formik.handleChange}
              error={formik.touched.question && Boolean(formik.errors.question)}
              helperText={formik.touched.question && formik.errors.question}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {questionActionType === "add" ? "Add" : "Update"} Question
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteModalopen}
        onClose={() => handleDeleteModalClickClose("cancel")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this qustions ?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDeleteModalClickClose("cancel")}>
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteModalClickClose("delete")}
            variant="contained"
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminQuestionList;
