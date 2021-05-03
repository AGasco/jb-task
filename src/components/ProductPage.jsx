import React, { Component } from 'react';

import { connect } from 'react-redux';
import Attributes from './Attributes';

import { returnCurrencySymbol } from './../utils/currencies';

import PropTypes from 'prop-types';
import { addProductToCart } from './../redux/actions';

class ProductPage extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired,
    addProductToCart: PropTypes.func.isRequired,
    cartItems: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  state = {
    price: '',
    mainPicture: '',
    altPictures: [],
    selectedAttributes: []
  };

  componentDidMount() {
    const { gallery, prices, attributes } = this.props.data;

    this.setState({
      price: prices[0].amount,
      mainPicture: gallery[0],
      altPictures: gallery,
      // maps every attribute to a new object like -> { name: "Size", selected: -1 }
      selectedAttributes: attributes.reduce((acc, cur) => {
        acc.push({ name: cur.name, selected: -1 });
        return acc;
      }, [])
    });
  }

  areAllAttributesSelected = () => {
    const { selectedAttributes } = this.state;

    const allSelected = selectedAttributes.every(
      (attr) => attr.selected !== -1
    );
    console.log(allSelected);
    return allSelected;
  };

  onSidePictureClick = (index) => {
    this.setState({
      ...this.state,
      mainPicture: this.state.altPictures[index]
    });
  };

  handleAttributeSelect = (e) => {
    const copiedArr = [...this.state.selectedAttributes];

    const field = e.target.getAttribute('name');
    const value = e.target.id;

    for (let i = 0; i < copiedArr.length; i++) {
      if (copiedArr[i].name === field) copiedArr[i].selected = Number(value);
    }

    this.setState({
      ...this.state,
      selectedAttributes: copiedArr
    });
  };

  handleAddToCartClick = () => {
    const { data, cartItems, addProductToCart } = this.props;
    const { selectedAttributes } = this.state;

    if (this.areAllAttributesSelected()) {
      const relevantData = {
        name: data.name,
        prices: data.prices,
        attributes: data.attributes,
        selectedAttributes,
        picture: data.gallery[0]
      };

      addProductToCart(cartItems, relevantData);
    } else {
      alert('Please select an option for each field');
    }
  };

  renderAltPictures = (altPictures, name) => {
    return (
      <div className="ProductPage-AltPictures">
        {altPictures.map((pic, index) => (
          <img
            onClick={() => this.onSidePictureClick(index)}
            src={pic}
            key={name + index}
            alt={`${name}`}
          />
        ))}
      </div>
    );
  };

  renderMainPicture = (mainPicture, name) => {
    return (
      <div className="ProductPage-MainPicture">
        <img src={mainPicture} alt={name} />
      </div>
    );
  };

  renderProductInfo = (attributes, name, price, description) => {
    const { selectedAttributes } = this.state;

    return (
      <div className="ProductPage-Info">
        <h1 className="ProductPage-Title">{name}</h1>
        <Attributes
          attributes={attributes}
          selectedAttributes={selectedAttributes}
          onAttributeSelect={this.handleAttributeSelect}
        />
        {this.renderPrice(price)}

        <button
          className="ProductPage-AddToCartBtn"
          onClick={this.handleAddToCartClick}
        >
          ADD TO CART
        </button>
        <div
          className="ProductPage-Description"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
    );
  };

  renderPrice = (price) => {
    return (
      <div className="ProductPage-PriceContainer">
        <h4 className="ProductPage-PriceLabel">PRICE:</h4>
        <h3 className="ProductPage-Price">
          <span className="ProductPage-Price__symbol">
            {returnCurrencySymbol(this.props.currency)}
          </span>
          {price}
        </h3>
      </div>
    );
  };

  render() {
    const { price, mainPicture, altPictures } = this.state;
    const { name, description, attributes } = this.props.data;

    return (
      <div className="ProductPage">
        {this.renderAltPictures(altPictures, name)}
        {this.renderMainPicture(mainPicture, name)}
        {this.renderProductInfo(attributes, name, price, description)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.product,
  currency: state.currency,
  cartItems: state.cartItems
});

const mapDispatchToProps = {
  addProductToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
