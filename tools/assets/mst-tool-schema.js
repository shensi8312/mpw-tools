(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MSTToolSchema = factory();
    root.MSTToolSchema.init(root);
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  function cleanTitle(value) {
    return String(value || 'MST Open Tools').replace(/\s+\|\s*MST$/, '').trim();
  }

  function buildToolSchema(options) {
    options = options || {};
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: cleanTitle(options.title),
      description: options.description || 'Free browser tool from MST for engineering planning and non-confidential RFQ preparation.',
      url: options.url || 'https://mst-sg.com/tools/',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any modern browser',
      isAccessibleForFree: true,
      inLanguage: ['en', 'zh-CN'],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      provider: {
        '@type': 'Organization',
        name: 'Moore Solution Technology Pte. Ltd.',
        url: 'https://mst-sg.com/'
      }
    };
  }

  function pageDescription(doc) {
    var meta = doc.querySelector('meta[name="description"]');
    return meta ? meta.getAttribute('content') || '' : '';
  }

  function inject(doc) {
    doc = doc || (typeof document !== 'undefined' ? document : null);
    if (!doc || doc.querySelector('script[data-mst-tool-schema]')) return;
    var script = doc.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-mst-tool-schema', 'software-application');
    script.textContent = JSON.stringify(buildToolSchema({
      title: doc.title,
      description: pageDescription(doc),
      url: doc.location ? doc.location.href : 'https://mst-sg.com/tools/'
    }));
    doc.head.appendChild(script);
  }

  function init(win) {
    win = win || (typeof window !== 'undefined' ? window : null);
    if (!win || !win.document || win.__mstToolSchemaActive) return;
    win.__mstToolSchemaActive = true;
    if (win.document.readyState === 'loading') {
      win.document.addEventListener('DOMContentLoaded', function () { inject(win.document); });
    } else {
      inject(win.document);
    }
  }

  return {
    buildToolSchema: buildToolSchema,
    inject: inject,
    init: init
  };
});
