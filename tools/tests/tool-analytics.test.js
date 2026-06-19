const test = require('node:test');
const assert = require('node:assert/strict');

const {
  GA_MEASUREMENT_ID,
  toolSlugFromPath,
  classifyInteraction,
  buildEventPayload,
} = require('../assets/mst-tool-analytics.js');

test('tool analytics extracts stable slugs from tool URLs', () => {
  assert.equal(GA_MEASUREMENT_ID, 'G-1N701965W1');
  assert.equal(toolSlugFromPath('/tools/bom-rfq-normalizer/'), 'bom-rfq-normalizer');
  assert.equal(toolSlugFromPath('/tools/mpw-readiness-checker/index.html'), 'mpw-readiness-checker');
  assert.equal(toolSlugFromPath('/tools/'), 'tools-directory');
  assert.equal(toolSlugFromPath('/'), 'site');
});

test('tool analytics classifies tool output actions without reading private content', () => {
  assert.equal(classifyInteraction({ id: 'copyBtn', tagName: 'BUTTON' }).eventName, 'tool_output_copy');
  assert.equal(classifyInteraction({ id: 'copyRfq', tagName: 'BUTTON' }).eventName, 'tool_output_copy');
  assert.equal(classifyInteraction({ id: 'mdBtn', tagName: 'BUTTON' }).eventName, 'tool_markdown_download');
  assert.equal(classifyInteraction({ id: 'jsonBtn', tagName: 'BUTTON' }).eventName, 'tool_json_download');
  assert.equal(classifyInteraction({ id: 'csvBtn', tagName: 'BUTTON' }).eventName, 'tool_csv_download');
  assert.equal(classifyInteraction({ id: 'dlRfq', tagName: 'BUTTON' }).eventName, 'tool_summary_download');
  assert.equal(
    classifyInteraction({
      tagName: 'BUTTON',
      getAttribute(name) {
        return name === 'data-dl' ? 'reticle' : '';
      },
    }).eventName,
    'tool_image_download',
  );
});

test('tool analytics classifies conversion and discovery links', () => {
  assert.equal(
    classifyInteraction({
      tagName: 'A',
      href: 'https://store.mst-sg.com/services/mpw-tapeout-rfq?utm_source=mst-sg&utm_medium=tool&utm_campaign=bom-rfq-normalizer',
    }).eventName,
    'tool_rfq_click',
  );
  assert.equal(
    classifyInteraction({ tagName: 'A', href: 'mailto:sales@mst-sg.com?subject=MST%20tool%20brief' }).eventName,
    'tool_email_click',
  );
  assert.equal(
    classifyInteraction({ tagName: 'A', href: 'https://github.com/shensi8312/mpw-tools' }).eventName,
    'tool_github_click',
  );
  assert.equal(
    classifyInteraction({ tagName: 'A', href: '/tools/mpw-readiness-checker/' }).eventName,
    'tool_directory_click',
  );
});

test('tool analytics payload includes only route, id and URL metadata', () => {
  const payload = buildEventPayload(
    {
      eventName: 'tool_csv_download',
      category: 'download',
      label: 'csvBtn',
      id: 'csvBtn',
    },
    '/tools/bom-rfq-normalizer/',
  );

  assert.deepEqual(payload, {
    event_category: 'download',
    event_label: 'csvBtn',
    page_path: '/tools/bom-rfq-normalizer/',
    tool_slug: 'bom-rfq-normalizer',
    interaction_id: 'csvBtn',
  });
  assert.ok(!Object.hasOwn(payload, 'tool_output'));
  assert.ok(!Object.hasOwn(payload, 'input'));
});
