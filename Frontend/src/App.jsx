import { useEffect, useState } from "react";
import axios from "axios";

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
          params:{
            search: search,
            category: selectCategory,
            sort:sort
          }
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
    setSearch(searchInput)
  };



  return (
    <div classname="main-page">
      <div style={{ padding: "20px", backgroundColor: "lightpink"}}>
        <h2>Product List</h2>

        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}/>

        <button onClick={handleSearch}>Search</button>

        <select
          value={selectCategory}
          onChange={(e) => setSelectCategory(e.target.value)} >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Furniture">Furniture</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>

        {products.length === 0 ? (
          <p>No productss are found</p>
        ) : (
          products.map((item) => (
            <div key={item._id}>
              <strong>{item.name}</strong>
              <p>Category: {item.category}</p>
              <p>Price: {item.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
