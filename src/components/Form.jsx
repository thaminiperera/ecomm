import React, { useState } from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { users } from "../db/users";
import { useUser } from "../context/UserContext";

const Form = () => {
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = users.find(
      (item) => item.email === email && item.password === password
    );

    if (currentUser) {
      updateUser(currentUser);
      alert("Login Successful");
      navigate("/dashboard");
    } else {
      alert("Login Not Successful");
    }
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item="true">
        <Paper elevation={3} style={{ padding: "50px", borderRadius: "30px" }}>
          <form onSubmit={handleSubmit}>
            <Stack gap={3}>
              <Typography variant="h6">Login</Typography>

              <FormControl>
                <InputLabel htmlFor="email-input">Email address</InputLabel>
                <Input
                  id="email-input"
                  placeholder="Enter your email address"
                  style={{ padding: "10px" }}
                  required
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="pass-input">Password</InputLabel>
                <Input
                  id="pass-input"
                  placeholder="Enter your password"
                  style={{ padding: "10px" }}
                  required={true}
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: "12px" }}
              >
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
    </Grid>
  );
};

export default Form;
