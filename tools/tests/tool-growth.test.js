const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const contact = require('../assets/mst-tool-contact.js');
const schema = require('../assets/mst-tool-schema.js');

function toolPages() {
  const pages = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      if (entry.isFile() && entry.name === 'index.html') pages.push(full);
    }
  }
  walk(root);
  return pages.sort();
}

test('tool contact mailto is non-confidential and bounded', () => {
  const longOutput = '# MPW RFQ Pack\n' + 'non-confidential planning line\n'.repeat(200);
  const href = contact.buildContactHref({
    title: 'MPW RFQ Pack Builder',
    slug: 'mpw-rfq-pack',
    pageUrl: 'https://mst-sg.com/tools/mpw-rfq-pack/?lang=en',
    output: longOutput,
  });

  assert.match(href, /^mailto:sales@mst-sg\.com\?/);
  assert.match(decodeURIComponent(href), /Please review this non-confidential tool brief/);
  assert.match(decodeURIComponent(href), /Do not send GDS, RTL, netlists, schematics, masks, or confidential customer files/);
  assert.match(decodeURIComponent(href), /MPW RFQ Pack Builder/);
  assert.ok(href.length <= 1900);
});

test('tool schema describes free browser tools in English and Chinese', () => {
  const data = schema.buildToolSchema({
    title: 'MPW RFQ Pack Builder',
    description: 'Build a non-confidential first-screen MPW RFQ brief.',
    url: 'https://mst-sg.com/tools/mpw-rfq-pack/',
  });

  assert.equal(data['@type'], 'SoftwareApplication');
  assert.equal(data.name, 'MPW RFQ Pack Builder');
  assert.equal(data.offers.price, '0');
  assert.deepEqual(data.inLanguage, ['en', 'zh-CN']);
  assert.equal(data.provider.name, 'Moore Solution Technology Pte. Ltd.');
});

test('every static tool page loads contact and schema growth scripts', () => {
  const pages = toolPages();
  assert.ok(pages.length >= 16);
  for (const page of pages) {
    const html = fs.readFileSync(page, 'utf8');
    assert.match(html, /\/tools\/assets\/mst-tool-contact\.js/, path.relative(root, page));
    assert.match(html, /\/tools\/assets\/mst-tool-schema\.js/, path.relative(root, page));
  }
});
