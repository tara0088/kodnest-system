# KodNest Premium Build System
## Design System Documentation

A premium SaaS design system built with calm intentionality, coherent structure, and confident execution.

---

## Core Philosophy

**Calm • Intentional • Coherent • Confident**

This system prioritizes clarity over decoration, consistency over novelty, and purpose over spectacle. Every element serves the user's workflow with quiet confidence.

---

## Color System

| Purpose    | Color     | Hex Code | Usage                           |
|------------|-----------|----------|---------------------------------|
| Background | Off-White | `#F7F6F3`| Primary canvas, card surfaces   |
| Text       | Deep Black| `#111111`| Headlines, body text, labels    |
| Accent     | Deep Red  | `#8B0000`| Primary actions, highlights     |
| Success    | Muted Green| `#2E8B57`| Confirmation states, success    |
| Warning    | Muted Amber| `#D2691E`| Caution states, warnings        |

**Rule**: Maximum 4 active colors. No gradients, no glassmorphism, no neon effects.

---

## Typography

### Headings
- **Font**: Serif (Georgia, Times New Roman, or custom serif)
- **Style**: Confident, generous leading
- **Sizes**: 
  - H1: 48px / 1.2
  - H2: 36px / 1.3
  - H3: 24px / 1.4
  - H4: 20px / 1.4

### Body Text
- **Font**: Clean sans-serif (system-ui, -apple-system, BlinkMacSystemFont)
- **Size**: 16–18px
- **Line Height**: 1.6–1.8
- **Max Width**: 720px for readability

**Rule**: No decorative fonts. No arbitrary sizing. Every text element has clear hierarchy.

---

## Spacing System

**Consistent Scale**: 8px, 16px, 24px, 40px, 64px

Never use random values like 13px, 27px, etc. Whitespace is an intentional design element.

---

## Layout Structure

Every page follows this exact structure:

```
┌─────────────────────────────────────┐
│  [ TOP BAR ]                        │
├─────────────────────────────────────┤
│  [ CONTEXT HEADER ]                 │
├─────────────────────────────────────┤
│  [ PRIMARY WORKSPACE ] [ SECONDARY  │
│  (70% width)         ] [ PANEL ]    │
│                      ] (30% width)  │
├─────────────────────────────────────┤
│  [ PROOF FOOTER ]                   │
└─────────────────────────────────────┘
```

---

## Component Library

### Buttons
- **Primary**: Solid deep red `#8B0000`
- **Secondary**: Outlined with `#111111` border
- **Hover**: 150–200ms ease-in-out
- **Border Radius**: Consistent 4px everywhere

### Inputs
- Clean borders (1px `#111111`)
- No heavy shadows
- Clear focus state (border color change)
- Consistent padding

### Cards
- Subtle border (`#E5E5E5`)
- No drop shadows
- Balanced padding using spacing scale
- Consistent corner radius

---

## Interaction Principles

- **Transitions**: 150–200ms ease-in-out
- **No bounce effects**
- **No parallax**
- **No animation noise**
- **Purposeful motion only**

---

## State Management

### Error States
- Explain what went wrong
- Provide clear fix instructions
- Never blame the user
- Maintain calm tone

### Empty States
- Provide next actionable step
- Never feel dead or abandoned
- Clear path forward

---

## Global Patterns

### Top Bar
- Left: Project name
- Center: Progress indicator (Step X / Y)
- Right: Status badge (Not Started / In Progress / Shipped)

### Context Header
- Large serif headline
- One-line subtext
- Clear purpose statement
- No marketing language

### Proof Footer
- Checklist format:□ UI Built□ Logic Working□ Test Passed□ Deployed
- Each checkbox requires user proof input
- Persistent across all pages

---

## Quality Assurance

**Visual Consistency Rules**:
- Every component uses the same spacing scale
- Color palette limited to 4 colors
- Typography follows strict hierarchy
- No visual drift between pages
- All interactions follow same timing
- Consistent border radius system

This system feels like one mind designed it—because it did.