import React, { Component } from 'react';

import PropTypes from 'prop-types';

class Attributes extends Component {
  static propTypes = {
    attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedAttributes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAttributeSelect: PropTypes.func
  };

  isAttributeSelected = (name, index) => {
    const { selectedAttributes } = this.props;

    // giving a default value in case none was selected
    // i.e.: when adding to cart from Product, select first option as default
    if (!selectedAttributes) {
      return index === 0 ? 'active' : '';
    }

    const attribute = selectedAttributes.find((a) => a.name === name);

    if (!attribute) return;

    return attribute.selected === index ? 'active' : '';
  };

  renderAttributes = (attr) => {
    const { selectedAttributes } = this.props;

    return attr.items.map((option, index) => {
      if (!selectedAttributes && index > 0) return null;
      return (
        <div
          id={index}
          key={index}
          name={attr.name}
          className={`Attributes-Attribute-Option ${
            attr.name === 'Color' ? `Color ${option.displayValue}` : ''
          } ${this.isAttributeSelected(attr.name, index)}`}
          onClick={this.props.onAttributeSelect}
        >
          {this.renderAttributeValue(attr, option, index)}
        </div>
      );
    });
  };

  renderAttributeValue = (attr, option, index) => {
    if (attr.name === 'Color')
      return <p className={`Color ${option.displayValue}`}></p>;
    return <p>{option.displayValue}</p>;
  };

  renderAttribute = (attr) => {
    const { attributes } = this.props;

    if (!attributes || attributes.length === 0) return;

    return (
      <div className="Attributes-Attribute" key={attr}>
        <h4 className="Attributes-Attribute-Label">
          {attr.name.toUpperCase()}:
        </h4>
        <div className="Attributes-Attribute-Options">
          {this.renderAttributes(attr)}
        </div>
      </div>
    );
  };

  render() {
    const { attributes } = this.props;

    return (
      <div className="Attributes">
        {attributes?.map((attr) => this.renderAttribute(attr))}
      </div>
    );
  }
}

export default Attributes;
