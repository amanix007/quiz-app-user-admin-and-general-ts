import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import QuestionList from "./QuestionList";
import AnswerList from "./AnswerList";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/admin/questions" element={<QuestionList />} />
        <Route path="/answers" element={<AnswerList />} />
      </Routes>
    </Router>
  );
};

export default App;
