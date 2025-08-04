let orders = [];
let idCounter = 1;

function placeOrder({ userId, market, side, type, price, amount }) {
  const order = {
    id: String(idCounter++),
    userId,
    market,
    side,
    type,
    price,
    amount,
    status: 'open',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
}

function getOpenOrders() {
  return orders.filter((o) => o.status === 'open');
}

module.exports = { placeOrder, getOpenOrders };
