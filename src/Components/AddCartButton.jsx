import React from 'react';
import PropTypes from 'prop-types';

class AddCartButton extends React.Component {
  render() {
    const { addToCartClick, id } = this.props;
    return (
      <div>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ addToCartClick }
          id={ id }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

AddCartButton.propTypes = {
  addToCartClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default AddCartButton;
