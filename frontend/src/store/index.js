import { configureStore } from '@reduxjs/toolkit';

// lista de reducer
import itemsReducer from './ducks/items.reducer';

export default configureStore({
  reducer: {
    items: itemsReducer,
  },
});

/*
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
*/
