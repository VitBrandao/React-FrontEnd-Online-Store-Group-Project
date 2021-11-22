import React from 'react';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      itensInCart: [],
      itensInfos: [],
    };
  }

  componentDidMount = () => {
    const itens = localStorage.getItem('itensInCart');
    const result = itens.split(',');
    this.updateItensIncart(result);
  };

  updateItensIncart = (itens) => {
    this.setState({ itensInCart: [...itens] }, () => this.getInfoOfProducts());
  }

  getInfoOfProducts = async () => {
    const { itensInCart } = this.state;
    itensInCart.map(async (item) => {
      const info = await this.fetchProduct(item);
      this.setState((prev) => ({ itensInfos: [...prev.itensInfos, info] }));
    });
  };

  fetchProduct = async (item) => {
    const URL = `https://api.mercadolibre.com/items/${item}`;
    const response = await fetch(URL);
    const JSON = await response.json();
    return JSON;
  }

  render() {
    const { itensInfos } = this.state;
    return (
      <div>
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
        <ul>
          {
            itensInfos.map((item) => (
              <div key={ item.id }>
                <p>{item.title}</p>
                <img src={ item.thumbnail } alt={ item.title } />
                <p>{ item.price }</p>
              </div>
            ))
          }
        </ul>
      </div>

    );
  }
}

export default ShoppingCart;
