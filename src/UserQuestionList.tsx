import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useQuestions from "./customHooks/useQuestions";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { QustionInterface } from "./types/types";

const UserQuestionList: React.FC = () => {
  const { getQuestions } = useQuestions();

  const questions = getQuestions();
  const navigate = useNavigate();

  const handleEditClick = (questionId: number) => {
    navigate(`/answers/${questionId}/edit`);
  };

  return (
    <div>
      {questions.length > 0 ? (
        <>
          <h1>Questions</h1>
          <List>
            {questions.map((question: QustionInterface) => {
              return (
                <ListItem
                  key={question.id}
                  // onClick={() => handleAnswerClick(question.id)}

                  secondaryAction={
                    <Button size="small" variant="contained" color="primary">
                      Add answer
                    </Button>
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
    </div>
  );
};

export default UserQuestionList;
