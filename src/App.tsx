import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionList from "./AdminQuestionList";
import UserQuestionList from "./UserQuestionList";
import Login from "./components/Common/Login";
import { CssBaseline } from "@mui/material";

import Container from "@mui/material/Container";

import "./App.css";
import { AuthInterface } from "./types/types";
import PrivateRoute from "./misc/PriavateRoute";
import Navigation from "./components/Common/Navigation";

const App: React.FC = () => {
  const [Auth, setAuth] = useState<AuthInterface>(() => {
    const Auth = localStorage.getItem("Auth");
    return Auth
      ? JSON.parse(localStorage.getItem("Auth"))
      : {
          authenticated: false,
          roleType: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("Auth", JSON.stringify(Auth));
  }, [Auth]);

  return (
    <>
      <CssBaseline />
      <Navigation setAuth={setAuth} />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Login Auth={Auth} setAuth={setAuth} />} />
          <Route
            path="/login"
            element={<Login Auth={Auth} setAuth={setAuth} />}
          />

          <Route
            path="/admin/questions"
            element={
              <PrivateRoute Auth={Auth} role="admin">
                <QuestionList Auth={Auth} />
              </PrivateRoute>
            }
          />

          <Route
            path="/user/answers"
            element={
              <PrivateRoute Auth={Auth} role="participant">
                <UserQuestionList Auth={Auth} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
