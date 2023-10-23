import Form, { useForm } from '../form';
import { orderTypes, validatePrice,  validateQuantity, validateSymbol } from './order';

function Price() {
  return (
    <Form.Field field="price" label="Price">
      <Form.Input field="price" type="number" />
    </Form.Field>
  );
}

function Quantity() {
  return (
    <Form.Field field="quantity" label="Quantity">
      <Form.Input field="quantity" type="number" />
    </Form.Field>
  );
}

function Symbol({ validSymbols }) {
  return (
    <>
      <Form.Field field="symbol" label="Symbol">
        <Form.Input list="valid-symbols" />
      </Form.Field>
      <datalist id="valid-symbols">
        {validSymbols.map((validSymbol) => <option value={validSymbol} />)}
      </datalist>
    </>
  );
}

function OrderType() {
  return (
    <Form.Field field="type" label="Type">
      <Form.Radio field="type" value={orderTypes.SELL} label="Sell" />
      <Form.Radio field="type" value={orderTypes.BUY} label="Buy" />
    </Form.Field>
  );
}

export default function CreateOrderForm({ 
  createOrder,
  validSymbols
}) {
  const form = useForm({
    price: 0,
    quantity: 0,
    symbol: validSymbols[0],
    type: orderTypes.SELL,
  }, {
    price: validatePrice,
    quantity: validateQuantity,
    symbol: validateSymbol(validSymbols),
  },
    createOrder
  );

  return (
    <Form form={form} title={"New order"}>
      <Symbol validSymbols={validSymbols} />
      <Price />
      <Quantity />
      <OrderType />

      <Form.SubmitButton>Create</Form.SubmitButton>
    </Form>
  );
}