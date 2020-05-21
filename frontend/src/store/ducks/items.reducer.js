import { createAction, createReducer } from '@reduxjs/toolkit';

// import { v4 as uuidv4 } from 'uuid'; // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const INITIAL_STATE = {
  list: [],
  loading: false,
};

export const addItem = createAction('ADD_ITEM');
export const getItems = createAction('GET_ITEMS');
export const removeItem = createAction('REMOVE_ITEM');
export const loadingItems = createAction('LOADING_ITEMS');

export default createReducer(INITIAL_STATE, {
  // lista de actions

  //
  [getItems.type]: (state, action) => ({
    ...state,
    list: [...action.payload],
    loading: false,
  }),

  //
  [addItem.type]: (state, action) => ({
    ...state,
    list: [action.payload, ...state.list],
  }),

  //
  [removeItem.type]: (state, action) => ({
    ...state,
    list: state.list.filter((item) => item._id !== action.payload),
  }),

  //
  [loadingItems.type]: (state) => ({
    ...state,
    loading: true,
  }),

  //
});

/*

const itemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      console.log(
        'items.reducer: reducer: addItem',
        action.type,
        action.payload,
      );
      return [...state, action.payload];
    case 'REMOVE_ITEM':
      // const saida = state.filter((item) => item.id !== action.payload);
      // console.log('itemsReducer: reducer', state, saida);
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export default itemsReducer;
*/

/*
export const addItem = (item) => {
  console.log('items.reducer: action: addItem', item);
  return {
    type: 'ADD_ITEM',
    payload: item,
  };
};
*/
