# UI/UX Research Notes (2026-02-11)

## Research Base

1. WCAG 2.1 SC 1.4.3 (W3C): text contrast should meet 4.5:1 (3:1 for large text)
2. web.dev Accessible tap targets: recommended 48x48dp minimum and about 8px spacing
3. GOV.UK Design System (Links): links on dark backgrounds must stay visible, underlines should remain unless context makes links obvious
4. Nielsen Norman Group (Visual Hierarchy): users scan faster when hierarchy is clear by contrast, scale, and grouping

## Implications for Oitebia Platform

- Link colors must be explicit and high-contrast; avoid browser-default visited purple on dark UI.
- Interactive elements should keep a minimum touch size for mobile usability.
- Primary action should be singular and obvious on each screen.
- Content-heavy novel pages need chapter navigation and stable reading width.
- Card groups should visually separate works for rapid scanning.

## Implemented Changes

- Global link states redesigned (`default / visited / hover / focus-visible`).
- Buttons and navigation links standardized with >= 44px touch height.
- Homepage rebuilt around 3-step journey and clear first CTA.
- Work cards switched to primary+secondary action model.
- Work detail page split into narrative + action sidebar.
- Novel page converted to 2-column layout with chapter TOC.

## Sources

- https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- https://web.dev/articles/accessible-tap-targets
- https://design-system.service.gov.uk/styles/links/
- https://www.nngroup.com/articles/visual-hierarchy-ux-definition/
