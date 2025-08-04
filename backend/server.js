const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const marketsRouter = require('./routes/markets');
const ordersRouter = require('./routes/orders');

app.get('/', (req, res) => {
  res.send('Crypto Exchange API');
});

app.use('/api/markets', marketsRouter);
app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
