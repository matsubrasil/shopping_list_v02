import { configureStore } from '@reduxjs/toolkit';

// lista de reducer
import itemsReducer from './ducks/items.reducer';
import errorReducer from './ducks/error.reducer';
import authReducer from './ducks/auth.reducer';

export default configureStore({
  reducer: {
    items: itemsReducer,
    error: errorReducer,
    auth: authReducer,
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
