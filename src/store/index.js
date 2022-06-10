import { configureStore } from '@reduxjs/toolkit'
import products from './slices/products.slice'
import loading from './slices/loading.slice'
import categories from './slices/categories.slice'
import pucharse from './slices/pucharse.slice'
import cart from './slices/cart.slice'
import modal from './slices/modal.slice'

export default configureStore({
    reducer: {
        products,
        loading,
        categories,
        pucharse,
        cart,
        modal
    }
})
