import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddCartButtonFromDetail from '../Components/AddCartButtonFromDetail';
import CartButton from '../Components/CartButton';

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
          <form>
            <label htmlFor="starsInput">
              Nota:
              <select name="starsInput" id="starsInput">
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
              </select>
            </label>
            <label htmlFor="commentInput">
              Comentário:
              <textarea
                data-testid="product-detail-evaluation"
                name="commentInput"
                id="commentInput"
                cols="30"
                rows="10"
              />
            </label>
          </form>
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
