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
