import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import products from "../db/Products.js";
import {
  Box,
  Button,
  Grid2,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import { values } from "../constants/values.js";

import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import { useUser } from "../context/UserContext.jsx";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const { userData } = useUser();
  const [search, setSearch] = useState("");
  const [productData, setProductData] = useState(products);

  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    navigate(location.pathname, { replace: true });
  }, [location.state]);

  const handleSearch = () => {
    const filteredProducts = products.filter((item) => {
      const matchesSearch =
        search.trim() === "" ||
        item.title.toLowerCase().includes(search.trim().toLowerCase());
      const matchesCategory =
        category === "" ||
        item.category.toLowerCase() === category.toLowerCase();
      const matchesPrice =
        priceRange === "" ||
        (priceRange === "low" && item.price < 15000 / values.USDTOLKR) ||
        (priceRange === "medium" &&
          item.price >= 15000 / values.USDTOLKR &&
          item.price <= 30000 / values.USDTOLKR) ||
        (priceRange === "high" && item.price > 30000 / values.USDTOLKR);

      return matchesSearch && matchesCategory && matchesPrice;
    });

    setProductData(filteredProducts);
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
    navigate("/cart");
  };

  return (
    <div style={{ position: "relative" }}>
      <ToastContainer />
      <Box >
        <TopBar />

        <Grid2
          container
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            width:"100%",
            margin: 2,
            marginTop: {
              xs: "150px",
              sm: "100px",
            },
          }}
        >
          <Grid2 container alignItems={"center"} justifyContent={"center"} gap={2} sx={{width:"100%"}}>
            <SearchIcon />
            <TextField
              sx={{ width: "70%" }}
              placeholder="Search"
              onChange={handleTextbox}
              onKeyDown={handleEnter}
            />
          </Grid2>

          <Grid2 container alignItems={"center"} justifyContent={"center"} sx={{width:"100%"}}>
            <FormControl sx={{ margin: 2, width: "30%" }}>
              <InputLabel>Price</InputLabel>
              <Select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="low">Below 15,000</MenuItem>
                <MenuItem value="medium">15,000 - 30,000</MenuItem>
                <MenuItem value="high">Above 30,000</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ margin: 2, width: "30%" }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="apparel">Apparel</MenuItem>
                <MenuItem value="jewellery">Jewellery</MenuItem>
              </Select>
            </FormControl>

            <Button variant="outlined" onClick={handleSearch}>
              Apply Filters
            </Button>
          </Grid2>
        </Grid2>

        <Box sx={{ width: "100%", padding: "0px", margin:0.5, width:"95%"}}>
          <Grid2
            container
            spacing={{ xs: 1, md: 1}}
            columns={{ xs: 4, sm: 6, md: 6, lg: 12 }}
          >
            {productData.length > 0 ? (
              productData.map((item) => (
                <Grid2 key={item.id} size={{ xs: 2, sm: 2, md: 2, lg: 2 }}>
                  <Grid2 item="true">
                    <ProductCard key={item.id} product={item} />
                  </Grid2>
                </Grid2>
              ))
            ) : (
              <Typography justifyContent={"center"}>
                No Matches Found
              </Typography>
            )}
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
