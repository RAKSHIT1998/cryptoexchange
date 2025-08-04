function showPanel(type) {
  ['spot', 'futures', 'liquidity'].forEach(t => {
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

const orderForm = document.getElementById('order-form');
if (orderForm) {
  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const market = document.getElementById('market').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const price = parseFloat(document.getElementById('price').value);
    const response = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'demo', market, side: 'buy', type: 'limit', price, amount })
    });
    const data = await response.json();
    document.getElementById('order-result').textContent = JSON.stringify(data, null, 2);
  });
}
