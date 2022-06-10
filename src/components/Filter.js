import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../store/slices/modal.slice";
import { categoryProduct } from "../store/slices/products.slice";
import "../styles/filter.css";

const Filter = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch()
  const filterPrice = e => {
    e.preventDefault()
    dispatch(setModal('Opcion no disponible'))
  }
  return (
    <div className="Filter">
      <button onClick={() => setFilterOpen(true)}>
        <i className="bx bx-filter-alt"></i> <span>Filters</span>
      </button>
      <div
        className="menu-filter"
        style={{ right: filterOpen ? "0" : "-300px" }}
      >
        <button onClick={() => setFilterOpen(false)}>
          <i className="bx bx-x"></i>
        </button>
        <h3>Filters</h3>
        <div className="acordeon">
          <div className={showPrice ? "bloque active" : "bloque"}>
            <button type="button" onClick={() => setShowPrice(!showPrice)}>
              Price
              <i
                className={`bx ${
                  showPrice ? "bx-chevron-up" : "bx-chevron-down"
                }`}
              ></i>
            </button>
            <div className="contenido">
              <form onSubmit={filterPrice}>
                <div>
                  <label htmlFor="from">From</label>
                  <input type="number" id="from"/>
                </div>
                <div>
                  <label htmlFor="to">To</label>
                  <input type="number" id="to"/>
                </div>
                <button>Filter Price</button>
              </form>
            </div>
          </div>
          <div className={showCategory ? "bloque active" : "bloque"}>
            <button
              type="button"
              onClick={() => setShowCategory(!showCategory)}
            >
              Category
              <i
                className={`bx ${
                  showCategory ? "bx-chevron-up" : "bx-chevron-down"
                }`}
              ></i>
            </button>
            <div className="contenido">
              <ul className="categories">
                {categories.map((category) => (
                  <li onClick={() => {
                    dispatch(categoryProduct(category.id))
                    setFilterOpen(false)
                  }} key={category.id}>{category.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
