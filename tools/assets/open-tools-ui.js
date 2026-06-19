(function () {
  var Core = window.MSTOpenToolsCore;
  var I18n = window.MSTStaticI18n;
  var Contact = window.MSTToolContact;
  var lang = I18n ? I18n.currentLang() : 'en';
  function tr(value) { return I18n ? I18n.t(value, lang) : value; }
  var config = JSON.parse(document.getElementById('tool-config').textContent);
  if (I18n) config = I18n.translateToolConfig(config, lang);
  var app = document.getElementById('toolApp');

  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === 'class') el.className = attrs[key];
      else if (key === 'text') el.textContent = attrs[key];
      else el.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) {
      el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
    return el;
  }

  function value(id) {
    var el = document.getElementById(id);
    if (!el) return '';
    if (el.type === 'checkbox') return el.checked;
    return (el.value || '').trim();
  }

  function collect() {
    var data = {};
    config.fields.forEach(function (field) { data[field.id] = value(field.id); });
    (config.checks || []).forEach(function (field) { data[field.id] = value(field.id); });
    return data;
  }

  function renderField(field) {
    var input;
    if (field.type === 'textarea') {
      input = h('textarea', { id: field.id, placeholder: field.placeholder || '' });
      input.value = field.value || '';
    } else if (field.type === 'select') {
      input = h('select', { id: field.id }, (field.options || []).map(function (opt) {
        var option = h('option', { value: opt.value || opt, text: opt.label || opt });
        if ((field.value || '') === (opt.value || opt)) option.selected = true;
        return option;
      }));
    } else {
      input = h('input', { id: field.id, type: field.type || 'text', placeholder: field.placeholder || '', value: field.value || '' });
    }
    var kids = [h('label', { for: field.id, text: field.label }), input];
    if (field.hint) kids.push(h('div', { class: 'hint', text: field.hint }));
    return h('div', { class: 'field' }, kids);
  }

  function renderCheck(field) {
    var input = h('input', { id: field.id, type: 'checkbox' });
    input.checked = !!field.value;
    return h('label', { class: 'check' }, [input, h('span', {}, [h('b', { text: field.label }), document.createTextNode(' ' + (field.help || ''))])]);
  }

  function runTool(data) {
    if (config.type === 'schedule') {
      var rows = Core.parseScheduleRows(data.scheduleRows);
      var result = Core.filterScheduleRows(rows, { node: data.node, region: data.region });
      return makeResult(result.matches.length, 'Matching rows', result.boundary, result.matches.map(function (row) {
        return [row.date || 'TBD', row.route || 'TBD', row.region || 'TBD', row.node || 'TBD', row.source || 'TBD'].join(' | ');
      }), ['# MPW Shuttle Schedule Finder', '', result.boundary, '', '## Matches'].concat(result.matches.map(function (row) {
        return '- ' + [row.date || 'TBD', row.route || 'TBD', row.region || 'TBD', row.node || 'TBD', row.source || 'TBD'].join(' | ');
      })).join('\n'));
    }
    if (config.type === 'manifest') {
      var files = parseFileRows(data.files);
      var manifest = Core.buildHandoffManifest({ project: data.project, topCell: data.topCell, units: data.units, files: files });
      return makeResult(Math.max(0, 100 - manifest.missing.length * 20), 'Manifest readiness', 'File-level handoff manifest. Use after NDA/partner path for actual delivery.', manifest.missing, manifest.markdown);
    }
    if (config.type === 'pdk') {
      var pdk = Core.buildPdkChecklist(data);
      return makeResult(pdk.score, 'Checklist score', 'PDK and signoff requirements remain partner-confirmed.', pdk.missing, pdk.markdown);
    }
    if (config.type === 'tags') {
      var parsed = Core.parsePidTags(data.tags);
      var lines = parsed.tags.map(function (tag) { return tag.tag + ' | ' + tag.family + ' | loop ' + tag.loop; });
      return makeResult(parsed.tags.length, 'Parsed tags', 'Tag families are heuristic; engineering review remains required.', lines, ['# P&ID Tag & Instrument Index', '', '## Parsed tags'].concat(lines.map(function (line) { return '- ' + line; })).join('\n'));
    }
    if (config.type === 'package') {
      var pkg = Core.suggestPackages(data);
      var lines = pkg.recommendations.map(function (item) { return item.package + ': ' + item.reason; });
      return makeResult(lines.length, 'Candidate packages', pkg.boundary, lines, ['# Package & Assembly Selector', '', pkg.boundary, '', '## Recommendations'].concat(lines.map(function (line) { return '- ' + line; })).join('\n'));
    }
    if (config.type === 'timeline') {
      var timeline = Core.buildProcurementTimeline({ targetDate: data.targetDate, steps: parseSteps(data.steps) });
      var lines = timeline.steps.map(function (step) { return step.start + ' to ' + step.finish + ' | ' + step.name + ' | ' + step.days + ' days'; });
      return makeResult(lines.length, 'Timeline steps', 'Reverse plan only. Shuttle, payment, partner review and logistics dates must be confirmed.', lines, ['# MPW Procurement Timeline', '', '- Target date: ' + timeline.targetDate, '', '## Plan'].concat(lines.map(function (line) { return '- ' + line; })).join('\n'));
    }
    if (config.type === 'pid-bom') {
      var bom = Core.checkPidBomCompleteness(data.bom);
      var issues = bom.missingColumns.map(function (c) { return 'missing column: ' + c; }).concat(bom.rowIssues.map(function (issue) { return issue.tag + ': ' + issue.issues.join(', '); }));
      return makeResult(bom.score, 'BOM completeness', 'Completeness score only. Customer engineering and sourcing review remain required.', issues, ['# P&ID BOM Completeness Check', '', '- Score: ' + bom.score + '/100', '', '## Issues'].concat(issues.map(function (line) { return '- ' + line; })).join('\n'));
    }
    if (config.type === 'uhp') {
      var uhp = Core.buildUhpGasStickChecklist(data);
      return makeResult(uhp.score, 'Rule coverage', 'UHP rules are project-specific; engineering review remains required.', uhp.missing, uhp.markdown);
    }
    if (config.type === 'bom-rfq') {
      var rfq = Core.normalizeBomRfq(data.bom);
      var issues2 = rfq.rowIssues.map(function (issue) { return 'row ' + issue.row + ': ' + issue.issues.join(', '); });
      return makeResult(Math.max(0, 100 - issues2.length * 15), 'RFQ normalization', 'Normalized sourcing table. Supplier price, MOQ, lead time and export checks remain case-by-case.', issues2, ['# BOM RFQ Normalizer', '', '## Normalized CSV', '```csv', rfq.csv, '```', '', '## Issues'].concat(issues2.map(function (line) { return '- ' + line; })).join('\n'), rfq.csv);
    }
    return makeResult(0, 'Tool not configured', 'Missing tool type.', [], '');
  }

  function makeResult(score, label, boundary, items, markdown, csv) {
    return { score: score, label: label, boundary: boundary, items: items && items.length ? items : ['No first-pass gaps found.'], markdown: markdown || '', csv: csv || '' };
  }

  function parseFileRows(input) {
    return (input || '').split(/\r?\n/).map(function (line) {
      var parts = line.split(/[,\t|]/).map(function (p) { return p.trim(); });
      return { name: parts[0], role: parts[1], sha256: parts[2] };
    }).filter(function (row) { return row.name; });
  }

  function parseSteps(input) {
    return (input || '').split(/\r?\n/).map(function (line) {
      var parts = line.split(/[,\t|]/).map(function (p) { return p.trim(); });
      return { name: parts[0], days: Number(parts[1] || 0) };
    }).filter(function (row) { return row.name; });
  }

  function download(name, type, text) {
    var blob = new Blob([text], { type: type });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
  }

  function showToast(text) {
    var toast = document.getElementById('toast');
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 1600);
  }

  function renderResult() {
    var result = runTool(collect());
    document.getElementById('scoreNumber').textContent = String(result.score);
    document.getElementById('scoreLabel').textContent = result.label;
    document.getElementById('statusTitle').textContent = result.label;
    document.getElementById('statusText').textContent = result.boundary;
    document.getElementById('issueList').innerHTML = result.items.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('');
    document.getElementById('output').textContent = result.markdown;
    document.getElementById('csvBtn').style.display = result.csv ? '' : 'none';
    document.getElementById('csvBtn').onclick = function () { download(config.slug + '.csv', 'text/csv;charset=utf-8', result.csv); };
    if (Contact) Contact.refresh(document);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }

  function init() {
    document.title = config.title + ' | MST';
    app.appendChild(h('section', { class: 'hero' }, [h('div', { class: 'wrap hero-grid' }, [
      h('div', {}, [h('div', { class: 'mono eyebrow', text: config.eyebrow }), h('h1', {}, [document.createTextNode(config.headingPrefix + ' '), h('span', { text: config.headingAccent })]), h('p', { class: 'lede', text: config.lede })]),
      h('div', { class: 'privacy' }, [h('b', { text: config.boundaryLead }), document.createTextNode(' ' + config.boundary)])
    ])]));
    var form = h('form', { class: 'panel sticky', id: 'toolForm' }, [h('h2', { text: tr('Inputs') }), h('p', { class: 'section-note', text: config.inputNote })]);
    for (var i = 0; i < config.fields.length; i += 2) {
      form.appendChild(h('div', { class: 'grid2' }, config.fields.slice(i, i + 2).map(renderField)));
    }
    if (config.checks && config.checks.length) {
      form.appendChild(h('h2', { text: tr('Readiness checks') }));
      form.appendChild(h('div', { class: 'checks' }, config.checks.map(renderCheck)));
    }
    var results = h('div', {}, [
      h('div', { class: 'summary' }, [
        h('div', { class: 'score' }, [h('div', {}, [h('div', { class: 'n', id: 'scoreNumber', text: '0' }), h('div', { class: 't', id: 'scoreLabel', text: tr('score') })])]),
        h('div', { class: 'status' }, [h('b', { id: 'statusTitle', text: tr('Ready') }), h('p', { id: 'statusText', text: '' }), h('ul', { class: 'list', id: 'issueList' })])
      ]),
      h('div', { class: 'panel' }, [h('h2', { text: tr('Generated output') }), h('pre', { class: 'output', id: 'output' }), h('div', { class: 'actions' }, [
        h('button', { class: 'btn', type: 'button', id: 'copyBtn', text: tr('Copy output') }),
        h('button', { class: 'btn ghost', type: 'button', id: 'mdBtn', text: tr('Download Markdown') }),
        h('button', { class: 'btn ghost', type: 'button', id: 'csvBtn', text: tr('Download CSV') }),
        h('a', { class: 'btn ghost', href: 'https://store.mst-sg.com/services/mpw-tapeout-rfq?utm_source=mst-sg&utm_medium=tool&utm_campaign=' + config.slug, target: '_blank', rel: 'noopener', text: tr('Submit RFQ') }),
        h('a', { class: 'btn ghost', id: 'emailBtn', href: 'mailto:sales@mst-sg.com', 'data-tool-contact': '1', 'data-output': '#output', 'data-title': config.title, text: tr('Email MST') })
      ])])
    ]);
    app.appendChild(h('section', { class: 'wrap app' }, [form, results]));
    app.appendChild(h('footer', {}, [h('div', { class: 'wrap foot' }, [h('span', { text: '© 2023-2026 Moore Solution Technology Pte. Ltd. Singapore' }), h('span', {}, [h('a', { href: '/tools/', text: tr('Tools') }), document.createTextNode(' · '), h('a', { href: '/mpw/', text: 'MPW' }), document.createTextNode(' · '), h('a', { href: 'mailto:sales@mst-sg.com', text: 'sales@mst-sg.com' })])])]));
    app.appendChild(h('div', { class: 'toast', id: 'toast', text: tr('Copied') }));
    config.fields.concat(config.checks || []).forEach(function (field) {
      var input = document.getElementById(field.id);
      input.addEventListener('input', renderResult);
      input.addEventListener('change', renderResult);
    });
    document.getElementById('copyBtn').onclick = function () {
      navigator.clipboard.writeText(document.getElementById('output').textContent).then(function () { showToast(tr('Output copied')); });
    };
    document.getElementById('mdBtn').onclick = function () { download(config.slug + '.md', 'text/markdown;charset=utf-8', document.getElementById('output').textContent); };
    renderResult();
  }

  init();
})();
