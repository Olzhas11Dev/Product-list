const initialState = {
  basket: [],
  total: 0,
};

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BASKET_DATA':
      return { ...state, basket: action.payload };

    case 'GET_TOTAL_PRICE':
      return { ...state, total: action.payload };
    default:
      return state;
  }
};
