(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MSTToolAnalytics = factory(root);
    root.MSTToolAnalytics.init(root);
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  var GA_MEASUREMENT_ID = 'G-1N701965W1';

  function cleanPath(pathname) {
    var path = String(pathname || '/');
    try {
      path = new URL(path, 'https://mst-sg.com').pathname;
    } catch (err) {
      path = path.split('?')[0].split('#')[0] || '/';
    }
    return path || '/';
  }

  function toolSlugFromPath(pathname) {
    var path = cleanPath(pathname);
    var parts = path.split('/').filter(Boolean);
    if (parts[0] !== 'tools') return 'site';
    if (!parts[1] || parts[1] === 'index.html') return 'tools-directory';
    return parts[1];
  }

  function readAttr(el, name) {
    if (!el) return '';
    if (typeof el.getAttribute === 'function') return el.getAttribute(name) || '';
    return el[name] || '';
  }

  function classifyInteraction(el) {
    if (!el) return null;
    var id = readAttr(el, 'id');
    var href = readAttr(el, 'href');
    var tagName = String(el.tagName || '').toUpperCase();
    var text = String(el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);
    var dataDownload = readAttr(el, 'data-dl');
    var dataName = readAttr(el, 'data-name');

    var buttonEvents = {
      copyBtn: { eventName: 'tool_output_copy', category: 'output' },
      copyRfq: { eventName: 'tool_output_copy', category: 'output' },
      mdBtn: { eventName: 'tool_markdown_download', category: 'download' },
      jsonBtn: { eventName: 'tool_json_download', category: 'download' },
      csvBtn: { eventName: 'tool_csv_download', category: 'download' },
      dlRfq: { eventName: 'tool_summary_download', category: 'download' },
      shareBtn: { eventName: 'tool_share_click', category: 'engagement' },
    };
    if (id && buttonEvents[id]) {
      return {
        eventName: buttonEvents[id].eventName,
        category: buttonEvents[id].category,
        label: id,
        id: id,
      };
    }
    if (dataDownload) {
      return {
        eventName: 'tool_image_download',
        category: 'download',
        label: dataName || dataDownload,
        id: id || dataDownload,
      };
    }

    if (tagName === 'A' && href) {
      if (/^mailto:sales@mst-sg\.com/i.test(href)) {
        return { eventName: 'tool_email_click', category: 'conversion', label: 'sales@mst-sg.com', href: 'mailto:sales@mst-sg.com', id: id };
      }
      if (/^https:\/\/store\.mst-sg\.com\//i.test(href) || /^https:\/\/store\.mst-sg\.com$/i.test(href)) {
        return { eventName: 'tool_rfq_click', category: 'conversion', label: href, href: href, id: id };
      }
      if (/^https:\/\/github\.com\//i.test(href)) {
        return { eventName: 'tool_github_click', category: 'engagement', label: href, href: href, id: id };
      }
      if (/^(https:\/\/mst-sg\.com)?\/tools(\/|$)/i.test(href)) {
        return { eventName: 'tool_directory_click', category: 'navigation', label: href, href: href, id: id };
      }
      if (readAttr(el, 'download')) {
        return { eventName: 'tool_asset_download', category: 'download', label: href, href: href, id: id };
      }
    }

    if (id || text) {
      return null;
    }
    return null;
  }

  function buildEventPayload(interaction, pathname) {
    var payload = {
      event_category: interaction.category || 'engagement',
      event_label: interaction.label || interaction.href || interaction.id || '',
      page_path: cleanPath(pathname),
      tool_slug: toolSlugFromPath(pathname),
    };
    if (interaction.href) payload.link_url = interaction.href;
    if (interaction.id) payload.interaction_id = interaction.id;
    return payload;
  }

  function ensureGtag(win) {
    if (!win || !win.document) return null;
    win.dataLayer = win.dataLayer || [];
    if (typeof win.gtag !== 'function') {
      win.gtag = function () { win.dataLayer.push(arguments); };
      if (!win.document.querySelector('script[src*="googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID + '"]')) {
        var script = win.document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
        win.document.head.appendChild(script);
      }
    }
    if (!win.__mstToolAnalyticsConfigured) {
      win.gtag('js', new Date());
      win.gtag('config', GA_MEASUREMENT_ID, { page_path: cleanPath(win.location && win.location.pathname) });
      win.__mstToolAnalyticsConfigured = true;
    }
    return win.gtag;
  }

  function trackEvent(win, eventName, payload) {
    if (!win || typeof win.gtag !== 'function') return;
    win.gtag('event', eventName, payload);
  }

  function init(win) {
    win = win || (typeof window !== 'undefined' ? window : null);
    if (!win || !win.document || win.__mstToolAnalyticsActive) return;
    win.__mstToolAnalyticsActive = true;
    ensureGtag(win);

    var path = cleanPath(win.location && win.location.pathname);
    var slug = toolSlugFromPath(path);
    trackEvent(win, 'tool_view', buildEventPayload({
      category: 'engagement',
      label: slug,
    }, path));

    win.document.addEventListener('click', function (event) {
      var target = event.target && event.target.closest ? event.target.closest('a,button') : null;
      var interaction = classifyInteraction(target);
      if (!interaction) return;
      trackEvent(win, interaction.eventName, buildEventPayload(interaction, win.location && win.location.pathname));
    });
  }

  return {
    GA_MEASUREMENT_ID: GA_MEASUREMENT_ID,
    toolSlugFromPath: toolSlugFromPath,
    classifyInteraction: classifyInteraction,
    buildEventPayload: buildEventPayload,
    ensureGtag: ensureGtag,
    trackEvent: trackEvent,
    init: init,
  };
});
