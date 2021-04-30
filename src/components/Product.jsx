import React from 'react';
import Stars from './Stars';

function Product({ data }) {
  const selectCorrectPrice = (prices) => {
    return prices[0].amount;
  };

  const renderProduct = () => {
    const { category, description, gallery, inStock, name, prices } = data;

    console.log(data);

    const price = selectCorrectPrice(prices);

    const rng = () => {
      return Math.floor(Math.random() * 100);
    };

    return (
      <div className="Product">
        <img className="Product-Picture" src={gallery[0]} alt={`${name}'s`} />
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

export default Product;
