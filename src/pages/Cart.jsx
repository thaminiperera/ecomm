import React, { useEffect, useState } from "react";
import CartProductCard from "../components/CartProductCard";
import {
  Button,
  Divider,
  Grid2,
  Stack,
  Table,
  Typography,
} from "@mui/material";
import TopBar from "../components/TopBar";
import { useUser } from "../context/UserContext.jsx";
import { values } from "../constants/values.js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { userData } = useUser();
  const [total, setTotal] = useState(0);
  const [additional, setAddititonal] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const calculatedTotal = userData && userData.cart.reduce((acc, item) => {
      return acc + Math.floor(item.price * values.USDTOLKR) * item.quantity;
    }, 0);

    setTotal(calculatedTotal);
  }, [userData && userData.cart, values.USDTOLKR]);

  return (
    <div>
      <TopBar />
      <Grid2
        container
        justifyContent={"center"}
        gap={3}
        sx={{
          marginTop: {
            xs: "150px",
            sm: "100px",
          },
        }}
      >
        <Grid2 item="true" xs={12} sm={12} lg={6} sx={{ margin: 1 }}>
          <Stack>
            <Typography
              variant="h6"
              sx={{
                padding: 1.5,
                backgroundColor: "#eeeeee",
                borderRadius: "8px",
              }}
            >
              Purchase Items
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            {userData && userData.cart.length > 0 ? (
              userData.cart.map((product) => (
                <CartProductCard key={product.id} product={product} />
              ))
            ) : (
              <Typography sx={{ width: "100%", padding: 2 }}>
                Add products to Cart...
              </Typography>
            )}
            <Divider sx={{ marginTop: 2 }} />
          </Stack>
        </Grid2>
        <Grid2 item="true" xs={12} sm={12} lg={6}>
          <Stack>
            <Typography variant="h6" sx={{ padding: 2 }}>
              Cart Total
            </Typography>
            <Divider />
            <Typography
              variant="body1"
              sx={{ padding: 1, color: "#777777", textAlign: "left" }}
            >
              Sub Total
            </Typography>
            <Typography
              variant="body1"
              sx={{ padding: 1, color: "#000000", textAlign: "right" }}
            >
              Rs. {total}
            </Typography>
            <Typography
              variant="body1"
              sx={{ padding: 1, color: "#777777", textAlign: "left" }}
            >
              Additional Charges
            </Typography>
            <Typography
              variant="body1"
              sx={{ padding: 1, color: "#000000", textAlign: "right" }}
            >
              Rs. {additional}
            </Typography>
            <Divider />
            <Typography
              variant="body1"
              sx={{ padding: 1, color: "#777777", textAlign: "left" }}
            >
              Total
            </Typography>
            <Typography
              variant="body1"
              sx={{
                padding: 1,
                color: "#000000",
                textAlign: "right",
                fontWeight: "bold",
              }}
            >
              Rs. {total + additional}
            </Typography>
            <Divider />
            <Button variant="contained" sx={{ width: "100%", margin: 2 }}>
              Proceed to Checkout
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Cart;
