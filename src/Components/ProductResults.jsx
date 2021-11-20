import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductResults extends Component {
  render() {
    const { productInfos } = this.props;
    return (
      <div>
        {
          productInfos.map((product) => (
            <div data-testid="product" key={ product.id }>
              <p>{ product.title }</p>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{ product.price }</p>
              <Link to="/productdetails">
                <button type="button">Detalhes do Produto</button>
              </Link>
            </div>
          ))
        }
      </div>
    );
  }
}

ProductResults.propTypes = {
  productInfos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductResults;
