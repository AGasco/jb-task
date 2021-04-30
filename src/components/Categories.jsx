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

const GetProducts = () => {
  const { loading, error, data } = useQuery(result);

  if (loading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <Category title={data.category.name} products={data.category.products} />
  );
};

const Categories = ({ history }) => {
  const renderCategory = () => {
    const data = GetProducts();
    return <Category></Category>;
  };

  return <div>{GetProducts()}</div>;
};

export default withRouter(Categories);
