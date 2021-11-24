import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import CartButton from './CartButton';

class InitialPage extends Component {
  render() {
    const {
      handleChanges, handleClick, fetchSpecificCategory, categories
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
        <CartButton />
        <Link to="/productresults">
          <button
            type="button"
            onClick={ handleClick }
            data-testid="query-button"
          >
            Pesquisar
          </button>
        </Link>
        <Categories
          categories={ categories }
          fetchSpecificCategory={ fetchSpecificCategory }
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
};

export default InitialPage;
