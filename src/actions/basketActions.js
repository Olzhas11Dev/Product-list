import Axios from 'axios';
import { getTotal } from '../components/Shop';

export const fetchBasketData = () => {
  return async (dispatch) => {
    let response = await Axios.get('https://61a71b7b8395690017be94e1.mockapi.io/basketData');
    dispatch({ type: 'GET_BASKET_DATA', payload: response.data });
    dispatch({ type: 'GET_TOTAL_PRICE', payload: getTotal(response.data) });
  };
};

export const addToBasket = (product, basketData) => {
  return async (dispatch) => {
    let founded = basketData.find((el) => el.title === product.title);
    if (founded) {
      founded.quantity += 1;
      await Axios.put(
        `https://61a71b7b8395690017be94e1.mockapi.io/basketData/${founded.id}`,
        founded,
      );
    } else {
      await Axios.post('https://61a71b7b8395690017be94e1.mockapi.io/basketData', product);
    }
    dispatch(fetchBasketData());
  };
};

export const removeItemAction = (elem) => {
  return async (dispatch) => {
    await Axios.delete(`https://61a71b7b8395690017be94e1.mockapi.io/basketData/${elem.id}`);
    dispatch(fetchBasketData());
  };
};
