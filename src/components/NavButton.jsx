import React, { useState } from 'react';

import { connect } from 'react-redux';
import CurrencyOverlay from './CurrencyOverlay';
import CartOverlay from './CartOverlay';

const CURRENCY = 'Currency';
const CART = 'Cart';

function NavButton({ children, elem, isOverlayOpen, toggleOverlay }) {
  const [content, setContent] = useState({});

  const renderOverlayContent = () => {
    switch (elem) {
      case CURRENCY:
        return <CurrencyOverlay onCurrencyClick={() => toggleOverlay(elem)} />;
      case CART:
        return <CartOverlay />;
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
