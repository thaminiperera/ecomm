import React from "react";
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
import products from "../db/Products.js";

const Cart = () => {
  return (
    <div>
      <TopBar />
      <Grid2 container justifyContent={"center"} gap={3}>
        <Grid2 item="true" xs={12} sm={12} lg={6} sx={{ margin: 1 }}>
          <Stack>
            <Typography variant="h6" sx={{ padding: 1.5, backgroundColor:"#eeeeee", borderRadius: "8px" }}>Purchase Items</Typography>
            <Divider sx={{marginBottom: 2}}/>
            <CartProductCard product={products[0]} />
            <CartProductCard product={products[5]} />
            <Divider sx={{marginTop:2}}/>
          </Stack>
        </Grid2>
        <Grid2 item="true" xs={12} sm={12} lg={6}>
          <Stack>
            <Typography variant="h6" sx={{ padding: 2 } }>
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
              Rs. 444
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
              Rs. 0
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
              Rs. 555
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
