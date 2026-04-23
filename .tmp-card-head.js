const CONFIG = {
  component: "card",
  title: "Card",
  pageName: "\u21b3 Cards",
  summary: "Surface container with header, content, and footer slots. Use to group related content on a shared background.",
  layout: "surface-stack",
  variants: ["default"],
  sizes: ["default", "sm"],
  style: {
    default: { fill: "color/background/default", fallback: "#ffffff", labelVar: "color/background/content", strokeVar: "color/border/default" }
  },
  padH: { default: "space/2xl", sm: "space/lg" },
  radius: "radius/lg",
  surface: {
    titleText: "Card title",
    descriptionText: "A brief one-line description of what this card contains.",
    titleStyleName: "Label/LG",
    descriptionStyleName: "Label/SM",
    sectionPadY: "space/2xl",
    gap: "space/2xl",
    innerGap: "space/xs",
    width: 420,
    actionSlot: { enabled: false, slotLabel: "Action", width: 80, height: 32 },
    contentSlot: { enabled: true, slotLabel: "Content", minHeight: 96 },
    footerSlot: { enabled: true, slotLabel: "Footer", align: "end", minHeight: 44 }
  },
  labelStyle: { default: "Label/LG", sm: "Label/MD" },
  label: () => null,
  iconSlots: { leading: false, trailing: false, size: 24 },
  componentProps: { title: true, description: true, actionSlot: false, footer: true, leadingIcon: false, trailingIcon: false },
  states: [
    { key: "default", group: "default" }
  ],
  applyStateOverride: (inst, st) => {},
  properties: [
    ["size",      "\"default\" | \"sm\"", "\"default\"", "no", "Padding + spacing preset (py-6/gap-6 vs py-4/gap-4)."],
    ["className", "string",               "\u2014",     "no", "Tailwind class escape hatch."]
  ],
  usageDo: [
    "Use Card to group related content onto a single surface.",
    "Compose with CardHeader, CardContent, and CardFooter sub-components.",
    "Prefer `size=\"sm\"` for dense grids; keep `default` for standalone cards."
  ],
  usageDont: [
    "Do not nest cards more than one level deep.",
    "Do not use a card just to hold a single paragraph of plain text.",
    "Do not override the background color inline \u2014 use the token variable."
  ]
};


