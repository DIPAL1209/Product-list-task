import { useEffect, useState } from "react";
import axios from "axios";
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
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";


function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts([]);

        const params = {
          search: search,
          category: selectCategory,
        };

        if (orderBy) {
          params.sortBy = orderBy;
          params.sort = order;
        }

        const res = await axios.get("http://localhost:5000/api/products", {
          params: params,
        });

        setProducts(res.data.Products);
      } catch (error) {
        console.log("error fetching products", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [search, selectCategory, orderBy, order]);

  const handlesort = (columnName) => {
    if (orderBy === columnName) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(columnName);
      setOrder("asc");
    }
  };

  const addProduct = async () => {
    if (!name.trim() || !category.trim() || !price) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/products", {
        name,
        category,
        price,
      });

      alert("Product added successfully");

      setName("");
      setCategory("");
      setPrice("");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <Box sx={{ fontFamily: "sans-serif" }}>
      <Paper elevation={0} sx={{ p: 3, maxWidth: 1500 }}>
        <h2
          style={{
            color: "#582e95",
            marginBottom: "24px",
            textAlign: "center",
            fontSize: "32px",
            fontFamily: "sans-serif",
          }}
        >
          Product List
        </h2>

        <Box sx={{ display: "flex", gap: 4, mb: 3 }}>
          <TextField
            label="Search Product"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1 }}
          />

          <FormControl sx={{ minWidth: 300 }}>
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
        </Box>

        <Box sx={{ display: "flex", gap: 4.5, mb: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ minWidth: 350 }}
          />

          <FormControl sx={{ minWidth: 350 }}>
            <InputLabel id="add-category-label">Category</InputLabel>
            <Select
              labelId="add-category-label"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Fashion">Fashion</MenuItem>
              <MenuItem value="Furniture">Furniture</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ minWidth: 350 }}
          />

          <Button variant="contained" onClick={addProduct} sx={{ minWidth: 300 }}>
            Add Product
          </Button>
        </Box>

        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#d4eafb" }}>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handlesort("name")}
                >
                  <strong> Name </strong>
                </TableSortLabel>

                <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                  <Select
                    value={orderBy === "name" ? order : ""}
                    onChange={(e) => {
                      setOrderBy("name");
                      setOrder(e.target.value);
                    }}
                    displayEmpty
                  >
                    <MenuItem value="">Null</MenuItem>
                    <MenuItem value="asc">ASC</MenuItem>
                    <MenuItem value="desc">DESC</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={orderBy === "category"}
                  direction={orderBy === "category" ? order : "asc"}
                  onClick={() => handlesort("category")}
                >
                  <strong>Category</strong>
                </TableSortLabel>

                <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                  <Select
                    value={orderBy === "category" ? order : ""}
                    onChange={(e) => {
                      setOrderBy("category");
                      setOrder(e.target.value);
                    }}
                    displayEmpty
                  >
                    <MenuItem value="">Null</MenuItem>
                    <MenuItem value="asc">ASC</MenuItem>
                    <MenuItem value="desc">DESC</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={orderBy === "price"}
                  direction={orderBy === "price" ? order : "asc"}
                  onClick={() => handlesort("price")}
                >
                  <strong>Price</strong>
                </TableSortLabel>

                <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                  <Select
                    value={orderBy === "price" ? order : ""}
                    onChange={(e) => {
                      setOrderBy("price");
                      setOrder(e.target.value);
                    }}
                    displayEmpty
                  >
                    <MenuItem value="">Null</MenuItem>
                    <MenuItem value="asc">Low To High</MenuItem>
                    <MenuItem value="desc">High To Low</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                  No products are found
                </TableCell>
              </TableRow>
            ) : (
              products.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{
                    backgroundColor: "#ffff",
                    "&:hover": { backgroundColor: "#b4c8c9a8" },
                  }}
                >
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
      </Paper>
    </Box>
  );
}

export default App;
