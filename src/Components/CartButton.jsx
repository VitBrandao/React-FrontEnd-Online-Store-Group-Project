import React from 'react';
import { Link } from 'react-router-dom';

class CartButton extends React.Component {
  render() {
    return (
      <div>
        <Link
          to="/shoppingcart"
        >
          <button type="button" data-testid="shopping-cart-button"> Carrinho </button>
        </Link>
      </div>
    );
  }
}

export default CartButton;
