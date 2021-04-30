import React, { useEffect } from 'react';
import Category from './Category';

import { withRouter } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

const result = gql`
  query {
    category {
      name
      products {
        name
        inStock
        gallery
        description
        category
        prices {
          currency
          amount
        }
      }
    }
    currencies
  }
`;

const GetCategory = () => {
  const { loading, error, data } = useQuery(result);

  if (loading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return renderCategory(data.category.name, data.category.products);
};

const renderCategory = (title, products) => {
  return <Category title={title} products={products} />;
};

const Categories = ({ history }) => {
  return <div>{GetCategory()}</div>;
};

export default withRouter(Categories);
