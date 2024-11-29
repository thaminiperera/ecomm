import React, { useState } from "react";
import { Grid2, Button, Stack, Typography, Box, Paper, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CartProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <Paper sx={{ width: "100%", margin: 0.5 }}>
      <Grid2
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={3}
        sx={{ padding: 1 }}
      >
        <IconButton sx={{backgroundColor:"#dddddd", borderRadius:"50%", }}><CloseIcon fontSize="small" /></IconButton>
        

        <Stack>
          <Box
            component="img"
            src={product.image}
            alt="Product Title"
            sx={{
              width: "100%",
              maxWidth: "120px",
              objectFit: "contain",
              height: "120px",

              borderRadius: 2,
            }}
          ></Box>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "120px",
              textAlign: "center",
              fontSize: "14px",
              paddingTop: 1,
            }}
          >
            {product.title}
          </Typography>
        </Stack>
        <Stack>
          <Typography
            sx={{ fontWeight: "light", fontSize: "12px", color: "#777777" }}
          >
            Price
          </Typography>
          <Typography>Rs. {Math.floor(product.price * 290.14)}</Typography>
        </Stack>

        <Grid2 container alignItems={"center"} gap={2}>
          <Button variant="outlined">-</Button>
          <Typography>{quantity}</Typography>
          <Button variant="outlined">+</Button>
        </Grid2>
        <Stack>
          <Typography
            sx={{ fontWeight: "light", fontSize: "12px", color: "#777777" }}
          >
            Sub Total
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Rs. {Math.floor(product.price * 290.14) * quantity}
          </Typography>
        </Stack>
      </Grid2>
    </Paper>
  );
};

export default CartProductCard;
