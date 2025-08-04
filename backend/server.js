const express = require('express');
const app = express();
app.use(express.json());

// simple in-memory data stores
const markets = ['BTC-USDT', 'ETH-USDT'];
let orders = [];
let nextOrderId = 1;

app.get('/', (req, res) => {
  res.send('Crypto Exchange API');
});

// return available markets
app.get('/api/markets', (req, res) => {
  res.json(markets);
});

// place a new order
app.post('/api/orders', (req, res) => {
  const { market, side, type, price, amount } = req.body;
  if (!market || !side || !type || price === undefined || amount === undefined) {
    return res.status(400).json({ error: 'missing fields' });
  }
  if (!markets.includes(market)) {
    return res.status(400).json({ error: 'unknown market' });
  }
  const order = {
    id: nextOrderId++,
    market,
    side,
    type,
    price: Number(price),
    amount: Number(amount),
    status: 'open',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  res.json(order);
});

// list open orders
app.get('/api/orders/open', (req, res) => {
  res.json(orders.filter((o) => o.status === 'open'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
