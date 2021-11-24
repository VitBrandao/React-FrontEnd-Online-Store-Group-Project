import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as api from '../services/api';
import InitialPage from './InitialPage';
import ShoppingCart from '../pages/ShoppingCart';
import ProductDetails from '../pages/ProductDetails';
import ProductResults from './ProductResults';
import CheckoutPage from '../pages/CheckoutPage';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      productInfos: [],
      categoryId: '',
      itensSaved: [],
      categories: [],
      totalProductsInCart: 0,
    };
  }

  componentDidMount = () => {
    this.fetchCategories();
    this.recoverItens();
  };

  recoverItens = () => {
    const qty = localStorage.getItem('itensInCart');
    this.setState({ totalProductsInCart: Number(qty) });
  };

  fetchCategories = async () => {
    const response = await api.getCategories();
    this.setState({ categories: response });
  };

  addToCartClick = ({ target }) => {
    const { productInfos, itensSaved } = this.state;
    const product = productInfos.find((prod) => prod.id === target.id);
    const checkForEqual = itensSaved.some((p) => p.id === product.id);
    if (!checkForEqual) {
      product.quantity = 1;
      this.setState(
        ((prevState) => ({ itensSaved: [...prevState.itensSaved, product] })),
        this.updateLocalStorage(),
      );
    } else {
      product.quantity += 1;
    }
    this.setState(((prev) => ({ totalProductsInCart: prev.totalProductsInCart + 1 })),
      this.updateLocalStorage());
  };

  updateLocalStorage = () => {
    const { totalProductsInCart } = this.state;
    localStorage.setItem('itensInCart', totalProductsInCart + 1);
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
    const { productInfos, itensSaved, categories, totalProductsInCart } = this.state;
    const { handleChanges, handleClick, fetchSpecificCategory } = this;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (<InitialPage
            totalProductsInCart={ totalProductsInCart }
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
            totalProductsInCart={ totalProductsInCart }
            productInfos={ productInfos }
            addToCartClick={ this.addToCartClick }
          />) }
        />
        <Route
          exact
          path="/productdetails/:productId"
          render={ (props) => (<ProductDetails
            productInfos={ productInfos }
            totalProductsInCart={ totalProductsInCart }
            addToCartClick={ this.addToCartClick }
            { ...props }
          />) }
        />
        <Route
          exact
          path="/checkoutpage"
          render={ () => (<CheckoutPage
            itensSaved={ itensSaved }
          />) }
        />
      </Switch>
    );
  }
}

export default Content;
