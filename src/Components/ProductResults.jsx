import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductResults extends Component {
  render() {
    const { productInfos, addToCartClick } = this.props;
    return (
      <div>
        {
          productInfos.map((product) => (
            <div data-testid="product" key={ product.id }>
              <p>{product.title}</p>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{product.price}</p>
              {
                product.title && (
                  <Link
                    data-testid="product-detail-link"
                    to={ `/productdetails/${product.id}` }
                  >
                    <button type="button">Detalhes do Produto</button>
                  </Link>
                )
              }
              {
                product.title && (
                  <div>
                    <button
                      data-testid="product-add-to-cart"
                      type="button"
                      onClick={ addToCartClick }
                      id={ product.id }
                    >
                      Adicionar ao carrinho
                    </button>
                  </div>
                )
              }
            </div>
          ))
        }
      </div>
    );
  }
}

ProductResults.propTypes = {
  productInfos: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToCartClick: PropTypes.func.isRequired,
};

export default ProductResults;
