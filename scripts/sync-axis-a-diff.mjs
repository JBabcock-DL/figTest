#!/usr/bin/env node
/**
 * One-off Axis A diff: tokens.css vs Figma flat map (stdin JSON).
 * Usage: node scripts/sync-axis-a-diff.mjs < figma-flat.json
 */
import fs from 'node:fs';
import path from 'node:path';

const tokensPath = path.resolve('src/styles/tokens.css');
const figmaPath = process.argv[2] ? path.resolve(process.argv[2]) : null;
const figmaFlat = figmaPath
  ? JSON.parse(fs.readFileSync(figmaPath, 'utf8'))
  : JSON.parse(fs.readFileSync(0, 'utf8'));

const SKIP_LEGACY = new Set([
  'background', 'on-background', 'foreground', 'background-inverse', 'foreground-inverse',
  'surface-raised', 'surface-overlay', 'border', 'border-subtle', 'primary', 'on-primary',
  'primary-container', 'on-primary-container', 'primary-foreground', 'primary-subtle',
  'on-primary-subtle', 'secondary', 'on-secondary', 'secondary-container', 'on-secondary-container',
  'secondary-foreground', 'secondary-subtle', 'on-secondary-subtle', 'tertiary', 'on-tertiary',
  'tertiary-container', 'on-tertiary-container', 'accent', 'accent-foreground', 'error',
  'on-error', 'error-container', 'on-error-container', 'destructive', 'destructive-foreground',
  'error-subtle', 'on-error-subtle', 'input', 'ring', 'sidebar', 'sidebar-foreground',
  'card', 'card-foreground', 'popover', 'popover-foreground', 'muted', 'muted-foreground',
]);

const THEME_MAP = {
  'color-background-dim': 'color/background/dim',
  'color-background': 'color/background/default',
  'color-background-bright': 'color/background/bright',
  'color-background-container-lowest': 'color/background/container-lowest',
  'color-background-container-low': 'color/background/container-low',
  'color-background-container': 'color/background/container',
  'color-background-container-high': 'color/background/container-high',
  'color-background-container-highest': 'color/background/container-highest',
  'color-background-variant': 'color/background/variant',
  'color-content': 'color/background/content',
  'color-content-muted': 'color/background/content-muted',
  'color-border': 'color/border/default',
  'color-border-subtle': 'color/border/subtle',
  'color-inverse-surface': 'color/background/inverse',
  'color-inverse-content': 'color/background/inverse-content',
  'color-inverse-brand': 'color/background/inverse-primary',
  'color-scrim': 'color/background/scrim',
  'color-shadow-tint': 'color/background/shadow',
  'color-primary': 'color/primary/default',
  'color-on-primary': 'color/primary/content',
  'color-primary-subtle': 'color/primary/subtle',
  'color-on-primary-subtle': 'color/primary/on-subtle',
  'color-primary-fixed': 'color/primary/fixed',
  'color-primary-fixed-dim': 'color/primary/fixed-dim',
  'color-on-primary-fixed': 'color/primary/on-fixed',
  'color-on-primary-fixed-muted': 'color/primary/on-fixed-variant',
  'color-secondary': 'color/secondary/default',
  'color-on-secondary': 'color/secondary/content',
  'color-secondary-subtle': 'color/secondary/subtle',
  'color-on-secondary-subtle': 'color/secondary/on-subtle',
  'color-secondary-fixed': 'color/secondary/fixed',
  'color-secondary-fixed-dim': 'color/secondary/fixed-dim',
  'color-on-secondary-fixed': 'color/secondary/on-fixed',
  'color-on-secondary-fixed-muted': 'color/secondary/on-fixed-variant',
  'color-accent': 'color/tertiary/default',
  'color-on-accent': 'color/tertiary/content',
  'color-accent-subtle': 'color/tertiary/subtle',
  'color-on-accent-subtle': 'color/tertiary/on-subtle',
  'color-accent-fixed': 'color/tertiary/fixed',
  'color-accent-fixed-dim': 'color/tertiary/fixed-dim',
  'color-on-accent-fixed': 'color/tertiary/on-fixed',
  'color-on-accent-fixed-muted': 'color/tertiary/on-fixed-variant',
  'color-danger': 'color/error/default',
  'color-on-danger': 'color/error/content',
  'color-danger-subtle': 'color/error/subtle',
  'color-on-danger-subtle': 'color/error/on-subtle',
  'color-danger-fixed': 'color/error/fixed',
  'color-danger-fixed-dim': 'color/error/fixed-dim',
  'color-on-danger-fixed': 'color/error/on-fixed',
  'color-on-danger-fixed-muted': 'color/error/on-fixed-variant',
  'color-field': 'color/component/input',
  'color-focus-ring': 'color/component/ring',
  'color-sidebar': 'color/component/sidebar',
  'color-on-sidebar': 'color/component/sidebar-content',
};

function normHex(v) {
  if (!v) return v;
  const s = String(v).trim().toLowerCase();
  if (s.startsWith('rgba')) return s.replace(/\s+/g, '');
  if (s.startsWith('#') && s.length === 9) return s; // #rrggbbaa
  if (s.startsWith('#') && s.length === 7) return s;
  return s;
}

function parseCss() {
  const css = fs.readFileSync(tokensPath, 'utf8');
  const code = {};
  const blocks = [...css.matchAll(/:root[^{]*\{([^}]*)\}/gs), ...css.matchAll(/\[data-theme="dark"\][^{]*\{([^}]*)\}/gs)];
  let mode = 'light';
  for (const m of css.matchAll(/(:root,\s*\[data-theme="light"\]|\[data-theme="dark"\]|:root)\s*\{/g)) {
    // simplified: parse by section comments
  }
  const lightBlock = css.match(/:root,\s*\[data-theme="light"\]\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
  const darkBlock = css.match(/\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
  const rootBlock = css.match(/\/\* ─── Primitives[\s\S]*?:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';

  function parseBlock(block, prefix) {
    const out = {};
    for (const line of block.split('\n')) {
      const mm = line.match(/^\s*--([a-z0-9-]+):\s*(.+?);/i);
      if (!mm) continue;
      const name = mm[1];
      if (SKIP_LEGACY.has(name)) continue;
      let val = mm[2].trim();
      out[`${prefix}${name}`] = val;
    }
    return out;
  }

  const primitives = parseBlock(rootBlock, '');
  const light = parseBlock(lightBlock, 'light:');
  const dark = parseBlock(darkBlock, 'dark:');
  return { primitives, light, dark };
}

function resolveVar(val, primitives, depth = 0) {
  if (depth > 12) return val;
  const m = String(val).match(/^var\(--([a-z0-9-]+)\)$/i);
  if (!m) return val;
  const key = m[1];
  if (primitives[key] !== undefined) return resolveVar(primitives[key], primitives, depth + 1);
  return val;
}

function cssToFigmaKeys(name, mode) {
  if (name.startsWith('color-')) {
    const path = THEME_MAP[name];
    if (path) return `theme/${mode}/${path}`;
  }
  if (name.match(/^color-[a-z]+-\d+$/)) {
    const parts = name.replace(/^color-/, '').split('-');
    const stop = parts.pop();
    const ramp = parts.join('-');
    return `primitives/color/${ramp}/${stop}`;
  }
  if (name.startsWith('space-')) return `primitives/Space/${name.replace('space-', '').replace(/^0+/, '') || '0'}`.replace(/space-/, '');
  if (name.startsWith('corner-')) {
    const map = { none: 'None', 'extra-small': 'Extra-small', small: 'Small', medium: 'Medium', large: 'Large', 'extra-large': 'Extra-large', full: 'Full' };
    const k = name.replace('corner-', '');
    return `primitives/Corner/${map[k] ?? k}`;
  }
  if (name.startsWith('elevation-')) return `primitives/elevation/${name.replace('elevation-', '')}`;
  if (name === 'typeface-display') return 'primitives/typeface/display';
  if (name === 'typeface-body') return 'primitives/typeface/body';
  return null;
}

const { primitives, light, dark } = parseCss();
const primFlat = {};
for (const [k, v] of Object.entries(primitives)) {
  const resolved = resolveVar(v, primitives);
  let figKey = cssToFigmaKeys(k, 'light');
  if (k.match(/^color-[a-z]+-\d+$/)) figKey = `primitives/color/${k.replace('color-', '').replace(/-(\d+)$/, '/$1').replace(/-/, '/')}`;
  if (k.startsWith('space-')) {
    const n = k.replace('space-', '');
    figKey = `primitives/Space/${n.charAt(0).toUpperCase() + n.slice(1)}`;
  }
  if (k.startsWith('corner-')) {
    const map = { none: 'None', 'extra-small': 'Extra-small', small: 'Small', medium: 'Medium', large: 'Large', 'extra-large': 'Extra-large', full: 'Full' };
    figKey = `primitives/Corner/${map[k.replace('corner-', '')]}`;
  }
  if (k.startsWith('elevation-')) figKey = `primitives/elevation/${k.replace('elevation-', '')}`;
  if (k === 'typeface-display') figKey = 'primitives/typeface/display';
  if (k === 'typeface-body') figKey = 'primitives/typeface/body';
  if (figKey) {
    let cv = resolved;
    if (cv.endsWith('px')) cv = cv.replace(/px$/, '');
    if (cv.includes('"')) cv = cv.replace(/"/g, '').split(',')[0].trim();
    primFlat[figKey] = normHex(cv);
  }
}

const themeFlat = {};
for (const [prefixed, val] of Object.entries({ ...light, ...dark })) {
  const [mode, ...rest] = prefixed.split(':');
  const name = rest.join(':');
  if (!name.startsWith('color-')) continue;
  const path = THEME_MAP[name];
  if (!path) continue;
  const resolved = resolveVar(val, primitives);
  let cv = resolved;
  if (cv.startsWith('rgba')) {
    const m = cv.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const [r, g, b, a = '1'] = m[1].split(',').map((x) => x.trim());
      const R = (+r).toString(16).padStart(2, '0');
      const G = (+g).toString(16).padStart(2, '0');
      const B = (+b).toString(16).padStart(2, '0');
      const A = Math.round(parseFloat(a) * 255).toString(16).padStart(2, '0');
      cv = A === 'ff' ? `#${R}${G}${B}` : `#${R}${G}${B}${A}`;
    }
  }
  themeFlat[`theme/${mode}/${path}`] = normHex(cv);
}

const codeFlat = { ...primFlat, ...themeFlat };
const conflicts = [];
const missing = [];
const newInCode = [];

for (const [k, v] of Object.entries(codeFlat)) {
  const fv = figmaFlat[k];
  if (fv === undefined) {
    newInCode.push({ key: k, code: v });
  } else if (normHex(fv) !== normHex(v)) {
    conflicts.push({ key: k, code: v, figma: fv });
  }
}

for (const k of Object.keys(figmaFlat)) {
  if (!codeFlat[k] && (k.startsWith('theme/') || k.startsWith('primitives/'))) {
    if (k.includes('/state/') || k.startsWith('typography/') || k.startsWith('effects/') || k.startsWith('layout/')) continue;
    missing.push({ key: k, figma: figmaFlat[k] });
  }
}

console.log(JSON.stringify({
  counts: { conflicts: conflicts.length, missing: missing.length, newInCode: newInCode.length, codeKeys: Object.keys(codeFlat).length, figmaKeys: Object.keys(figmaFlat).length },
  conflicts: conflicts.slice(0, 40),
  missing: missing.slice(0, 20),
  newInCode: newInCode.slice(0, 20),
}, null, 2));
