import React from 'react';

class AvaliationForm extends React.Component {
  render() {
    return (
      <div>
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
    );
  }
}

export default AvaliationForm;
