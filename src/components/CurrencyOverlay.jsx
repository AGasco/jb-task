import React, { useRef, useEffect } from 'react';

import { connect } from 'react-redux';

import { selectCurrency } from '../redux/actions';
import { returnCurrencySymbol } from './../utils/currencies';

function CurrencyOverlay({ currencies, selectCurrency, toggleOverlay }) {
  const node = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleOutsideClick = (e) => {
    if (node.current.contains(e.target)) return;

    toggleOverlay();
  };

  const handleCurrencySelect = (e, c) => {
    selectCurrency(c);
    toggleOverlay();
  };

  return (
    <div className="CurrencyOverlay" ref={node}>
      {currencies.map((c) => (
        <div
          key={c}
          className="CurrencyOverlay-Currency"
          onClick={(e) => handleCurrencySelect(e, c)}
        >
          <span className="CurrencyOverlay-Currency__symbol">
            {returnCurrencySymbol(c)}
          </span>
          {c}
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currencies: state.currencies
});

const mapDispatchToProps = {
  selectCurrency
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyOverlay);
