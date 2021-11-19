import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount = () => {
    // Após o componente montar
    this.fetchCategories();
  };

  fetchCategories = async () => {
    const response = await api.getCategories();
    this.setState({ categories: response });
  };

  render() {
    const { fetchSpecificCategory } = this.props;
    const { categories } = this.state;
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
                  { category.name }
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
};

export default Categories;
