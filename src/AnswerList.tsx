import React from "react";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AnswerList: React.FC = () => {
  const navigate = useNavigate();

  const handleEditClick = (questionId: number) => {
    navigate(`/answers/${questionId}/edit`);
  };

  return (
    <div>
      <List>
        <ListItem button onClick={() => handleEditClick(1)}>
          <ListItemText primary="Answer 1" />
        </ListItem>
      </List>
    </div>
  );
};

export default AnswerList;
