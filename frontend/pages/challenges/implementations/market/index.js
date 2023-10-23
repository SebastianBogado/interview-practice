import { useState, useCallback } from 'react';
import CreateOrderForm from './createOrderForm';

const orderSymbols = ['AMZN', 'GOOG', 'AAPL', 'MSFT'];


let incrementalId = 1;
export default function MarketChallengeImplementation() {
  const [orders, setOrders] = useState([]);

  const ordersBySymbol = orders.reduce((ordersBySymbolAccum, order) => {
    const symbol = order.symbol;
    if (!ordersBySymbolAccum[symbol]) ordersBySymbolAccum[symbol] = [];
    
    ordersBySymbolAccum[symbol].push(order);

    return ordersBySymbolAccum;
  }, {});

  const bestOrdersBySymbol = Object.keys(ordersBySymbol).reduce((bestOrdersBySymbolAccum, symbol) => {
    const openOrders = ordersBySymbol[symbol].filter((order) => order.status === 'OPEN')
    const buyOrders = openOrders.filter((order) => order.type === 'BUY');
    const sellOrders = openOrders.filter((order) => order.type === 'SELL');

    bestOrdersBySymbolAccum[symbol] = {
      bestBid: buyOrders.length ? Math.max(buyOrders.map((order) => order.price)) : null,
      bestOffer: sellOrders.length ? Math.min(sellOrders.map((order) => order.price)) : null,
    };

    return bestOrdersBySymbolAccum;
  }, {});

  const createOrder = useCallback((incomingOrder) => {
    setOrders((orders) => {
      const newOrder = {
        ...incomingOrder,
        id: incrementalId++,
        status: 'OPEN',
      };

      const nextOrders = orders.map((order) => {
        if (newOrder.status !== 'OPEN') return order;
        if (order.status !== 'OPEN') return order;
        if (newOrder.symbol !== order.symbol) return order;
        if (newOrder.type === order.type) return order;

        const buyOrder = order.type === 'BUY' ? order : newOrder;
        const sellOrder = order.type === 'SELL' ? order : newOrder;
        if (buyOrder.price < sellOrder.price) return order;

        const largerOrder = newOrder.quantity >= order.quantity ? newOrder : order;
        const smallerOrder = newOrder.quantity < order.quantity ? newOrder : order;
        largerOrder.quantity -= smallerOrder.quantity;
        smallerOrder.quantity = 0;
        smallerOrder.status = 'FULFILLED';

        if (largerOrder.quantity === 0) {
          largerOrder.status = 'FULFILLED';
        }

        return order;
      }); 

      nextOrders.push(newOrder);

      return nextOrders;
    });
  }, [orders]);

  return (
    <div id="market">
      <h2>💰 Stock exchange 💰</h2>
      <CreateOrderForm validSymbols={orderSymbols} createOrder={createOrder} />
      <div className="best-offers">
        <h3>Best offers</h3>
        {Object.keys(bestOrdersBySymbol).map((symbol) => (
          <div className="symbols" key={symbol}>
            <h4>{symbol}</h4>
            <p>Best bid: {bestOrdersBySymbol[symbol].bestBid === null ? '-' : bestOrdersBySymbol[symbol].bestBid}</p>
            <p>Best offer: {bestOrdersBySymbol[symbol].bestOffer === null ? '-' : bestOrdersBySymbol[symbol].bestOffer}</p>
          </div>
        ))}
      </div>
      <div className="orders-list">
        <h3>All orders</h3>
        {orders.map((order) => (
          <div className="order" key={order.id}>
            {JSON.stringify(order)}
          </div>
        ))}
      </div>
    </div>
  );
}