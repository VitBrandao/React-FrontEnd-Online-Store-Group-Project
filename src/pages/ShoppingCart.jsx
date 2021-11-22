import React from 'react';

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
    const itens = localStorage.getItem('itensInCart');
    const result = itens.split(',');
    this.updateItensIncart(result);
  };

  updateItensIncart = (itens) => {
    this.setState({ itensInCart: [...itens] }, () => this.getInfoOfProducts());
    // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    this.setState({ uniqueItensInCart: [...new Set(itens)] });
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
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
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
                    itensInfos.filter((element) => element.title === item.title).length
                  }
                </p>
              </div>
            ))
          }
        </ul>
      </div>

    );
  }
}

export default ShoppingCart;
