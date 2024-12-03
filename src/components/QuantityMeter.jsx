import React, { useEffect, useState } from "react";
import { Grid2, Button, Typography } from "@mui/material";
import { useUser } from "../context/UserContext";

const QuantityMeter = ({ quantity, setQuantity, product }) => {
  const { userData, updateUser } = useUser();
  //const [quantity, setQuantity] = useState(0);
  const [addToCart, setAddToCart] = useState(false);

  useEffect(() => {
    const updatedCart = userData.cart.filter((item) => item.quantity > 0);

    if (updatedCart.length !== userData.cart.length) {
      updateUser({ cart: updatedCart });
    }
  }, [userData.cart]);

  const handleAddToCart = () => {
    setQuantity(quantity + 1);
  };

  const handleIncrease = () => {
    updateUser({
      cart:
        userData.cart.length > 0
          ? userData.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: (item.quantity || 0) + 1 }
                : item
            )
          : [...userData.cart, { ...product, quantity: 1 }],
    });

    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      updateUser({
        cart:
          userData.cart.length > 0
            ? userData.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
            : [...userData.cart, { ...product, quantity: 1 }],
      });
      setQuantity(quantity - 1);
    }
  };
  return (
    <Grid2
      container
      sx={{
        width: "100%",
        height: "auto",
      }}
    >
      <Grid2 item="true">
        <Button variant="outlined" onClick={handleDecrease}>
          -
        </Button>
      </Grid2>
      <Grid2 item="true">
        <Typography sx={{ padding: 1, minWidth: "40px", textAlign: "center" }}>
          {quantity}
        </Typography>
      </Grid2>
      <Grid2 item="true">
        <Button variant="outlined" onClick={handleIncrease}>
          +
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default QuantityMeter;
