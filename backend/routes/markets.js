const { Router } = require('express');
const { listMarkets } = require('../models/marketData');

const router = Router();

router.get('/', (req, res) => {
  res.json(listMarkets());
});

module.exports = router;
