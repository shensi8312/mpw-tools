(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MSTToolContact = factory();
    root.MSTToolContact.init(root);
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  var DEFAULT_RECIPIENT = 'sales@mst-sg.com';
  var MAX_HREF_LENGTH = 1900;
  var OUTPUT_LIMIT = 950;

  function cleanText(value) {
    return String(value || '').replace(/\s+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  function truncate(value, limit) {
    value = cleanText(value);
    if (value.length <= limit) return value;
    return value.slice(0, limit - 26).trim() + '\n\n[truncated for email]';
  }

  function slugFromUrl(url) {
    try {
      var path = new URL(url, 'https://mst-sg.com').pathname;
      var parts = path.split('/').filter(Boolean);
      return parts[0] === 'tools' && parts[1] ? parts[1] : 'tools';
    } catch (err) {
      return 'tools';
    }
  }

  function buildBody(options, limit) {
    var output = truncate(options.output || '', limit == null ? OUTPUT_LIMIT : limit);
    return [
      'Please review this non-confidential tool brief from MST Open Tools.',
      '',
      'Tool: ' + (options.title || options.slug || 'MST Open Tools'),
      'Page: ' + (options.pageUrl || ''),
      '',
      'Privacy boundary: Do not send GDS, RTL, netlists, schematics, masks, or confidential customer files by email.',
      '',
      'Brief:',
      output || '[No generated brief yet.]'
    ].join('\n');
  }

  function buildContactHref(options) {
    options = options || {};
    var recipient = options.recipient || DEFAULT_RECIPIENT;
    var pageUrl = options.pageUrl || '';
    var slug = options.slug || slugFromUrl(pageUrl);
    var subject = 'MST tool brief - ' + (options.title || slug);
    var outputLimit = OUTPUT_LIMIT;
    var body = buildBody(options, outputLimit);
    var href = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    while (href.length > MAX_HREF_LENGTH && outputLimit > 220) {
      outputLimit -= 120;
      body = buildBody(options, outputLimit);
      href = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    }
    return href;
  }

  function readOutput(doc, selector) {
    selector = selector || '#output,#generated,#summary';
    var node = doc.querySelector(selector);
    return node ? node.textContent : '';
  }

  function titleFromDocument(doc) {
    var h1 = doc.querySelector('h1');
    if (h1 && cleanText(h1.textContent)) return cleanText(h1.textContent).replace(/\s+/g, ' ');
    return cleanText(doc.title).replace(/\s+\|\s*MST$/, '');
  }

  function refresh(doc) {
    doc = doc || (typeof document !== 'undefined' ? document : null);
    if (!doc) return;
    Array.prototype.forEach.call(doc.querySelectorAll('[data-tool-contact]'), function (link) {
      var outputSelector = link.getAttribute('data-output') || '#output,#generated,#summary';
      link.setAttribute('href', buildContactHref({
        title: link.getAttribute('data-title') || titleFromDocument(doc),
        slug: slugFromUrl(doc.location ? doc.location.href : ''),
        pageUrl: doc.location ? doc.location.href : '',
        output: readOutput(doc, outputSelector)
      }));
    });
  }

  function init(win) {
    win = win || (typeof window !== 'undefined' ? window : null);
    if (!win || !win.document || win.__mstToolContactActive) return;
    win.__mstToolContactActive = true;
    var schedule = function () { win.setTimeout(function () { refresh(win.document); }, 0); };
    if (win.document.readyState === 'loading') {
      win.document.addEventListener('DOMContentLoaded', schedule);
    } else {
      schedule();
    }
    win.document.addEventListener('input', schedule, true);
    win.document.addEventListener('change', schedule, true);
  }

  return {
    DEFAULT_RECIPIENT: DEFAULT_RECIPIENT,
    buildContactHref: buildContactHref,
    refresh: refresh,
    init: init
  };
});
