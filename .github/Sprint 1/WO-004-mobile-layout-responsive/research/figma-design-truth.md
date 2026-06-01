# Figma design truth — WO-004

Captured at: 2026-06-01  
file_key: OrDMGL6zOS3U9qYwXvPAvc  
node_id: 56:2962 (page), 56:4076 (menu shell)  
Deep link: https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=56-2962

## Source

Layout reference from [figma-mobile-layout-capture.md](figma-mobile-layout-capture.md) and ticket research — **not** a live token pull. **Do not** apply handoff colors, fonts, or spacing variables from Figma.

## Build constraint (product)

- **Layout only:** stacking, breakpoints, drawer vs fullscreen, horizontal scroll, fluid image boxes.
- **Styling:** existing repo `var(--*)` tokens and typography classes only.

## Layout summary

| Surface | Figma node | Implement |
| --- | --- | --- |
| Mobile page | `56:2962` | Single-column sections; full-width media; Explore More horizontal scroll |
| Menu shell | `56:4076` | Full viewport menu on mobile; flat 5 links; no account links |
| Top bar | `56:4132` | Logo + menu/close control |

## Screenshot

Use [figma-mobile-layout-capture.md](figma-mobile-layout-capture.md) and Figma links for `/vqa` layout comparison — not color parity.
