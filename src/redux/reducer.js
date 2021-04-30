import { SELECT_PRODUCT } from './actions';

const initialState = {
  curProduct: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return {
        ...state,
        curProduct: action.payload.product
      };
    default:
      return state;
  }
};

export default reducer;
