import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      itensInCart: [],
      itensInfos: [],
      uniqueItensInCart: [],
      uniqueItensInfos: [],
    };
  }

  componentDidMount = () => {
    this.updateItensInCart();
  }

  updateItensInCart = () => {
    const { itensSaved } = this.props;
    this.setState({ itensInCart: [itensSaved] }, () => this.getInfoOfProducts());
    // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    this.setState({ uniqueItensInCart: [...new Set(itensSaved)] });
  }

  getInfoOfProducts = async () => {
    const { itensInCart, uniqueItensInCart } = this.state;
    itensInCart.map(async (item) => {
      const info = await this.fetchProduct(item);
      this.setState((prev) => ({ itensInfos: [...prev.itensInfos, info] }));
    });
    uniqueItensInCart.map(async (item) => {
      const info = await this.fetchProduct(item);
      this.setState((prev) => ({ uniqueItensInfos: [...prev.uniqueItensInfos, info] }));
    });
  };

  fetchProduct = async (item) => {
    const URL = `https://api.mercadolibre.com/items/${item}`;
    const response = await fetch(URL);
    const JSON = await response.json();
    return JSON;
  }

  render() {
    const { itensInfos, uniqueItensInfos } = this.state;
    return (
      <div>
        {
          itensInfos.length === 0 ? (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          ) : (
            <ul>
              {
                uniqueItensInfos.map((item) => (
                  <div key={ item.id }>
                    <p data-testid="shopping-cart-product-name">{item.title}</p>
                    <img src={ item.thumbnail } alt={ item.title } />
                    <p
                      data-testid="shopping-cart-product-quantity"
                    >
                      {
                        itensInfos.filter(
                          (element) => element.title === item.title,
                        ).length
                      }
                    </p>
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
  itensSaved: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ShoppingCart;
