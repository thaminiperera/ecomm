import {
  Box,
  Button,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const [addToCart, setAddToCart] = useState(false);

  const handleAddToCart = () => {
    setQuantity(quantity + 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <Paper elevation={3} sx={{ maxWidth: 200, margin: "auto", padding: 2 }}>
        <Stack>
          <Box
            component="img"
            src={product.image}
            alt="Mens Casual Slim Fit"
            sx={{
              width: "100%",
              objectFit: "contain",
              height: "200px",

              borderRadius: 2,
            }}
          />
          <Divider />
          <Box sx={{ marginTop: 2, width: "100%", height: "40px" }}>
            <Typography sx={{ fontSize: 14 }}>{product.title}</Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "40px",
              overflow: "hidden",
            }}
          >
            <Typography sx={{ fontSize: 12 }}>{product.description}</Typography>
          </Box>
          <Box>
            <Typography>Rs. {Math.floor(product.price * 290.14)}</Typography>
          </Box>

          {quantity > 0 ? (
            <Box sx={{ marginTop: 2 }}>
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
                  <Typography sx={{ padding: 1 }}>{quantity}</Typography>
                </Grid2>
                <Grid2 item="true">
                  <Button variant="outlined" onClick={handleIncrease}>
                    +
                  </Button>
                </Grid2>
              </Grid2>
            </Box>
          ) : (
            <Button
              variant="contained"
              style={{ marginTop: 20 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </Stack>
      </Paper>
    </div>
  );
};

export default ProductCard;
