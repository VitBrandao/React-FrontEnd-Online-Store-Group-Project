import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as api from '../services/api';
import InitialPage from './InitialPage';
import ShoppingCart from '../pages/ShoppingCart';
import Categories from './Categories';
import ProductResults from './ProductResults';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      productInfos: [{ id: 123 }],
      categoryId: '',
    };
  }

  handleChanges = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { query, categoryId } = this.state;
    const response = await api.getProductsFromCategoryAndQuery(categoryId, query);
    this.setState({ productInfos: response.results });
  };

  render() {
    const { handleChanges, handleClick } = this;
    const { productInfos } = this.state;
    return (
      <div>
        <Route
          exact
          path="/"
          render={ () => <InitialPage handleChanges={ handleChanges } /> }
        />
        <Route exact path="/shoppingcart" render={ () => <ShoppingCart /> } />
        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          <button type="button"> Carrinho </button>
        </Link>
        <button
          type="button"
          onClick={ handleClick }
          data-testid="query-button"
        >
          Pesquisar
        </button>
        <Categories />
        <ProductResults productInfos={ productInfos } />
      </div>
    );
  }
}

export default Content;
