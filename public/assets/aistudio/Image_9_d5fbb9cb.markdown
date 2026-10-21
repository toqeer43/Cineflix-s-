---
name: Cinematic Luxe
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1e'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#e9bcb6'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#af8782'
  outline-variant: '#5e3f3b'
  surface-tint: '#ffb4aa'
  primary: '#ffb4aa'
  on-primary: '#690003'
  primary-container: '#e50914'
  on-primary-container: '#fff7f6'
  inverse-primary: '#c0000c'
  secondary: '#ffb3ad'
  on-secondary: '#68000a'
  secondary-container: '#a00216'
  on-secondary-container: '#ffa9a2'
  tertiary: '#ffba3e'
  on-tertiary: '#432c00'
  tertiary-container: '#996900'
  on-tertiary-container: '#fff7f2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930007'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ad'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#930012'
  tertiary-fixed: '#ffdeae'
  tertiary-fixed-dim: '#ffba3e'
  on-tertiary-fixed: '#281900'
  on-tertiary-fixed-variant: '#604100'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  headline-hero:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 11px
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
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  gutter-tv: 2.5rem
  margin: 3rem
  margin-mobile: 1rem
  margin-tv: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

This design system channels an immersive, theater-grade experience tailored for premium cinema lovers and home-theater connoisseurs. It pairs deep, light-absorbing obsidian backgrounds with razor-sharp crimson focal points to emulate the sensation of sitting in a dark cinema auditorium facing a brilliant silver screen.

### Design Direction: Cinematic Dark Glass & OLED Depth
- **Immersion First:** Interface chrome recedes into pure darkness, allowing video artwork, high-resolution key visuals, and motion stills to command primary attention.
- **Translucent Layering:** Deep frosted glass elements float over moving media banners and poster carousels to establish a tangible sense of depth without interrupting content consumption.
- **Dynamic Vignettes:** Subtle, dark radial and vertical gradients soften harsh poster edges, creating seamless fades into the application background.

## Colors

The palette is engineered exclusively for high-contrast dark environments, anchoring on deep OLED black and charcoal surfaces to eliminate light bleed and maximize dynamic range.

### Primary Accents & Indicators
- **Primary (`#E50914`):** Pure crimson, reserved for focal calls-to-action (e.g., "Play", primary subscriptions), active navigation markers, and linear scrubbers.
- **Secondary (`#B81D24`):** Deep scarlet, applied to hover states, interactive progress fills, and focused card outlines.
- **Tertiary (`#E5A00D`):** Rich amber gold, designated exclusively for cinematic ratings (IMDb/Rotten Tomatoes equivalent), awards laurels, and VIP tier badges.

### Surface Tiers & Neutral Scales
- **OLED Ground (`#000000`):** Used for absolute backdrop voids and full-screen playback chrome.
- **Deep Obsidian (`#08080A`):** The primary canvas background across mobile, web, and TV interfaces.
- **Surface Elevation 1 (`#111115`):** Container background for cards, trays, and list groupings.
- **Surface Elevation 2 (`#1B1B22`):** Elevated overlays, sheets, search flyouts, and modal dialogues.
- **Text & Foreground:**
  - **High-Contrast White (`#FFFFFF`):** Titles, active navigation items, primary metadata.
  - **Silver/Muted Platinum (`#A3A3B2`):** Secondary body, cast names, durations, genres.
  - **Deep Slate (`#525263`):** Inactive indicators, structural dividers, subtle borders.

## Typography

The type system blends modern cinematic edge with clear legibility in subdued lighting.

- **Headlines (Space Grotesk):** Gives feature film titles, section anchors, and marquee headers a sharp, modern, wide-screen presence with subtle technical flair.
- **Body & Metadata (Plus Jakarta Sans):** Chosen for its rounded clarity at small sizes on OLED screens. Crisp rendering prevents eye fatigue when reading long plot synopses, cast directories, and episode guides.
- **Label Caps:** Formatted in uppercase with expanded tracking for age ratings (e.g., `PG-13`, `18+`), video specs (`4K ULTRA HD`, `DOLBY VISION`, `HDR10+`), and category tags.

## Layout & Spacing

A fluid grid architecture engineered for infinite horizontal poster carousels, wide-ratio hero billboards, and edge-to-edge cinematic playback.

### Grid & Canvas Rhythm
- **Desktop (Breakpoint: 1200px+):** 12-column layout with 48px outer margins and 24px gutters. Hero trailers span all 12 columns with bottom gradient dissipation.
- **Tablet (Breakpoint: 768px – 1199px):** 8-column layout with 32px margins and 16px gutters.
- **Mobile (Breakpoint: < 768px):** 4-column layout with 16px margins and 12px gutters. Row carousels bleed past screen margins by 16px with negative padding to signal side-scrolling affordance.
- **Large Screen / TV (Breakpoint: 1920px+):** 12-column fixed grid with 64px safety zones and 40px gutters to accommodate 10-foot UI viewing distances.

## Elevation & Depth

Visual hierarchy uses frosted glass and dark luminance stepping rather than heavy drop shadows, mimicking backlit acrylic panels in a dark room.

### Surface Elevation System
- **Layer 0 (Canvas):** Pure `#08080A`, absorbing all backlight.
- **Layer 1 (Card & Shelf Tiers):** `#111115` with a subtle 1px inner hairline stroke of `rgba(255, 255, 255, 0.05)`.
- **Layer 2 (Floating Modals & Dropdowns):** `#1B1B22` with `rgba(0, 0, 0, 0.65)` ambient shadow, 24px blur, and 8px vertical offset.
- **Layer 3 (Glassmorphic Panels & Navigation Bars):** Frosted glass styling with background color `rgba(17, 17, 21, 0.65)`, blurred by `backdrop-filter: blur(24px) saturate(180%)`, framed by a 1px border of `rgba(255, 255, 255, 0.08)`.

### Crimson Glow & Highlights
- **Focus States:** Focused carousel cards and highlighted play triggers emit a soft crimson halo: `box-shadow: 0 0 24px rgba(229, 9, 20, 0.35)`.

## Shapes

The geometric framework balances sleek, high-end technical lines with soft, accessible pill contours for interactive tokens.

- **Base Corner Radius (0.5rem / 8px):** Standard for posters, media cards, backdrop thumbnails, and dialog shells.
- **Large Radius (1rem / 16px):** Modal sheets, detail drawer cards, and contextual overlays.
- **Pill (Fully Rounded / 9999px):** All metadata tags, genre filters, status badges, and primary action buttons.
- **Strict Aspect Ratios:**
  - Standard Poster: `2:3`
  - Backdrop / Trailer Banner: `16:9`
  - Wide Cinematic Still: `21:9`
  - Profile Avatar: `1:1` circular

## Components

### Buttons
- **Primary Hero Action ("Play"):** Solid pure white (`#FFFFFF`) background with bold OLED black (`#000000`) text and icons. On hover: pure primary crimson (`#E50914`) background with pure white text and an ambient crimson glow.
- **Secondary Action ("More Info", "Add to List"):** Translucent frosted glass button with `rgba(255, 255, 255, 0.15)` fill, `rgba(255, 255, 255, 0.2)` border, and high-contrast white text. Hover transitions to `rgba(255, 255, 255, 0.25)` fill.
- **Icon Actions (Like, Sound Toggle, Watchlist):** Circular pill icon buttons (44x44px mobile, 48x48px desktop) encased in 1px `rgba(255, 255, 255, 0.12)` borders with frosted glass backgrounds.

### Pill Tags & Badges
- **Content Specifications:** Micro pill capsules (e.g., `4K`, `HDR`, `18+`) featuring `rgba(255, 255, 255, 0.08)` fill, 1px border `rgba(255, 255, 255, 0.16)`, and `label-caps` styling in silver.
- **Top 10 / Trending Badge:** High-impact crimson background (`#E50914`) with bold white Space Grotesk type.
- **Interactive Genre Filters:** Pill tokens with deep obsidian backgrounds that fill to bright crimson when selected.

### Movie & Show Cards
- **Poster Cards (2:3 ratio):** Styled with `0.5rem` rounded corners, 1px hairline translucent borders, and an inset dark gradient at the bottom for labels.
- **Hover/Focus State:** Scales to `1.05x` with a smooth 200ms cubic-bezier transition, illuminating an outer 1px border in pure crimson (`#E50914`) accompanied by the crimson ambient glow.
- **Progress Bar Indicator:** Embedded directly at the bottom edge of cards; 3px height with deep slate track (`#262630`) and crimson fill (`#E50914`).

### Inputs & Search Bars
- **Search Surface:** Pill or rounded container (height 48px) with `rgba(255, 255, 255, 0.06)` backdrop fill and a 1px border of `rgba(255, 255, 255, 0.12)`.
- **Active State:** Border transitions to pure crimson (`#E50914`) with an interior glow; text renders in crisp white with placeholder in silver (`#A3A3B2`).

### Media Carousel Rails
- Edge-to-edge horizontal containers with smooth inertia scroll, featuring floating frosted glass left/right navigational arrows that reveal on row hover.