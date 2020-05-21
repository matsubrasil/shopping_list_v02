import { createStore, combineReducers } from 'redux';

// lista de reducer
import itemsReducer from './ducks/items.reducer';

// agrega os reducers
const rootReducer = combineReducers({
  items: itemsReducer,
});

// adiciona ao store
const store = createStore(rootReducer);

export default store;
