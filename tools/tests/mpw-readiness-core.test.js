const test = require('node:test');
const assert = require('node:assert/strict');

const {
  scoreReadiness,
  buildReadinessReport,
  detectConfidentialSignals,
} = require('../assets/mpw-readiness-core.js');

test('empty MPW readiness input produces a low score and actionable missing fields', () => {
  const result = scoreReadiness({});

  assert.equal(result.score, 0);
  assert.equal(result.band, 'Needs basics');
  assert.ok(result.missing.includes('target node'));
  assert.ok(result.missing.includes('process family'));
  assert.ok(result.missing.includes('DRC/LVS status'));
  assert.ok(result.missing.includes('package and test assumption'));
  assert.ok(result.nextSteps.length >= 4);
});

test('complete first-screen MPW readiness input is high scoring without claiming a quote', () => {
  const input = {
    requesterType: 'Fabless startup',
    country: 'Singapore',
    endUse: 'industrial sensor prototype',
    node: '180nm',
    processFamily: 'analog mixed-signal CMOS',
    dieArea: '4 mm2',
    sampleQuantity: '25 packaged samples',
    designStage: 'DRC/LVS cleanup',
    pdkStatus: 'PDK access requested',
    drcLvsStatus: 'DRC clean, LVS cleanup in progress',
    handoffFormat: 'GDS/OASIS after NDA only',
    packagePlan: 'QFN likely, recommendation needed',
    testPlan: 'wafer probe and basic packaged test needed',
    timeline: 'Q4 2026 shuttle target',
    ndaPlan: true,
    complianceContext: true,
    noDesignIpAtIntake: true,
  };

  const result = scoreReadiness(input);
  const report = buildReadinessReport(input);

  assert.ok(result.score >= 85);
  assert.equal(result.band, 'RFQ-ready first screen');
  assert.deepEqual(result.missing, []);
  assert.match(report, /not a quote/i);
  assert.match(report, /No GDS, netlist, RTL, schematics, masks or confidential design IP/i);
  assert.match(report, /partner-confirmed/i);
});

test('confidential design signals are detected and carried into the readiness result', () => {
  const notes = 'We can paste RTL, schematic snippets, SPICE netlist and mask layer details here.';
  const warnings = detectConfidentialSignals(notes);
  const result = scoreReadiness({ notes });

  assert.ok(warnings.some((item) => item.includes('RTL')));
  assert.ok(warnings.some((item) => item.includes('schematic')));
  assert.ok(warnings.some((item) => item.includes('netlist')));
  assert.ok(result.confidentialWarnings.length >= 3);
  assert.ok(result.nextSteps.some((item) => /remove confidential/i.test(item)));
});

test('advanced-node requests are marked case-by-case without hard availability claims', () => {
  const input = {
    requesterType: 'Industrial chip team',
    country: 'India',
    endUse: 'mixed-signal prototype',
    node: '28nm',
    processFamily: 'logic CMOS',
    dieArea: '9 mm2',
    sampleQuantity: '40 bare dies',
    designStage: 'layout in progress',
    pdkStatus: 'PDK under NDA discussion',
    drcLvsStatus: 'DRC/LVS not clean yet',
    handoffFormat: 'handoff after NDA',
    packagePlan: 'bare die acceptable',
    testPlan: 'customer handles test',
    timeline: 'next available shuttle',
    ndaPlan: true,
    complianceContext: true,
    noDesignIpAtIntake: true,
  };

  const result = scoreReadiness(input);
  const report = buildReadinessReport(input);

  assert.ok(result.cautions.some((item) => /case-by-case/i.test(item)));
  assert.match(report, /case-by-case/i);
  assert.doesNotMatch(report, /guaranteed/i);
  assert.doesNotMatch(report, /available capacity/i);
});
