const ctx = {
  activeFileKey: "uCpQaRsW4oiXW3DsC6cLZm",
  fileKey:       "uCpQaRsW4oiXW3DsC6cLZm",
  registryComponents: {},
  usesComposes: false,
  composedWith: [],

  component:  "badge",
  title:      "Badge",
  pageName:   "↳ Badge",
  layout:     "chip",
  docsUrl:    "https://ui.shadcn.com/docs/components/badge",
  summary:    "Compact status / count label.",

  variants: ["default", "secondary", "destructive", "outline"],
  sizes:    [],

  padH:       { default: "space/sm" },
  radius:     "radius/full",
  labelStyle: { default: "Label/SM" },

  style: {
    "default": {
      fill:      "color/primary/default",
      fallback:  "#6750a4",
      labelVar:  "color/primary/content",
      strokeVar: null,
    },
    "secondary": {
      fill:      "color/secondary/default",
      fallback:  "#625b71",
      labelVar:  "color/secondary/content",
      strokeVar: null,
    },
    "destructive": {
      fill:      "color/error/default",
      fallback:  "#871d17",
      labelVar:  "color/error/content",
      strokeVar: null,
    },
    "outline": {
      fill:      null,
      fallback:  "#ffffff",
      labelVar:  "color/background/content",
      strokeVar: "color/border/default",
    },
  },

  label: (size, variant) => "Badge",

  iconSlots: { leading: true, trailing: true, size: 24 },
  componentProps: { label: true, leadingIcon: true, trailingIcon: true },

  states: [
    { key: "default", group: "default" },
  ],
  applyStateOverride: function applyStateOverride(instance, stateKey, ctx) {
    instance.opacity = 1;
  },

  properties: [
    ["variant", "enum", "\"default\"", "no", "Visual style."],
    ["asChild", "boolean", "false", "no", "Renders styled classes onto the child via Radix Slot."],
    ["className", "string", "—", "no", "Tailwind class escape hatch."],
  ],

  usageDo: [
    "Use badges to indicate status, counts, or categories.",
    "Keep badge text short — one or two words maximum.",
    "Choose variant semantically: destructive for errors, secondary for neutral tags.",
  ],
  usageDont: [
    "Don't use badges as buttons or interactive elements.",
    "Don't write full sentences inside a badge.",
    "Don't stack more than two badges inline without visual separation.",
  ],

  composes: [],
};
