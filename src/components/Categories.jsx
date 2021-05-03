import React from 'react';
import Category from './Category';

import { withRouter, useParams } from 'react-router-dom';

import { connect } from 'react-redux';

const Categories = ({ products }) => {
  const { category } = useParams();

  const renderCategory = () => {
    let newProducts = [];

    if (category === 'all') newProducts = products;
    else newProducts = products.filter((p) => p.category === category);

    return <Category title={category} products={newProducts} />;
  };

  return <div>{renderCategory()}</div>;
};

const mapStateToProps = (state) => ({
  products: state.products
});

export default withRouter(connect(mapStateToProps)(Categories));
