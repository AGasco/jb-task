export const SELECT_PRODUCT = 'SELECT_PRODUCT';

export const selectProduct = (product) => ({
  type: SELECT_PRODUCT,
  payload: { product }
});
