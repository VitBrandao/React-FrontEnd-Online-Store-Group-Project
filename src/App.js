import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import InitialPage from './Components/InitialPage';
import ShoppingCart from './pages/ShoppingCart';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" render={ () => <InitialPage /> } />
      <Route exact path="/shoppingcart" render={ () => <ShoppingCart /> } />
      <Link to="/shoppingcart" data-testid="shopping-cart-button">
        <button type="button"> Enviar </button>
      </Link>
    </BrowserRouter>
  );
}

export default App;

//req05
