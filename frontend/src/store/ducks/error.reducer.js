import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  msg: {},
  status: null,
  id: null,
};

export const getErrors = createAction('GET_ERRORS');
export const clearErrors = createAction('CLEAR_ERRORS');

export default createReducer(INITIAL_STATE, {
  // lista de actions

  //
  [getErrors.type]: (state, action) => ({
    msg: action.payload.msg,
    status: action.payload.status,
    id: action.payload.id,
  }),

  //
  [clearErrors.type]: (state, action) => ({
    msg: {},
    status: null,
    id: null,
  }),
});
