const ctx = {
  activeFileKey: "uCpQaRsW4oiXW3DsC6cLZm",
  fileKey:       "uCpQaRsW4oiXW3DsC6cLZm",
  registryComponents: {},
  usesComposes: false,
  composedWith: [],

  component:  "switch",
  title:      "Switch",
  pageName:   "↳ Switch",
  layout:     "control",
  docsUrl:    "https://ui.shadcn.com/docs/components/switch",
  summary:    "On/off toggle with thumb slide animation.",

  variants: ["off", "on"],
  sizes:    [],

  padH:       { default: "space/xs" },
  radius:     "radius/full",
  labelStyle: { default: "Label/SM" },

  control: {
    shape:       "switch",
    width:       36,
    height:      20,
    trackOnVar:  "color/primary/default",
    trackOffVar: "color/background/variant",
    thumbVar:    "color/background/default",
  },

  style: {
    "off": {
      fill:      "color/background/variant",
      fallback:  "#edecee",
      labelVar:  null,
      strokeVar: null,
    },
    "on": {
      fill:      "color/primary/default",
      fallback:  "#6750a4",
      labelVar:  null,
      strokeVar: null,
    },
  },

  label: () => null,

  iconSlots: { leading: false, trailing: false, size: 24 },
  componentProps: { label: false, leadingIcon: false, trailingIcon: false },

  states: [
    { key: "default", group: "default" },
    { key: "disabled", group: "disabled" },
  ],
  applyStateOverride: function applyStateOverride(instance, stateKey, ctx) {
    if (stateKey === "disabled") instance.opacity = 0.38;
    else instance.opacity = 1;
  },

  properties: [
    ["checked", "boolean", "false", "no", "Controlled checked state."],
    ["defaultChecked", "boolean", "false", "no", "Uncontrolled initial state."],
    ["disabled", "boolean", "false", "no", "Disables interaction."],
    ["className", "string", "—", "no", "Tailwind class escape hatch."],
  ],

  usageDo: [
    "Use switches for binary settings that take effect immediately.",
    "Pair with a visible label describing what the switch controls.",
    "Place switches consistently — right-aligned in a settings list.",
  ],
  usageDont: [
    "Don't use a switch to confirm a multi-step action — use a button instead.",
    "Don't leave a switch without a label; screen readers need the context.",
    "Don't mix switches and checkboxes for the same category of settings.",
  ],

  composes: [],
};
