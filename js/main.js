document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Mark the current page in the nav.
  var here = location.pathname.replace(/\/index\.html$/, '/').replace(/index\.html$/, '');
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var target = a.getAttribute('href');
    if (!target) return;
    var resolved = new URL(target, location.href).pathname;
    if (resolved === here || (resolved.endsWith('/') && here.endsWith(resolved))) {
      a.setAttribute('aria-current', 'page');
    }
  });
});

// index.js or main.js

// other import statements...
import { HoneycombWebSDK } from '@honeycombio/opentelemetry-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';

const configDefaults = {
  ignoreNetworkEvents: true,
  // propagateTraceHeaderCorsUrls: [
  // /.+/g, // Regex to match your backend URLs. Update to the domains you wish to include.
  // ]
}

const sdk = new HoneycombWebSDK({
  // endpoint: "https://api.eu1.honeycomb.io/v1/traces", // Send to EU instance of Honeycomb. Defaults to sending to US instance.
  debug: true, // Set to false for production environment.
  apiKey: 'zgf7QT52jBmjC2r4oJqhIG', // Replace with your Honeycomb Ingest API Key.
  serviceName: 'preuninger-net', // Replace with your application name. Honeycomb uses this string to find your dataset when we receive your data. When no matching dataset exists, we create a new one with this name if your API Key has the appropriate permissions.
  instrumentations: [getWebAutoInstrumentations({
    // Loads custom configuration for xml-http-request instrumentation.
    '@opentelemetry/instrumentation-xml-http-request': configDefaults,
    '@opentelemetry/instrumentation-fetch': configDefaults,
    '@opentelemetry/instrumentation-document-load': configDefaults,
  })],
});
sdk.start();

// Application instantiation code