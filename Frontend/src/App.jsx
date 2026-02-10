import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


function App() {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products", {
          params: {
            search: search,
            category: selectCategory,
            sort: sort,
          },
        });

        setProducts(res.data.Products);
      } catch (error) {
        console.log("error fetching products", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [search, selectCategory, sort]);

  const handleSearch = () => {
    setSearch(searchInput);
  };

  return (
    <div classname="main-page">
      <div style={{ padding: "30px", backgroundColor: "lightpink" }}>
        <h2>Product List</h2>

        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "35ch", height: "7ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Search Product"
            variant="outlined"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <Button
            variant="contained"
            sx={{ backgroundColor: "lightseagreen" }}
            onClick={handleSearch}
          >
            Search
          </Button>

          <FormControl fullWidth>
            <InputLabel id="category-label">Categories</InputLabel>
            <Select
              labelId="category-label"
              label="Categories"
              value={selectCategory}
              onChange={(e) => setSelectCategory(e.target.value)}
            >
              <MenuItem value={""}>All Categories</MenuItem>
              <MenuItem value={"Electronics"}>Electronics</MenuItem>
              <MenuItem value={"Fashion"}>Fashion</MenuItem>
              <MenuItem value={"Furniture"}>Furniture</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="sort-label">Filter</InputLabel>
            <Select
              labelId="sort-label"
              label="Filter"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value={""}>Sort by price</MenuItem>
              <MenuItem value={"asc"}>Low to High</MenuItem>
              <MenuItem value={"desc"}>High to Low</MenuItem>
            </Select>
          </FormControl>

          <Table sx={{ minWidth: 1160 }} size="large">
            <TableHead>
              <TableRow sx={{ backgroundColor: "lightseagreen" }}>
                <TableCell>
                  <strong>NAME</strong>{" "}
                </TableCell>

                <TableCell>
                  <strong>CATEGORIES</strong>{" "}
                </TableCell>
                <TableCell>
                  <strong>PRICE</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody sx={{ backgroundColor: "lightcoral" }}>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No products are found
                  </TableCell>
                </TableRow>
              ) : (
                products.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell align="left">
                      <strong>{item.name}</strong>
                    </TableCell>
                    <TableCell align="left">{item.category}</TableCell>
                    <TableCell align="left">{item.price}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </div>
    </div>
  );
}

export default App;
