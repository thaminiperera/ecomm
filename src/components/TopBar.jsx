import React from "react";
import { Box, Grid2, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const TopBar = () => {
  const navigate = useNavigate();
  const { userData, logout, updateUser } = useUser();

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    
    
    logout()
    navigate("/login")
  }
  return (
    <Grid2
      container
      alignItems={"center"}
      justifyContent={{lg: "space-between", md: "space-between", sm: "space-between", xs: "center"}}
      sx={{ width: "100%" ,position: "fixed", backgroundColor: "#ffffff", zIndex: 99, top:0, borderBottom: "1px solid #eeeeee" }}
    >
      <Button
        onClick={handleLogoClick}
        sx={{ paddingRight: 3, borderRadius: "50%"}}
      >
        <Grid2 container alignItems={"center"} gap={0.5}>
          <Box
            component="img"
            src="../../logo.svg"
            sx={{ width: {xs : "50px", sm: "60px"}, padding: 1, marginLeft: 2 }}
          ></Box>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
              },
            }}
          >
            <Typography variant="h6">Ecomm</Typography>
          </Box>
        </Grid2>
      </Button>

      <Grid2
        container
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={2}
        columns={{ xs: 1 }}
        sx={{ margin: 2 }}
      >
        <Button variant="outlined" onClick={handleLogout}>Logout</Button>
        <Typography variant="h6">Hi {userData ? userData.firstName : "There!"}</Typography>
        <Button varient="outlined" onClick={handleCartClick}>
          <ShoppingCartIcon fontSize="large" />
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default TopBar;
