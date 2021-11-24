import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as api from '../services/api';
import InitialPage from './InitialPage';
import ShoppingCart from '../pages/ShoppingCart';
import ProductDetails from '../pages/ProductDetails';
import ProductResults from './ProductResults';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      productInfos: [],
      categoryId: '',
      itensSaved: [],
      categories: [],
    };
  }

  componentDidMount = () => {
    this.fetchCategories();
  };

  fetchCategories = async () => {
    const response = await api.getCategories();
    this.setState({ categories: response });
  };

  addToCartClick = async ({ target }) => {
    const { productInfos, itensSaved } = this.state;
    const product = productInfos.find((prod) => prod.id === target.id);
    const checkForEqual = itensSaved.some((p) => p.id === product.id);
    if (!checkForEqual) {
      product.quantity = 1;
      this.setState(
        (prevState) => ({ itensSaved: [...prevState.itensSaved, product] }),
      );
    } else {
      product.quantity += 1;
    }
  };

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
    const { productInfos, itensSaved, categories } = this.state;
    const { handleChanges, handleClick, fetchSpecificCategory } = this;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (<InitialPage
            categories={ categories }
            addToCartClick={ this.addToCartClick }
            handleChanges={ handleChanges }
            handleClick={ handleClick }
            fetchSpecificCategory={ fetchSpecificCategory }
            productInfos={ productInfos }
          />) }
        />
        <Route
          exact
          path="/shoppingcart"
          render={ () => <ShoppingCart itensSaved={ itensSaved } /> }
        />
        <Route
          exact
          path="/productresults"
          render={ () => (<ProductResults
            productInfos={ productInfos }
            addToCartClick={ this.addToCartClick }
          />) }
        />
        <Route
          exact
          path="/productdetails/:productId"
          render={ (props) => (<ProductDetails
            addToCartClick={ this.addToCartClick }
            { ...props }
          />) }
        />
      </Switch>
    );
  }
}

export default Content;
