const { Router } = require('express');
const { placeOrder, getOpenOrders } = require('../models/orders');

const router = Router();

router.post('/', (req, res) => {
  const order = placeOrder(req.body);
  res.json(order);
});

router.get('/open', (req, res) => {
  res.json(getOpenOrders());
});

module.exports = router;
