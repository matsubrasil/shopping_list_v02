import api from './../../services/api';
import {
  getItems,
  addItem,
  loadingItems,
  removeItem,
} from './../ducks/items.reducer.js';

import {
  userLoading,
  userLoaded,
  authError,
  registerSuccess,
  registerFail,
  loginSuccess,
  loginFail,
} from './../ducks/auth.reducer';

import { getErrors } from './../ducks/error.reducer';

// GET ALL ITEMS
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
      .catch((err) =>
        dispatch(
          getErrors({
            msg: err.response.data,
            status: err.response.status,
            id: null,
          }),
        ),
      );
  };
};

// SAVE ITEM
export const saveItemFetch = (item) => {
  return (dispatch, getState) => {
    api
      .post('api/items', item, tokenConfig(getState))
      .then((res) => dispatch(addItem(res.data.data)))
      .catch((err) => {
        // dispara o erro
        dispatch(
          getErrors({
            msg: err.response.data,
            status: err.response.status,
            id: null,
          }),
        );
      });
  };
};

// DELETE ITEM
export const removeItemFetch = (id) => {
  return (dispatch, getState) => {
    // console.log('fetcActions:removeItemFethc:id', id);
    api //
      .delete(`api/items/${id}`, tokenConfig(getState)) //
      .then((res) => dispatch(removeItem(id)))
      .catch((err) => {
        // dispara o erro
        dispatch(
          getErrors({
            msg: err.response.data,
            status: err.response.status,
            id: null,
          }),
        );
      });
  };
};

// LOAD DATA USER
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

// REGISTER USER
export const registerUserFetch = (user) => {
  // console.log('fetchActions: registerUserFetch: user', user);
  return (dispatch) => {
    //Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // Request
    api
      .post('api/users', user, config)
      .then((res) => {
        // console.log('fetchActions: registerUserFetch:res.data', res.data);
        const authUser = {
          token: res.data.token,
          user: res.data.user,
        };
        dispatch(registerSuccess(authUser));
      })
      .catch((err) => {
        // dispara o erro
        dispatch(
          getErrors({
            msg: err.response.data,
            status: err.response.status,
            id: 'REGISTER_FAIL',
          }),
        );

        // limpa os dados de autenticacao
        dispatch(registerFail());
      });
  };
};

// LOGIN USER
export const loginUserFetch = (user) => {
  // console.log('fetchActions: registerUserFetch: user', user);
  return (dispatch) => {
    //Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // Request
    api
      .post('api/auth', user, config)
      .then((res) => {
        // console.log('fetchActions: registerUserFetch:res.data', res.data);
        const authUser = {
          token: res.data.token,
          user: res.data.user,
        };
        dispatch(loginSuccess(authUser));
      })
      .catch((err) => {
        // dispara o erro
        dispatch(
          getErrors({
            msg: err.response.data,
            status: err.response.status,
            id: 'LOGIN_FAIL',
          }),
        );

        // limpa os dados de autenticacao
        dispatch(loginFail());
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
