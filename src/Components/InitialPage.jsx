import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Categories from './Categories';
import CartButton from './CartButton';
import ProductResults from './ProductResults';

class InitialPage extends Component {
  render() {
    const {
      handleChanges, handleClick, fetchSpecificCategory, categories, totalProductsInCart,
      addToCartClick,
      productInfos,
    } = this.props;

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
        <CartButton
          totalProductsInCart={ totalProductsInCart }
        />
        <button
          type="button"
          onClick={ handleClick }
          data-testid="query-button"
        >
          Pesquisar
        </button>
        <Categories
          categories={ categories }
          fetchSpecificCategory={ fetchSpecificCategory }
        />
        <ProductResults
          productInfos={ productInfos }
          addToCartClick={ addToCartClick }
        />
      </div>
    );
  }
}

InitialPage.propTypes = {
  handleChanges: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  fetchSpecificCategory: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalProductsInCart: PropTypes.number.isRequired,
  productInfos: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToCartClick: PropTypes.func.isRequired,
};

export default InitialPage;
