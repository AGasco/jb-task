import React, { useState } from 'react';

import { connect } from 'react-redux';

import { returnCurrencySymbol } from './../utils/currencies';

import { addProductToCart, removeProductFromCart } from './../redux/actions';
import Attributes from './Attributes';

function CartOverlayItem({
  data,
  currency,
  cartItems,
  addProductToCart,
  removeProductFromCart
}) {
  const [amount, setAmount] = useState(data.amount);
  const [disable, setDisable] = useState(false);

  const selectCorrectPrice = (prices) => {
    const price = prices.find((p) => p.currency === currency);
    if (price) return price.amount;
  };

  const handleAddToCartClick = () => {
    if (disable) setDisable(false);
    setAmount(amount + 1);
    addProductToCart(cartItems, data);
  };

  const handleRemoveFromCartClick = () => {
    removeProductFromCart(cartItems, data.name);

    if (amount > 1) return setAmount(amount - 1);
    else setDisable(true);
  };

  return (
    <div className={`CartOverlay-Item ${disable ? 'disabled' : ''}`}>
      <div className="CartOverlay-Item-Info">
        <p className="CartOverlay-Item-Info-Name">{data.name}</p>
        <p className="CartOverlay-Item-Info-Price">
          <span className="CartOverlay-Item-Info-Price__symbol">
            {returnCurrencySymbol(currency)}
          </span>
          {selectCorrectPrice(data.prices)}
        </p>
        <Attributes
          attributes={data.attributes}
          selectedAttributes={data.selectedAttributes}
        />
      </div>
      <div className="CartOverlay-Item-Picture">
        <div className="CartOverlay-Item-Picture-Buttons">
          <button onClick={handleAddToCartClick}>+</button>
          {amount}
          <button onClick={handleRemoveFromCartClick}>-</button>
        </div>
        <img src={data.picture} alt={data.name} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currency: state.currency,
  cartItems: state.cartItems
});

const mapDispatchToProps = {
  addProductToCart,
  removeProductFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlayItem);
