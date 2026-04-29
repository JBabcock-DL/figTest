// ctx for /create-component Step 6 — radio-group (control archetype). Same file + tokens as checkbox draw.
const ctx = {
  activeFileKey: 'uCpQaRsW4oiXW3DsC6cLZm',
  fileKey: 'uCpQaRsW4oiXW3DsC6cLZm',
  registryComponents: {
    card: {
      nodeId: '422:28',
      key: '702cdf99ad8fce84d62bc0eca897e07f20e2ec0f',
      pageName: '↳ Cards',
    },
    button: {
      nodeId: '388:94',
      key: '8758f2ff272c50819b2c9419bee478519f904a59',
      pageName: '↳ Buttons',
    },
    label: {
      nodeId: '437:14',
      key: '26efbfb6caec0393083d467e1883a856d26c232a',
      pageName: '↳ Label',
    },
    separator: {
      nodeId: '438:12',
      key: 'cc0a21b126ce3db963d9cd191df9d6ad1b20eed7',
      pageName: '↳ Dividers',
    },
    input: {
      nodeId: '485:55',
      key: '94edb1eb4097da5a7eedc8cc2ce0b2161a9e696f',
      pageName: '↳ Text Field',
    },
    checkbox: {
      nodeId: '571:13',
      key: '3f9b1e0fff26b595ec918bd3938afae48d24a6fd',
      pageName: '↳ Checkbox',
    },
  },
  usesComposes: false,
  composedWith: [],

  component: 'radio-group',
  title: 'Radio Group',
  pageName: '↳ Radio',
  layout: 'control',
  docsUrl: 'https://ui.shadcn.com/docs/components/radio-group',
  summary: 'Single-selection group of radio buttons.',

  variants: ['off', 'on'],
  sizes: [],

  style: {
    off: {
      fill: 'color/background/default',
      fallback: '#ffffff',
      labelVar: 'color/background/content',
      strokeVar: 'color/border/default',
    },
    on: {
      fill: 'color/primary/default',
      fallback: '#1a1a1a',
      labelVar: 'color/primary/content',
      strokeVar: 'color/primary/default',
    },
  },

  padH: { default: 'space/xs' },
  radius: 'radius/sm',
  labelStyle: { default: 'Label/SM' },
  label: () => null,

  control: {
    shape: 'radio',
    size: 24,
    indicatorVar: 'color/primary/content',
  },

  iconSlots: { leading: false, trailing: false, size: 24 },
  componentProps: { label: false, leadingIcon: false, trailingIcon: false },

  states: [
    { key: 'default', group: 'default' },
    { key: 'disabled', group: 'disabled' },
  ],

  applyStateOverride: function applyStateOverride(instance, stateKey) {
    if (stateKey === 'disabled') instance.opacity = 0.5;
    else instance.opacity = 1;
  },

  properties: [
    ['value', 'string', '—', 'yes', 'Unique value token that identifies this option within the group.'],
    ['disabled', 'boolean', 'false', 'no', 'Disables this item independently of the group.'],
    ['id', 'string', '—', 'no', 'HTML id for associating a <label> via htmlFor.'],
  ],

  usageDo: [
    'Use Radio Group when exactly one option must be selected from a short list.',
    'Associate each radio with a visible label; group legend describes the set.',
    'Keep option counts small; prefer Select when many choices overload the layout.',
  ],
  usageDont: [
    'Do not use for multi-select; pair checkboxes or a multi-select pattern instead.',
    'Do not omit labels or legends — selection meaning must not rely on control hue alone.',
    'Do not nest unrelated interactive controls inside a radio option row.',
  ],

  composes: [],
};

const CONFIG = ctx;
const ACTIVE_FILE_KEY = typeof ctx.activeFileKey === 'string' ? ctx.activeFileKey : (typeof ctx.fileKey === 'string' ? ctx.fileKey : '');
const REGISTRY_COMPONENTS = ctx.registryComponents || {};
const usesComposes = !!ctx.usesComposes;
let pageContent;
let docRoot;
let compSet = null;
let variantBuildHolder = null;
let variantByKey = {};
let propsAdded;
const __ccPropAddErrors = [];
const hasSizeAxis = !!(CONFIG.sizes && CONFIG.sizes.length > 0);
const targetPage = figma.root.children.find(p => p.name === CONFIG.pageName)
?? figma.currentPage;
await figma.setCurrentPageAsync(targetPage);
const collections = figma.variables.getLocalVariableCollections();
const allVars = figma.variables.getLocalVariables();
const themeCol = collections.find(c => c.name === 'Theme');
const themeVars = themeCol ? allVars.filter(v => v.variableCollectionId === themeCol.id) : [];
const getColorVar = name => themeVars.find(v => v.name === name) ?? null;
const layoutCol = collections.find(c => c.name === 'Layout');
const layoutVars = layoutCol ? allVars.filter(v => v.variableCollectionId === layoutCol.id) : [];
const getLayoutVar = name => layoutVars.find(v => v.name === name) ?? null;
const typoCol = collections.find(c => c.name === 'Typography');
const typoVars = typoCol ? allVars.filter(v => v.variableCollectionId === typoCol.id) : [];
const getTypoVar = name => typoVars.find(v => v.name === name) ?? null;
const _unresolvedTokenMisses = [];
if (typeof __CC_PHASE1_UNRESOLVED__ !== 'undefined' && Array.isArray(__CC_PHASE1_UNRESOLVED__)) {
for (const m of __CC_PHASE1_UNRESOLVED__) _unresolvedTokenMisses.push(m);
}
function _recordUnresolved(kind, path, fallback, node) {
_unresolvedTokenMisses.push({
kind, path, fallback,
nodeName: (node && typeof node.name === 'string') ? node.name : null,
});
}
function readTypoString(variable) {
if (!variable || !typoCol) return null;
const baseMode = typoCol.modes.find(m => m.name === '100');
if (!baseMode) return null;
const val = variable.valuesByMode[baseMode.modeId];
return (typeof val === 'string' && val.length > 0) ? val : null;
}
const labelFontVar   = getTypoVar('Label/LG/font-family');
const displayFontVar = getTypoVar('Display/LG/font-family');
const labelFont   = readTypoString(labelFontVar)   ?? 'Inter';
const displayFont = readTypoString(displayFontVar) ?? labelFont;
await figma.loadFontAsync({ family: labelFont,   style: 'Regular' });
await figma.loadFontAsync({ family: labelFont,   style: 'Medium'  });
if (displayFont !== labelFont) {
await figma.loadFontAsync({ family: displayFont, style: 'Regular' });
await figma.loadFontAsync({ family: displayFont, style: 'Medium'  });
}
function bindColor(node, varName, fallbackHex, target = 'fills') {
const variable = varName ? getColorVar(varName) : null;
const hex = fallbackHex.replace('#', '');
const paint = {
type: 'SOLID',
color: {
r: parseInt(hex.slice(0, 2), 16) / 255,
g: parseInt(hex.slice(2, 4), 16) / 255,
b: parseInt(hex.slice(4, 6), 16) / 255,
},
};
if (variable) {
paint.boundVariables = { color: figma.variables.createVariableAlias(variable) };
} else if (varName) {
_recordUnresolved('color', varName, fallbackHex, node);
}
node[target] = [paint];
}
function bindNum(node, field, varName, fallback) {
node[field] = fallback;
const variable = varName ? getLayoutVar(varName) : null;
if (variable) {
try { node.setBoundVariable(field, variable); } catch (_) {}
} else if (varName) {
_recordUnresolved('num:' + field, varName, fallback, node);
}
}
const allTextStyles = await figma.getLocalTextStylesAsync();
const ICON_PACK_CFG = (typeof CONFIG !== 'undefined' && CONFIG && CONFIG.iconPack) || null;
let DEFAULT_ICON_COMPONENT = null;
let DEFAULT_ICON_RESOLUTION = 'none';
if (ICON_PACK_CFG) {
const ref = ICON_PACK_CFG.defaultIconRef
|| (ICON_PACK_CFG.defaultIconKey
? { kind: 'component-key', componentKey: ICON_PACK_CFG.defaultIconKey, nodeId: null, fileKey: null, rawInput: ICON_PACK_CFG.defaultIconKey }
: null);
const currentFileKey = (typeof figma.fileKey === 'string' && figma.fileKey) || ACTIVE_FILE_KEY || null;
if (ref) {
if (ref.componentKey && typeof ref.componentKey === 'string' && /^[a-f0-9]{40}$/.test(ref.componentKey)) {
try {
DEFAULT_ICON_COMPONENT = await figma.importComponentByKeyAsync(ref.componentKey);
DEFAULT_ICON_RESOLUTION = 'by-key';
} catch (err) {
DEFAULT_ICON_RESOLUTION = 'failed:key-unreachable:' + (err && err.message ? err.message : String(err));
console.warn('importComponentByKeyAsync failed for defaultIconRef.componentKey:', err);
}
}
const nodeIdIsCurrentFile =
ref.nodeId && (
ref.kind === 'node-id' ||
(ref.kind === 'url' && (!ref.fileKey || (currentFileKey && ref.fileKey === currentFileKey)))
);
if (!DEFAULT_ICON_COMPONENT && nodeIdIsCurrentFile) {
try {
const node = await figma.getNodeByIdAsync(ref.nodeId);
if (!node) {
DEFAULT_ICON_RESOLUTION = 'failed:node-not-found:' + ref.nodeId;
} else if (node.type === 'COMPONENT') {
DEFAULT_ICON_COMPONENT = node;
DEFAULT_ICON_RESOLUTION = 'by-node-id';
} else if (node.type === 'COMPONENT_SET') {
const firstVariant = node.children.find(ch => ch.type === 'COMPONENT');
if (firstVariant) {
DEFAULT_ICON_COMPONENT = firstVariant;
DEFAULT_ICON_RESOLUTION = 'by-node-id-variant';
} else {
DEFAULT_ICON_RESOLUTION = 'failed:component-set-empty:' + ref.nodeId;
}
} else {
DEFAULT_ICON_RESOLUTION = 'failed:node-wrong-type:' + node.type + ':' + ref.nodeId;
}
} catch (err) {
DEFAULT_ICON_RESOLUTION = 'failed:node-lookup:' + (err && err.message ? err.message : String(err));
console.warn('getNodeByIdAsync failed for defaultIconRef.nodeId:', err);
}
}
if (
!DEFAULT_ICON_COMPONENT
&& ref.kind === 'url'
&& ref.fileKey
&& currentFileKey
&& ref.fileKey !== currentFileKey
&& !ref.componentKey
) {
DEFAULT_ICON_RESOLUTION = 'failed:cross-file-needs-key';
}
if (
!DEFAULT_ICON_COMPONENT
&& ref.kind === 'url'
&& !ref.nodeId
&& !ref.componentKey
&& DEFAULT_ICON_RESOLUTION === 'none'
) {
DEFAULT_ICON_RESOLUTION = 'failed:url-missing-node-id';
}
}
}
const ICON_SLOT_MODE = DEFAULT_ICON_COMPONENT ? 'instance-swap' : 'placeholder';
function __ccDocFillPropertiesFromConfig() {
const table = docRoot.findOne(
n => n.type === 'FRAME' && n.name === `doc/table/${CONFIG.component}/properties`,
);
if (!table) {
throw new Error('[cc] properties table missing');
}
const bodyRows = table.children.slice(1);
const want = (CONFIG.properties && CONFIG.properties.length) || 0;
if (bodyRows.length !== want) {
throw new Error(`[cc] prop rows ${bodyRows.length}≠${want}`);
}
for (let i = 0; i < want; i++) {
const r = CONFIG.properties[i];
const row = bodyRows[i];
for (let j = 0; j < 5; j++) {
const cell = row.children[j];
const t = cell && cell.findOne && cell.findOne(n => n.type === 'TEXT');
if (t) t.characters = String(r[j]);
}
}
}
docRoot = figma.currentPage.findOne(
n => n.name === `doc/component/${CONFIG.component}` && n.type === 'FRAME',
);
if (!docRoot) {
return {
ok: false,
section: 'properties',
missingFrame: `doc/component/${CONFIG.component}`,
};
}
__ccDocFillPropertiesFromConfig();
return {
ok: true,
section: 'properties',
docRootId: docRoot.id,
};
