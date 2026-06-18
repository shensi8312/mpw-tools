(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MSTMPWReadiness = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  var FIELDS = [
    ['requesterType', 'requester type'],
    ['country', 'company country'],
    ['endUse', 'end-use category'],
    ['node', 'target node'],
    ['processFamily', 'process family'],
    ['dieArea', 'die area estimate'],
    ['sampleQuantity', 'sample quantity'],
    ['designStage', 'design stage'],
    ['pdkStatus', 'PDK access status'],
    ['drcLvsStatus', 'DRC/LVS status'],
    ['handoffFormat', 'handoff format'],
    ['packagePlan', 'package and test assumption'],
    ['testPlan', 'probe or packaged-test plan'],
    ['timeline', 'target timeline']
  ];

  var CHECKS = [
    ['ndaPlan', 'NDA / partner-confirmed design-detail path'],
    ['complianceContext', 'country and end-use context'],
    ['noDesignIpAtIntake', 'no design IP at first intake']
  ];

  var CONFIDENTIAL_PATTERNS = [
    [/(\bRTL\b|register-transfer)/i, 'RTL should wait until NDA and partner-confirmed review.'],
    [/schematic/i, 'schematic detail should not be pasted into a public browser tool.'],
    [/netlist/i, 'netlist detail should wait until NDA and partner-confirmed review.'],
    [/\bSPICE\b/i, 'SPICE model or circuit detail should not be pasted here.'],
    [/\bGDS\b|\bOASIS\b/i, 'GDS/OASIS layout files and metadata should not be uploaded or pasted at first intake.'],
    [/mask layer|mask data|layout coordinate/i, 'mask and layout-specific detail should wait for the formal handoff path.'],
    [/customer secret|proprietary|confidential/i, 'confidential customer or project detail should be removed from this public tool.']
  ];

  function text(value) {
    return value == null ? '' : String(value).trim();
  }

  function present(value) {
    return text(value).length > 0;
  }

  function yes(value) {
    return value === true || value === 'true' || value === 'yes' || value === 'on';
  }

  function detectConfidentialSignals(value) {
    var source = text(value);
    if (!source) return [];
    return CONFIDENTIAL_PATTERNS
      .filter(function (pair) { return pair[0].test(source); })
      .map(function (pair) { return pair[1]; });
  }

  function advancedNodeCautions(input) {
    var node = text(input.node).toLowerCase();
    if (!node) return [];
    if (/28|22|16|14|12|10|7|5|3/.test(node)) {
      return ['Advanced-node or finer-node MPW access is case-by-case and must stay partner-confirmed.'];
    }
    return [];
  }

  function bandFor(score) {
    if (score >= 85) return 'RFQ-ready first screen';
    if (score >= 60) return 'Usable with gaps';
    return 'Needs basics';
  }

  function missingItems(input) {
    var missing = [];
    FIELDS.forEach(function (pair) {
      if (!present(input[pair[0]])) missing.push(pair[1]);
    });
    CHECKS.forEach(function (pair) {
      if (!yes(input[pair[0]])) missing.push(pair[1]);
    });
    return missing;
  }

  function scoreReadiness(input) {
    input = input || {};
    var total = FIELDS.length + CHECKS.length;
    var done = 0;

    FIELDS.forEach(function (pair) {
      if (present(input[pair[0]])) done += 1;
    });
    CHECKS.forEach(function (pair) {
      if (yes(input[pair[0]])) done += 1;
    });

    var score = Math.round((done / total) * 100);
    var missing = missingItems(input);
    var confidentialWarnings = detectConfidentialSignals([
      input.notes,
      input.endUse,
      input.handoffFormat
    ].map(text).join('\n'));
    var cautions = advancedNodeCautions(input);
    var nextSteps = [];

    if (confidentialWarnings.length) {
      nextSteps.push('Remove confidential design detail before sharing this first-screen brief.');
    }
    missing.slice(0, 6).forEach(function (item) {
      nextSteps.push('Add ' + item + '.');
    });
    if (!nextSteps.length) {
      nextSteps.push('Use this as a non-confidential first-screen RFQ brief.');
      nextSteps.push('Confirm NDA, PDK access, process option, package/test scope and schedule with the partner path.');
    }

    return {
      score: score,
      band: bandFor(score),
      missing: missing,
      confidentialWarnings: confidentialWarnings,
      cautions: cautions,
      nextSteps: nextSteps
    };
  }

  function line(label, value) {
    return '- ' + label + ': ' + (present(value) ? text(value) : 'TBD');
  }

  function yn(label, value) {
    return '- ' + label + ': ' + (yes(value) ? 'yes' : 'TBD');
  }

  function buildReadinessReport(input) {
    input = input || {};
    var result = scoreReadiness(input);
    var missing = result.missing.length
      ? result.missing.map(function (item) { return '- ' + item; }).join('\n')
      : '- No major first-screen fields missing.';
    var warnings = result.confidentialWarnings.length
      ? result.confidentialWarnings.map(function (item) { return '- ' + item; }).join('\n')
      : '- No obvious confidential-content warning from the public notes field.';
    var cautions = result.cautions.length
      ? result.cautions.map(function (item) { return '- ' + item; }).join('\n')
      : '- Mature-node MPW requests still require partner-confirmed process, schedule and commercial review.';

    return [
      '# MPW Tapeout Readiness Brief',
      '',
      'Generated locally in the MST MPW Tapeout Readiness Checker.',
      '',
      'Boundary: this is not a quote, not a wafer-slot confirmation, and not a PDK or schedule commitment. All process, pricing, PDK, package, test and shuttle details remain partner-confirmed.',
      '',
      'Privacy boundary: No GDS, netlist, RTL, schematics, masks or confidential design IP should be shared at first intake.',
      '',
      '## Readiness result',
      '- Score: ' + result.score + '/100',
      '- Band: ' + result.band,
      '',
      '## Project context',
      line('Requester type', input.requesterType),
      line('Company country', input.country),
      line('End-use category', input.endUse),
      line('Target node', input.node),
      line('Process family', input.processFamily),
      line('Design stage', input.designStage),
      '',
      '## Technical readiness',
      line('Die area estimate', input.dieArea),
      line('Sample quantity', input.sampleQuantity),
      line('PDK access status', input.pdkStatus),
      line('DRC/LVS status', input.drcLvsStatus),
      line('Handoff format', input.handoffFormat),
      line('Package plan', input.packagePlan),
      line('Probe / packaged-test plan', input.testPlan),
      line('Target timeline', input.timeline),
      '',
      '## Intake gates',
      yn('NDA path expected before design-detail exchange', input.ndaPlan),
      yn('Country/end-use context available for screening', input.complianceContext),
      yn('No design IP at first intake', input.noDesignIpAtIntake),
      '',
      '## Missing or open items',
      missing,
      '',
      '## Confidential-content reminders',
      warnings,
      '',
      '## Case-by-case cautions',
      cautions,
      '',
      '## Suggested next steps',
      result.nextSteps.map(function (item) { return '- ' + item; }).join('\n'),
      '',
      '## Non-confidential notes',
      text(input.notes) || 'TBD'
    ].join('\n');
  }

  return {
    scoreReadiness: scoreReadiness,
    buildReadinessReport: buildReadinessReport,
    detectConfidentialSignals: detectConfidentialSignals
  };
});
