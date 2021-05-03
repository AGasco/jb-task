import React, { useState } from 'react';
import { connect } from 'react-redux';

import Attributes from './Attributes';

import { returnCurrencySymbol, formatPrice } from './../utils/currencies';

import { addProductToCart, removeProductFromCart } from './../redux/actions';

function CartPageItem({
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
    <div className={`CartPageItem ${disable ? 'disabled' : ''}`}>
      <div className="CartPageItem-Info">
        <p className="CartPageItem-Info-Name">{data.name}</p>
        <Attributes
          attributes={data.attributes}
          selectedAttributes={data.selectedAttributes}
        />
        <p className="CartPageItem-Info-Price">
          <span className="CartPageItem-Info-Price__symbol">
            {returnCurrencySymbol(currency)}
          </span>
          {formatPrice(selectCorrectPrice(data.prices))}
        </p>
      </div>
      <div className="CartPageItem-Picture">
        <div className="CartPageItem-Picture-Buttons">
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

export default connect(mapStateToProps, mapDispatchToProps)(CartPageItem);
