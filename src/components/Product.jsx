import React, { useState } from 'react';
import Stars from './Stars';

import HeartIcon from '../assets/Heart.png';
import CartIcon from '../assets/emptyCart.png';

import { withRouter } from 'react-router-dom';

function Product({ data, history }) {
  const selectCorrectPrice = (prices) => {
    return prices[0].amount;
  };

  const handleProductClick = () => {
    const { name } = data;
    console.log(history);

    const url = name.toLowerCase().split(' ').join('-');

    history.push(history.location.pathname + '/' + url);
  };

  const handleLikeClick = () => {};

  const handleAddToCartClick = () => {};

  const renderProduct = () => {
    const { category, description, gallery, inStock, name, prices } = data;

    console.log(data);

    const price = selectCorrectPrice(prices);

    const rng = () => {
      return Math.floor(Math.random() * 100);
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
            <Stars rating={4} votes={rng()} />
          </div>
        </div>
      </div>
    );
  };

  return renderProduct();
}

export default withRouter(Product);
