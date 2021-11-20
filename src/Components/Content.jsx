import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as api from '../services/api';
import InitialPage from './InitialPage';
import ShoppingCart from '../pages/ShoppingCart';
import ProductDetails from '../pages/ProductDetails';

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
    const { productInfos } = this.state;
    const { handleChanges, handleClick, fetchSpecificCategory } = this;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (<InitialPage
            handleChanges={ handleChanges }
            handleClick={ handleClick }
            fetchSpecificCategory={ fetchSpecificCategory }
            productInfos={ productInfos }
          />) }
        />
        <Route exact path="/shoppingcart" render={ () => <ShoppingCart /> } />
        <Route
          exact
          path="/productdetails/:productId"
          render={ (props) => <ProductDetails { ...props } /> }
        />
      </Switch>
    );
  }
}

export default Content;
