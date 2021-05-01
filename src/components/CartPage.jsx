import React from 'react';

import { connect } from 'react-redux';
import CartPageItem from './CartPageItem';

function CartPage({ cartItems }) {
  return (
    <div className="CartPage">
      <h1 className="CartPage-Title">Cart</h1>
      <div className="CartPage-Items">
        {cartItems.map((item, index) => (
          <CartPageItem data={item} key={index} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.cartItems
});

export default connect(mapStateToProps)(CartPage);