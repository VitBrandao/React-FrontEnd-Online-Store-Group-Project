import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddCartButtonFromDetail from '../Components/AddCartButtonFromDetail';
import CartButton from '../Components/CartButton';
import AvaliationForm from '../Components/AvaliationForm';

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
    const { addToCartClick } = this.props;
    const { productAttributes: { title, thumbnail, price, attributes, id } } = this.state;
    return (
      !title ? <p>Carregando...</p> : (
        <div>
          <CartButton />
          <p data-testid="product-detail-name">{title}</p>
          <img src={ thumbnail } alt={ title } />
          <p>{price}</p>
          <ul>
            {
              attributes.map((attr) => (
                <li key={ attr.id }>
                  <p>
                    {attr.name}
                    :
                    {attr.value_name}
                  </p>
                </li>
              ))
            }
          </ul>
          <AddCartButtonFromDetail
            addToCartClick={ addToCartClick }
            id={ id }
          />
          <AvaliationForm />
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
  addToCartClick: PropTypes.func.isRequired,
};

export default ProductDetails;
