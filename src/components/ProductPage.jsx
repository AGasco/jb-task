import { queryAllByAttribute } from '@testing-library/dom';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import Attributes from './Attributes';

class ProductPage extends Component {
  state = {
    price: '$',
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
      selectedAttributes: attributes.reduce((acc, cur) => {
        acc.push({ name: cur.name, selected: -1 });
        return acc;
      }, [])
    });
  }

  onSidePictureClick = (index) => {
    this.setState({
      ...this.state,
      mainPicture: this.state.altPictures[index]
    });
  };

  handleAttributeSelect = (e) => {
    const copiedArr = [...this.state.selectedAttributes];

    console.log('arr', this.props.data.attributes);

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
        {/* <div className="ProductPage-Attributes">
          {attributes.map((attr) => this.renderAttribute(attr))}
        </div> */}
        <div className="ProductPage-PriceContainer">
          <h4 className="ProductPage-PriceLabel">PRICE:</h4>
          <h3 className="ProductPage-Price">${price}</h3>
        </div>
        <button className="ProductPage-AddToCartBtn">ADD TO CART</button>
        <div
          className="ProductPage-Description"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
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
  data: state.curProduct
});

export default connect(mapStateToProps)(ProductPage);
