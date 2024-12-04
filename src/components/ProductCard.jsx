import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import QuantityMeter from "./QuantityMeter";
import { values } from "../constants/values.js";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const [addToCart, setAddToCart] = useState(false);
  const { userData, updateUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData != null) {
      const carted =
        userData && userData.cart.filter((item) => item.id == product.id);
      if (carted && carted.length > 0) {
        setAddToCart(true);
        setQuantity(carted[0].quantity ? carted[0].quantity : 0);
      } else {
        setAddToCart(false);
      }
    }
  }, []);

  const handleAddToCart = () => {
    if (userData == null) {
      navigate("/login");
    } else {
      setQuantity(quantity + 1);
      updateUser({
        cart: userData && [
          ...userData.cart,
          { ...product, quantity: quantity + 1 },
        ],
      });
    }
  };

  return (
    <div>
      <Paper elevation={3} sx={{ maxWidth: 200, margin: "auto", padding: 2 }}>
        <Stack>
          <Box
            component="img"
            src={product.image}
            alt="Product Title"
            sx={{
              width: "100%",
              objectFit: "contain",
              height: "200px",

              borderRadius: 2,
            }}
          />
          <Divider />
          <Box sx={{ marginTop: 2, width: "100%", height: "70px",  overflow: "hidden"  }}>
            <Typography sx={{ fontSize: 14, fontWeight: "bold",}}>{product.title}</Typography>
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
            <Typography>
              Rs. {Math.floor(product.price * values.USDTOLKR)}
            </Typography>
          </Box>

          {quantity > 0 || addToCart ? (
            <Box sx={{ marginTop: 2 }}>
              <QuantityMeter
                quantity={quantity}
                setQuantity={setQuantity}
                product={product}
              />
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
