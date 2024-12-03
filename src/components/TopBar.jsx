import React from "react";
import { Box, Grid2, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const TopBar = () => {
  const navigate = useNavigate();
  const { userData } = useUser();

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogoClick = () => {
    navigate("/dashboard");
  };
  return (
    <Grid2
      container
      alignItems={"center"}
      justifyContent={{lg: "space-between", md: "space-between", sm: "space-between", xs: "center"}}
      sx={{ width: "100%" ,position: "fixed", backgroundColor: "#ffffff", zIndex: 99, top:0, borderBottom: "1px solid #eeeeee" }}
    >
      <Button
        onClick={handleLogoClick}
        sx={{ paddingRight: 3, borderRadius: "50%" }}
      >
        <Grid2 container alignItems={"center"} gap={0.5}>
          <Box
            component="img"
            src="../../logo.svg"
            sx={{ width: "100px", padding: 1, marginLeft: 2 }}
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
        <Button variant="outlined">Logout</Button>
        <Typography variant="h6">Hi {userData.firstName}</Typography>
        <Button varient="outlined" onClick={handleCartClick}>
          <ShoppingCartIcon fontSize="large" />
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default TopBar;
