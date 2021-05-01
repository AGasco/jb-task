import React, { Component } from 'react';
import Stars from './Stars';

import HeartIcon from '../assets/Heart.png';
import CartIcon from '../assets/emptyCart.png';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { selectProduct, addProductToCart } from '../redux/actions';

import { returnCurrencySymbol } from './../utils/currencies';

import PropTypes from 'prop-types';

// ({ data, history, selectProduct, currency })

class Product extends Component {
  propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    selectProduct: PropTypes.func.isRequired,
    addProductToCart: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired,
    cartItems: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  selectCorrectPrice = (prices) => {
    const price = prices.find((p) => p.currency === this.props.currency);
    if (price) return price.amount;

    return 'No stock';
  };

  handleProductClick = () => {
    const { data, history, selectProduct } = this.props;

    const url = data.name.toLowerCase().split(' ').join('-');

    selectProduct(data);
    this.props.history.push(history.location.pathname + '/' + url);
  };

  handleLikeClick = () => {
    // It's here so it's ready to implement its functionality when
    // eventually we need to handle the click of the heart icon
  };

  handleAddToCartClick = (e) => {
    e.stopPropagation();

    const { cartItems, addProductToCart } = this.props;
    const { name } = this.props.data;

    addProductToCart(cartItems, name);
  };

  renderPicture = () => {
    const { name, gallery, inStock } = this.props.data;

    return (
      <div
        className={`Product-PictureContainer ${
          !inStock ? 'Product-PictureContainer__outOfStock' : ''
        }`}
      >
        <img
          className={`Product-Picture ${
            !inStock ? 'Product-Picture__outOfStock' : ''
          }`}
          src={gallery[0]}
          alt={`${name}'s`}
        />
        {this.renderIcons()}
      </div>
    );
  };

  renderIcons = () => {
    if (!this.props.data.inStock) return;

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
    const { currency, inStock } = this.props;
    const { name, prices } = this.props.data;

    const price = this.selectCorrectPrice(prices);

    return (
      <div
        className={`Product-Footer Product-Footer${
          !inStock ? '__outOfStock' : ''
        }`}
      >
        <h4 className="Product-Title">{name}</h4>
        <h3 className="Product-Price">
          <span className="Product-Price__symbol">
            {returnCurrencySymbol(currency)}
          </span>
          {price}
        </h3>
        <div className="Product-Stars">
          <Stars rating={this.rng(5)} votes={this.rng(100)} inStock={inStock} />
        </div>
      </div>
    );
  };

  render() {
    const { inStock } = this.props.data;
    return (
      <div
        className={`Product Product${!inStock ? '__outOfStock' : ''}`}
        onClick={this.handleProductClick}
      >
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

const mapStateToProps = (state) => ({
  currency: state.currency,
  cartItems: state.cartItems
});

const mapDispatchToProps = {
  selectProduct,
  addProductToCart
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
