import React, { Component } from 'react';
import Stars from './Stars';

import HeartIcon from '../assets/Heart.png';
import CartIcon from '../assets/emptyCart.png';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { selectProduct } from '../redux/actions';

// ({ data, history, selectProduct })

class Product extends Component {
  selectCorrectPrice = (prices) => {
    return prices[0].amount;
  };

  handleProductClick = () => {
    const { data, history, selectProduct } = this.props;

    const url = data.name.toLowerCase().split(' ').join('-');

    selectProduct(data);
    this.props.history.push(history.location.pathname + '/' + url);
  };

  handleLikeClick = () => {};

  handleAddToCartClick = () => {};

  renderPicture = () => {
    const { name, gallery } = this.props.data;

    return (
      <div className="Product-PictureContainer">
        <img className="Product-Picture" src={gallery[0]} alt={`${name}'s`} />
        {this.renderIcons()}
      </div>
    );
  };

  renderIcons = () => {
    return (
      <>
        <button onClick={this.handleLikeClick} className="Product-IconBtn like">
          <img className="Product-Icon like" src={HeartIcon} alt="Like Icon" />
        </button>
        <button
          onClick={this.handleAddToCartClick}
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
      </>
    );
  };

  renderFooter = () => {
    const { name, prices } = this.props.data;

    const price = this.selectCorrectPrice(prices);

    return (
      <div className="Product-Footer">
        <h4 className="Product-Title">{name}</h4>
        <h3 className="Product-Price">${price}</h3>
        <div className="Product-Stars">
          <Stars rating={this.rng(5)} votes={this.rng(100)} />
        </div>
      </div>
    );
  };

  render() {
    const {
      category,
      description,
      gallery,
      inStock,
      name,
      prices
    } = this.props.data;

    return (
      <div className="Product" onClick={this.handleProductClick}>
        {this.renderPicture()}
        {this.renderFooter()}
      </div>
    );
  }

  rng = (max) => {
    // that (2 + ...) is to beautify a bit the random ratings
    // green stars are prettier than grey ones anyways :P
    return Math.floor(2 + Math.random() * max);
  };
}

const mapDispatchToProps = {
  selectProduct
};

export default withRouter(connect(null, mapDispatchToProps)(Product));
