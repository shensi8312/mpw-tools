const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const i18n = require('../assets/mst-static-i18n.js');

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

test('static tools resolve language from query string, cookie and browser languages', () => {
  assert.equal(i18n.resolveLang('?lang=zh', '', ['en-US']), 'zh');
  assert.equal(i18n.resolveLang('', 'mst_lang=zh', ['en-US']), 'zh');
  assert.equal(i18n.resolveLang('', '', ['zh-CN', 'en-US']), 'zh');
  assert.equal(i18n.resolveLang('?lang=en', 'mst_lang=zh', ['zh-CN']), 'en');
});

test('open-tools config is translated without changing IDs, values or tool type', () => {
  const config = {
    type: 'schedule',
    slug: 'mpw-shuttle-finder',
    title: 'MPW Shuttle Schedule Finder',
    eyebrow: 'Free MPW tool',
    headingPrefix: 'Filter MPW',
    headingAccent: 'shuttle schedule rows.',
    fields: [
      { id: 'node', label: 'Node filter', placeholder: '180, 130, 65, BCD...' },
      { id: 'scheduleRows', label: 'Schedule rows CSV', value: 'Route,Region,Node,Date,Source' },
    ],
  };

  const translated = i18n.translateToolConfig(config, 'zh');

  assert.equal(translated.type, 'schedule');
  assert.equal(translated.slug, 'mpw-shuttle-finder');
  assert.equal(translated.fields[0].id, 'node');
  assert.equal(translated.fields[1].value, 'Route,Region,Node,Date,Source');
  assert.equal(translated.title, 'MPW Shuttle 排期筛选器');
  assert.equal(translated.fields[0].label, '节点筛选');
  assert.match(translated.headingAccent, /排期/);
});

test('common text dictionary covers shared tool chrome and action labels', () => {
  assert.equal(i18n.t('Home', 'zh'), '首页');
  assert.equal(i18n.t('Tools', 'zh'), '工具');
  assert.equal(i18n.t('Inputs', 'zh'), '输入');
  assert.equal(i18n.t('Copy output', 'zh'), '复制输出');
  assert.equal(i18n.t('Copy brief', 'zh'), '复制简报');
  assert.equal(i18n.t('Download Markdown', 'zh'), '下载文档');
  assert.equal(i18n.t('Pilot brief', 'zh'), '试点简报');
  assert.equal(i18n.t('Engineer questions', 'zh'), '工程问题');
  assert.equal(i18n.t('Submit RFQ', 'zh'), '提交询价');
  assert.equal(i18n.t('Email MST', 'zh'), '邮件联系 MST');
  assert.equal(
    i18n.t('MST Open Tools - free MPW, P&ID and engineering RFQ utilities', 'zh'),
    'MST 开放工具 - 免费 MPW、P&ID 与工程 RFQ 工具',
  );
  assert.equal(i18n.t('Home', 'en'), 'Home');
});

test('every static tool page loads the shared i18n script', () => {
  const pages = toolPages();
  assert.ok(pages.length >= 16);
  for (const page of pages) {
    const html = fs.readFileSync(page, 'utf8');
    assert.match(html, /\/tools\/assets\/mst-static-i18n\.js/, path.relative(root, page));
  }
});

test('all generated open-tools configs have a Chinese dictionary entry', () => {
  const missing = [];
  for (const page of toolPages()) {
    const html = fs.readFileSync(page, 'utf8');
    const match = html.match(/<script id="tool-config" type="application\/json">([\s\S]*?)<\/script>/);
    if (!match) continue;
    const config = JSON.parse(match[1]);
    if (!i18n.hasToolDictionary(config.slug, 'zh')) missing.push(config.slug);
  }
  assert.deepEqual(missing, []);
});
