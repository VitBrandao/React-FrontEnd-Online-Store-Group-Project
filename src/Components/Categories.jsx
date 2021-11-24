import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Categories extends Component {
  render() {
    const { fetchSpecificCategory, categories } = this.props;
    return (
      <div>
        <ul>
          {
            categories.map((category) => (
              <div key={ category.id }>
                <label
                  key={ category.name }
                  data-testid="category"
                  htmlFor={ category.id }
                >
                  {category.name}
                  <input
                    onClick={ fetchSpecificCategory }
                    id={ category.id }
                    type="radio"
                  />
                </label>
              </div>
            ))
          }
        </ul>
      </div>
    );
  }
}

Categories.propTypes = {
  fetchSpecificCategory: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Categories;
