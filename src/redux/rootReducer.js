import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import productsReducer from './products/products.reducers';

export default combineReducers({
  user: userReducer,
  productsData: productsReducer
});
