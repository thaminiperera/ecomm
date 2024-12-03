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
      justifyContent={"space-between"}
      sx={{ width: "100%" }}
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
      >
        <Typography variant="h6" sx={{ padding: 2, marginLeft: 2 }}>
          Hi {userData.firstName}
        </Typography>
        <Button
          varient="outlined"
          sx={{ marginRight: 2 }}
          onClick={handleCartClick}
        >
          <ShoppingCartIcon fontSize="large" />
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default TopBar;
