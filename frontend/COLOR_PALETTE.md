# PrimeTrade Color Palette

## Color System

The application uses a beautiful ocean-inspired color palette with shades of blue, cyan, and turquoise to create a modern, professional, and calming user interface.

### Primary Colors

#### Deep Twilight (Dark Blue)
- **Usage**: Text, headers, dark accents
- **Hex**: `#03045e`
- **Shades**: 100-900
- **Use Cases**: Main headings, important text, dark mode elements

#### French Blue
- **Usage**: Secondary dark elements
- **Hex**: `#023e8a`
- **Shades**: 100-900
- **Use Cases**: Subheadings, borders, hover states

#### Bright Teal Blue
- **Usage**: Primary action elements
- **Hex**: `#0077b6`
- **Shades**: 100-900
- **Use Cases**: Links, buttons, active states

#### Blue Green
- **Usage**: Main brand color
- **Hex**: `#0096c7`
- **Shades**: 100-900
- **Use Cases**: Primary buttons, brand elements, CTAs

#### Turquoise Surf
- **Usage**: Interactive elements
- **Hex**: `#00b4d8`
- **Shades**: 100-900
- **Use Cases**: Hover states, active elements, highlights

#### Sky Aqua
- **Usage**: Accents and icons
- **Hex**: `#48cae4`
- **Shades**: 100-900
- **Use Cases**: Icons, decorative elements, secondary actions

#### Frosted Blue
- **Usage**: Light backgrounds
- **Hex**: `#90e0ef`
- **Shades**: 100-900
- **Use Cases**: Backgrounds, subtle highlights, secondary buttons

#### Light Cyan
- **Usage**: Very light backgrounds
- **Hex**: `#caf0f8`
- **Shades**: 100-900
- **Use Cases**: Page backgrounds, card backgrounds, disabled states

## Color Usage Guide

### Backgrounds
- **Page Background**: Gradient from `light_cyan-500` via `frosted_blue-600` to `blue_green-600`
- **Card Background**: `white/95` with backdrop blur
- **Modal Overlay**: `deep_twilight-900/50` with backdrop blur

### Text
- **Primary Text**: `deep_twilight-900`
- **Secondary Text**: `deep_twilight-700`
- **Muted Text**: `deep_twilight-600`
- **Disabled Text**: `deep_twilight-500`

### Buttons
- **Primary Button**: Gradient from `blue_green-600` to `turquoise_surf-600`
- **Secondary Button**: `frosted_blue-600` with `deep_twilight-800` text
- **Danger Button**: Red variants (existing)

### Interactive Elements
- **Links**: `blue_green-600` hover to `turquoise_surf-600`
- **Icons**: `sky_aqua-500`
- **Borders**: `sky_aqua-400`
- **Focus Ring**: `turquoise_surf-500`

### Status Colors
- **Success**: Green variants (existing)
- **Warning**: Yellow variants (existing)
- **Error**: Red variants (existing)
- **Info**: `blue_green-600`

## Gradients

### Page Backgrounds
```css
bg-gradient-to-br from-light_cyan-500 via-frosted_blue-600 to-blue_green-600
```

### Button Gradients
```css
bg-gradient-to-r from-blue_green-600 to-turquoise_surf-600
```

### Text Gradients
```css
bg-gradient-to-r from-blue_green-700 to-turquoise_surf-700 bg-clip-text text-transparent
```

### Icon Backgrounds
```css
bg-gradient-to-br from-blue_green-400 to-turquoise_surf-400
```

## Accessibility

All color combinations maintain WCAG 2.1 AA standards for:
- Text contrast ratios
- Interactive element visibility
- Focus indicators
- Color-blind friendly design

## Design Principles

1. **Ocean Theme**: Colors evoke trust, professionalism, and calmness
2. **Hierarchy**: Darker shades for important elements, lighter for backgrounds
3. **Consistency**: Same color families across all components
4. **Accessibility**: High contrast ratios for readability
5. **Modern**: Gradient backgrounds and glassmorphism effects

## Component Color Mapping

| Component | Primary Color | Secondary Color | Accent |
|-----------|---------------|-----------------|--------|
| Header | white/90 | deep_twilight-900 | blue_green-700 |
| Cards | white/95 | sky_aqua-200 | turquoise_surf-400 |
| Buttons | blue_green-600 | turquoise_surf-600 | white |
| Forms | white | sky_aqua-400 | turquoise_surf-500 |
| Modals | white | deep_twilight-900 | blue_green-700 |
| Stats | gradient variants | status colors | white |

## TailwindCSS Configuration

The color palette is fully integrated into TailwindCSS and available via:

```javascript
// Direct usage
className="text-blue_green-600 bg-light_cyan-500"

// Gradient usage
className="bg-gradient-to-r from-blue_green-600 to-turquoise_surf-600"

// Hover states
className="hover:text-turquoise_surf-600"
```

## Future Enhancements

- Dark mode variants
- Additional gradient combinations
- Animation color transitions
- Theme customization options
