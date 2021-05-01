export const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';
export const SET_ALL_CURRENCIES = 'SET_ALL_CURRENCIES';

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const SELECT_CURRENCY = 'SELECT_CURRENCY';

export const setAllProducts = (products) => ({
  type: SET_ALL_PRODUCTS,
  payload: { products }
});

export const setAllCurrencies = (currencies) => ({
  type: SET_ALL_CURRENCIES,
  payload: { currencies }
});

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  payload: { category }
});

export const selectProduct = (product) => ({
  type: SELECT_PRODUCT,
  payload: { product }
});

export const selectCurrency = (currency) => ({
  type: SELECT_CURRENCY,
  payload: { currency }
});
