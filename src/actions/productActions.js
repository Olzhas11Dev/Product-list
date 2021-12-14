import Axios from 'axios';

export const fetchProducts = () => {
  return async (dispatch) => {
    let response = await Axios.get('https://61a71b7b8395690017be94e1.mockapi.io/products');
    dispatch({ type: 'GET_ALL_PRODUCT', payload: response.data });
  };
};

export const AddNewProducts = (newProduct) => {
  return async (dispatch) => {
    await Axios.post('https://61a71b7b8395690017be94e1.mockapi.io/products', newProduct);
    dispatch({ type: 'ADD_NEW_PRODUCT', payload: newProduct });
  };
};
