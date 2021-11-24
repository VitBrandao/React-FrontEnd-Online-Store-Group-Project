import React from 'react';

class CheckoutForm extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="nameInput">
            Nome Completo:
            <input data-testid="checkout-fullname" type="text" />
          </label>
          <label htmlFor="emailInput">
            Email:
            <input data-testid="checkout-email" type="email" />
          </label>
          <label htmlFor="cpfInput">
            CPF:
            <input data-testid="checkout-cpf" type="text" />
          </label>
          <label htmlFor="phoneInput">
            Telefone:
            <input data-testid="checkout-phone" type="text" />
          </label>
          <label htmlFor="cepInput">
            CEP:
            <input data-testid="checkout-cep" type="text" />
          </label>
          <label htmlFor="addressInput">
            Endereço:
            <input data-testid="checkout-address" type="text" />
          </label>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
