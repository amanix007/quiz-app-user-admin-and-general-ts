import React from "react";
import { Link, useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../assets/logo";
import { AuthInterface } from "../../types/types";
const pages = [
  { label: "Questions", route: "/admin/questions" },

  { label: "Answers", route: "/user/answers" },
];
const settings = ["Login", "Logout"];
export default function Navigation(props: {
  setAuth: (auth: AuthInterface) => void;
}) {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (route: string) => {
    navigate(route);
  };

  const handleCloseUserMenu = (key?: string) => {
    setAnchorElUser(null);
    if (key) {
      if (key === "login") {
        navigate("/login");
      } else {
        props.setAuth({
          authenticated: false,
          roleType: "",
        });
        localStorage.removeItem("Auth");
        navigate("/login");
      }
    }
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Logo
            style={{
              width: 60,
              marginRight: 8,
            }}
          />
          {/* <Logo
          style={{
            width: 60,
          }}
        />
        <p style={{ width: "100%", marginLeft: 20 }}>strativ.se</p> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            strativ.se
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {pages.map((page) => (
              <Button
                component={Link}
                
                key={page.label}
                onClick={() => handleCloseNavMenu(page.route)}
                sx={{ my: 2, color: "white", display: "block" }}
                to={page.route}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Authentication options">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu()}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
