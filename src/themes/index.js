/**
 * Color themes for ResumeTeX.
 * Each theme defines:
 *   cssVars  — applied to :root CSS custom properties (UI)
 *   accentHex — hex color injected into LaTeX \definecolor{resumeaccent}
 */

export const themes = [
  {
    id: 'steel-blue',
    name: 'Steel Blue',
    accentHex: '4DA8FF',
    preview: '#4DA8FF',
    cssVars: {
      '--accent': '#4da8ff',
      '--accent-hover': '#72bbff',
      '--accent-dim': 'rgba(77,168,255,0.12)',
    },
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    accentHex: '2E7D52',
    preview: '#2E7D52',
    cssVars: {
      '--accent': '#3fb950',
      '--accent-hover': '#56d068',
      '--accent-dim': 'rgba(63,185,80,0.12)',
    },
  },
  {
    id: 'burgundy',
    name: 'Burgundy Professional',
    accentHex: '8B1A3A',
    preview: '#8B1A3A',
    cssVars: {
      '--accent': '#c94070',
      '--accent-hover': '#d9628a',
      '--accent-dim': 'rgba(201,64,112,0.12)',
    },
  },
  {
    id: 'slate-gray',
    name: 'Slate Gray',
    accentHex: '607080',
    preview: '#607080',
    cssVars: {
      '--accent': '#8eabb8',
      '--accent-hover': '#a3c0ce',
      '--accent-dim': 'rgba(142,171,184,0.12)',
    },
  },
  {
    id: 'ocean-teal',
    name: 'Ocean Teal',
    accentHex: '0D7377',
    preview: '#0D7377',
    cssVars: {
      '--accent': '#14b8b8',
      '--accent-hover': '#2dcece',
      '--accent-dim': 'rgba(20,184,184,0.12)',
    },
  },
  {
    id: 'warm-amber',
    name: 'Warm Amber',
    accentHex: 'C9820A',
    preview: '#C9820A',
    cssVars: {
      '--accent': '#f5a623',
      '--accent-hover': '#f7b94a',
      '--accent-dim': 'rgba(245,166,35,0.12)',
    },
  },
  {
    id: 'deep-navy',
    name: 'Deep Navy',
    accentHex: '1B3A6B',
    preview: '#1B3A6B',
    cssVars: {
      '--accent': '#4a7ecf',
      '--accent-hover': '#6396dc',
      '--accent-dim': 'rgba(74,126,207,0.12)',
    },
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    accentHex: 'B5736A',
    preview: '#B5736A',
    cssVars: {
      '--accent': '#d4897f',
      '--accent-hover': '#de9f97',
      '--accent-dim': 'rgba(212,137,127,0.12)',
    },
  },
  {
    id: 'charcoal',
    name: 'Charcoal Professional',
    accentHex: '4A4A5A',
    preview: '#4A4A5A',
    cssVars: {
      '--accent': '#8888a8',
      '--accent-hover': '#9e9ebf',
      '--accent-dim': 'rgba(136,136,168,0.12)',
    },
  },
  {
    id: 'deep-purple',
    name: 'Deep Purple',
    accentHex: '5C3D8F',
    preview: '#5C3D8F',
    cssVars: {
      '--accent': '#9b72cf',
      '--accent-hover': '#b08ddf',
      '--accent-dim': 'rgba(155,114,207,0.12)',
    },
  },
  {
    id: 'coral-sunrise',
    name: 'Coral Sunrise',
    accentHex: 'C0522A',
    preview: '#C0522A',
    cssVars: {
      '--accent': '#e07040',
      '--accent-hover': '#ea8d60',
      '--accent-dim': 'rgba(224,112,64,0.12)',
    },
  },
  {
    id: 'sage-green',
    name: 'Sage and Cream',
    accentHex: '5A7A5A',
    preview: '#5A7A5A',
    cssVars: {
      '--accent': '#7aaa7a',
      '--accent-hover': '#92bc92',
      '--accent-dim': 'rgba(122,170,122,0.12)',
    },
  },
  {
    id: 'royal-blue',
    name: 'Royal Blue',
    accentHex: '2855A0',
    preview: '#2855A0',
    cssVars: {
      '--accent': '#4472c4',
      '--accent-hover': '#6089d4',
      '--accent-dim': 'rgba(68,114,196,0.12)',
    },
  },
  {
    id: 'monochrome',
    name: 'Monochrome Classic',
    accentHex: '333333',
    preview: '#888888',
    cssVars: {
      '--accent': '#cccccc',
      '--accent-hover': '#e0e0e0',
      '--accent-dim': 'rgba(200,200,200,0.1)',
    },
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    accentHex: 'FFD700',
    preview: '#FFD700',
    cssVars: {
      '--accent': '#ffd700',
      '--accent-hover': '#ffe34d',
      '--accent-dim': 'rgba(255,215,0,0.12)',
    },
  },
]

export const getTheme = (id) => themes.find((t) => t.id === id) || themes[0]
