const API_BASE = 'http://localhost:3000/api';

function loadMarkets() {
  fetch(`${API_BASE}/markets`)
    .then((res) => res.json())
    .then((markets) => {
      const select = document.getElementById('market');
      select.innerHTML = '';
      markets.forEach((m) => {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        select.appendChild(opt);
      });
    });
}

function loadOrders() {
  fetch(`${API_BASE}/orders/open`)
    .then((res) => res.json())
    .then((orders) => {
      const list = document.getElementById('orders');
      list.innerHTML = '';
      orders.forEach((o) => {
        const li = document.createElement('li');
        li.textContent = `${o.id} ${o.side} ${o.amount}@${o.price} ${o.market}`;
        list.appendChild(li);
      });
    });
}

document.getElementById('order-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const market = document.getElementById('market').value;
  const side = document.getElementById('side').value;
  const price = document.getElementById('price').value;
  const amount = document.getElementById('amount').value;
  fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ market, side, type: 'limit', price, amount }),
  }).then(() => {
    document.getElementById('price').value = '';
    document.getElementById('amount').value = '';
    loadOrders();
  });
});

function showPanel(type) {
  ['spot', 'futures', 'liquidity'].forEach((t) => {
    const panel = document.getElementById(`${t}-panel`);
    if (t === type) {
      panel.classList.remove('hidden');
    } else {
      panel.classList.add('hidden');
    }
  });
}

document.getElementById('spot-link').addEventListener('click', () => showPanel('spot'));
document.getElementById('futures-link').addEventListener('click', () => showPanel('futures'));
document.getElementById('liquidity-link').addEventListener('click', () => showPanel('liquidity'));

loadMarkets();
loadOrders();
