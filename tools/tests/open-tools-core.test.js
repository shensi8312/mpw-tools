const test = require('node:test');
const assert = require('node:assert/strict');

const {
  parseScheduleRows,
  filterScheduleRows,
  buildHandoffManifest,
  buildPdkChecklist,
  parsePidTags,
  suggestPackages,
  buildProcurementTimeline,
  checkPidBomCompleteness,
  buildUhpGasStickChecklist,
  normalizeBomRfq,
} = require('../assets/open-tools-core.js');

test('schedule finder parses user-supplied dated rows and filters without availability claims', () => {
  const rows = parseScheduleRows(`Route,Region,Node,Date,Source
MOSIS,US,180nm,2026-09-01,public page checked 2026-06-18
Partner route,Asia,BCD 180nm,2026-10-15,user supplied`);
  const filtered = filterScheduleRows(rows, { node: '180', region: 'Asia' });

  assert.equal(rows.length, 2);
  assert.equal(filtered.matches.length, 1);
  assert.match(filtered.matches[0].node, /BCD/);
  assert.match(filtered.boundary, /not a confirmed shuttle/i);
  assert.match(filtered.boundary, /verify/i);
});

test('handoff manifest keeps file-level metadata and flags missing checksums', () => {
  const manifest = buildHandoffManifest({
    project: 'Sensor MPW',
    topCell: 'TOP_SENSOR',
    files: [
      { name: 'sensor.gds', role: 'layout', sha256: 'a'.repeat(64) },
      { name: 'layers.map', role: 'layer map' },
    ],
  });

  assert.equal(manifest.project, 'Sensor MPW');
  assert.equal(manifest.files.length, 2);
  assert.ok(manifest.missing.includes('checksum for layers.map'));
  assert.match(manifest.markdown, /No confidential design detail belongs in a public manifest/i);
});

test('PDK checklist includes signoff artifacts and scores missing gates', () => {
  const result = buildPdkChecklist({
    node: '180nm',
    processFamily: 'analog mixed-signal CMOS',
    hasNda: true,
    hasDrcDeck: true,
    hasLvsDeck: false,
    hasModels: false,
  });

  assert.ok(result.required.some((item) => /DRC deck/i.test(item)));
  assert.ok(result.required.some((item) => /LVS deck/i.test(item)));
  assert.ok(result.missing.some((item) => /LVS/i.test(item)));
  assert.ok(result.score < 100);
  assert.match(result.markdown, /partner-confirmed/i);
});

test('P&ID tag parser classifies common instrument and gas-panel tags', () => {
  const parsed = parsePidTags(`MFC-101 N2 mass flow controller
VLV-201 purge valve
PI-301 pressure indicator
PT-302 pressure transmitter`);

  assert.equal(parsed.tags.length, 4);
  assert.equal(parsed.tags[0].family, 'Mass flow controller');
  assert.equal(parsed.tags[1].family, 'Valve');
  assert.equal(parsed.tags[2].loop, '301');
  assert.ok(parsed.summary.families['Pressure instrument'] >= 2);
});

test('package selector suggests practical options without confirming partner availability', () => {
  const lowIo = suggestPackages({ dieWidthMm: 2, dieHeightMm: 2, ioCount: 40, powerW: 0.8, frequencyMhz: 20, samples: 25 });
  const highIo = suggestPackages({ dieWidthMm: 7, dieHeightMm: 7, ioCount: 220, powerW: 3, frequencyMhz: 800, samples: 100 });

  assert.equal(lowIo.recommendations[0].package, 'QFN');
  assert.ok(highIo.recommendations.some((item) => item.package === 'BGA'));
  assert.match(highIo.boundary, /not a package quote/i);
});

test('procurement timeline planner works backwards from target date', () => {
  const result = buildProcurementTimeline({
    targetDate: '2026-12-15',
    steps: [
      { name: 'Package/test decision', days: 14 },
      { name: 'Partner RFQ review', days: 21 },
      { name: 'Internal approval', days: 7 },
    ],
  });

  assert.equal(result.steps[0].name, 'Internal approval');
  assert.equal(result.steps[0].start, '2026-11-03');
  assert.equal(result.steps.at(-1).finish, '2026-12-15');
});

test('P&ID BOM completeness checker flags missing engineering columns and values', () => {
  const result = checkPidBomCompleteness(`Tag,MPN,Size,Material,Connection
VLV-101,ALD-1,1/4in,316L,VCR
MFC-201,,1/4in,,VCR`);

  assert.equal(result.rows.length, 2);
  assert.ok(result.missingColumns.includes('manufacturer'));
  assert.ok(result.rowIssues.some((issue) => issue.tag === 'MFC-201' && issue.issues.includes('mpn')));
  assert.ok(result.score < 100);
});

test('UHP gas stick checklist scores selected assumptions and returns missing rule areas', () => {
  const result = buildUhpGasStickChecklist({
    gasService: true,
    material: true,
    connectionStandard: true,
    purgePath: false,
    serviceClearance: false,
    leakTest: true,
  });

  assert.ok(result.score > 0);
  assert.ok(result.missing.some((item) => /purge/i.test(item)));
  assert.ok(result.missing.some((item) => /service/i.test(item)));
  assert.match(result.markdown, /engineering review remains required/i);
});

test('BOM RFQ normalizer maps common headers and emits quote-ready CSV', () => {
  const result = normalizeBomRfq(`Part Number,Manufacturer,Qty,Description,Drawing
ABC-1,Swagelok,10,VCR fitting,DRW-1.pdf
XYZ-2,,5,Valve,`);

  assert.equal(result.rows.length, 2);
  assert.equal(result.rows[0].mpn, 'ABC-1');
  assert.ok(result.rowIssues.some((issue) => issue.row === 2 && issue.issues.includes('manufacturer')));
  assert.match(result.csv, /mpn,manufacturer,quantity,description,drawing/);
});
