const initialState = {
  listProducts: [],
};

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_PRODUCT':
      return { ...state, listProducts: action.payload };
    case 'ADD_NEW_PRODUCT':
      return { ...state, listProducts: [...state.listProducts, action.payload] };

    default:
      return state;
  }
};
