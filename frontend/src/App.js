import React from 'react';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';

function App() {
  return (
    <Provider store={store}>
      <AppNavbar />
      <ShoppingList />
    </Provider>
  );
}

export default App;
