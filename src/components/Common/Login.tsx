import { Button, Container, TextField, Typography } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import { theme } from "../../theme/theme";





export default function Login() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      // Add your login logic here
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
        <Typography component="h1" variant="h5">
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
      </div>
    </Container>
  );
}
