import React from 'react';

import { connect } from 'react-redux';
import CurrencyOverlay from './CurrencyOverlay';
import CartOverlay from './CartOverlay';

const CURRENCY = 'Currency';
const CART = 'Cart';

function NavButton({ children, elem, isOverlayOpen, toggleOverlay }) {
  const renderOverlayContent = () => {
    switch (elem) {
      case CURRENCY:
        return <CurrencyOverlay toggleOverlay={() => toggleOverlay(elem)} />;
      case CART:
        return <CartOverlay toggleOverlay={() => toggleOverlay(elem)} />;
      default:
        return;
    }
  };

  const renderOverlay = () => (
    <div className="NavButton-Overlay">{renderOverlayContent()}</div>
  );

  return (
    <>
      <button
        className={`NavButton-${elem}`}
        onClick={() => toggleOverlay(elem)}
      >
        {children}
      </button>
      {isOverlayOpen && renderOverlay()}
    </>
  );
}

export default connect()(NavButton);
