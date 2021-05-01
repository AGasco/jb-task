export const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';
export const SET_ALL_CURRENCIES = 'SET_ALL_CURRENCIES';

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const SELECT_CURRENCY = 'SELECT_CURRENCY';

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';

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

export const addProductToCart = (cartItems, name) => {
  let includesProduct = false;
  for (let item of cartItems) {
    console.log('item.name', item.name);
    if (item.name === name) {
      includesProduct = true;
      item.amount++;
      break;
    }
  }

  if (!includesProduct) {
    cartItems.push({
      name,
      amount: 1
    });
  }

  console.log(cartItems);

  return { type: ADD_PRODUCT_TO_CART, payload: { cartItems } };
};

export const removeProductFromCart = (cartItems, name) => {
  const index = cartItems.find((item) => item.name === name);
  cartItems.splice(index, 1);
  return { type: REMOVE_PRODUCT_FROM_CART, payload: { cartItems } };
};
