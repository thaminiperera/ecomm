import React, { useEffect, useState } from "react";
import {
  Grid2,
  Stack,
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import QuantityMeter from "./QuantityMeter";
import { values } from "../constants/values.js";
import { useUser } from "../context/UserContext.jsx";

const CartProductCard = ({ product }) => {
  const {userData, updateUser} = useUser()
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const currentQuantity = userData.cart ? userData.cart.filter((item) => item.id == product.id)[0].quantity : null
    setQuantity(currentQuantity)
  }, [])

  const handleClose = () => {
    updateUser({
      cart:
        userData.cart.length > 0
          ? userData.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: 0 }
                : item
            )
          : [...userData.cart, { ...product, quantity: 0 }],
    });
    setQuantity(0);
  }

  return (
    <Paper sx={{ width: "100%", margin: 0.5 }}>
      <Grid2
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={3}
        sx={{ padding: 1 }}
      >
        <IconButton sx={{ backgroundColor: "#dddddd", borderRadius: "50%" }} onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>

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
          <QuantityMeter quantity={quantity} setQuantity={setQuantity} product={product}/>
        </Grid2>
        <Stack>
          <Typography
            sx={{ fontWeight: "light", fontSize: "12px", color: "#777777" }}
          >
            Sub Total
          </Typography>
          <Typography sx={{ fontWeight: "bold", minWidth: "100px" }}>
            Rs. {Math.floor(product.price * values.USDTOLKR) * quantity}
          </Typography>
        </Stack>
      </Grid2>
    </Paper>
  );
};

export default CartProductCard;
