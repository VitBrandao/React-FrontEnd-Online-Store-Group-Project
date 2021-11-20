import React, { Component } from 'react';
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

  render() {
    const { productAttributes: { title, thumbnail, price, attributes } } = this.state;
    return (
      !title ? <p>Carregando...</p> : (
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

// product.attributes.map((atribute) => attribule.name ; attribule.value_name)
