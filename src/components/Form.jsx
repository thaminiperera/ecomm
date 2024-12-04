import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {
  FormControl,
  Paper,
  InputLabel,
  Input,
  Stack,
  Box,
  Typography,
  Button,
  Link,
  FormHelperText,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUser } from "../context/UserContext";
import { users } from "../db/users";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  // Notifications
  const notifyLogin = () => toast.success("Login Successful!");
  const notifyLoginFail = () => toast.error("Login Failed!");

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .test("email-exists", "Email not found", (value) => {
        return users.some((user) => user.email === value);
      }),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { email, password } = values;
      const currentUser = users.find(
        (item) => item.email === email && item.password === password
      );

      if (currentUser) {
        updateUser(currentUser);
        notifyLogin(); 
        navigate('/dashboard', { state: { message: 'Login Successful' } });
      } else {
        notifyLoginFail();
      }
    },
  });

  // Password visibility toggle function
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
      <Grid item="true">
        <Paper elevation={3} style={{ padding: "50px", borderRadius: "30px" }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack gap={3}>
              <Typography variant="h6">Login</Typography>

              <FormControl fullWidth>
                <InputLabel htmlFor="email-input">Email address</InputLabel>
                <Input
                  id="email-input"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your email address"
                  style={{ padding: "10px" }}
                />
                {formik.touched.email && formik.errors.email && (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor="pass-input">Password</InputLabel>
                <Input
                  id="pass-input"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your password"
                  style={{ padding: "10px" }}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formik.touched.password && formik.errors.password && (
                  <FormHelperText error sx={{ width: "150px" }}>
                    {formik.errors.password}
                  </FormHelperText>
                )}
              </FormControl>

              <Button type="submit" variant="contained" style={{ marginTop: "12px" }}>
                Login
              </Button>

              <Box>
                <Typography variant="body1">
                  Not a Member? <Link href="/register">Sign Up</Link>
                </Typography>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default Form;
