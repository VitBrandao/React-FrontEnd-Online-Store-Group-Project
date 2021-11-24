import React from 'react';
import PropTypes from 'prop-types';
import CheckoutCartButton from '../Components/CheckoutCartButton';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      itensInCart: [],
    };
  }

  componentDidMount = () => {
    this.generateItensSaved();
  };

  generateItensSaved = () => {
    const { itensSaved } = this.props;
    this.setState({ itensInCart: [...itensSaved] });
  };

  handleDecreaseClick = ({ target }) => {
    const { itensInCart } = this.state;
    const { name } = target;
    const el = itensInCart.find((item) => item.id === name);
    if (el.quantity > 0) {
      el.quantity -= 1;
    } else {
      el.quantity = 0;
    }
    this.setState({ itensInCart: [...itensInCart] });
  };

  handleIncreaseClick = ({ target }) => {
    const { itensInCart } = this.state;
    const { name } = target;
    const el = itensInCart.find((item) => item.id === name);
    if (el.quantity < el.available_quantity) {
      el.quantity += 1;
    }
    this.setState({ itensInCart: [...itensInCart] });
  }

  render() {
    const { itensInCart } = this.state;
    const { handleDecreaseClick,
      handleIncreaseClick, checkIncreaseProductQty } = this;
    return (
      <div>
        {
          itensInCart.length === 0 ? (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          ) : (
            <div>
              <ul>
                {
                  itensInCart.map((item) => (
                    <div key={ item.title }>
                      <p data-testid="shopping-cart-product-name">{item.title}</p>
                      <img src={ item.thumbnail } alt={ item.title } />
                      <p
                        data-testid="shopping-cart-product-quantity"
                        className={ item.id }
                      >
                        {
                          item.quantity
                        }
                      </p>
                      <button
                        name={ item.id }
                        onClick={ handleDecreaseClick }
                        type="button"
                        data-testid="product-decrease-quantity"
                      >
                        -
                      </button>
                      <button
                        name={ item.id }
                        disabled={ checkIncreaseProductQty }
                        onClick={ handleIncreaseClick }
                        type="button"
                        data-testid="product-increase-quantity"
                      >
                        +
                      </button>
                    </div>
                  ))
                }
              </ul>
              <CheckoutCartButton />
            </div>
          )
        }
      </div>

    );
  }
}

ShoppingCart.propTypes = {
  itensSaved: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ShoppingCart;
