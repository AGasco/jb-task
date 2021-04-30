import React, { Component } from 'react';

import PropTypes from 'prop-types';

// ({ attributes })
class Attributes extends Component {
  propTypes = {
    attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedAttributes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAttributeSelect: PropTypes.func.isREquired
  };

  isAttributeSelected = (name, value) => {
    const attribute = this.props.selectedAttributes.find(
      (a) => a.name === name
    );

    if (!attribute) return;

    return attribute.selected === value ? 'active' : '';
  };

  renderAttributeValue = (attr, option) => {
    if (attr.name === 'Color')
      return <p className={`Color ${option.displayValue}`}></p>;
    return <p>{option.displayValue}</p>;
  };

  renderAttribute = (attr) => {
    const { attributes } = this.props;

    if (!attributes || attributes.length === 0) return;

    return (
      <div className="Attributes-Attribute">
        <h4 className="Attributes-Attribute-Label">
          {attr.name.toUpperCase()}:
        </h4>
        <div className="Attributes-Attribute-Options">
          {attr.items.map((option, index) => (
            <div
              id={index}
              key={index}
              name={attr.name}
              className={`Attributes-Attribute-Option ${
                attr.name === 'Color' ? `Color ${option.displayValue}` : ''
              } ${this.isAttributeSelected(attr.name, index)}`}
              onClick={this.props.onAttributeSelect}
            >
              {this.renderAttributeValue(attr, option)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  render() {
    const { attributes } = this.props;

    return (
      <div className="Attributes">
        {attributes.map((attr) => this.renderAttribute(attr))}
      </div>
    );
  }
}

export default Attributes;
