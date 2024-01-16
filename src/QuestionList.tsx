import React from 'react';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const QuestionList: React.FC = () => {
  const navigate= useNavigate();

  const handleAnswerClick = (questionId: number) => {
    navigate(`/answers/${questionId}`);
  };

  

  return (
    <div>
      <List>
  
        <ListItem button onClick={() => handleAnswerClick(1)}>
          <ListItemText primary="Question 1" />
        </ListItem>
  
      </List>
    </div>
  );
};

export default QuestionList;
