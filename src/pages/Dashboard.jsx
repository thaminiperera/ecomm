import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../db/Products.js";
import {
  Box,
  Button,
  Divider,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import { useUser } from "../context/UserContext.jsx";

const Dashboard = () => {
  const {userData} = useUser()
  const [search, setSearch] = useState();
  const [productData, setProductData] = useState(products);
  const navigate = useNavigate()

  const handleSearch = () => {
    const searchedProducts = products.filter((item) => {
      console.log(item);
      return item.title.toLowerCase().includes(search.trim().toLowerCase());
    });
    setProductData(searchedProducts);
  };
  const handleTextbox = (e) => {
    setSearch(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleCartClick = () => {
    navigate("/cart"); // Navigate to the About page
  };

  return (
    <Box>
      <TopBar/>
      <Grid2
        container
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ margin: 2 }}
      >
        <SearchIcon />
        <TextField
          sx={{ margin: 2, width: "50%" }}
          placeholder="Search"
          onChange={handleTextbox}
          onKeyDown={handleEnter}
        ></TextField>
        <Button variant="outlined" onClick={handleSearch}>
          Search
        </Button>
      </Grid2>
      <Divider sx={{ marginBottom: 2 }} />
      <Box sx={{ width: "100%", padding: "20px" }}>
        <Grid2
          container
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 4, sm: 6, md: 6, lg: 12 }}
        >
          {productData.map((item) => (
            <Grid2 key={item.id} size={{ xs: 2, sm: 2, md: 2, lg: 2 }}>
              <Grid2 item="true">
                <ProductCard key={item.id} product={item} />
              </Grid2>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default Dashboard;
