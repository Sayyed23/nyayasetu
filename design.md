---
name: NyayaSetu Enterprise Legal Intelligence
colors:
  surface: '#0a1228'
  surface-dim: '#0a1228'
  surface-bright: '#313850'
  surface-container-lowest: '#050d23'
  surface-container-low: '#131b31'
  surface-container: '#171f35'
  surface-container-high: '#222940'
  surface-container-highest: '#2c344c'
  on-surface: '#dbe1ff'
  on-surface-variant: '#bdc8d1'
  inverse-surface: '#dbe1ff'
  inverse-on-surface: '#283047'
  outline: '#87929a'
  outline-variant: '#3e484f'
  surface-tint: '#7bd0ff'
  primary: '#8ed5ff'
  on-primary: '#00354a'
  primary-container: '#38bdf8'
  on-primary-container: '#004965'
  inverse-primary: '#00668a'
  secondary: '#b7c8e1'
  on-secondary: '#213145'
  secondary-container: '#3a4a5f'
  on-secondary-container: '#a9bad3'
  tertiary: '#c7c8ff'
  on-tertiary: '#1000a9'
  tertiary-container: '#a7a9ff'
  on-tertiary-container: '#2b29bb'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c4e7ff'
  primary-fixed-dim: '#7bd0ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c69'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#0a1228'
  on-background: '#dbe1ff'
  surface-variant: '#2c344c'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  statutory-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  clause-index:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-caps:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes a high-density, authoritative, and frictionless analytical environment tailored for corporate advocates, compliance officers, and general counsels in India. The design targets high-stakes contract inspection, regulatory statutory parsing, and rapid risk mitigation. 

The aesthetic is **Precision Dark Glassmorphism** blended with modern technical minimalism:
- Deep, obsidian-navy depths (#0B1329 and #0F172A) eliminate visual fatigue during sustained audit sessions.
- Ice-blue luminescent accents (#38BDF8) supply focused visual velocity and highlight operative provisions.
- Crisp 1px structural framing, selective frosted acrylic layers (16px to 24px backdrop blurs), and monospaced statutory references project institutional trust, audit-grade rigour, and cryptographic precision.

## Colors

The palette leverages a low-luminance navy foundation with layered translucent slates, calibrated strictly for WCAG AAA contrast across complex analytical matrices.

### Core Canvas & Surfaces
- **Canvas Base**: `#0B1329` (Foundational application backdrop)
- **Surface Elevation 1**: `#0F172A` (Primary structural panels and standard sheets)
- **Surface Elevation 2 / Acrylic**: `rgba(15, 23, 42, 0.75)` with `backdrop-filter: blur(20px)`
- **Surface Elevation 3 (Floating Modals & Popovers)**: `#1E293B`

### Borders & Dividers
- **Subtle Outline**: `#1E293B` (Used for grid cells, neutral card boundaries, and list rows)
- **Interactive / Focus Outline**: `#334155` (Hover states, active card perimeters)
- **Accent Glow Line**: `rgba(56, 189, 248, 0.35)`

### Brand & Interactive Tones
- **Primary / Action Cyan**: `#38BDF8` (Focus indicators, primary action triggers, clause pins)
- **Primary Subtle Fill**: `rgba(56, 189, 248, 0.12)`
- **Secondary Slate**: `#64748B` (Secondary tools, de-emphasized metadata, muted icons)

### Statutory & Legal Risk Semantics
- **Compliant / Standard Provision**: `#10B981` (Emerald), background `rgba(16, 185, 129, 0.12)`
- **Ambiguous / Moderate Risk**: `#F59E0B` (Amber), background `rgba(245, 158, 11, 0.12)`
- **Material Breach / Critical Flag**: `#EF4444` (Crimson), background `rgba(239, 68, 68, 0.14)`
- **Omitted Term / Statutory Void**: `#6366F1` (Indigo), background `rgba(99, 102, 241, 0.14)`

### Typography Neutrals
- **Primary Data**: `#F8FAFC` (Titles, clause prose, primary metrics)
- **Secondary Narrative**: `#94A3B8` (Metadata, cross-references, explanatory captions)
- **Disabled / Placeholder**: `#475569`

## Typography

The typographic hierarchy enforces rapid scanning of lengthy legal instruments and precise numerical indexing. 

- **Primary Interface & Clause Body (`Inter`)**: Engineered for tabular numbers, micro-clarity at dense sizes (12px–13px), and maximum legibility during line-by-line contract comparison.
- **Statutory Indices & Regulatory Identifiers (`JetBrains Mono`)**: Utilized exclusively for act sections (e.g., `§ 73 Indian Contract Act, 1872`), clause markers (`Cl. 14.2(a)`), hash checksums, and metadata chips.
- Numerical columns and tables must enforce OpenType `tnum` (tabular numbers) to keep currency figures and dates vertically aligned across balance and audit views.

## Layout & Spacing

This design system uses a flexible, dense workbench grid system geared toward split-screen and tri-pane operational workflows:
- **Left Rail**: 280px fixed-width navigation and contract directory tree.
- **Central Document Canvas**: Fluid panel (minimum 580px, maximum 840px text column) optimized for 65–75 characters per line to minimize saccadic fatigue during reading.
- **Right Risk & Insight Inspector**: 380px contextual panel containing flagged obligations, statutory remedies, and version deltas.

### Breakpoint Matrix
- **Desktop Wide (≥1440px)**: Three-column persistent workbench. Full gutter (`1.5rem`), spacious outer margins (`2rem`).
- **Desktop Standard (1024px – 1439px)**: Split-screen mode with inspector collapsible to an overlay drawer. Gutter drops to `1rem`.
- **Tablet (768px – 1023px)**: Single-pane focus with bottom floating drawer for clause metadata and audit logs.
- **Mobile (<768px)**: Strict vertical stack, primary margins tightened to `1rem`, complex analytical tables switch to structured risk index cards.

## Elevation & Depth

Depth is conveyed through layered optical luminosity, frosted acrylic glass, and crisp boundary contrasts rather than heavy, muddy drop shadows.

- **Layer 0 (Base Canvas)**: Solid `#0B1329`. Flat, zero shadow.
- **Layer 1 (Card & Content Blocks)**: Surface `#0F172A` wrapped with a 1px border of `#1E293B`.
- **Layer 2 (Acrylic Risk Panels & Pinned Headers)**: Translucent `rgba(15, 23, 42, 0.8)` layered with a 20px Gaussian backdrop blur, framed with a 1px border of `#334155`. Subtle ambient drop shadow: `0 8px 32px rgba(2, 6, 23, 0.45)`.
- **Layer 3 (Floating Popovers & Critical Issue Flyouts)**: Translucent `rgba(30, 41, 59, 0.95)` with a 24px blur, framed with an accent-tinted border (`rgba(56, 189, 248, 0.25)` or corresponding risk color). Ambient shadow: `0 16px 40px rgba(0, 0, 0, 0.65), 0 0 1px rgba(255, 255, 255, 0.1) inset`.

## Shapes

The design uses a Level 2 (Rounded) geometry profile, customized for a modern enterprise aesthetic:
- **Default Interactive Elements (Buttons, Inputs, Selects)**: `0.5rem` (8px). Delivers a secure, grounded presence without appearing toy-like.
- **Structural Modules & Inspection Cards**: `rounded-xl` (`1.5rem` / 24px) for prominent diagnostic summaries, audit score containers, and document panels.
- **Nested Inner Modules**: `rounded-lg` (`1rem` / 16px) for interior clause callouts and risk snippets within outer parent cards.
- **Pills**: Monospaced clause anchors, risk tags, and live status dots use full pill radii (`9999px`) to visually separate data tags from rectangular content containers.

## Components

### Buttons
- **Primary Action**: Solid `#38BDF8` background with `#0B1329` text (Inter SemiBold). Hover triggers a subtle glow (`box-shadow: 0 0 16px rgba(56, 189, 248, 0.4)`). Active state scales to `0.98`.
- **Secondary / Outline**: Transparent background, 1px border of `#334155`, text `#F8FAFC`. Hover switches border to `#38BDF8` with a subtle wash of `rgba(56, 189, 248, 0.08)`.
- **Destructive**: Red-tinted fill `rgba(239, 68, 68, 0.12)`, 1px border `#EF4444`, text `#EF4444`.

### Risk Chips & Statutory Tags
- Formed with `JetBrains Mono` at `11px` with a `9999px` border radius.
- Height fixed at `24px` with horizontal padding of `8px`.
- Composed of a 6px status orb, label string, and optional numeric deviation metric (e.g., `[● HIGH RISK | -38pts]`).
- Visual variants map directly to semantic colors (Emerald, Amber, Crimson, Indigo) paired with semi-transparent tinted backgrounds and matched 1px boundaries.

### Clause Inspection Cards
- Root container styled with `rounded-xl` (24px), layered in `rgba(15, 23, 42, 0.75)`, with a 1px border of `#1E293B`.
- Card Header: Features a monospace statutory reference (`JetBrains Mono`), document timestamp, and right-aligned risk pill.
- Card Body: Displays the highlighted legal prose with a 3px left border corresponding to the assigned risk level (Crimson for non-compete overreach, Indigo for missing limitation of liability).
- Card Footer: Low-contrast action strip with secondary text actions ("Compare to Precedent", "Insert Fallback", "Accept Deviation").

### Inputs & Search Bars
- Background: `#0B1329`. Border: 1px `#1E293B`. Text: `#F8FAFC`. Placeholder: `#475569`.
- Interactive States: Focus shifts border to `#38BDF8` with an interior glow: `box-shadow: 0 0 0 1px #38BDF8, 0 0 12px rgba(56, 189, 248, 0.25)`.
- Global Query Input: Integrates statutory filter pills and monospaced command shortcuts (`⌘K`, `Ctrl+J`).

### Checkboxes & Selection Radios
- Square checkbox elements use `4px` radius; radios use full round.
- Default border: 1.5px `#334155` over `#0F172A`.
- Checked state: Filled `#38BDF8` with dark `#0B1329` check mark icon.

### Split-Pane Document Viewport (Specialized Component)
- **Original vs. Redline Diff**: Synchronized scroll view utilizing redline highlights (`rgba(239, 68, 68, 0.2)` strikethrough for deleted text and `rgba(16, 185, 129, 0.2)` underline for added amendments).
- Floating micro-action bar docked above selected provisions with frosted glass blur (`20px`) providing instantaneous AI statutory analysis under Indian law provisions.