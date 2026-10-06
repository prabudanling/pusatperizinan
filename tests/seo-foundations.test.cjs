const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

// Load the actual TS/TSX source, including Next's @/ alias, without a server.
const root = path.resolve(__dirname, '..');
const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (name, ...rest) {
  return resolveFilename.call(this, name.startsWith('@/') ? path.join(root, 'src', name.slice(2)) : name, ...rest);
};
for (const ext of ['.ts', '.tsx']) {
  require.extensions[ext] = (module, filename) => {
    const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
      fileName: filename,
    });
    module._compile(compiled.outputText, filename);
  };
}
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { SeoJsonLd, HomeJsonLd } = require('../src/components/landing/seo-jsonld.tsx');
const { classifyPage } = require('../src/lib/seo-policy.ts');
const { getAnyPage, ALL_SERVICE_PAGES } = require('../src/lib/catalog/index.ts');
const sitemap = require('../src/app/sitemap.ts').default;
const { BLOG_ARTICLES } = require('../src/lib/blog-content.ts');
const { SITE_URL } = require('../src/lib/site.ts');
const { FAQS } = require('../src/lib/landing-data.ts');

function schema(Component) {
  const html = renderToStaticMarkup(React.createElement(Component));
  return JSON.parse(html.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1]);
}

test('site-wide schema contains identity only, without homepage content or self ratings', () => {
  const data = schema(SeoJsonLd);
  assert.deepEqual(data['@graph'].map(x => x['@type']), ['Organization', 'WebSite']);
  assert.equal(JSON.stringify(data).includes('aggregateRating'), false);
  assert.equal(data['@graph'][1].publisher['@id'], data['@graph'][0]['@id']);
});
test('homepage FAQ schema matches the visible FAQ data', () => {
  const data = schema(HomeJsonLd);
  assert.equal(data['@type'], 'FAQPage');
  assert.deepEqual(data.mainEntity.map(x => [x.name, x.acceptedAnswer.text]), FAQS.map(x => [x.q, x.a]));
});
test('quality classifier accepts real catalog paragraph arrays and excludes empty pages', () => {
  assert.deepEqual(classifyPage({slug:'x',kind:'base',intro:'intro',longDesc:['first','second']}), classifyPage({slug:'x',kind:'base',intro:'intro',longDesc:'first second'}));
  assert.equal(classifyPage({slug:'empty',kind:'base'}).index, false);
});
test('sitemap has unique canonical URLs and only actual editorial lastmod dates', () => {
  const entries = sitemap();
  assert.equal(new Set(entries.map(x=>x.url)).size, entries.length);
  const dates = new Map(BLOG_ARTICLES.map(a=>[`${SITE_URL}/blog/${a.slug}`, new Date(a.updatedAt).toISOString()]));
  for (const entry of entries) {
    assert.ok(entry.url.startsWith(`${SITE_URL}/`));
    if (entry.lastModified) assert.equal(new Date(entry.lastModified).toISOString(), dates.get(entry.url));
  }
  for (const page of ALL_SERVICE_PAGES) {
    assert.equal(entries.some(e=>e.url===`${SITE_URL}/layanan/${page.slug}`), classifyPage(page).index);
  }
});
test('every service shortcut resolves to a real service', () => {
  const {ServiceShortcuts} = require('../src/components/landing/service-shortcuts.tsx');
  const html = renderToStaticMarkup(React.createElement(ServiceShortcuts));
  for (const match of html.matchAll(/href="\/layanan\/([^"]+)"/g)) assert.ok(getAnyPage(match[1]), match[1]);
  assert.ok(html.includes('/kontak'));
});
test('hero content is visible in the server-rendered HTML before JavaScript', () => {
  const {Hero} = require('../src/components/landing/hero.tsx');
  const {LanguageProvider} = require('../src/lib/i18n/language-provider.tsx');
  const html = renderToStaticMarkup(React.createElement(LanguageProvider, null, React.createElement(Hero)));
  assert.ok(html.includes('<h1'));
  assert.equal(html.includes('opacity:0'), false);
  assert.match(html, /autocomplete="tel"/i);
});
