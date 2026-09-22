## 2025-05-10 - Tab Sub-Navigation Accessibility in Multi-Tool Workspaces
**Learning:** In complex web applications with sub-navigation pills/tabs, screen reader users and keyboard-only users often struggle to identify the current active section and navigate efficiently without semantic `<nav>` landmarks, `aria-current="page"`, and explicit `:focus-visible` ring indicators.
**Action:** Always wrap workspace tab bars in `<nav aria-label="...">`, apply `aria-current="page"` to the active tab link, and ensure `focus-visible:ring-2` focus states are styled on interactive pill links.
