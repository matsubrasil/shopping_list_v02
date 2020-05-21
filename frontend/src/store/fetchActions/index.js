import api from './../../services/api';
import {
  getItems,
  addItem,
  loadingItems,
  removeItem,
} from './../ducks/items.reducer.js';

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
