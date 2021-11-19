import React, { Component } from 'react';
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
