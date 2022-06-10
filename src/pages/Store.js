import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPucharse } from "../store/slices/pucharse.slice";
import "../styles/purchase.css";

const Store = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pucharseData = useSelector((state) => state.pucharse);
  const options = { year: "numeric", month: "long", day: "numeric" };
  useEffect(() => {
    dispatch(getPucharse());
  }, [dispatch]);
  return (
    <div className="purchase">
      <div className="direccion">
        <Link className="ruta" to="/">
          Home
        </Link>
        <div></div>
        <span>Purchases</span>
      </div>
      <h1>My Purchases</h1>
      <section className="purchase-main">
        {pucharseData.map((purchase) => (
          <div key={purchase.id}>
            <div className="purchase-header">
              <h3>
                {new Date(purchase.createdAt).toLocaleDateString(
                  "en-US",
                  options
                )}
              </h3>
            </div>
            <ul>
              {purchase.cart.products.map((product) => (
                <li
                  onClick={() => navigate(`/product/${product.id}`)}
                  key={product.id}
                >
                  <h5>{product.title}</h5>
                  <div>{product.productsInCart.quantity}</div>
                  <span>$ {product.price * product.productsInCart.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Store;
