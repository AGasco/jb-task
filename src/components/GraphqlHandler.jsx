import React from 'react';

import App from '../App';

import { connect } from 'react-redux';

import { useQuery, gql } from '@apollo/client';

import {
  selectCategory,
  setAllProducts,
  setAllCurrencies
} from '../redux/actions';

const query = gql`
  query {
    category {
      name
      products {
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency
          amount
        }
      }
    }
    currencies
  }
`;

function GraphqlHandler({ selectCategory, setAllProducts, setAllCurrencies }) {
  const { loading, error, data } = useQuery(query);

  if (loading) return 'Loading...';
  if (error) return 'Error: ' + error;

  selectCategory(data.category);
  setAllProducts(data.category.products);
  setAllCurrencies(data.currencies);

  return (
    <>
      <App />
    </>
  );
}

const mapDispatchToProps = {
  selectCategory,
  setAllProducts,
  setAllCurrencies
};

export default connect(null, mapDispatchToProps)(GraphqlHandler);
