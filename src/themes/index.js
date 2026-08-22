/**
 * Color themes for ResumeTeX.
 * Each theme defines:
 *   cssVars  — applied to :root CSS custom properties (UI)
 *   accentHex — hex color injected into LaTeX \definecolor{resumeaccent}
 */

export const themes = [
  {
    id: 'neon-blue',
    name: 'Neon Blue',
    accentHex: '3B82F6',
    preview: '#3B82F6',
    cssVars: {
      '--accent': '#60A5FA',
      '--accent-hover': '#93C5FD',
      '--accent-dim': 'rgba(96, 165, 250, 0.15)',
    },
  },
  {
    id: 'cyber-magenta',
    name: 'Cyber Magenta',
    accentHex: 'D946EF',
    preview: '#D946EF',
    cssVars: {
      '--accent': '#E879F9',
      '--accent-hover': '#F0ABFC',
      '--accent-dim': 'rgba(232, 121, 249, 0.15)',
    },
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    accentHex: '10B981',
    preview: '#10B981',
    cssVars: {
      '--accent': '#34D399',
      '--accent-hover': '#6EE7B7',
      '--accent-dim': 'rgba(52, 211, 153, 0.15)',
    },
  },
  {
    id: 'amethyst',
    name: 'Amethyst Purple',
    accentHex: '8B5CF6',
    preview: '#8B5CF6',
    cssVars: {
      '--accent': '#A78BFA',
      '--accent-hover': '#C4B5FD',
      '--accent-dim': 'rgba(167, 139, 250, 0.15)',
    },
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    accentHex: 'F97316',
    preview: '#F97316',
    cssVars: {
      '--accent': '#FB923C',
      '--accent-hover': '#FDBA74',
      '--accent-dim': 'rgba(251, 146, 60, 0.15)',
    },
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    accentHex: 'F43F5E',
    preview: '#F43F5E',
    cssVars: {
      '--accent': '#FB7185',
      '--accent-hover': '#FDA4AF',
      '--accent-dim': 'rgba(251, 113, 133, 0.15)',
    },
  },
  {
    id: 'slate-gray',
    name: 'Slate Gray',
    accentHex: '64748B',
    preview: '#64748B',
    cssVars: {
      '--accent': '#94A3B8',
      '--accent-hover': '#CBD5E1',
      '--accent-dim': 'rgba(148, 163, 184, 0.15)',
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
      '--accent-dim': 'rgba(200, 200, 200, 0.1)',
    },
  },
]

export const getTheme = (id) => themes.find((t) => t.id === id) || themes[0]
