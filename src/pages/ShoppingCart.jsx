import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      itensInCart: [],
      uniqueItensInCart: [],
    };
  }

  componentDidMount = () => {
    this.updateItensInCart();
  }

  updateItensInCart = () => {
    // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    const { itensSaved } = this.props;
    this.setState({ itensInCart: [...itensSaved] }, () => {
      const unique = itensSaved.map((item) => item.id)
      this.setState({ uniqueItensInCart: [...new Set(unique)] });
    });    
  }

  handleDecreaseClick = ({ target }) => {
    const { name } = target
    const prodQty = document.querySelector(`.${name}`);
    const number = Number(prodQty.innerText);

    number > 0 ? prodQty.innerText = (number - 1).toString() : prodQty.innerText = '0';
  };

  handleIncreaseClick = ({ target }) => {
    const { name  } = target
    const prodQty = document.querySelector(`.${name}`);
    const number = Number(prodQty.innerText);
    prodQty.innerText = (number + 1).toString(); 
  };

  render() {
    const { handleDecreaseClick, handleIncreaseClick } = this;
    const { itensInCart, uniqueItensInCart } = this.state;
    console.log(itensInCart);
    return (
      <div>
        {
          itensInCart.length === 0 ? (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          ) : (
            <ul>
              {
                uniqueItensInCart.map((item) => itensInCart.find((el) => el.id === item)).map((item) => (
                  <div key={ item.title }>
                    <p data-testid="shopping-cart-product-name">{item.title}</p>
                    <img src={ item.thumbnail } alt={ item.title } />
                    <p
                      data-testid="shopping-cart-product-quantity"
                      className={ item.id }
                    >
                      {
                        itensInCart.filter(
                          (element) => element.title === item.title,
                        ).length
                      }
                    </p>
                    <button name={ item.id }  onClick={ handleDecreaseClick } type="button"  data-testid="product-decrease-quantity"> - </button>
                    <button name={ item.id }  onClick={ handleIncreaseClick } type="button" data-testid="product-increase-quantity"> + </button>                    
                  </div>
                ))
              }
            </ul>
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
