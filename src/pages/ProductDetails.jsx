import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      productAttributes: {},
    };
  }

  componentDidMount = () => {
    this.fetchProduct();
  };

  fetchProduct = async () => {
    const { match: { params } } = this.props;
    const URL = `https://api.mercadolibre.com/items/${params.productId}`;
    const response = await fetch(URL);
    const JSON = await response.json();
    this.setState({ productAttributes: JSON });
  }

  addToShoppingCart = async ({ target }) => {
    const getLocalStorage = localStorage.getItem('itensInCart');
    if (!getLocalStorage) {
      return 1;
    }

    const splitGetLocalStorage = getLocalStorage.split(',');
    localStorage.setItem('itensInCart', [...splitGetLocalStorage, target.id]);
  }

  render() {
    const { productAttributes: { title, thumbnail, price, attributes, id } } = this.state;
    return (
      !title ? <p>Carregando...</p> : (
        <div>
          <Link
            to="/shoppingcart"
          >
            <button type="button" data-testid="shopping-cart-button"> Carrinho </button>
          </Link>
          <div>
            <p data-testid="product-detail-name">{ title }</p>
            <img src={ thumbnail } alt={ title } />
            <p>{ price }</p>
            <ul>
              {
                attributes.map((attr) => (
                  <li key={ attr.id }>
                    <p>
                      {attr.name}
                      :
                      { attr.value_name }
                    </p>
                  </li>
                ))
              }
            </ul>
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ this.addToShoppingCart }
              id={ id }
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      )
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductDetails;
