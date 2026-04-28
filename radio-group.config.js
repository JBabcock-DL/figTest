// CONFIG for radio-group (Mode B — no cva in shadcn source). Step 4.7 paths match file uCpQaRsW4oiXW3DsC6cLZm (same as checkbox run).
const CONFIG = {
  component: "radio-group",
  title: "Radio Group",
  pageName: "↳ Radio",
  layout: "control",
  docsUrl: "https://ui.shadcn.com/docs/components/radio-group",
  summary: "Single-selection group of radio buttons. Use for mutually exclusive options with one choice visible at a time.",
  _source: "synthetic-fallback",

  // Variant names must allow the control builder to show selected vs unselected (off/on) visuals.
  variants: ["off", "on"],
  sizes: [],

  style: {
    off: {
      fill: "color/background/default",
      fallback: "#ffffff",
      labelVar: "color/background/content",
      strokeVar: "color/border/default",
    },
    on: {
      fill: "color/background/default",
      fallback: "#ffffff",
      labelVar: "color/background/content",
      strokeVar: "color/primary/default",
    },
  },

  padH: { default: "space/xs" },
  radius: "radius/sm",
  labelStyle: { default: "Label/SM" },
  label: () => null,

  control: {
    shape: "radio",
    size: 16,
    indicatorVar: "color/primary/content",
  },

  iconSlots: { leading: false, trailing: false, size: 24 },
  componentProps: { label: false, leadingIcon: false, trailingIcon: false },

  states: [
    { key: "default", group: "default" },
    { key: "disabled", group: "disabled" },
  ],

  applyStateOverride: function applyStateOverride(instance, stateKey) {
    if (stateKey === "disabled") instance.opacity = 0.5;
    else instance.opacity = 1;
  },

  properties: [
    ["value", "string", "—", "no", "Controlled selected value."],
    ["defaultValue", "string", "—", "no", "Uncontrolled initial value."],
    ["disabled", "boolean", "false", "no", "Disables every item."],
    ["required", "boolean", "false", "no", "Required in form submission."],
    ["className", "string", "—", "no", "Tailwind class escape hatch."],
  ],

  usageDo: [
    "Use a radio group when options are mutually exclusive and all choices should be visible.",
    "Label each item clearly; group legend or heading should state the single-select rule.",
    "Pre-select a default when one option clearly matches the common case (optional).",
  ],
  usageDont: [
    "Do not use for multi-select; use checkboxes with a fieldset instead.",
    "Do not use radio for two-state on/off with no other options; use a switch or checkbox.",
    "Do not hide focus rings — keyboard users need visible `focus-visible` treatment.",
  ],

  composes: [],
};
