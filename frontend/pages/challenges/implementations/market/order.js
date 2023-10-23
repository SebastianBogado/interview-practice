
export const orderTypes = {
  SELL: 'SELL',
  BUY: 'BUY',
};

const status = {
  OPEN: 'OPEN',
  CANCELLED: 'CANCELLED',
  FULFILLED: 'FULFILLED',
};

export function validatePrice(price) {
  const parsedPrice = parseFloat(price);
  if (parsedPrice === NaN) throw new Error('Price needs to be a number');
  if (parsedPrice <= 0) throw new Error('Price needs to be positive');

  return true;
}

export function validateQuantity(quantity) {
  const parsedQuantity = parseInt(quantity);
  if (parsedQuantity === NaN) throw new Error('Quantity needs to be a number');
  if (parsedQuantity <= 0) throw new Error('Quantity needs to be positive');

  return true;
}

export function validateSymbol(validSymbols) {
  return function (symbol) {
    if (!validSymbols.includes(symbol)) throw new Error(`Symbols needs to be any of: ${validSymbols}`);
    return true;
  }
}