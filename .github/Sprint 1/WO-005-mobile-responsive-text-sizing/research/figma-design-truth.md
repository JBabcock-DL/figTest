# Figma design truth — WO-005

Captured at: 2026-06-01  
file_key: OrDMGL6zOS3U9qYwXvPAvc  
node_id: 56:2962 (mobile page), 56:4076 (mobile nav)  
Deep link: https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=56-2962

## Source

Pulled via Figma MCP at build time (reference only). **Code is source of truth for WO-005.** Figma variable collections / type-scale modes are **not** aligned to the major-second ladder yet — reconcile in a **separate ticket** (no Figma MCP work in this WO).

## Copy (exact TEXT sizes from MCP — pre-token migration)

| Surface | Figma style (legacy) | Size | Build token |
| --- | --- | ---: | --- |
| Body paragraphs | Body/Normal, Body/Large mobile | 16px | `body-lg` step 0 |
| Section headings (mobile) | Display/H2 mobile | 36px | `display-lg` step +7 (mobile) |
| Subhead | Display/H3 mobile | 32px | `display-md` step +5 (mobile) |
| Menu links | Headline/SM (bold in frame) | 24px in export* | **`headline-lg`** step +6/+5/+4 |

\*Legacy Figma export showed 24px menu links; code uses `headline-lg` (**32 / 29 / 26px**). Do not patch in components.

## Code decisions

- Mobile menu: `text-headline-lg font-bold!`.
- Mobile `display-lg`: step **+7 (36px)** (−4 from desktop); `display-md` / `display-sm`: **−3** steps on mobile.
- Body: locked **16px / 24px** all viewports and font-scale modes.

## Screenshot

MCP provides inline screenshot in `get_design_context` response (not persisted to disk).
