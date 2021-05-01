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
