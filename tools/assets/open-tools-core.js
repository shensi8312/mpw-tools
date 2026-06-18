(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MSTOpenToolsCore = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function text(value) {
    return value == null ? '' : String(value).trim();
  }

  function present(value) {
    return text(value).length > 0;
  }

  function yes(value) {
    return value === true || value === 'true' || value === 'yes' || value === 'on';
  }

  function parseDelimited(input) {
    var lines = text(input).split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean);
    if (!lines.length) return { headers: [], rows: [] };
    var delimiter = lines[0].indexOf('\t') >= 0 ? '\t' : ',';
    var headers = splitLine(lines[0], delimiter).map(normalizeHeader);
    var rows = lines.slice(1).map(function (line) {
      var cells = splitLine(line, delimiter);
      var row = {};
      headers.forEach(function (header, index) {
        row[header] = text(cells[index]);
      });
      return row;
    });
    return { headers: headers, rows: rows };
  }

  function splitLine(line, delimiter) {
    if (delimiter === '\t') return line.split('\t');
    var out = [];
    var cell = '';
    var quoted = false;
    for (var i = 0; i < line.length; i += 1) {
      var c = line[i];
      if (c === '"') {
        quoted = !quoted;
      } else if (c === delimiter && !quoted) {
        out.push(cell);
        cell = '';
      } else {
        cell += c;
      }
    }
    out.push(cell);
    return out.map(function (value) { return value.replace(/^"|"$/g, '').replace(/""/g, '"'); });
  }

  function normalizeHeader(value) {
    var raw = text(value).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    var aliases = {
      part_number: 'mpn',
      part_no: 'mpn',
      pn: 'mpn',
      manufacturer_part_number: 'mpn',
      mfr: 'manufacturer',
      maker: 'manufacturer',
      qty: 'quantity',
      q_t_y: 'quantity',
      count: 'quantity',
      desc: 'description',
      item_description: 'description',
      drawing_file: 'drawing',
      drawing_ref: 'drawing',
      tag_no: 'tag',
      tag_number: 'tag',
      connection_type: 'connection'
    };
    return aliases[raw] || raw;
  }

  function toIsoDate(date) {
    return date.toISOString().slice(0, 10);
  }

  function addDays(date, days) {
    var d = new Date(date.getTime());
    d.setUTCDate(d.getUTCDate() + days);
    return d;
  }

  function parseScheduleRows(input) {
    var parsed = parseDelimited(input);
    return parsed.rows.map(function (row) {
      return {
        route: row.route || row.provider || row.name || '',
        region: row.region || row.country || '',
        node: row.node || row.process || '',
        date: row.date || row.shuttle_date || row.deadline || '',
        source: row.source || row.url || row.note || ''
      };
    }).filter(function (row) {
      return present(row.route) || present(row.node) || present(row.date);
    });
  }

  function filterScheduleRows(rows, criteria) {
    criteria = criteria || {};
    var node = text(criteria.node).toLowerCase();
    var region = text(criteria.region).toLowerCase();
    var matches = (rows || []).filter(function (row) {
      var nodeOk = !node || text(row.node).toLowerCase().indexOf(node) >= 0;
      var regionOk = !region || text(row.region).toLowerCase().indexOf(region) >= 0;
      return nodeOk && regionOk;
    }).sort(function (a, b) {
      return text(a.date).localeCompare(text(b.date));
    });
    return {
      matches: matches,
      boundary: 'This is not a confirmed shuttle booking or availability claim. Verify every route, source date, eligibility gate and partner path before using it for RFQ planning.'
    };
  }

  function buildHandoffManifest(input) {
    input = input || {};
    var files = (input.files || []).map(function (file) {
      return {
        name: text(file.name),
        role: text(file.role) || 'supporting file',
        sha256: text(file.sha256),
        note: text(file.note)
      };
    }).filter(function (file) { return file.name; });
    var missing = [];
    files.forEach(function (file) {
      if (!/^[a-f0-9]{64}$/i.test(file.sha256)) missing.push('checksum for ' + file.name);
    });
    if (!present(input.topCell)) missing.push('top cell');
    if (!files.length) missing.push('file list');
    var markdown = [
      '# GDS/OASIS Handoff Manifest',
      '',
      '- Project: ' + (text(input.project) || 'TBD'),
      '- Top cell: ' + (text(input.topCell) || 'TBD'),
      '- Units / grid: ' + (text(input.units) || 'TBD'),
      '',
      'No confidential design detail belongs in a public manifest. Share checksums, filenames, top-cell name, layer-map reference and delivery notes only through the approved NDA/partner handoff path.',
      '',
      '## Files',
      files.length ? files.map(function (file) {
        return '- ' + file.name + ' | role=' + file.role + ' | sha256=' + (file.sha256 || 'TBD');
      }).join('\n') : '- TBD',
      '',
      '## Missing',
      missing.length ? missing.map(function (item) { return '- ' + item; }).join('\n') : '- No first-pass manifest gaps.'
    ].join('\n');
    return { project: text(input.project), topCell: text(input.topCell), files: files, missing: missing, markdown: markdown };
  }

  function buildPdkChecklist(input) {
    input = input || {};
    var required = [
      'NDA and PDK access path',
      'PDK release/version note',
      'DRC deck',
      'LVS deck',
      'PEX / extraction deck if needed',
      'SPICE / model libraries',
      'corner list and simulation conditions',
      'antenna / density / fill rules',
      'GDS/OASIS handoff requirement',
      'shuttle submission checklist'
    ];
    var gates = [
      ['hasNda', 'NDA and PDK access path'],
      ['hasPdkVersion', 'PDK release/version note'],
      ['hasDrcDeck', 'DRC deck'],
      ['hasLvsDeck', 'LVS deck'],
      ['hasModels', 'SPICE / model libraries'],
      ['hasCorners', 'corner list and simulation conditions'],
      ['hasHandoffRules', 'GDS/OASIS handoff requirement']
    ];
    var done = gates.filter(function (pair) { return yes(input[pair[0]]); }).length;
    var missing = gates.filter(function (pair) { return !yes(input[pair[0]]); }).map(function (pair) { return pair[1]; });
    var score = Math.round(done / gates.length * 100);
    var markdown = [
      '# PDK / Foundry Requirement Checklist',
      '',
      '- Node: ' + (text(input.node) || 'TBD'),
      '- Process family: ' + (text(input.processFamily) || 'TBD'),
      '- Score: ' + score + '/100',
      '',
      'All PDK, model, signoff and handoff requirements remain partner-confirmed. This checklist is a preparation aid, not foundry documentation.',
      '',
      '## Required items',
      required.map(function (item) { return '- ' + item; }).join('\n'),
      '',
      '## Missing / open',
      missing.length ? missing.map(function (item) { return '- ' + item; }).join('\n') : '- No first-pass checklist gaps.'
    ].join('\n');
    return { required: required, missing: missing, score: score, markdown: markdown };
  }

  function parsePidTags(input) {
    var tags = [];
    text(input).split(/\r?\n/).forEach(function (line) {
      var trimmed = line.trim();
      if (!trimmed) return;
      var match = trimmed.match(/\b([A-Z]{1,5})[-_ ]?(\d+[A-Z]?)\b/i);
      if (!match) return;
      var code = match[1].toUpperCase();
      var loop = match[2].toUpperCase();
      tags.push({ tag: code + '-' + loop, code: code, loop: loop, family: tagFamily(code), description: trimmed });
    });
    var families = {};
    tags.forEach(function (tag) {
      families[tag.family] = (families[tag.family] || 0) + 1;
    });
    return { tags: tags, summary: { count: tags.length, families: families } };
  }

  function tagFamily(code) {
    if (/^MFC$/.test(code)) return 'Mass flow controller';
    if (/^(VLV|XV|SV|PV)$/.test(code)) return 'Valve';
    if (/^(PI|PT|PS|PG)$/.test(code)) return 'Pressure instrument';
    if (/^(FI|FT|FS|FM)$/.test(code)) return 'Flow instrument';
    if (/^(TI|TT|TS)$/.test(code)) return 'Temperature instrument';
    if (/^(PMP|P|PU)$/.test(code)) return 'Pump';
    return 'Other instrument';
  }

  function suggestPackages(input) {
    input = input || {};
    var w = Number(input.dieWidthMm || 0);
    var h = Number(input.dieHeightMm || 0);
    var io = Number(input.ioCount || 0);
    var power = Number(input.powerW || 0);
    var freq = Number(input.frequencyMhz || 0);
    var recs = [];
    if (yes(input.bareDieOk) || io <= 16) recs.push({ package: 'COB / bare die', reason: 'Useful for lab prototypes, sensors or board-level experiments when handling risk is acceptable.' });
    if (io <= 80 && power <= 2 && Math.max(w, h) <= 6) recs.push({ package: 'QFN', reason: 'Practical mature-node prototype package for moderate IO and compact die sizes.' });
    if (io <= 144 && power <= 3) recs.push({ package: 'LQFP', reason: 'Accessible leaded package when board assembly and inspection are priorities.' });
    if (io > 120 || power > 2.5 || freq > 500 || Math.max(w, h) > 6) recs.push({ package: 'BGA', reason: 'Consider for higher IO, larger die, higher power or higher-speed routing needs.' });
    if (io > 180 && Math.max(w, h) <= 8) recs.push({ package: 'WLCSP case-by-case', reason: 'Only if partner path, IO pitch, reliability and assembly constraints fit.' });
    if (!recs.length) recs.push({ package: 'Package recommendation needed', reason: 'Close die, IO, power, test and board constraints before selecting.' });
    return { recommendations: recs, boundary: 'This is not a package quote or partner availability confirmation. Packaging, wafer probe and test scope remain case-by-case.' };
  }

  function buildProcurementTimeline(input) {
    input = input || {};
    var finish = new Date(text(input.targetDate) + 'T00:00:00Z');
    if (Number.isNaN(finish.getTime())) finish = new Date(Date.UTC(2026, 0, 1));
    var cursor = finish;
    var planned = [];
    (input.steps || []).forEach(function (step) {
      var days = Math.max(0, Number(step.days || 0));
      var start = addDays(cursor, -days);
      var item = { name: text(step.name) || 'Step', days: days, start: toIsoDate(start), finish: toIsoDate(cursor) };
      cursor = start;
      planned.unshift(item);
    });
    return { targetDate: toIsoDate(finish), steps: planned };
  }

  function checkPidBomCompleteness(input) {
    var parsed = parseDelimited(input);
    var required = ['tag', 'mpn', 'manufacturer', 'size', 'material', 'connection'];
    var missingColumns = required.filter(function (col) { return parsed.headers.indexOf(col) < 0; });
    var rowIssues = [];
    parsed.rows.forEach(function (row) {
      var issues = required.filter(function (col) { return missingColumns.indexOf(col) < 0 && !present(row[col]); });
      if (issues.length) rowIssues.push({ tag: row.tag || 'row ' + (rowIssues.length + 1), issues: issues });
    });
    var possible = Math.max(1, parsed.rows.length * required.length);
    var missingValues = missingColumns.length * Math.max(1, parsed.rows.length) + rowIssues.reduce(function (sum, item) { return sum + item.issues.length; }, 0);
    var score = Math.max(0, Math.round((possible - missingValues) / possible * 100));
    return { headers: parsed.headers, rows: parsed.rows, missingColumns: missingColumns, rowIssues: rowIssues, score: score };
  }

  function buildUhpGasStickChecklist(input) {
    input = input || {};
    var gates = [
      ['gasService', 'gas service and hazard class'],
      ['material', 'wetted material / finish requirement'],
      ['connectionStandard', 'VCR / C-seal / W-seal / weld connection standard'],
      ['purgePath', 'purge and vent path'],
      ['serviceClearance', 'service clearance and maintainability rule'],
      ['leakTest', 'leak-test / pressure-test expectation'],
      ['flowDirection', 'flow direction and labeling'],
      ['mounting', 'mounting rail / surface-mount assumptions']
    ];
    var done = gates.filter(function (pair) { return yes(input[pair[0]]); }).length;
    var missing = gates.filter(function (pair) { return !yes(input[pair[0]]); }).map(function (pair) { return pair[1]; });
    var score = Math.round(done / gates.length * 100);
    var markdown = [
      '# UHP Gas Stick Rule Checklist',
      '',
      '- Score: ' + score + '/100',
      '',
      'This checklist organizes assumptions for pilot review; engineering review remains required before release, fabrication or procurement.',
      '',
      '## Missing / open rule areas',
      missing.length ? missing.map(function (item) { return '- ' + item; }).join('\n') : '- No first-pass rule areas missing.'
    ].join('\n');
    return { score: score, missing: missing, markdown: markdown };
  }

  function normalizeBomRfq(input) {
    var parsed = parseDelimited(input);
    var rows = parsed.rows.map(function (row) {
      return {
        mpn: row.mpn || '',
        manufacturer: row.manufacturer || '',
        quantity: row.quantity || '',
        description: row.description || '',
        drawing: row.drawing || '',
        alternateOk: row.alternate_ok || row.alternates || ''
      };
    });
    var rowIssues = [];
    rows.forEach(function (row, index) {
      var issues = [];
      ['mpn', 'manufacturer', 'quantity', 'description'].forEach(function (field) {
        if (!present(row[field])) issues.push(field);
      });
      if (issues.length) rowIssues.push({ row: index + 1, mpn: row.mpn, issues: issues });
    });
    var csvHeaders = ['mpn', 'manufacturer', 'quantity', 'description', 'drawing', 'alternateOk'];
    var csv = [csvHeaders.join(',')].concat(rows.map(function (row) {
      return csvHeaders.map(function (header) { return csvCell(row[header]); }).join(',');
    })).join('\n');
    return { headers: parsed.headers, rows: rows, rowIssues: rowIssues, csv: csv };
  }

  function csvCell(value) {
    var s = text(value);
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  }

  return {
    parseScheduleRows: parseScheduleRows,
    filterScheduleRows: filterScheduleRows,
    buildHandoffManifest: buildHandoffManifest,
    buildPdkChecklist: buildPdkChecklist,
    parsePidTags: parsePidTags,
    suggestPackages: suggestPackages,
    buildProcurementTimeline: buildProcurementTimeline,
    checkPidBomCompleteness: checkPidBomCompleteness,
    buildUhpGasStickChecklist: buildUhpGasStickChecklist,
    normalizeBomRfq: normalizeBomRfq
  };
});
