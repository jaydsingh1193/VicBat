function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

export function sectionId(name) {
  return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
}

export function renderDish(item, wine = false) {
  const article = element('article', '', 'dish');
  const title = element('div', '', 'dish-title');
  title.append(element('h3', item.name));
  if (item.price) title.append(element('p', item.price, 'dish-price'));
  article.append(title);
  if (item.description) article.append(element('p', item.description, wine ? 'wine-price' : 'dish-description'));
  if (item.labels.length) {
    const list = element('ul', '', 'diet-labels');
    list.setAttribute('aria-label', 'Dietary labels from the menu');
    for (const label of item.labels) list.append(element('li', label));
    article.append(list);
  }
  return article;
}

export function renderMenu(sections, content, navigation, wine = false) {
  const fragment = document.createDocumentFragment();
  const links = document.createDocumentFragment();
  for (const section of sections) {
    const id = sectionId(section.name);
    const node = element('section', '', 'menu-section');
    node.id = id;
    node.setAttribute('aria-labelledby', `${id}-heading`);
    const heading = element('h2', section.name === 'Rosè' ? 'Rosé' : section.name);
    heading.id = `${id}-heading`;
    node.append(heading);
    if (section.description) node.append(element('p', section.description.replace('Champaige', 'Champagne')));
    const grid = element('div', '', 'dish-grid');
    for (const item of section.items) grid.append(renderDish(item, wine));
    node.append(grid);
    fragment.append(node);
    const link = element('a', heading.textContent);
    link.href = `#${id}`;
    links.append(link);
  }
  content.replaceChildren(fragment);
  navigation.replaceChildren(links);
  content.setAttribute('aria-busy', 'false');
}
