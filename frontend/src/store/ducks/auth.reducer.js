import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const userLoaded = createAction('USER_LOADED');
export const userLoading = createAction('USER_LOADING');

export const authError = createAction('AUTH_ERROR');

export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginFail = createAction('LOGIN_FAIL');

export const logoutSuccess = createAction('LOGOUT_SUCCESS');

export const registerSuccess = createAction('REGISTER_SUCCESS');
export const registerFail = createAction('REGISTER_FAIL');

export default createReducer(INITIAL_STATE, {
  // lista de actions
  //
  [userLoading.type]: (state, action) => ({
    ...state,
    isLoading: true,
  }),

  //
  [userLoaded.type]: (state, action) => ({
    ...state,
    isAuthenticated: true,
    isLoading: false,
    user: action.payload,
  }),

  //
  [loginSuccess.type]: (state, action) => ({
    ...state,
    ...action.payload,
    isAuthenticated: true,
    isLoading: false,
  }),

  //
  [registerSuccess.type]: (state, action) => ({
    ...state,
    ...action.payload,
    isAuthenticated: true,
    isLoading: false,
  }),

  //
  [authError.type]: (state, action) => {
    localStorage.removeItem('token');
    return {
      ...state,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    };
  },

  //
  [loginFail.type]: (state, action) => {
    localStorage.removeItem('token');
    return {
      ...state,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    };
  },

  //
  [logoutSuccess.type]: (state, action) => {
    localStorage.removeItem('token');
    return {
      ...state,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    };
  },

  //
  [registerFail.type]: (state, action) => {
    localStorage.removeItem('token');
    return {
      ...state,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    };
  },
});
