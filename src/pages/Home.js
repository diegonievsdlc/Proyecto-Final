import React, { useEffect } from "react";
import "../styles/home.css";
import { Search, Filter, ProductCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/slices/products.slice";
import { getCategory } from "../store/slices/categories.slice";
import { Link } from "react-router-dom";

const Home = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategory())
  }, [dispatch]);
  return (
    <div className="Home">
      <div className="search-and-filter">
        <Search />
        <Filter />
      </div>
      <ul className="main">
        {
          products.map(product => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <ProductCard product={product}/>
            </Link>
          ))
        }
      </ul>
    </div>
  );
};

export default Home;
