import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./loading.slice";

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (store, action) => {
      return action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export const getProducts = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const searchProduct = (query) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${query}`)
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const categoryProduct = (categoryId) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${categoryId}`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export default productsSlice.reducer;
