import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InitialPage extends Component {
  render() {
    const { handleChanges } = this.props;
    return (
      <div>
        <input
          data-testid="query-input"
          onChange={ handleChanges }
          name="query"
          type="text"
        />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

InitialPage.propTypes = {
  handleChanges: PropTypes.func.isRequired,
};

export default InitialPage;
