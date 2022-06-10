import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './loading.slice';
import getConfig from '../../utils/getConfig';

export const pucharseSlice = createSlice({
    name: 'pucharse',
    initialState: [],
    reducers: {
      setPucharses: (state, action) => {
        return action.payload
      }
    }
})

export const { setPucharses } = pucharseSlice.actions;

export const getPucharse = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
        .then(res => dispatch(setPucharses(res.data.data.purchases)))
        .finally(() => dispatch(setIsLoading(false)));
}

export default pucharseSlice.reducer;
