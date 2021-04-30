import React, { Component } from 'react';

import { connect } from 'react-redux';

//this.props.data
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
      altPictures: gallery
    });
  }

  onSidePictureClick = (index) => {
    this.setState({
      ...this.state,
      mainPicture: this.state.altPictures[index]
    });
  };

  renderAttribute = (attr) => {
    const { attributes } = this.props.data;
    console.log('rendering attribute', attr);

    if (!attributes || attributes.length === 0) return;

    return (
      <div className="ProductPage-Attribute">
        <h4 className="ProductPage-Attribute-Label">
          {attr.name.toUpperCase()}:
        </h4>
        <div className="ProductPage-Attribute-Options">
          {attr.items.map((option) => (
            <div className="ProductPage-Attribute-Option">
              <p>{option.displayValue}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  render() {
    const { price, mainPicture, altPictures } = this.state;
    const { name, description, attributes } = this.props.data;

    return (
      <div className="ProductPage">
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
        <div className="ProductPage-MainPicture">
          <img src={mainPicture} alt={name} />
        </div>
        <div className="ProductPage-Info">
          <h1 className="ProductPage-Title">{name}</h1>
          <div className="ProductPage-Attributes">
            {attributes.map((attr) => this.renderAttribute(attr))}
          </div>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.curProduct
});

export default connect(mapStateToProps)(ProductPage);
