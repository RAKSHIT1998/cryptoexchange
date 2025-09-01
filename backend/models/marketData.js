const markets = [
  { pair: 'BTC-USDT', price: 30000 },
  { pair: 'ETH-USDT', price: 2000 },
];

function listMarkets() {
  return markets;
}

module.exports = { listMarkets };
