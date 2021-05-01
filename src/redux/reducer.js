import {
  SET_ALL_PRODUCTS,
  SET_ALL_CURRENCIES,
  SELECT_CATEGORY,
  SELECT_PRODUCT,
  SELECT_CURRENCY
} from './actions';

const initialState = {
  category: '',
  currencies: [],
  currency: 'EUR',
  products: [],
  product: {},
  cartItems: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload.products
      };
    case SET_ALL_CURRENCIES:
      return {
        ...state,
        currencies: action.payload.currencies
      };
    case SELECT_CATEGORY:
      return {
        ...state,
        category: action.payload.category
      };
    case SELECT_PRODUCT:
      return {
        ...state,
        product: action.payload.product
      };
    case SELECT_CURRENCY:
      return {
        ...state,
        currency: action.payload.currency
      };
    default:
      return state;
  }
};

export default reducer;
