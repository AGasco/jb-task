import React, { useRef, useEffect } from 'react';

import { connect } from 'react-redux';
import CartOverlayItem from './CartOverlayItem';

import { returnCurrencySymbol, formatPrice } from './../utils/currencies';

import { withRouter } from 'react-router-dom';

function CartOverlay({ cartItems, currency, isOpen, history, toggleOverlay }) {
  const node = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleOutsideClick = (e) => {
    if (node.current.contains(e.target)) return;

    toggleOverlay();
  };

  const handleViewBagClick = () => {
    toggleOverlay();
    history.push('/checkout');
  };

  const selectCorrectPrice = (prices) => {
    const price = prices.find((p) => p.currency === currency);
    if (price) return price.amount;
  };

  const calculateTotal = () => {
    let result = 0;
    for (let i = 0; i < cartItems.length; i++) {
      result += cartItems[i].amount * selectCorrectPrice(cartItems[i].prices);
    }
    return result;
  };

  return (
    <>
      <div className="CartOverlay" ref={node}>
        <h3 className="CartOverlay-Title">
          My Bag{' '}
          <span className="CartOverlay-Title__itemQty">
            {cartItems.length} items
          </span>
        </h3>
        <div>
          {cartItems.map((item, index) => (
            <CartOverlayItem data={item} key={index} />
          ))}
        </div>
        <div className="CartOverlay-Footer">
          <div className="CartOverlay-Footer-Total">
            <p>Total</p>
            <p>
              <span className="CartOverlay-Footer-Total__symbol">
                {returnCurrencySymbol(currency)}
              </span>
              {formatPrice(calculateTotal())}
            </p>
          </div>
          <div className="CartOverlay-Footer-Buttons">
            <button
              className="CartOverlay-Footer-Buttons__viewBagBtn"
              onClick={handleViewBagClick}
            >
              VIEW BAG
            </button>
            <button className="CartOverlay-Footer-Buttons__checkoutBtn">
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
      <div
        className={`CartOverlay-GreyBackground ${!isOpen ? 'disabled' : ''}`}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
  currency: state.currency
});

export default withRouter(connect(mapStateToProps)(CartOverlay));
