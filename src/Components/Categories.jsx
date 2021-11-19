import React, { Component } from 'react';
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
    const { categories } = this.state;
    return (
      <ul>
        {
          categories.map((category) => (
            <label key={ category.name } data-testid="category" htmlFor={ category.name }>
              { category.name }
              <input id={ category.name } type="radio" />
            </label>
          ))
        }
      </ul>
    );
  }
}

export default Categories;
