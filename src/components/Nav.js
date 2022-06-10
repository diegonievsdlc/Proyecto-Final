import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCart, removeProduct } from "../store/slices/cart.slice";
import {checkoutCart} from '../store/slices/cart.slice'
import { setModal } from "../store/slices/modal.slice";
import "../styles/nav.css";

const Nav = () => {
  const [total, setTotal] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  const handleShow = () => {
    const token = localStorage.getItem("token");
    if (token !== "") {
      setShowCart(!showCart);
    } else {
      navigate("/login");
    }
    sumarTotal();
  };
  const deleteProductCart = (id) => {
    dispatch(removeProduct(id));
    dispatch(setModal('Producto eliminado, si no se actualiza el total, cierre y habra el carrito'))
    sumarTotal();
  };
  const sumarTotal = () => {
    let totalCart = 0;
    for (let i = 0; i < cartData.length; i++) {
      totalCart += Number(
        cartData[i].price * cartData[i].productsInCart.quantity
      );
    }
    setTotal(totalCart);
  };
  const shop = () => {
    if(cartData.length === 0) {
      dispatch(setModal('No hay productos en el carrito.'))
    }else{
      dispatch(checkoutCart())
      dispatch(setModal('Compra realizada con exito'))
      navigate('/')
      setShowCart(false)
    }
  }
  return (
    <nav>
      <Link className="logo" to="/">
        e-commerce
      </Link>
      <div className="nav-link">
        <Link to="/user" className="btn-nav">
          <i className="bx bx-user"></i>
        </Link>
        <Link to="/store" className="btn-nav">
          <i className="bx bx-store"></i>
        </Link>
        <button className="btn-nav" onClick={handleShow}>
          <i className={showCart ? "bx bx-x" : "bx bx-cart"}></i>
        </button>
      </div>
      <div className="Cart" style={{ right: showCart ? "0" : "-81%" }}>
        <h2>Cart</h2>
        <section className="main-cart">
          {cartData.length === 0 ? <h1>No empty</h1> : cartData.map((product) => (
            <div
              onClick={() => navigate(`/product/${product.id}`)}
              key={product.id}
              className="box-cart"
            >
              <h4>{product.brand}</h4>
              <h3>{product.title}</h3>
              <div className="product-cart-quantity">
                {product.productsInCart.quantity}
              </div>
              <button onClick={() => deleteProductCart(product.id)}>
                <i className="bx bx-trash"></i>
              </button>
              <div className="product-cart-total">
                <p>Total:</p>
                <span>{product.price * product.productsInCart.quantity}</span>
              </div>
            </div>
          ))}
        </section>
        <section className="cart-total">
          <div>
            <p>Total:</p>
            <span>$ {total}</span>
          </div>
          <button onClick={shop}>Checkout</button>
        </section>
      </div>
    </nav>
  );
};

export default Nav;
