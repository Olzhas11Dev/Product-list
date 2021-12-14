import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { itemsReducer } from './productReducer';
import { basketReducer } from './basketReducer';

const rootReducer = combineReducers({
  products: itemsReducer,
  basketData: basketReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
