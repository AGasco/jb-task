import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import CartIcon from '../assets/cartIcon.png';
import { NavLink } from 'react-router-dom';
import NavButton from './NavButton';
import { connect } from 'react-redux';
import { returnCurrencySymbol } from './../utils/currencies';

function Navbar({ currency }) {
  const [overlayStatus, setOverlayStatus] = useState({
    Currency: false,
    Cart: false
  });

  //If an overlay is opened, this will force-close the other one
  const toggleOverlay = (elem) => {
    const isElemOpen = overlayStatus[elem];
    let newStatus = {};

    if (isElemOpen) {
      newStatus = { ...overlayStatus, [elem]: false };
    } else {
      for (let field in overlayStatus) {
        if (elem === field) newStatus[field] = !isElemOpen;
        else newStatus[field] = isElemOpen;
      }
    }

    setOverlayStatus(newStatus);
  };

  return (
    <div className="Navbar">
      <ul className="Navbar-Categories">
        <NavLink to="/clothes" className="Navbar-Link">
          <li>CLOTHES</li>
        </NavLink>
        <NavLink to="/tech" className="Navbar-Link">
          <li>TECH</li>
        </NavLink>
      </ul>
      <NavLink to="/all" className="Navbar-Link logo" activeClassName="ignore">
        <img className="Navbar-Logo" src={Logo} alt="Shop's logo" />
      </NavLink>
      <div className="Navbar-Handlers">
        <NavButton
          elem="Currency"
          isOverlayOpen={overlayStatus.Currency === true}
          toggleOverlay={toggleOverlay}
        >
          <div>{returnCurrencySymbol(currency)}</div>
          <div className="Navbar-Handlers__currencyIcon"></div>
        </NavButton>
        <NavButton
          elem="Cart"
          isOverlayOpen={overlayStatus.Cart === true}
          toggleOverlay={toggleOverlay}
        >
          <div className="Navbar-Handlers__cartIcon">
            <img src={CartIcon} alt="Icon of a minicart" />
          </div>
        </NavButton>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currency: state.currency
});

export default connect(mapStateToProps)(Navbar);
