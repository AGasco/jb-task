import React from 'react';
import Stars from './Stars';

import HeartIcon from '../assets/Heart.png';
import CartIcon from '../assets/emptyCart.png';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { selectProduct } from '../redux/actions';

function Product({ data, history, selectProduct }) {
  const selectCorrectPrice = (prices) => {
    return prices[0].amount;
  };

  const handleProductClick = () => {
    const { name } = data;
    // console.log(history);

    const url = name.toLowerCase().split(' ').join('-');

    selectProduct(data);
    history.push(history.location.pathname + '/' + url);
  };

  const handleLikeClick = () => {};

  const handleAddToCartClick = () => {};

  const renderProduct = () => {
    const { category, description, gallery, inStock, name, prices } = data;

    const price = selectCorrectPrice(prices);

    const rng = (max) => {
      // that (2 + ...) is to beautify a bit the random ratings
      // green stars are prettier than grey ones anyways :P
      return Math.floor(2 + Math.random() * max);
    };

    return (
      <div className="Product" onClick={handleProductClick}>
        <div className="Product-PictureContainer">
          <img className="Product-Picture" src={gallery[0]} alt={`${name}'s`} />
          <button onClick={handleLikeClick} className="Product-IconBtn like">
            <img
              className="Product-Icon like"
              src={HeartIcon}
              alt="Like Icon"
            />
          </button>
          <button
            onClick={handleAddToCartClick}
            className="Product-IconBtn cart"
          >
            <div className="Product-IconContainer cart">
              <img
                className="Product-Icon cart"
                src={CartIcon}
                alt="Add to cart Icon"
              />
            </div>
          </button>
        </div>

        <div className="Product-Footer">
          <h4 className="Product-Title">{name}</h4>
          <h3 className="Product-Price">${price}</h3>
          <div className="Product-Stars">
            <Stars rating={rng(5)} votes={rng(100)} />
          </div>
        </div>
      </div>
    );
  };

  return renderProduct();
}

const mapDispatchToProps = {
  selectProduct
};

export default withRouter(connect(null, mapDispatchToProps)(Product));
