import React from 'react'
import Grid from "@mui/material/Grid2";
import {
  FormControl,
  Paper,
  InputLabel,
  Input,
  FormHelperText,
  Stack,
  Box,
  Card,
  Typography,
  Button,
  Divider,
  Link,
} from "@mui/material";
import { Links } from "react-router-dom";

const RegisterForm = () => {
  return (
    <Grid
    container
    justifyContent="center"
    alignItems="center"
    sx={{ minHeight: "100vh" }}
  >
    <Grid item>
      <Paper elevation={3} style={{ padding: "50px", borderRadius: "30px" }}>
        <form>
          <Stack gap={3}>
            <Typography variant="h6">Sign Up</Typography>
            <FormControl>
              <InputLabel htmlFor="firstname-input">First Name</InputLabel>
              <Input
                id="firstname-input"
                placeholder="Enter your first name"
                style={{ padding: "10px" }}
                required
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="lastname-input">Last Name</InputLabel>
              <Input
                id="lastname-input"
                placeholder="Enter your last name"
                style={{ padding: "10px" }}
                required
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="email-input">Email address</InputLabel>
              <Input
                id="email-input"
                placeholder="Enter your email address"
                style={{ padding: "10px" }}
                required
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="pass-input">Password</InputLabel>
              <Input
                id="pass-input"
                placeholder="Enter your password"
                style={{ padding: "10px" }}
                required={true}
              />
            </FormControl>
            <Button variant="contained" style={{ marginTop: "12px" }}>
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
  )
}

export default RegisterForm