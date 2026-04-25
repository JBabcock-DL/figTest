// CONFIG for checkbox (Mode B — no cva in shadcn source). Step 4.7 paths verified against file uCpQaRsW4oiXW3DsC6cLZm.
const CONFIG = {
  component: "checkbox",
  title: "Checkbox",
  pageName: "↳ Checkbox",
  layout: "control",
  docsUrl: "https://ui.shadcn.com/docs/components/checkbox",
  summary: "Two-state or tri-state checkbox (checked / unchecked / indeterminate).",
  _source: "synthetic-fallback",

  // Variant keys must make component names include `on` or `checked=true` for the checked glyph (see conventions/02-archetype-routing.md).
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
      fill: "color/primary/default",
      fallback: "#1a1a1a",
      labelVar: "color/primary/content",
      strokeVar: "color/primary/default",
    },
  },

  padH: { default: "space/xs" },
  radius: "radius/sm",
  labelStyle: { default: "Label/SM" },
  label: () => null,

  control: {
    shape: "checkbox",
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
    ["checked", "boolean | \"indeterminate\"", "false", "no", "Controlled checked state."],
    ["defaultChecked", "boolean", "false", "no", "Uncontrolled initial state."],
    ["disabled", "boolean", "false", "no", "Disables interaction."],
    ["required", "boolean", "false", "no", "Required in form submission."],
    ["className", "string", "—", "no", "Tailwind class escape hatch."],
  ],

  usageDo: [
    "Pair with a visible label and htmlFor to meet WCAG 2.1 name requirements.",
    "Use the indeterminate state for parent rows in tri-state (tree) selection.",
    "Place checkboxes in a vertical list or table column for scan-friendly review flows.",
  ],
  usageDont: [
    "Do not rely on color alone to convey checked state; the mark carries meaning.",
    "Do not nest interactive elements inside the checkbox root.",
    "Do not use for mutually exclusive options; use radio-group instead.",
  ],

  composes: [],
};
