
document.addEventListener('DOMContentLoaded', () => {
  const messageEl = document.getElementById('message');
  if (messageEl) messageEl.textContent = 'Welcome!';

  const form = document.getElementById('item-form');
  const input = document.getElementById('item-input');
  const list = document.getElementById('item-list');

  if (form && input && list) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      const li = document.createElement('li');
      li.textContent = val;
      list.appendChild(li);
      input.value = '';
      input.focus();
    });
  }
});

// Simple helper for GET/POST JSON requests
export async function fetchJson(url, options = {}) {
  const opts = Object.assign({
    headers: { 'Content-Type': 'application/json' }
  }, options);
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

// Default export for simple script inclusion
export default {};
