export const returnCurrencySymbol = (currency) => {
  switch (currency) {
    case 'USD':
    case 'AUD':
      return '$';
    case 'GBP':
      return '£';
    case 'JPY':
      return '¥';
    case 'RUB':
      return '₽';
    default:
      return;
  }
};

export const formatPrice = (price) => price.toFixed(2);
