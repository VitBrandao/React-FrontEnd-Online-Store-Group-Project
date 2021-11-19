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

  fetchSpecificCategory = async ({ target }) => {
    const { id } = target;
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`);
    const JSON = await response.json();
    this.setState({ productInfos: JSON.results });
  }

  render() {
    const { handleChanges, handleClick, fetchSpecificCategory } = this;
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
        <Categories fetchSpecificCategory={ fetchSpecificCategory } />
        {
          productInfos.length === 0
            ? <p>Nenhum produto foi encontrado</p>
            : <ProductResults productInfos={ productInfos } />
        }
      </div>
    );
  }
}

export default Content;
