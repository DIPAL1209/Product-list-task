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
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "@mui/material/Chip";

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
        message: error.response?.data?.message,
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        fontFamily: "sans-serif",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        py: 5,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 1280, mx: "auto", px: 2 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <h2
            style={{
              color: "#131e29",
              margin: 0,
              textAlign: "center",
              fontSize: "35px",
              fontFamily: "sans-serif",
            }}
          >
            Product List
          </h2>
          <p>Manage your products with ease</p>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            border: "1px solid #e2e8f0",
            background: "#ffffff",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Search Product"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                flex: "1 1 300px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8fafc",
                  "& fieldset": {
                    borderColor: "#e2e8f0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#cbd5e0",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl sx={{ minWidth: 250 }}>
              <InputLabel id="category-label">Categories</InputLabel>
              <Select
                labelId="category-label"
                label="Categories"
                value={selectCategory}
                onChange={(e) => setSelectCategory(e.target.value)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#f8fafc",
                  "& fieldset": {
                    borderColor: "#e2e8f0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#cbd5e0",
                  },
                }}
              >
                <MenuItem value={""}>All Categories</MenuItem>
                <MenuItem value={"Electronics"}>Electronics</MenuItem>
                <MenuItem value={"Fashion"}>Fashion</MenuItem>
                <MenuItem value={"Furniture"}>Furniture</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            border: "1px solid #e2e8f0",
            background: "#ffffff",
          }}
        >
          <h3
            style={{
              margin: "0 0 20px 0",
              fontSize: "14px",
           
              color: "#2d3748",
            }}
          >
            Add New Product
          </h3>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setPage(0);
              }}
              sx={{
                flex: "1 1 200px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8fafc",
                },
              }}
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
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#f8fafc",
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
              sx={{
                flex: "1 1 150px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8fafc",
                },
              }}
            />

            <Button
              variant="contained"
              onClick={addProduct}
              sx={{
                height: "56px",
                px: 4,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 14px 0 rgba(102, 126, 234, 0.4)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                  boxShadow: "0 6px 20px 0 rgba(102, 126, 234, 0.5)",
                },
              }}
            >
              Add Product
            </Button>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid #e2e8f0",
            background: "#ffffff",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                <TableCell sx={{ py: 2.5, borderBottom: "none" }}>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handlesort("name")}
                    sx={{
                      color: "white !important",
                      "& .MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                      "&:hover": {
                        color: "rgba(255,255,255,0.9) !important",
                      },
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                      Product Name
                    </span>
                  </TableSortLabel>

                  <FormControl
                    size="small"
                    sx={{
                      mt: 1.5,
                      minWidth: 120,
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255,255,255,0.15)",
                        color: "white",
                        borderRadius: 1.5,
                        "& fieldset": {
                          borderColor: "rgba(255,255,255,0.3)",
                          border: "none",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.5)",
                          border: "none",
                        },
                      },
                      "& .MuiSelect-icon": {
                        color: "white",
                      },
                    }}
                  >
                    <Select
                      value={orderBy === "name" ? order : ""}
                      onChange={(e) => {
                        setOrderBy("name");
                        setOrder(e.target.value);
                      }}
                      displayEmpty
                    >
                      <MenuItem value="">No Sort</MenuItem>
                      <MenuItem value="asc">ASC</MenuItem>
                      <MenuItem value="desc">DESC</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell x={{ py: 2.5, borderBottom: "none" }}>
                  <TableSortLabel
                    active={orderBy === "category"}
                    direction={orderBy === "category" ? order : "asc"}
                    onClick={() => handlesort("category")}
                    sx={{
                      color: "white !important",
                      "& .MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                      "&:hover": {
                        color: "rgba(255,255,255,0.9) !important",
                      },
                    }}
                  >
                    {" "}
                    <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                      Category
                    </span>
                  </TableSortLabel>

                  <FormControl
                    size="small"
                    sx={{
                      mt: 1.5,
                      minWidth: 120,
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255,255,255,0.15)",
                        color: "white",
                        borderRadius: 1.5,
                        "& fieldset": {
                          borderColor: "rgba(255,255,255,0.3)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.5)",
                        },
                      },
                      "& .MuiSelect-icon": {
                        color: "white",
                      },
                    }}
                  >
                    <Select
                      value={orderBy === "category" ? order : ""}
                      onChange={(e) => {
                        setOrderBy("category");
                        setOrder(e.target.value);
                      }}
                      displayEmpty
                    >
                      <MenuItem value="">No Sort</MenuItem>
                      <MenuItem value="asc">ASC</MenuItem>
                      <MenuItem value="desc">DESC</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell sx={{ py: 2.5, borderBottom: "none" }}>
                  <TableSortLabel
                    active={orderBy === "price"}
                    direction={orderBy === "price" ? order : "asc"}
                    onClick={() => handlesort("price")}
                    sx={{
                      color: "white !important",
                      "& .MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                      "&:hover": {
                        color: "rgba(255,255,255,0.9) !important",
                      },
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                      Price
                    </span>
                  </TableSortLabel>

                  <FormControl
                    size="small"
                    sx={{
                      mt: 1.5,
                      minWidth: 120,
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255,255,255,0.15)",
                        color: "white",
                        borderRadius: 1.5,
                        "& fieldset": {
                          borderColor: "rgba(255,255,255,0.3)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.5)",
                        },
                      },
                      "& .MuiSelect-icon": {
                        color: "white",
                      },
                    }}
                  >
                    <Select
                      value={orderBy === "price" ? order : ""}
                      onChange={(e) => {
                        setOrderBy("price");
                        setOrder(e.target.value);
                      }}
                      displayEmpty
                    >
                      <MenuItem value="">No Sort</MenuItem>
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
                  <TableCell
                    colSpan={3}
                    align="center"
                    sx={{ py: 8, color: "#94a3b8" }}
                  >
                    <Box>
                      <p style={{ fontSize: "1.125rem", margin: 0 }}>
                        No products found
                      </p>
                      <p style={{ fontSize: "0.875rem", marginTop: "8px" }}>
                        Try adjusting your search or filters
                      </p>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                products.map((item, index) => (
                  <TableRow
                    key={item._id}
                    sx={{
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#f8fafc",
                        transform: "scale(1.001)",
                      },
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#fafbfc",
                    }}
                  >
                    <TableCell
                      sx={{ py: 2.5, fontWeight: 500, color: "#2d3748" }}
                    >
                      {item.name}
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      {" "}
                      <Chip
                        label={item.category}
                        size="small"
                        sx={{
                          backgroundColor:
                            item.category === "Electronics"
                              ? "#e0f2fe"
                              : item.category === "Fashion"
                                ? "#fce7f3"
                                : "#dcfce7",
                          color:
                            item.category === "Electronics"
                              ? "#0369a1"
                              : item.category === "Fashion"
                                ? "#9f1239"
                                : "#166534",
                          fontWeight: 500,
                          borderRadius: 1.5,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        py: 2.5,
                        fontWeight: 600,
                        color: "#2d3748",
                        fontSize: "1rem",
                      }}
                    >
                      ${item.price}
                    </TableCell>
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
    </Box>
  );
}

export default App;
