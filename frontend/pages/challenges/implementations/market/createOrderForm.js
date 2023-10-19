import { useState } from 'react';

const orderTypes = ['SELL', 'BUY'];

function validatePrice(price) {
  const parsedPrice = parseFloat(price);
  if (parsedPrice === NaN) throw new Error('Price needs to be a number');
  if (parsedPrice <= 0) throw new Error('Price needs to be positive');

  return true;
}

function validateQuantity(quantity) {
  const parsedQuantity = parseInt(quantity);
  if (parsedQuantity === NaN) throw new Error('Quantity needs to be a number');
  if (parsedQuantity <= 0) throw new Error('Quantity needs to be positive');

  return true;
}

// deserves a refactor
export default function CreateOrderForm({ 
  createOrder,
  validSymbols
}) {
  /**
   * price: number
quantity: Integer
symbol: string
type: SELL / BUY
status: OPEN, CANCELLED, FULFILLED
   */

  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [symbol, setSymbol] = useState(validSymbols[0]);
  const [type, setType] = useState(orderTypes[0]);
  const [errors, setErrors] = useState({});

  const attemptToSubmit = () => {
    try { 
      validatePrice(price);
      createOrder({
        price: parseFloat(price),
        quantity: parseInt(quantity),
        symbol,
        type,
      });
      setErrors({});
    } catch (e) {
      setErrors((errors) => ({ 
        ...errors,
        price: e.message,
      }));
    }
  }

  return (
    <form className="createOrderForm">
      <div className={`field${errors.price ? " has-error": ""}`}>
        <label htmlFor="price">Price: </label>
        $<input id="price" name="price" type="number" value={price} onChange={(e) => { setPrice(e.target.value); setErrors((errors) => ({ ...errors, price: null }))}} />
        {errors.price && <p className="error">{errors.price}</p>}
      </div>
      <div>
        <label htmlFor="quantity">Quantity: </label>
        <input id="quantity" name="quantity" type="number" value={quantity} onChange={(e) => { setQuantity(e.target.value); setErrors((errors) => ({ ...errors, quantity: null }))}} />
      </div>
      <div>
        <label htmlFor="symbol">Symbol: </label>
        <input id="symbol" name="symbol" type="text" list="valid-symbols" value={symbol} onChange={(e) => { setSymbol(e.target.value); setErrors((errors) => ({ ...errors, symbol: null }))}} />
        <datalist id="valid-symbols">
          {validSymbols.map((validSymbol) => <option value={validSymbol} />)}
        </datalist>
      </div>
      <div>
        <label htmlFor="type">Type: </label>
        <select name="type" id="type" value={type} onChange={(e) => { setType(e.target.value); setErrors((errors) => ({ ...errors, type: null }))}} >
          <option value={orderTypes[0]}>Sell</option>
          <option value={orderTypes[1]}>Buy</option>
        </select>
      </div>
      <button type="submit" onClick={(e) => { e.preventDefault(); attemptToSubmit() }}>Create</button>
    </form>
  );
}