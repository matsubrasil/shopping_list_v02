import { createAction, createReducer } from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid'; // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const INITIAL_STATE = [
  { id: uuidv4(), name: 'Eggs' },
  { id: uuidv4(), name: 'Milk' },
  { id: uuidv4(), name: 'Steak' },
  { id: uuidv4(), name: 'Water' },
];

export const addItem = createAction('ADD_ITEM');
export const removeItem = createAction('REMOVE_ITEM');

const itemsReducer = createReducer(INITIAL_STATE, {
  [addItem.type]: (state, action) => [...state, action.payload],
  [removeItem.type]: (state, action) =>
    state.filter((item) => item.id !== action.payload),
});

export default itemsReducer;
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
