import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setIsLoading } from "../store/slices/loading.slice";
import { categoryProduct } from "../store/slices/products.slice";
import { ProductCard } from "../components";
import "../styles/productItem.css";
import { addProduct } from "../store/slices/cart.slice";

const ProductItem = () => {
  const [data, setData] = useState({});
  const productosIgualles = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsLoading(true));
    axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/`)
      .then((res) => {
        const product = res.data.data.products.find(
          (productItem) => productItem.id === Number(id)
        );
        setData(product);
        dispatch(categoryProduct(product.category.id));
      })
      .finally(() => dispatch(setIsLoading(false)));
  }, [id, dispatch]);
  const addCart = () => {
    const product = {
      id: id,
      quantity: quantity,
    };
    dispatch(addProduct(product))
  };
  const restarQuantity = () => {
    if(quantity > 1)setQuantity(quantity - 1)
  }
  return (
    <div>
      <div className="direccion">
        <Link className="ruta" to="/">
          Home
        </Link>
        <div></div>
        <span>{data.title}</span>
      </div>
      <div className="padre-todo-poderoso">
        <section className="img-product">
          <button>
            <i className="bx bx-chevron-left"></i>
          </button>
          <img className="img" src={data.productImgs} alt="Product Img" />
          <button>
            <i className="bx bx-chevron-right"></i>
          </button>
        </section>
        <section className="Product-detail">
          <h2>{data.title}</h2>
          <section className="Product-info-response">
            <p>{data.description}</p>
          </section>
          <div>
            <div className="price">
              <span>Price</span>
              <p>{data.price}</p>
            </div>
            <div className="quantity">
              <span>Quantity</span>
              <div>
                <button onClick={restarQuantity}>-</button>
                <input
                  type="number"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                ></input>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
          </div>
          <button onClick={addCart}>
            Add to cart <i className="bx bx-cart"></i>
          </button>
        </section>
        <section className="Product-info">
          <p>{data.description}</p>
        </section>
      </div>
      <section className="products-suggestions">
        <h3>Discover similar items</h3>
        <div>
          {productosIgualles?.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductItem;
