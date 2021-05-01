import React from 'react';

import { connect } from 'react-redux';

import { selectCurrency } from '../redux/actions';
import { returnCurrencySymbol } from './../utils/currencies';

function CurrencyOverlay({ currencies, selectCurrency, onCurrencyClick }) {
  const handleCurrencySelect = (c) => {
    selectCurrency(c);
    onCurrencyClick();
  };

  return (
    <div className="CurrencyOverlay">
      {currencies.map((c) => (
        <div
          className="CurrencyOverlay-Currency"
          onClick={() => handleCurrencySelect(c)}
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
