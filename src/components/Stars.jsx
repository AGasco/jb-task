import React from 'react';
import GreenStar from '../assets/Green-Star.png';
import GreyStar from '../assets/Grey-Star.png';

const GREEN_STAR = 'Stars-Star Stars-Star__green';
const GREY_STAR = 'Stars-Star Stars-Star__grey';

function Stars({ rating, votes }) {
  const array = [0, 0, 0, 0, 0].map((star, index) =>
    index + 1 > rating ? 0 : 1
  );

  const renderStar = (green, index) => {
    if (green)
      return (
        <img src={GreenStar} alt="star" key={index} className={GREEN_STAR} />
      );
    return <img src={GreyStar} alt="star" key={index} className={GREY_STAR} />;
  };

  return (
    <div className="Stars">
      {array.map((s, i) => renderStar(s, i))}
      <span className="Stars-Votes">{`(${votes})`}</span>
    </div>
  );
}

export default Stars;
