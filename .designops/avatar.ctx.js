const ctx = {
  activeFileKey: "uCpQaRsW4oiXW3DsC6cLZm",
  fileKey:       "uCpQaRsW4oiXW3DsC6cLZm",
  registryComponents: {},
  usesComposes: false,
  composedWith: [],

  component:  "avatar",
  title:      "Avatar",
  pageName:   "↳ Avatar",
  layout:     "tiny",
  docsUrl:    "https://ui.shadcn.com/docs/components/avatar",
  summary:    "Circular user image with fallback initials (Radix Avatar).",

  tiny: {
    shape:    "avatar",
    size:     40,
    initials: "CN",
  },

  variants: ["default"],
  sizes:    [],

  padH:       { default: "space/xs" },
  radius:     "radius/full",
  labelStyle: { default: "Label/SM" },

  style: {
    "default": {
      fill:      "color/background/container",
      fallback:  "#d6d3d9",
      labelVar:  "color/background/content",
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
    ["src", "string", "—", "no", "Image source URL."],
    ["alt", "string", "—", "no", "Alt text."],
    ["className", "string", "—", "no", "Tailwind class escape hatch."],
  ],

  usageDo: [
    "Always provide an alt text or fallback initials for accessibility.",
    "Use a consistent size across a list of avatars in the same context.",
    "Use the fallback initials when no image is available.",
  ],
  usageDont: [
    "Don't use avatars to represent non-person entities like brands or products.",
    "Don't place avatars without sufficient contrast against the background.",
    "Don't resize avatars outside the design system's defined size scale.",
  ],

  composes: [],
};
