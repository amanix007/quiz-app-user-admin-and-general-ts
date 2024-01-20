import { Button, Container, TextField, Typography } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import { theme } from "../../theme/theme";
import { AuthInterface } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface PropsInterface {
  Auth: AuthInterface;
  setAuth: (auth: AuthInterface) => void;
}

export default function Login(props: PropsInterface) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "admin",
      password: "admin",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const { username, password } = values;
      if (username === "admin" && password === "admin") {
        props.setAuth({
          authenticated: true,
          roleType: "admin",
        });
        navigate("/admin/questions");
      } else if (username === "participant" && password === "participant") {
        props.setAuth({
          authenticated: true,
          roleType: "participant",
        });
        navigate("/user/answers");
      } else {
        props.setAuth({
          authenticated: false,
          roleType: "",
        });
      }
      console.log(`Username: ${values.username}, Password: ${values.password}`);
    },
  });
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        ml: "auto",
        mr: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: theme.spacing(8),
        }}
      >
        <Typography component="h1" variant="h5" fontWeight={"bold"}>
          Login
        </Typography>
        <form
          style={{
            width: "100%",
            marginTop: theme.spacing(1),
          }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            style={{ margin: theme.spacing(3, 0, 2) }}
          >
            Sign In
          </Button>
        </form>
        <div>
          <Typography sx={{ mb: 1 }}>
            Admin Login : <br /> Username: <strong> admin</strong>, Password:{" "}
            <strong>admin</strong>
          </Typography>
          <Typography>
            Participant Login : <br />
            UserName: <strong>participant</strong>, Password:{" "}
            <strong>participant</strong>
          </Typography>
        </div>
      </div>
    </Container>
  );
}
