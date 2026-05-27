# Zenin Design System

## Theme

Light dominant. Scene: comparaison d'haltères dans un intérieur lumineux.

## Color (OKLCH)

| Token | Role |
|-------|------|
| surface | Page background ~98% L |
| ink | Text, chrome ~20% L |
| muted | Secondary text ~45% L |
| line | 1px separators ~88% L |

No accent color. No pure #000 or #fff.

## Typography

- Display: Bricolage Grotesque
- Body: Hanken Grotesk
- Scale ratio >= 1.25, hero H1 via clamp()

## Motion

ease-out cubic-bezier(0.23, 1, 0.32, 1), max 250ms, transform + opacity only. Button active scale(0.97). Respect prefers-reduced-motion.

## Bans

Side-stripe borders, gradient text, glassmorphism default, hero-metric template, identical icon card grids, modal-first flows, em dashes in copy.
