import { renderMenu } from './menu-components.js';

const content = document.querySelector('#menu-content');
const wine = new URLSearchParams(window.location.search).get('menu') === 'wine';
document.querySelector(`[data-menu="${wine ? 'wine' : 'food'}"]`).setAttribute('aria-current', 'page');
if (wine) {
  document.title = 'Wine List | The Victoria Battersea';
  document.querySelector('#menu-heading').textContent = 'Something worth raising a glass to.';
  document.querySelector('#menu-intro').textContent = 'Whites, reds, rosés and something sparkling. Find a familiar favourite or discover your next one.';
}

function followSectionLink() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;
  document.getElementById(id)?.scrollIntoView();
}

try {
  const response = await fetch(new URL('./menu-data.json', import.meta.url), { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Menu request failed (${response.status}).`);
  const data = await response.json();
  const sections = wine ? data.wine : data.food;
  if (!Array.isArray(sections) || sections.length === 0) throw new Error('No menu sections were returned.');
  renderMenu(sections, content, document.querySelector('#menu-categories'), wine);
  followSectionLink();
} catch (error) {
  console.error('Unable to load the menu:', error);
  content.textContent = 'The menu could not be loaded. Please refresh the page, or email smeots@gmail.com for a copy.';
  content.setAttribute('role', 'alert');
  content.setAttribute('aria-busy', 'false');
}
