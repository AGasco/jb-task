import React from 'react';
import { connect } from 'react-redux';

import { returnCurrencySymbol, formatPrice } from './../utils/currencies';

import { addProductToCart, removeProductFromCart } from './../redux/actions';

function CartPageItem({
  data,
  currency,
  cartItems,
  addProductToCart,
  removeProductFromCart
}) {
  const selectCorrectPrice = (prices) => {
    const price = prices.find((p) => p.currency === currency);
    if (price) return price.amount;
  };

  const handleAddToCartClick = () => {
    addProductToCart(cartItems, data);
  };

  const handleRemoveFromCartClick = () => {
    removeProductFromCart(cartItems, data.name);
  };

  return (
    <div className="CartPageItem">
      <div className="CartPageItem-Info">
        <p className="CartPageItem-Info-Name">{data.name}</p>
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
          {data.amount}
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
