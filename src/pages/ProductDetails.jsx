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

  getProduct = () => {
    const { match: { params }, productInfos } = this.props;
    const prod = productInfos.find((product) => product.id === params.productId);
    this.setState({ productAttributes: prod });
  };

  componentDidMount = () => {
    this.getProduct();
  };

  render() {
    const { addToCartClick, totalProductsInCart } = this.props;
    const {
      productAttributes: {
        title, thumbnail, price, attributes, id, shipping } } = this.state;
    return (
      !title ? <p>Carregando...</p> : (
        <div>
          <CartButton
            totalProductsInCart={ totalProductsInCart }
          />
          <p data-testid="product-detail-name">{title}</p>
          <img src={ thumbnail } alt={ title } />
          <p>{price}</p>
          {
            shipping.free_shipping
            && <p data-testid="free-shipping">Frete Grátis</p>
          }
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
  totalProductsInCart: PropTypes.number.isRequired,
  productInfos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductDetails;
