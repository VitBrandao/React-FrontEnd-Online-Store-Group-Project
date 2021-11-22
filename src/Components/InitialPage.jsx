import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import ProductResults from './ProductResults';

class InitialPage extends Component {
  render() {
    const {
      handleChanges, handleClick, fetchSpecificCategory, productInfos, addToCartClick,
    } = this.props;

    const elementContainingResults = (
      <ProductResults
        addToCartClick={ addToCartClick }
        productInfos={ productInfos }
      />);

    return (
      <div>
        <input
          data-testid="query-input"
          onChange={ handleChanges }
          name="query"
          type="text"
        />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/shoppingcart">
          <button type="button" data-testid="shopping-cart-button"> Carrinho </button>
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
            : elementContainingResults
        }
      </div>
    );
  }
}

InitialPage.propTypes = {
  addToCartClick: PropTypes.func.isRequired,
  handleChanges: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  fetchSpecificCategory: PropTypes.func.isRequired,
  productInfos: PropTypes.arrayOf(PropTypes.object).isRequired,

};

export default InitialPage;
