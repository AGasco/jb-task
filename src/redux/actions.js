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

export const addProductToCart = (cartItems, data) => {
  let includesProduct = false;
  for (let item of cartItems) {
    if (item.name === data.name) {
      includesProduct = true;
      item.amount++;
      break;
    }
  }

  if (!includesProduct) {
    cartItems.push({
      ...data,
      amount: 1
    });
  }

  return { type: ADD_PRODUCT_TO_CART, payload: { cartItems } };
};

export const removeProductFromCart = (cartItems, name) => {
  cartItems.map((item) => {
    if (item.name === name) {
      if (item.amount === 1) {
        const index = cartItems.map((item) => item.name === name);
        cartItems.splice(index, 1);
      } else {
        item.amount--;
      }
    }
  });

  return { type: REMOVE_PRODUCT_FROM_CART, payload: { cartItems } };
};
