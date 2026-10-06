import { readFile, readdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const componentNames = ['header', 'footer', 'offers', 'sport'];
const components = new Map();
for (const name of componentNames) {
  components.set(name, (await readFile(`src/components/${name}.html`, 'utf8')).trim());
}

// Plain HTML includes keep navigation and offers identical, including without JavaScript.
export async function renderPage(name) {
  assert.match(name, /^[a-z-]+\.html$/, 'Expected a page filename');
  const source = await readFile(`src/pages/${name}`, 'utf8');
  const html = source.replace(/<!-- component:([a-z-]+) -->/g, (_, component) => {
    assert.ok(components.has(component), `Unknown component: ${component}`);
    const markup = components.get(component);
    if (component !== 'header') return markup;
    const current = name === 'menu.html' ? 'food.html' : name;
    return markup.replaceAll(`href="./${current}"`, `href="./${current}" aria-current="page"`);
  });
  assert.ok(!html.includes('<!-- component:'), `Unresolved component in ${name}`);
  return html;
}

export const pages = (await readdir('src/pages')).filter(name => name.endsWith('.html')).sort();
assert.ok(pages.length > 0, 'No source pages found');
if (process.argv[1]?.endsWith('/build.mjs')) {
  for (const name of pages) await writeFile(`dist/${name}`, await renderPage(name));
  console.log(`Built ${pages.length} static pages from shared HTML components.`);
}
