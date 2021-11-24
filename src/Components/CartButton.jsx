import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CartButton extends React.Component {
  render() {
    const { totalProductsInCart } = this.props;
    return (
      <div>
        <Link
          to="/shoppingcart"
        >
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Carrinho:
          </button>
          <p data-testid="shopping-cart-size">{ totalProductsInCart }</p>
        </Link>
      </div>
    );
  }
}

CartButton.propTypes = {
  totalProductsInCart: PropTypes.number.isRequired,
};

export default CartButton;
