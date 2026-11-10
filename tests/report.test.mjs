// The print preview's file (node --test tests/): Print then one primary
// Download at the foot, carino-pdf.js loaded, the file's stylesheets written
// in (rpSheetText), and every string the switch and Download use in es,
// pt-BR, ja and ru.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const ROOT = new URL('..', import.meta.url);
const read = (rel) => readFileSync(new URL(rel, ROOT), 'utf8');
const html = read('index.html');
const app = read('app.js');

test('markup: Print then one primary Download at the foot, name above it', () => {
  const at = html.indexOf('<aside class="rpv-side">');
  const side = html.slice(at, html.indexOf('</aside>', at));
  const foot = side.slice(side.indexOf('<div class="rpv-actions">'));
  const buttons = [...foot.matchAll(/<button\b[^>]*>/g)].map((m) => m[0]);
  assert.equal(buttons.length, 2);
  assert.match(buttons[0], /class="btn" id="rpPrint"/);
  assert.match(buttons[1], /class="btn btn-primary" id="rpDownload" disabled/);
  assert.ok(side.indexOf('id="rpStatus"') < side.indexOf('id="rpName"'));
  assert.ok(side.indexOf('id="rpName"') < side.indexOf('rpv-actions'));
  assert.match(html, /<script src="carino-pdf\.js" defer><\/script>/);
});

test('index.html: html2canvas measures baselines with its 1x1 picture inline, not tailwind\'s block', () => {
  // Without it every PDF line is drawn about half an em low and the last line of a page is cut.
  assert.match(html, /img\[src\^="data:image\/gif;base64,R0lGODlhAQABAIAAAAAAAP"\] \{ display: inline !important; \}/);
});

test('app.js: the switch goes in above the name; Download saves the file document', () => {
  assert.match(app, /formatSwitch\(\{ onChange: rpLabelFile \}\)/);
  assert.match(app, /insertBefore\(rp\.format\.el, name\)/);
  assert.match(app, /CarinoPdf\.download\(\{ html: rp\.file,/);
  assert.match(app, /wire\('rpDownload', rpDownload\)/);
  assert.match(app, /rpStatus\(tr\("Creating the PDF…"\)\)/);
  assert.match(app, /"Could not create the PDF\."/);
});

test('rpSheetText: rules as text, url()s made absolute, unreadable sheets give null', () => {
  const src = app.match(/const rpSheetText = sheet => \{[\s\S]*?\n\};/);
  assert.ok(src, 'rpSheetText found');
  const ctx = vm.createContext({ URL });
  vm.runInContext(src[0] + ';this.f = rpSheetText;', ctx);
  const sheet = {
    href: 'https://vitae.carino.systems/fonts/carino-fonts.css',
    cssRules: [
      { cssText: '@font-face { font-family: "IBM Plex Sans"; src: url("plex.woff2") format("woff2"); }' },
      { cssText: '.a { background: url(data:image/png;base64,AA); }' },
      { cssText: '.b { background: url(\'../logo.svg\'); }' },
      { cssText: '@media print { .no-print { display: none; } }' },
    ],
  };
  const out = ctx.f(sheet);
  assert.match(out, /url\("https:\/\/vitae\.carino\.systems\/fonts\/plex\.woff2"\)/);
  assert.match(out, /url\(data:image\/png;base64,AA\)/);
  assert.match(out, /url\("https:\/\/vitae\.carino\.systems\/logo\.svg"\)/);
  assert.match(out, /@media print \{ \.no-print/);
  assert.equal(ctx.f({ href: 'x', get cssRules() { throw new Error('SecurityError'); } }), null);
  assert.equal(ctx.f({ href: null, cssRules: [] }), null, 'an inline <style> is not a linked sheet');
});

test('i18n: every report-file string in es, pt-BR, ja and ru', () => {
  const src = read('i18n.js');
  const block = src.slice(src.indexOf('const I18N = {'), src.indexOf('\n};\n', src.indexOf('const I18N = {')) + 3);
  const ctx = vm.createContext({});
  vm.runInContext(block + ';this.I = I18N;', ctx);
  const keys = ['File', 'PDF', 'HTML', 'Download PDF', 'Download HTML', 'Creating the PDF…',
    'Could not create the PDF.', 'Could not create the HTML file.', 'Print'];
  for (const loc of ['es', 'pt-BR', 'ja', 'ru'])
    for (const k of keys) assert.ok(ctx.I[loc][k], loc + ': ' + k);
  assert.equal(ctx.I.ja.PDF, 'PDF');
  assert.equal(ctx.I.ru.HTML, 'HTML');
});
