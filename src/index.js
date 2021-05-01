import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { ApolloProvider } from '@apollo/client/react';

import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';
import GraphqlHandler from './components/GraphqlHandler';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <GraphqlHandler />
        </Router>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
