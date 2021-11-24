import React from 'react';
import { Link } from 'react-router-dom';

class CheckoutCartButton extends React.Component {
  render() {
    return (
      <div>
        <Link
          to="/checkoutpage"
        >
          <button
            type="button"
            data-testid="checkout-products"
          >
            Finalizar Compra
          </button>
        </Link>
      </div>
    );
  }
}

export default CheckoutCartButton;
