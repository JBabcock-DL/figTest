import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillTemplates = path.join(
  "C:/Users/jbabc/.claude/plugins/marketplaces/local-desktop-app-uploads/labs-design-ops/skills/create-component/templates"
);
const pre = fs.readFileSync(path.join(skillTemplates, "preamble.figma.js"), "utf8");
const eng = fs.readFileSync(
  path.join(skillTemplates, "create-component-engine-control.min.figma.js"),
  "utf8"
);
const reg = JSON.parse(
  fs.readFileSync(path.join(__dirname, ".designops-registry.json"), "utf8")
);
const regComponents = JSON.stringify(reg.components ?? {}, null, 2);
const pre2 = pre
  .replace("const ACTIVE_FILE_KEY = null;", "const ACTIVE_FILE_KEY = 'uCpQaRsW4oiXW3DsC6cLZm';")
  .replace("const REGISTRY_COMPONENTS = {};", `const REGISTRY_COMPONENTS = ${regComponents};`);

const CONFIG = `const CONFIG = {
  component: "checkbox",
  title: "Checkbox",
  pageName: "↳ Checkbox",
  summary: "Two-state or tri-state checkbox (checked / unchecked / indeterminate).",
  layout: "control",
  _source: "synthetic-fallback",

  surface: null,
  variants: ["unchecked", "Achecked=trueA", "indeterminate"],
  sizes: [],
  style: {
    unchecked: { fill: "color/background/default", fallback: "#ffffff", labelVar: "color/background/content", strokeVar: "color/border/default" },
    "Achecked=trueA": { fill: "color/primary/default", fallback: "#1a1a1a", labelVar: "color/primary/content", strokeVar: "color/primary/default" },
    indeterminate: { fill: "color/background/default", fallback: "#ffffff", labelVar: "color/background/content", strokeVar: "color/border/default" },
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
  applyStateOverride: (instance, stateKey) => {
    if (stateKey === "disabled") instance.opacity = 0.5;
    else instance.opacity = 1;
  },
  properties: [
    ["checked", 'boolean | "indeterminate"', "false", "no", "Controlled checked state."],
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
};
`;
const out = CONFIG + "\n" + pre2 + "\n" + eng;
const outPath = path.join(__dirname, "tmp-figma-checkbox-payload.js");
fs.writeFileSync(outPath, out, "utf8");
console.log("Wrote", outPath, out.length, "bytes");
