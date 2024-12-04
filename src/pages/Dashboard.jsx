import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import products from "../db/Products.js";
import { Box, Button, Grid2, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from 'react-toastify';

import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import { useUser } from "../context/UserContext.jsx";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const { userData } = useUser();
  const [search, setSearch] = useState();
  const [productData, setProductData] = useState(products);
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
    navigate("/cart");
  };

  return (
    <div style={{ position: "relative" }}>
      <ToastContainer />
      <Box>
        <TopBar />

        <Grid2
          container
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            margin: 2,
            marginTop: {
              xs: "150px",
              sm: "100px",
            },
          }}
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
    </div>
  );
};

export default Dashboard;
