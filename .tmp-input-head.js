const CONFIG = {
  component: "input",
  title: "Input",
  pageName: "\u21b3 Text Field",
  summary: "Single-line text field. Supports native HTML input types.",
  layout: "field",
  variants: ["default", "invalid", "disabled"],
  sizes: ["sm", "default", "lg"],
  style: {
    default:  { fill: "color/background/default", fallback: "#ffffff", labelVar: "color/background/content",       strokeVar: "color/border/default" },
    invalid:  { fill: "color/background/default", fallback: "#ffffff", labelVar: "color/background/content",       strokeVar: "color/error/default"  },
    disabled: { fill: "color/background/variant", fallback: "#f4f4f5", labelVar: "color/background/content-muted", strokeVar: "color/border/subtle"  }
  },
  padH: { default: "space/md", sm: "space/sm", lg: "space/md" },
  radius: "radius/md",
  field: {
    fieldType: "input",
    showLabel: true,
    labelText: "Email",
    labelStyleName: "Label/SM",
    placeholderText: "you@example.com",
    showHelper: true,
    helperText: "We\u2019ll never share your email.",
    leadingIcon: false,
    trailingIcon: false,
    width: 320
  },
  labelStyle: { default: "Body/MD/regular", sm: "Body/SM/regular", lg: "Body/LG/regular" },
  label: () => null,
  iconSlots: { leading: true, trailing: true, size: 24 },
  componentProps: { label: true, placeholder: true, helper: true, leadingIcon: true, trailingIcon: true },
  states: [
    { key: "default",  group: "default"  },
    { key: "hover",    group: "default"  },
    { key: "focus",    group: "default"  },
    { key: "disabled", group: "disabled" }
  ],
  applyStateOverride: (inst, st) => { if (st === "disabled") inst.opacity = 0.5; if (st === "focus") inst.opacity = 1; },
  properties: [
    ["type",        "string",                   "\"text\"",  "no", "Native HTML input type (text, email, password, number, \u2026)."],
    ["placeholder", "string",                   "\u2014",    "no", "Placeholder text."],
    ["value",       "string",                   "\u2014",    "no", "Controlled value."],
    ["disabled",    "boolean",                  "false",     "no", "Disables interaction."],
    ["readOnly",    "boolean",                  "false",     "no", "Non-editable but focusable."],
    ["className",   "string",                   "\u2014",    "no", "Tailwind class escape hatch."]
  ],
  usageDo: [
    "Pair every Input with a visible Label via htmlFor for accessibility.",
    "Use type=email, type=password, or type=number to get native keyboards and validation on mobile.",
    "Show helper text below the field for format hints; switch to error copy when invalid."
  ],
  usageDont: [
    "Don\u2019t use placeholder text as a replacement for a label.",
    "Don\u2019t override the field height with className \u2014 use the size variant instead.",
    "Don\u2019t rely on color alone to indicate invalid state \u2014 include an icon or helper message."
  ]
};

