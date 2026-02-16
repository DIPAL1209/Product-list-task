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
import TablePagination from "@mui/material/TablePagination";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const PRODUCT_URL = `${import.meta.env.VITE_API_URL}products`;

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalProducts, setTotalProducts] = useState(0);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts([]);

        const params = {
          search: search,
          category: selectCategory,
          page: page + 1,
          limit: rowsPerPage,
        };

        if (orderBy) {
          params.sortBy = orderBy;
          params.sort = order;
        }
        const res = await axios.get(`${PRODUCT_URL}/get-all`, {
          params: params,
        });

        setProducts(res.data.Products);
        setTotalProducts(res.data.totalProducts);
      } catch (error) {
        console.log("error fetching products", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [search, selectCategory, orderBy, order, page, rowsPerPage]);

  const handlesort = (columnName) => {
    if (orderBy === columnName) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(columnName);
      setOrder("asc");
    }
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const addProduct = async () => {
    if (!name.trim() || !category.trim() || !price) {
      setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "error",
      });
      return;
    }

    try {
      await axios.post(`${PRODUCT_URL}/create-product`, {
        name,
        category,
        price,
      });

      setSnackbar({
        open: true,
        message: "Product added successfully",
        severity: "success",
      });

      setName("");
      setCategory("");
      setPrice("");
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to add product",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        fontFamily: "sans-serif",
        backgroundColor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Paper elevation={0} sx={{ p: 7, width: "100%", maxWidth: 1400 }}>
        <h2
          style={{
            color: "#2c3e50",
            marginBottom: "25px",
            textAlign: "center",
            fontSize: "35px",
            fontFamily: "sans-serif",
          }}
        >
          Product List
        </h2>

        <Box
          sx={{
            display: "flex",
            gap: 4,
            mb: 3,
            p: 2,
            backgroundColor: "#fafafa",
            borderRadius: 2,
          }}
        >
          <TextField
            label="Search Product"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1 }}
          />

          <FormControl sx={{ minWidth: 250 }}>
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

        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: 3,
            p: 2,
            backgroundColor: "#fafafa",
            borderRadius: 2,
            alignItems: "center",
          }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setPage(0);
            }}
            sx={{ flex: 1 }}
          />

          <FormControl sx={{ flex: 1 }}>
            <InputLabel id="add-category-label">Category</InputLabel>
            <Select
              labelId="add-category-label"
              value={category}
              label="Category"
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(0);
              }}
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
            sx={{ flex: 1 }}
          />

          <Button
            variant="contained"
            onClick={addProduct}
            sx={{
              height: "56px",
              px: 4,
              fontWeight: "600",
              borderRadius: 2,
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#125ea8",
              },
            }}
          >
            Add Product
          </Button>
        </Box>

        <Paper elevation={5} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2f7" }}>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handlesort("name")}
                    sx={{ color: "white" }}
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
                    sx={{ color: "white" }}
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
                    sx={{ color: "white" }}
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
                      "&:hover": {
                        backgroundColor: "#f1f7ff",
                      },
                    }}
                  >
                    <TableCell>
                      <strong>{item.name}</strong>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.price}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalProducts}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
