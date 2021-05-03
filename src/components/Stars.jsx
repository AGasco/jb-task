import React, { Component } from 'react';
import GreenStar from '../assets/Green-Star.png';
import GreyStar from '../assets/Grey-Star.png';

import PropTypes from 'prop-types';

const GREEN_STAR = 'Stars-Star Stars-Star__green';
const GREY_STAR = 'Stars-Star Stars-Star__grey';

class Stars extends Component {
  static propTypes = {
    rating: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    inStock: PropTypes.bool.isRequired
  };

  state = {
    array: [0, 0, 0, 0, 0].map((star, index) =>
      index + 1 > this.props.rating ? 0 : 1
    )
  };

  shouldComponentUpdate() {
    return false;
  }

  renderStar = (green, index) => {
    const { inStock } = this.props;

    if (green && inStock)
      return (
        <img src={GreenStar} alt="star" key={index} className={GREEN_STAR} />
      );
    return <img src={GreyStar} alt="star" key={index} className={GREY_STAR} />;
  };

  render() {
    const { votes } = this.props;
    const { array } = this.state;

    console.log('array after', array);

    return (
      <div className="Stars">
        {array.map((s, i) => this.renderStar(s, i))}
        <span className="Stars-Votes">{`(${votes})`}</span>
      </div>
    );
  }
}

export default Stars;
