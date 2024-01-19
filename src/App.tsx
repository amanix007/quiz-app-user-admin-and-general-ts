import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionList from "./QuestionList";
import UserQuestionList from "./UserQuestionList";
import Login from "./components/Common/Login";
import { CssBaseline } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import "./App.css";
import Logo from "./assets/logo";
const drawerWidth = 240;

const MainContent = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));
const App: React.FC = () => {
  const theme = useTheme();

  const DrawerContainer = styled("div")({
    width: drawerWidth,
    flexShrink: 0,
  });

  const drawerPaperStyle = {
    width: drawerWidth,
  };

  const listItemStyle = {
    padding: theme.spacing(2),
  };
  return (
    <>
      <CssBaseline />

      <div style={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap>
              Strativ Quiz App
            </Typography>
          </Toolbar>
        </AppBar>
        <DrawerContainer>
          <Drawer
            variant="permanent"
            sx={{ "& .MuiDrawer-paper": drawerPaperStyle }}
          >
            <Toolbar>
              <Logo
                style={{
                  width: 60,
                }}
              />
              <p style={{width: "100%", marginLeft: 20}}>strativ.se</p>
            </Toolbar>
            <List>
              {["Home", "About", "Services", "Contact"].map((text, index) => (
                <ListItemButton key={text} sx={listItemStyle}>
                  <ListItemText primary={text} />
                </ListItemButton>
              ))}
            </List>
          </Drawer>
        </DrawerContainer>
        <MainContent>
          {/* Your main content goes here */}

          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/admin/questions" element={<QuestionList />} />
              <Route path="/user/questions" element={<UserQuestionList />} />
            </Routes>
          </Router>
        </MainContent>
      </div>
    </>
  );
};

export default App;
