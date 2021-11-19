import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import InitialPage from './InitialPage';
import ShoppingCart from '../pages/ShoppingCart';
import Categories from './Categories';

class Content extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={ () => <InitialPage /> } />
        <Route exact path="/shoppingcart" render={ () => <ShoppingCart /> } />
        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          <button type="button"> Enviar </button>
        </Link>
        <Categories />
      </div>
    );
  }
}

export default Content;
