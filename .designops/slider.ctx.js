const ctx = {
  activeFileKey: "uCpQaRsW4oiXW3DsC6cLZm",
  fileKey:       "uCpQaRsW4oiXW3DsC6cLZm",
  registryComponents: {},
  usesComposes: false,
  composedWith: [],

  component:  "slider",
  title:      "Slider",
  pageName:   "↳ Slider",
  layout:     "tiny",
  docsUrl:    "https://ui.shadcn.com/docs/components/slider",
  summary:    "Horizontal or vertical range selector.",

  tiny: {
    shape:  "progress",
    width:  280,
    height: 4,
    filled: 0.5,
  },

  variants: ["default"],
  sizes:    [],

  padH:       { default: "space/xs" },
  radius:     "radius/full",
  labelStyle: { default: "Label/SM" },

  style: {
    "default": {
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
  ],
  applyStateOverride: function applyStateOverride(instance, stateKey, ctx) {
    // no-op
  },

  properties: [
    ["value", "number[]", "—", "no", "Controlled value array (supports multi-thumb)."],
    ["defaultValue", "number[]", "[0]", "no", "Uncontrolled initial value."],
    ["min", "number", "0", "no", "Minimum."],
    ["max", "number", "100", "no", "Maximum."],
    ["step", "number", "1", "no", "Step increment."],
    ["disabled", "boolean", "false", "no", "Disables interaction."],
    ["className", "string", "—", "no", "Tailwind class escape hatch."],
  ],

  usageDo: [
    "Use sliders for continuous value selection within a known range.",
    "Display the current value alongside the slider for clarity.",
    "Use discrete steps when selection should be constrained to specific increments.",
  ],
  usageDont: [
    "Don't use a slider when precise numeric input is needed — use an input field.",
    "Don't use sliders for binary choices — use a switch or checkbox instead.",
    "Don't hide the min/max bounds when the range is not obvious to the user.",
  ],

  composes: [],
};
