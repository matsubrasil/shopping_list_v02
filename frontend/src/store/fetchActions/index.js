import api from './../../services/api';
import {
  getItems,
  addItem,
  loadingItems,
  removeItem,
} from './../ducks/items.reducer.js';

import { userLoading, userLoaded, authError } from './../ducks/auth.reducer';

import { getErrors } from './../ducks/error.reducer';

export const getAllItemsFetch = () => {
  return (dispatch) => {
    // avisa que esta pesquisando
    dispatch(loadingItems());

    // busca na base
    api
      .get('api/items')
      .then((res) => {
        // console.log(res.data.data);
        dispatch(getItems(res.data.data));
      })
      .catch((err) => console.log(err.response.error));
  };
};

export const saveItemFetch = (item) => {
  return (dispatch) => {
    api
      .post('api/items', item)
      .then((res) => dispatch(addItem(res.data.data)))
      .catch((err) => console.log(err.response.message));
  };
};

export const removeItemFetch = (id) => {
  return (dispatch) => {
    // console.log('fetcActions:removeItemFethc:id', id);
    api //
      .delete(`api/items/${id}`) //
      .then((res) => dispatch(removeItem(id)))
      .catch((err) => console.log(err.response.message));
  };
};

// // RETURN ERRORS
// export const returnErrorsFetch = (msg, status, id = null) => {
//   return (dispatch) =>
//     dispatch(
//       getErrors({
//         msg,
//         status,
//         id,
//       }),
//     );
// };

// // CLEAR ERRORS
// export const clearErrorsFetch = () => {
//   return (dispatch) => {
//     dispatch(clearErrors());
//   };
// };

//
export const loadUserFetch = () => {
  return (dispatch, getState) => {
    // user loading
    dispatch(userLoading());

    // search user
    api //
      .get('api/auth/user', tokenConfig(getState)) //
      .then((res) => {
        dispatch(userLoaded(res.data.user));
      })
      .catch((err) => {
        // dispara o erro
        dispatch(
          getErrors({
            msg: err.response.data,
            status: err.response.status,
            id: null,
          }),
        );

        // limpa os dados de autenticacao
        dispatch(authError());
      });
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
