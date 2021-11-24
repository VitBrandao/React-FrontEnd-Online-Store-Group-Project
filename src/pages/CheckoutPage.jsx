import React from 'react';
import PropTypes from 'prop-types';
import CheckoutForm from '../Components/CheckoutForm';

class CheckoutPage extends React.Component {
  constructor() {
    super();
    this.state = {
      totalPrice: 0,
    };
  }

  componentDidMount = () => {
    this.getTotalPrice();
  }

  getTotalPrice = () => {
    const { itensSaved } = this.props;
    const prices = itensSaved.map((item) => (item.price * item.quantity));
    const totalPrice = prices.reduce((acc, curr) => acc + curr);
    this.setState({ totalPrice });
  };

  render() {
    const { totalPrice } = this.state;
    const { itensSaved } = this.props;

    return (
      <div>
        {
          itensSaved.map((item) => (
            <div key={ item.title }>
              <p>{ item.title }</p>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>{ item.price }</p>
              <p>{ item.quantity }</p>
            </div>
          ))
        }
        <p>
          Total:
          { totalPrice }
        </p>
        <CheckoutForm />
      </div>
    );
  }
}

CheckoutPage.propTypes = {
  itensSaved: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CheckoutPage;
