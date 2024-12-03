import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid2";
import {
  FormControl,
  Paper,
  InputLabel,
  Input,
  FormHelperText,
  Stack,
  Box,
  Typography,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { users, addUser } from "../db/users";
import { useUser } from "../context/UserContext";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUser();


  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .max(50, "First name must be at most 50 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .max(50, "Last name must be at most 50 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .test(
        "unique-email",
        "Email already exists",
        (value) => !users.some((user) => user.email === value)
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long, contain uppercase, lowercase, and a special character."
      ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const newUser = addUser({
        ...values,
        cart: [],
      });
      updateUser(newUser);
      navigate("/dashboard");
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item = "true">
        <Paper elevation={3} style={{ padding: "50px", borderRadius: "30px" }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack gap={3}>
              <Typography variant="h6">Sign Up</Typography>
              <FormControl>
                <InputLabel htmlFor="firstname-input">First Name</InputLabel>
                <Input
                  id="firstname-input"
                  name="firstName"
                  placeholder="Enter your first name"
                  style={{ padding: "10px" }}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                />
                <FormHelperText error>
                  {formik.touched.firstName && formik.errors.firstName}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="lastname-input">Last Name</InputLabel>
                <Input
                  id="lastname-input"
                  name="lastName"
                  placeholder="Enter your last name"
                  style={{ padding: "10px" }}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                />
                <FormHelperText error>
                  {formik.touched.lastName && formik.errors.lastName}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="email-input">Email Address</InputLabel>
                <Input
                  id="email-input"
                  name="email"
                  placeholder="Enter your email address"
                  style={{ padding: "10px" }}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                <FormHelperText error>
                  {formik.touched.email && formik.errors.email}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="pass-input">Password</InputLabel>
                <Input
                  id="pass-input"
                  name="password"
                  placeholder="Enter your password"
                  style={{ padding: "10px" }}
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText error sx={{width:"200px"}}>
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: "12px" }}
              >
                Sign Up
              </Button>
              <Box>
                <Typography variant="body1">
                  Already a Member? <Link href="/login">Login</Link>
                </Typography>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
