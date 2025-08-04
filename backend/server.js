const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Crypto Exchange API');
});

// placeholder route for spot order
app.post('/spot/order', (req, res) => {
  res.json({ status: 'spot order endpoint' });
});

// placeholder route for futures order
app.post('/futures/order', (req, res) => {
  res.json({ status: 'futures order endpoint' });
});

// placeholder route for liquidity provider
app.post('/liquidity', (req, res) => {
  res.json({ status: 'liquidity provider endpoint' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
