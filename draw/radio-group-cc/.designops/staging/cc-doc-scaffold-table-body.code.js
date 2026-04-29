const CONFIG = {
  "component": "radio-group",
  "title": "Radio Group",
  "pageName": "↳ Radio",
  "layout": "control",
  "docsUrl": "https://ui.shadcn.com/docs/components/radio-group",
  "summary": "Single-selection group of radio buttons.",
  "variants": [
    "default"
  ],
  "sizes": [],
  "padH": {
    "default": "space/xs"
  },
  "radius": "radius/sm",
  "labelStyle": {
    "default": "Label/SM"
  },
  "style": {
    "default": {
      "fill": null,
      "fallback": "#888888",
      "labelVar": null,
      "strokeVar": null
    }
  },
  "iconSlots": {
    "leading": false,
    "trailing": false,
    "size": 24
  },
  "componentProps": {
    "label": false,
    "leadingIcon": false,
    "trailingIcon": false
  },
  "states": [
    {
      "key": "unchecked",
      "group": "default"
    },
    {
      "key": "checked",
      "group": "default"
    },
    {
      "key": "disabled",
      "group": "disabled"
    }
  ],
  "properties": [
    [
      "value",
      "string",
      "—",
      "no",
      "Controlled selected value."
    ],
    [
      "defaultValue",
      "string",
      "—",
      "no",
      "Uncontrolled initial value."
    ],
    [
      "disabled",
      "boolean",
      "false",
      "no",
      "Disables every item."
    ],
    [
      "required",
      "boolean",
      "false",
      "no",
      "Required in form submission."
    ],
    [
      "className",
      "string",
      "—",
      "no",
      "Tailwind class escape hatch."
    ]
  ],
  "usageDo": [
    "Use radio-group for its intended semantic purpose.",
    "Keep labels or content concise and actionable.",
    "Follow established spacing and sizing patterns."
  ],
  "usageDont": [
    "Don't repurpose radio-group for unrelated interactions.",
    "Don't overload with too much text or too many actions.",
    "Don't use outside the design system's intended layout grid."
  ],
  "composes": []
};
var __CREATE_COMPONENT_PHASE__ = 2;
var __CREATE_COMPONENT_DOC_STEP__ = 1;
var __CC_HANDOFF_PAGE_CONTENT_ID__ = "623:10";
var __CC_HANDOFF_DOC_ROOT_ID__ = "623:11";
var __CC_HANDOFF_SCAFFOLD_TABLE_ID__ = "625:12";
// preamble.runtime.figma.js — generated; edit preamble.figma.js + npm run build:min
const ACTIVE_FILE_KEY = "uCpQaRsW4oiXW3DsC6cLZm";
const REGISTRY_COMPONENTS = {"card":{"nodeId":"422:28","key":"702cdf99ad8fce84d62bc0eca897e07f20e2ec0f","pageName":"↳ Cards","publishedAt":"2026-04-21T19:41:31.643Z","version":2,"cvaHash":null},"button":{"nodeId":"388:94","key":"8758f2ff272c50819b2c9419bee478519f904a59","pageName":"↳ Buttons","publishedAt":"2026-04-21T03:24:14.701Z","version":1,"cvaHash":null},"label":{"nodeId":"437:14","key":"26efbfb6caec0393083d467e1883a856d26c232a","pageName":"↳ Label","publishedAt":"2026-04-22T04:34:22.298Z","version":1,"cvaHash":null},"separator":{"nodeId":"438:12","key":"cc0a21b126ce3db963d9cd191df9d6ad1b20eed7","pageName":"↳ Dividers","publishedAt":"2026-04-22T04:40:45.764Z","version":1,"cvaHash":null},"input":{"nodeId":"485:55","key":"94edb1eb4097da5a7eedc8cc2ce0b2161a9e696f","pageName":"↳ Text Field","publishedAt":"2026-04-23T04:24:53.903Z","version":1,"cvaHash":null},"checkbox":{"nodeId":"571:13","key":"3f9b1e0fff26b595ec918bd3938afae48d24a6fd","pageName":"↳ Checkbox","publishedAt":"2026-04-27T04:45:04.011Z","version":2,"cvaHash":null}};


const usesComposes = Array.isArray(CONFIG.composes) && CONFIG.composes.length > 0;


function logFileKeyMismatch(expected, actual) {
  console.warn(
    `[create-component] fileKey mismatch — registry expects "${expected}" but ` +
      `figma.fileKey is "${actual || '(empty)'}". Continuing anyway; this is common ` +
      'in branch / shared-library / duplicated files where figma.fileKey returns a ' +
      'different value than the URL segment. If registry-bound composes fail to ' +
      'resolve, delete or reset `.designops-registry.json` or open the correct file.',
  );
}

const _fileKeyObserved = (typeof figma.fileKey === 'string' && figma.fileKey) || null;
const _fileKeyMismatch =
  !!(ACTIVE_FILE_KEY && _fileKeyObserved && _fileKeyObserved !== ACTIVE_FILE_KEY);
if (_fileKeyMismatch) {
  logFileKeyMismatch(ACTIVE_FILE_KEY, _fileKeyObserved);
}


function __ccPreflightFileKey() {
  const observed =
    typeof figma.fileKey === 'string' && figma.fileKey ? figma.fileKey : null;
  const expected =
    typeof ACTIVE_FILE_KEY === 'string' && ACTIVE_FILE_KEY ? ACTIVE_FILE_KEY : null;
  if (observed === 'headless') {
    console.warn(
      '[create-component] figma.fileKey is "headless" (common for some MCP connectors). ' +
        'Draw proceeds against the active canvas — confirm you have ' +
        (expected ? '"' + expected + '" ' : '') +
        'open if using registry composes.',
    );
    return null;
  }
  if (observed && expected && observed !== expected) {
    return {
      ok: false,
      why: 'figma-file-mismatch',
      fileKeyObserved: observed,
      fileKeyExpected: expected,
      remediation:
        'Wrong file: expected ' + expected + ', got ' + observed + '. Switch file tab and re-run prepare.',
    };
  }
  return null;
}

const __S=["color/border/subtle","color/background/content","color/background/content-muted"];
const __OP_LIST__ = [[0,"brow0",{"n":"row/placeholder-0","L":1,"w":1640,"H":1,"P":1,"C":1,"g":1,"t":16,"b":16,"u":1,"m":64,"o":1,"D":1,"s":0,"e":"#e5e7eb"}],[2,"table","brow0"],[0,"cell0_0",{"n":"cell/property","L":0,"w":240,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow0","cell0_0"],[1,"btxt0_0",0,{"n":"value","c":"placeholder-0","F":13,"T":1,"W":200,"f":1,"E":"#0a0a0a","Y":1}],[2,"cell0_0","btxt0_0"],[0,"cell0_1",{"n":"cell/type","L":0,"w":380,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow0","cell0_1"],[1,"btxt0_1",0,{"n":"value","c":"…","F":13,"T":1,"W":340,"f":1,"E":"#0a0a0a","Y":2}],[2,"cell0_1","btxt0_1"],[0,"cell0_2",{"n":"cell/default","L":0,"w":160,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow0","cell0_2"],[1,"btxt0_2",0,{"n":"value","c":"…","F":13,"T":1,"W":120,"f":1,"E":"#0a0a0a","Y":2}],[2,"cell0_2","btxt0_2"],[0,"cell0_3",{"n":"cell/required","L":0,"w":120,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow0","cell0_3"],[1,"btxt0_3",0,{"n":"value","c":"…","F":13,"T":1,"W":80,"f":2,"E":"#0a0a0a","Y":2}],[2,"cell0_3","btxt0_3"],[0,"cell0_4",{"n":"cell/description","L":0,"w":740,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow0","cell0_4"],[1,"btxt0_4",0,{"n":"value","c":"…","F":13,"T":1,"W":700,"f":2,"E":"#0a0a0a","Y":3}],[2,"cell0_4","btxt0_4"],[0,"brow1",{"n":"row/placeholder-1","L":1,"w":1640,"H":1,"P":1,"C":1,"g":1,"t":16,"b":16,"u":1,"m":64,"o":1,"D":1,"s":0,"e":"#e5e7eb"}],[2,"table","brow1"],[0,"cell1_0",{"n":"cell/property","L":0,"w":240,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow1","cell1_0"],[1,"btxt1_0",0,{"n":"value","c":"placeholder-1","F":13,"T":1,"W":200,"f":1,"E":"#0a0a0a","Y":1}],[2,"cell1_0","btxt1_0"],[0,"cell1_1",{"n":"cell/type","L":0,"w":380,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow1","cell1_1"],[1,"btxt1_1",0,{"n":"value","c":"…","F":13,"T":1,"W":340,"f":1,"E":"#0a0a0a","Y":2}],[2,"cell1_1","btxt1_1"],[0,"cell1_2",{"n":"cell/default","L":0,"w":160,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow1","cell1_2"],[1,"btxt1_2",0,{"n":"value","c":"…","F":13,"T":1,"W":120,"f":1,"E":"#0a0a0a","Y":2}],[2,"cell1_2","btxt1_2"],[0,"cell1_3",{"n":"cell/required","L":0,"w":120,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow1","cell1_3"],[1,"btxt1_3",0,{"n":"value","c":"…","F":13,"T":1,"W":80,"f":2,"E":"#0a0a0a","Y":2}],[2,"cell1_3","btxt1_3"],[0,"cell1_4",{"n":"cell/description","L":0,"w":740,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow1","cell1_4"],[1,"btxt1_4",0,{"n":"value","c":"…","F":13,"T":1,"W":700,"f":2,"E":"#0a0a0a","Y":3}],[2,"cell1_4","btxt1_4"],[0,"brow2",{"n":"row/placeholder-2","L":1,"w":1640,"H":1,"P":1,"C":1,"g":1,"t":16,"b":16,"u":1,"m":64,"o":1,"D":1,"s":0,"e":"#e5e7eb"}],[2,"table","brow2"],[0,"cell2_0",{"n":"cell/property","L":0,"w":240,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow2","cell2_0"],[1,"btxt2_0",0,{"n":"value","c":"placeholder-2","F":13,"T":1,"W":200,"f":1,"E":"#0a0a0a","Y":1}],[2,"cell2_0","btxt2_0"],[0,"cell2_1",{"n":"cell/type","L":0,"w":380,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow2","cell2_1"],[1,"btxt2_1",0,{"n":"value","c":"…","F":13,"T":1,"W":340,"f":1,"E":"#0a0a0a","Y":2}],[2,"cell2_1","btxt2_1"],[0,"cell2_2",{"n":"cell/default","L":0,"w":160,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow2","cell2_2"],[1,"btxt2_2",0,{"n":"value","c":"…","F":13,"T":1,"W":120,"f":1,"E":"#0a0a0a","Y":2}],[2,"cell2_2","btxt2_2"],[0,"cell2_3",{"n":"cell/required","L":0,"w":120,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow2","cell2_3"],[1,"btxt2_3",0,{"n":"value","c":"…","F":13,"T":1,"W":80,"f":2,"E":"#0a0a0a","Y":2}],[2,"cell2_3","btxt2_3"],[0,"cell2_4",{"n":"cell/description","L":0,"w":740,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow2","cell2_4"],[1,"btxt2_4",0,{"n":"value","c":"…","F":13,"T":1,"W":700,"f":2,"E":"#0a0a0a","Y":3}],[2,"cell2_4","btxt2_4"],[0,"brow3",{"n":"row/placeholder-3","L":1,"w":1640,"H":1,"P":1,"C":1,"g":1,"t":16,"b":16,"u":1,"m":64,"o":1,"D":1,"s":0,"e":"#e5e7eb"}],[2,"table","brow3"],[0,"cell3_0",{"n":"cell/property","L":0,"w":240,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow3","cell3_0"],[1,"btxt3_0",0,{"n":"value","c":"placeholder-3","F":13,"T":1,"W":200,"f":1,"E":"#0a0a0a","Y":1}],[2,"cell3_0","btxt3_0"],[0,"cell3_1",{"n":"cell/type","L":0,"w":380,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow3","cell3_1"],[1,"btxt3_1",0,{"n":"value","c":"…","F":13,"T":1,"W":340,"f":1,"E":"#0a0a0a","Y":2}],[2,"cell3_1","btxt3_1"],[0,"cell3_2",{"n":"cell/default","L":0,"w":160,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow3","cell3_2"],[1,"btxt3_2",0,{"n":"value","c":"…","F":13,"T":1,"W":120,"f":1,"E":"#0a0a0a","Y":2}],[2,"cell3_2","btxt3_2"],[0,"cell3_3",{"n":"cell/required","L":0,"w":120,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow3","cell3_3"],[1,"btxt3_3",0,{"n":"value","c":"…","F":13,"T":1,"W":80,"f":2,"E":"#0a0a0a","Y":2}],[2,"cell3_3","btxt3_3"],[0,"cell3_4",{"n":"cell/description","L":0,"w":740,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow3","cell3_4"],[1,"btxt3_4",0,{"n":"value","c":"…","F":13,"T":1,"W":700,"f":2,"E":"#0a0a0a","Y":3}],[2,"cell3_4","btxt3_4"],[0,"brow4",{"n":"row/placeholder-4","L":1,"w":1640,"H":1,"P":1,"C":1,"g":1,"t":16,"b":16,"u":1,"m":64,"z":1}],[2,"table","brow4"],[0,"cell4_0",{"n":"cell/property","L":0,"w":240,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow4","cell4_0"],[1,"btxt4_0",0,{"n":"value","c":"placeholder-4","F":13,"T":1,"W":200,"f":1,"E":"#0a0a0a","Y":1}],[2,"cell4_0","btxt4_0"],[0,"cell4_1",{"n":"cell/type","L":0,"w":380,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow4","cell4_1"],[1,"btxt4_1",0,{"n":"value","c":"…","F":13,"T":1,"W":340,"f":1,"E":"#0a0a0a","Y":2}],[2,"cell4_1","btxt4_1"],[0,"cell4_2",{"n":"cell/default","L":0,"w":160,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow4","cell4_2"],[1,"btxt4_2",0,{"n":"value","c":"…","F":13,"T":1,"W":120,"f":1,"E":"#0a0a0a","Y":2}],[2,"cell4_2","btxt4_2"],[0,"cell4_3",{"n":"cell/required","L":0,"w":120,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow4","cell4_3"],[1,"btxt4_3",0,{"n":"value","c":"…","F":13,"T":1,"W":80,"f":2,"E":"#0a0a0a","Y":2}],[2,"cell4_3","btxt4_3"],[0,"cell4_4",{"n":"cell/description","L":0,"w":740,"H":1,"P":0,"C":0,"t":4,"r":20,"b":4,"p":20,"a":1,"u":2}],[2,"brow4","cell4_4"],[1,"btxt4_4",0,{"n":"value","c":"…","F":13,"T":1,"W":700,"f":2,"E":"#0a0a0a","Y":3}],[2,"cell4_4","btxt4_4"]];
// GENERATED by scripts/build-min-templates.mjs — do not edit by hand.
// source: skills/create-component/templates/op-interpreter.figma.js
// regenerate with: npm run build:min
{const e=Object.entries({CONFIG:typeof CONFIG,ACTIVE_FILE_KEY:typeof ACTIVE_FILE_KEY,REGISTRY_COMPONENTS:typeof REGISTRY_COMPONENTS,usesComposes:typeof usesComposes,logFileKeyMismatch:typeof logFileKeyMismatch,__ccPreflightFileKey:typeof __ccPreflightFileKey,_fileKeyObserved:typeof _fileKeyObserved,_fileKeyMismatch:typeof _fileKeyMismatch}).filter(([,e])=>"undefined"===e).map(([e])=>e);if(e.length>0)throw new Error(`[create-component] op-interpreter: missing [${e.join(", ")}]. Inline preamble.figma.js before this bundle.`)}const e=figma.root.children.find(e=>e.name===CONFIG.pageName)??figma.currentPage;await figma.setCurrentPageAsync(e);const t=figma.variables.getLocalVariableCollections(),n=figma.variables.getLocalVariables(),i=t.find(e=>"Theme"===e.name),l=i?n.filter(e=>e.variableCollectionId===i.id):[],o=t.find(e=>"Layout"===e.name),r=(o&&n.filter(e=>e.variableCollectionId===o.id),t.find(e=>"Typography"===e.name)),a=r?n.filter(e=>e.variableCollectionId===r.id):[],s=e=>a.find(t=>t.name===e)??null,_=[];if(typeof __CC_PHASE1_UNRESOLVED__<"u"&&Array.isArray(__CC_PHASE1_UNRESOLVED__))for(const e of __CC_PHASE1_UNRESOLVED__)_.push(e);function f(e){if(!e||!r)return null;const t=r.modes.find(e=>"100"===e.name);if(!t)return null;const n=e.valuesByMode[t.modeId];return"string"==typeof n&&n.length>0?n:null}const u=s("Label/LG/font-family"),d=s("Display/LG/font-family"),c=f(u)??"Inter",p=f(d)??c;await figma.loadFontAsync({family:c,style:"Regular"}),await figma.loadFontAsync({family:c,style:"Medium"}),p!==c&&(await figma.loadFontAsync({family:p,style:"Regular"}),await figma.loadFontAsync({family:p,style:"Medium"}));const g=await figma.getLocalTextStylesAsync(),y=e=>g.find(t=>t.name===e)??null,m={section:y("Doc/Section"),tokenName:y("Doc/TokenName"),code:y("Doc/Code"),caption:y("Doc/Caption")};function C(e,t,n,i="fills"){const o=t?(e=>l.find(t=>t.name===e)??null)(t):null,r=n.replace("#",""),a={type:"SOLID",color:{r:parseInt(r.slice(0,2),16)/255,g:parseInt(r.slice(2,4),16)/255,b:parseInt(r.slice(4,6),16)/255}};o?a.boundVariables={color:figma.variables.createVariableAlias(o)}:t&&function(e,t,n,i){_.push({kind:"color",path:t,fallback:n,nodeName:i&&"string"==typeof i.name?i.name:null})}(0,t,n,e),e[i]=[a]}const h=usesComposes?"__composes__":CONFIG.layout||"chip";function A(e,t){if("__page__"===t)return figma.currentPage;const n=e[t];if(!n)throw new Error(`[op] unknown parent ref '${t}'`);return n}function I(e,t){null!=t.name&&(e.name=t.name),null!=t.layoutMode&&(e.layoutMode=t.layoutMode),null!=t.width&&e.resize(t.width,null!=t.height?t.height:1),null!=t.primaryAxisSizingMode&&(e.primaryAxisSizingMode=t.primaryAxisSizingMode),null!=t.counterAxisSizingMode&&(e.counterAxisSizingMode=t.counterAxisSizingMode),null!=t.layoutAlign&&(e.layoutAlign=t.layoutAlign),null!=t.itemSpacing&&(e.itemSpacing=t.itemSpacing),null!=t.paddingTop&&(e.paddingTop=t.paddingTop),null!=t.paddingRight&&(e.paddingRight=t.paddingRight),null!=t.paddingBottom&&(e.paddingBottom=t.paddingBottom),null!=t.paddingLeft&&(e.paddingLeft=t.paddingLeft),null!=t.primaryAxisAlignItems&&(e.primaryAxisAlignItems=t.primaryAxisAlignItems),null!=t.counterAxisAlignItems&&(e.counterAxisAlignItems=t.counterAxisAlignItems),null!=t.clipsContent&&(e.clipsContent=t.clipsContent),null!=t.minHeight&&(e.minHeight=t.minHeight),null!=t.cornerRadius&&(e.cornerRadius=t.cornerRadius),null!=t.visible&&(e.visible=t.visible),null!=t.x&&(e.x=t.x),null!=t.y&&(e.y=t.y),t.strokes?e.strokes=t.strokes:t.clearStroke&&(e.strokes=[]),null!=t.strokeWeight&&(e.strokeWeight=t.strokeWeight),t.dashPattern&&(e.dashPattern=t.dashPattern),null!=t.strokeTopWeight&&(e.strokeTopWeight=t.strokeTopWeight),null!=t.strokeRightWeight&&(e.strokeRightWeight=t.strokeRightWeight),null!=t.strokeBottomWeight&&(e.strokeBottomWeight=t.strokeBottomWeight),null!=t.strokeLeftWeight&&(e.strokeLeftWeight=t.strokeLeftWeight),t.fills?e.fills=t.fills:t.clearFill?e.fills=[]:(t.fillVar||t.fillHex)&&C(e,t.fillVar,t.fillHex||"#ffffff","fills"),t.strokeVar&&C(e,t.strokeVar,t.strokeHex||"#e5e7eb","strokes")}function O(e,t){null!=t.name&&(e.name=t.name),null!=t.characters&&(e.characters=String(t.characters)),null!=t.fontSize&&!e.textStyleId&&(e.fontSize=t.fontSize),null!=t.textStyleId&&(e.textStyleId=t.textStyleId),null!=t.textAutoResize&&(e.textAutoResize=t.textAutoResize),null!=t.resizeW&&e.resize(t.resizeW,1),null!=t.fillVar&&C(e,t.fillVar,t.fillHex||"#0a0a0a","fills")}function F(e){return"number"==typeof e&&typeof __S<"u"&&__S&&null!=__S[e]?__S[e]:e}function D(e){if(!e||null!=e.layoutMode||"number"!=typeof e.L&&null==e.P&&null==e.C&&null==e.f)return e;const t={};return null!=e.n&&(t.name=e.n),"number"==typeof e.L&&(t.layoutMode=1===e.L?"HORIZONTAL":"VERTICAL"),null!=e.w&&(t.width=e.w),null!=e.H&&(t.height=e.H),null!=e.P&&(t.primaryAxisSizingMode=1===e.P?"FIXED":"AUTO"),null!=e.C&&(t.counterAxisSizingMode=0===e.C?"FIXED":"AUTO"),1===e.g&&(t.layoutAlign="STRETCH"),null!=e.i&&(t.itemSpacing=e.i),null!=e.t&&(t.paddingTop=e.t),null!=e.r&&(t.paddingRight=e.r),null!=e.b&&(t.paddingBottom=e.b),null!=e.p&&(t.paddingLeft=e.p),null!=e.a&&(t.primaryAxisAlignItems=1===e.a?"CENTER":"MIN"),null!=e.u&&(t.counterAxisAlignItems=1===e.u?"CENTER":2===e.u?"MIN":"MAX"),null!=e.v&&(t.clipsContent=!!e.v),null!=e.m&&(t.minHeight=e.m),null!=e.R&&(t.cornerRadius=e.R),null!=e.V&&(t.visible=!!e.V),null!=e.x&&(t.x=e.x),null!=e.y&&(t.y=e.y),e.st&&(t.strokes=e.st),e.z&&(t.clearStroke=!0),null!=e.o&&(t.strokeWeight=e.o),e.Q&&(t.dashPattern=e.Q),null!=e.k&&(t.strokeTopWeight=e.k),null!=e.q&&(t.strokeRightWeight=e.q),null!=e.D&&(t.strokeBottomWeight=e.D),null!=e.j&&(t.strokeLeftWeight=e.j),null!=e.I&&(0===e.I?t.fills=[{type:"SOLID",color:{r:1,g:1,b:1}}]:t.fills=e.I),e.d&&(t.clearFill=!0),null!=e.f&&(t.fillVar=F(e.f)),null!=e.E&&(t.fillHex=e.E),null!=e.s&&(t.strokeVar=F(e.s)),null!=e.e&&(t.strokeHex=e.e),t}function E(e){if(!e||null==e.Y)return e;const t={};return null!=e.n&&(t.name=e.n),null!=e.c&&(t.characters=e.c),null!=e.F&&(t.fontSize=e.F),null!=e.T&&(t.textAutoResize=1===e.T?"HEIGHT":"WIDTH"),null!=e.W&&(t.resizeW=e.W),null!=e.f&&(t.fillVar=F(e.f)),null!=e.E&&(t.fillHex=e.E),null!=e.K&&(t.textStyleId=e.K),t}const S=["section","tokenName","code","caption"];function T(e){if(Array.isArray(e)&&e.length>=1){const t=e[0];if(0===t){const t=e[2]||{};return{op:"frame",id:e[1],props:D(t)}}if(1===t){if(e.length>=4&&0===e[2]){const t=e[3]||{},n=t.Y,i=null!=S[n]?S[n]:"caption";return{op:"text",id:e[1],styleKey:i,props:E(t)}}return{op:"text",id:e[1],styleKey:e[2],props:e[3]||{}}}if(2===t)return{op:"append",parent:e[1],child:e[2]}}return e&&"object"==typeof e&&e.op?e:{op:""}}return await async function(e){const t=await async function(e){const t=Object.create(null),n="function"==typeof __ccPreflightFileKey?__ccPreflightFileKey():null;if(n)return n;if(!("string"==typeof __CC_HANDOFF_DOC_ROOT_ID__&&__CC_HANDOFF_DOC_ROOT_ID__.length>0))for(const e of[...figma.currentPage.children])"_Header"!==e.name&&e.remove();const i=[],l=[];if("string"==typeof __CC_HANDOFF_DOC_ROOT_ID__&&__CC_HANDOFF_DOC_ROOT_ID__.length){l.push({key:"docRootId",id:__CC_HANDOFF_DOC_ROOT_ID__,refKey:"dr"});const e=await figma.getNodeByIdAsync(__CC_HANDOFF_DOC_ROOT_ID__);e&&"appendChild"in e?t.dr=e:i.push({key:"docRootId",id:__CC_HANDOFF_DOC_ROOT_ID__,refKey:"dr"})}if("string"==typeof __CC_HANDOFF_PAGE_CONTENT_ID__&&__CC_HANDOFF_PAGE_CONTENT_ID__.length){l.push({key:"pageContentId",id:__CC_HANDOFF_PAGE_CONTENT_ID__,refKey:"pc"});const e=await figma.getNodeByIdAsync(__CC_HANDOFF_PAGE_CONTENT_ID__);e&&"appendChild"in e?t.pc=e:i.push({key:"pageContentId",id:__CC_HANDOFF_PAGE_CONTENT_ID__,refKey:"pc"})}if("string"==typeof __CC_HANDOFF_SCAFFOLD_TABLE_ID__&&__CC_HANDOFF_SCAFFOLD_TABLE_ID__.length){l.push({key:"scaffoldTableId",id:__CC_HANDOFF_SCAFFOLD_TABLE_ID__,refKey:"table"});const e=await figma.getNodeByIdAsync(__CC_HANDOFF_SCAFFOLD_TABLE_ID__);e&&"appendChild"in e?t.table=e:i.push({key:"scaffoldTableId",id:__CC_HANDOFF_SCAFFOLD_TABLE_ID__,refKey:"table"})}if(i.length>0){const e="string"==typeof figma.fileKey&&figma.fileKey||null,t="string"==typeof ACTIVE_FILE_KEY&&ACTIVE_FILE_KEY||null;return{ok:!1,why:"handoff-id-not-resolvable-in-current-file",missingHandoffIds:i,suppliedHandoffIds:l,fileKeyObserved:e,fileKeyExpected:t,pageName:figma.currentPage&&figma.currentPage.name||null,remediation:"headless"===e?"Headless MCP session — open "+(t||"target file")+" in Figma Desktop; re-run prepare.":e&&t&&e!==t?"Wrong file: expected "+t+", got "+e+".":"Stale handoff ids — run resume-handoff --dry-run or reset handoff.json."}}for(const n of e){const e=T(n);if(e&&e.op)if("frame"===e.op){const n=figma.createFrame();I(n,e.props||{}),e.id&&(t[e.id]=n)}else if("text"===e.op){const n=figma.createText();n.fontName={family:c,style:"Regular"},e.styleKey&&m[e.styleKey]?n.textStyleId=m[e.styleKey].id:e.props&&null!=e.props.fontSize&&(n.fontSize=e.props.fontSize),e.props&&O(n,e.props),e.id&&(t[e.id]=n)}else{if("append"!==e.op)throw new Error(`[op] unknown op '${e.op}'`);{const n=A(t,e.parent),i=t[e.child];if(!i)throw new Error(`[op] append: missing child ref '${e.child}'`);n.appendChild(i)}}}return t}(e);if(t&&!1===t.ok)return t;const n=figma.currentPage.findOne(e=>"_PageContent"===e.name),i=figma.currentPage.findOne(e=>e.name===`doc/component/${CONFIG.component}`);return n&&"FRAME"===n.type?i&&"FRAME"===i.type?function(e,t,n,i){const l={ok:!0,docStep:1,pageContentId:e.id,docRootId:t.id,propsAdded:typeof __CC_PHASE1_PROPS_ADDED__<"u"&&null!==__CC_PHASE1_PROPS_ADDED__&&"object"==typeof __CC_PHASE1_PROPS_ADDED__?__CC_PHASE1_PROPS_ADDED__:{},unresolvedTokenMisses:_.slice(),layout:"__composes__"===h?"composes":CONFIG.layout||"chip"};return i&&i.table&&"id"in i.table&&(l.propertiesTableId=i.table.id),l}(n,i,0,t):{ok:!1,why:"scaffold-missing-doc-root",component:CONFIG.component,fileKeyObserved:"string"==typeof figma.fileKey&&figma.fileKey||null,pageName:figma.currentPage&&figma.currentPage.name||null}:{ok:!1,why:"scaffold-missing-pagecontent",fileKeyObserved:"string"==typeof figma.fileKey&&figma.fileKey||null,pageName:figma.currentPage&&figma.currentPage.name||null}}(__OP_LIST__)
