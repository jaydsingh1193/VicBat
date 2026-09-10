import { readFile, stat, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { sectionId } from '../dist/menu-components.js';

const root = resolve('dist');
const menu = JSON.parse(await readFile(`${root}/menu-data.json`, 'utf8'));
assert.equal(menu.food.reduce((count, section) => count + section.items.length, 0), 57, 'Expected all 57 food items');
assert.equal(menu.wine.reduce((count, section) => count + section.items.length, 0), 29, 'Expected all 29 wines');
const menuIds = [...menu.food, ...menu.wine].map(section => sectionId(section.name));
for (const section of [...menu.food, ...menu.wine]) {
  assert.ok(section.name && section.items.length, 'Empty menu section');
  for (const item of section.items) {
    assert.ok(item.name && (item.price || item.description), `Missing content: ${item.name}`);
    assert.ok(item.labels.every(label => ['Vegan', 'Vegetarian', 'Gluten free'].includes(label)), `Unexpected dietary label on ${item.name}`);
  }
}

async function checkReference(reference, page) {
  if (!reference || /^(https?:|mailto:|tel:|data:)/.test(reference)) return;
  const url = new URL(reference.replaceAll('&amp;', '&'), `https://local.test/${page}`);
  const target = url.pathname === '/' ? '/index.html' : url.pathname;
  const path = resolve(root, `.${target}`);
  assert.ok(path.startsWith(`${root}/`), `Reference escapes static root: ${reference}`);
  const file = await stat(path);
  assert.ok(file.isFile() && file.size > 0, `Empty or invalid asset: ${target}`);
  if (!url.hash) return;
  const html = await readFile(path, 'utf8');
  const id = decodeURIComponent(url.hash.slice(1));
  const dynamic = target === '/menu.html' && menuIds.includes(id);
  assert.ok(dynamic || html.includes(`id="${id}"`), `Missing anchor: ${reference}`);
}

for (const page of ['index.html', 'menu.html']) {
  const html = await readFile(`${root}/${page}`, 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${page} has duplicate IDs`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${page} needs one H1`);
  assert.ok(html.includes('<html lang="en-GB">'), `${page} must declare language`);
  assert.ok(!/<a\b[^>]*>(?:(?!<\/a>)[\s\S])*<a\b/.test(html), `${page} contains a nested link`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) await checkReference(match[1], page);
  for (const match of html.matchAll(/<img\b[^>]*>/g)) assert.match(match[0], /\balt="[^"]*"/, 'Image missing alt text');
}

const styles = await readFile(`${root}/styles.css`, 'utf8');
for (const match of styles.matchAll(/url\(['"]?([^)'"\s]+)/g)) await checkReference(match[1], 'styles.css');
assert.ok(!/#[\da-f]{3,8}\b/i.test(styles.replace(/:root\s*\{[^}]+\}/, '')), 'Colours must use shared theme tokens');

for (const directory of ['dist', 'scripts', 'tests']) {
  const files = await readdir(directory);
  for (const file of files.filter(name => /\.(mjs|js)$/.test(name))) {
    const result = spawnSync(process.execPath, ['--check', `${directory}/${file}`], { encoding: 'utf8' });
    if (result.error) throw result.error;
    assert.equal(result.status, 0, result.stderr);
  }
}
console.log('Passed: JavaScript syntax, page references, anchors, menu inventory, dietary labels, image text and colour tokens.');
