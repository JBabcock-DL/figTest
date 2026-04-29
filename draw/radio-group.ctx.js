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
