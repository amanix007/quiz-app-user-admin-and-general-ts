import React from "react";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { QustionInterface } from "./types/types";
import { theme } from "./theme/theme";
import { v4 as uuidv4 } from "uuid";
import useQuestions from "./customHooks/useQuestions";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionProps } from "@mui/material/transitions";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QuestionList: React.FC = () => {
  const [deleteModalopen, setDeleteModalopen] = React.useState(false);
  const [activedeleteItemID, setActivedeleteItemID] = React.useState<
    string | null
  >(null);

  const handleDeleteModalClickOpen = (id: string) => {
    setActivedeleteItemID(id);
    setDeleteModalopen(true);
  };

  const handleDeleteModalClickClose = (action: "delete" | "cancel") => {
    if (action === "delete") {
      if (activedeleteItemID) {
        removeQuestion(activedeleteItemID);
      }
    }
    setDeleteModalopen(false);
  };
  const { getQuestions, addQuestion, removeQuestion } = useQuestions();

  const questions = getQuestions();
  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      question: "",
    },
    validationSchema: Yup.object({
      question: Yup.string().required("Question is required !"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(`question: ${values.question}`);
      // setQuestions((prev) => [
      //   {
      //     id: uuidv4(),
      //     qustionDetail: values.question,
      //   },
      //   ...prev,
      // ]);
      addQuestion({
        id: uuidv4(),
        qustionDetail: values.question,
      });
      handleClose();
      resetForm();
    },
  });
  const openQuestionAddModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const handleAnswerClick = (questionId: string) => {
    navigate(`/answers/${questionId}`);
  };

  return (
    <div>
      {questions.length > 0 ? (
        <>
          <h4>Questions</h4>
          <List>
            {questions.map((question: QustionInterface) => {
              return (
                <ListItem
                  key={question.id}
                  // onClick={() => handleAnswerClick(question.id)}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteModalClickOpen(question.id)}
                    >
                      <DeleteIcon sx={{ color: theme.palette.error.main }} />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary={question.qustionDetail} />
                </ListItem>
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
        TransitionComponent={Transition}
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
        <DialogTitle>Add Question</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your detailed question.</DialogContentText>
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
              label="Enter Question"
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
            Add Question
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

export default QuestionList;
