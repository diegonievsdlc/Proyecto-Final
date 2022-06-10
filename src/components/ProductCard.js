import React from "react";
import { addProduct } from "../store/slices/cart.slice";
import { useDispatch } from "react-redux/es/exports";
import "../styles/productCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const addCart = () => {
    const productTwo = {
      id: product.id,
      quantity: 1,
    };
    dispatch(addProduct(productTwo))
  };
  return (
    <li>
      <div className="card">
        <div className="card-img">
          <img className="img" src={product.productImgs[0]} alt="" />
        </div>
        <div className="card-info">
          <h3>{product.title}</h3>
          <div>
            <p>Price</p>
            <span>$ {product.price}</span>
          </div>
          <button onClick={addCart}>
            <i className="bx bx-cart"></i>
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
