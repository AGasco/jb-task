import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import CartPageItem from './CartPageItem';

function CartPage({ cartItems }) {
  console.log('cartItems', cartItems);

  useEffect(() => {
    console.log('mounted!');
  }, []);

  useEffect(() => {
    console.log('updated!');
  }, [cartItems]);

  return (
    <div className="CartPage">
      <h1 className="CartPage-Title">Cart</h1>
      <div className="CartPage-Items">
        {cartItems.map((item, index) => (
          <CartPageItem data={item} key={index} amount={item.amount} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.cartItems
});

export default connect(mapStateToProps)(CartPage);
