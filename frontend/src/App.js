import React, { useEffect } from 'react';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'reactstrap';

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { loadUserFetch } from './store/fetchActions';
function App() {
  useEffect(() => store.dispatch(loadUserFetch()), []);

  return (
    <Provider store={store}>
      <AppNavbar />
      <Container style={{ maxWidth: '600px' }}>
        <ItemModal />
        <ShoppingList />
      </Container>
    </Provider>
  );
}

export default App;
