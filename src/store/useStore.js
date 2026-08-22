import { create } from 'zustand'
import { templates } from '../templates/index.js'
import { themes } from '../themes/index.js'
import { scoreATS } from '../ats/scorer.js'

const DEFAULT_LATEX = templates[0].code

export const useStore = create((set, get) => ({
  // Editor state
  latexCode: DEFAULT_LATEX,
  setLatexCode: (code) => {
    set({ latexCode: code, atsScore: scoreATS(code) })
  },

  // Compilation state
  pdfUrl: null,
  compilationLog: '',
  isCompiling: false,
  compilationError: false,

  compile: async () => {
    const { latexCode } = get()
    set({ isCompiling: true, compilationError: false, compilationLog: 'Sending to compiler...' })

    try {
      // Primary: latex.online API
      const response = await fetch('https://latex.online/api/compile?command=pdflatex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-tex' },
        body: latexCode,
      })

      if (response.ok) {
        const contentType = response.headers.get('content-type') || ''
        if (contentType.includes('pdf') || contentType.includes('octet-stream')) {
          const blob = await response.blob()
          const url = URL.createObjectURL(blob)
          const prev = get().pdfUrl
          if (prev) URL.revokeObjectURL(prev)
          set({
            pdfUrl: url,
            isCompiling: false,
            compilationLog: 'Compilation successful.',
            compilationError: false,
          })
        } else {
          const text = await response.text()
          set({
            isCompiling: false,
            compilationLog: text || 'Compilation returned non-PDF output.',
            compilationError: true,
          })
        }
      } else {
        const errText = await response.text().catch(() => `HTTP ${response.status}`)
        set({
          isCompiling: false,
          compilationLog: errText || `Compilation service returned error ${response.status}.`,
          compilationError: true,
        })
      }
    } catch (err) {
      // Fallback: latexonline.cc URL-based (works for shorter documents)
      if (latexCode.length < 2000) {
        const url = `https://latexonline.cc/compile?text=${encodeURIComponent(latexCode)}`
        const prev = get().pdfUrl
        if (prev && prev.startsWith('blob:')) URL.revokeObjectURL(prev)
        set({
          pdfUrl: url,
          isCompiling: false,
          compilationLog: 'Compiled via fallback service (latexonline.cc).',
          compilationError: false,
        })
      } else {
        set({
          isCompiling: false,
          compilationLog: `Compilation failed: ${err.message}\n\nThe compilation service may be unavailable or a CORS policy is blocking the request. You can use the "Compile in Cloud" button to generate your PDF.`,
          compilationError: true,
        })
      }
    }
  },

  // Template state
  currentTemplateId: templates[0].id,
  templates,
  applyTemplate: (templateId) => {
    const tpl = templates.find((t) => t.id === templateId)
    if (!tpl) return
    set({
      latexCode: tpl.code,
      currentTemplateId: templateId,
      atsScore: scoreATS(tpl.code),
    })
  },

  // Theme state
  currentThemeId: themes[0].id,
  themes,
  applyTheme: (themeId) => {
    const theme = themes.find((t) => t.id === themeId)
    if (!theme) return
    // Apply CSS custom properties to :root
    Object.entries(theme.cssVars).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val)
    })
    // Update latex with new accent color macro
    const { latexCode } = get()
    const updated = latexCode.replace(
      /\\definecolor\{resumeaccent\}\{HTML\}\{[A-Fa-f0-9]{6}\}/,
      `\\definecolor{resumeaccent}{HTML}{${theme.accentHex}}`
    )
    set({ currentThemeId: themeId, latexCode: updated })
  },

  // ATS Score
  atsScore: scoreATS(DEFAULT_LATEX),
  atsSuggestions: [],

  // UI state
  showFillForm: false,
  showTemplateGallery: false,
  showThemePicker: false,
  showEncryptionModal: false,
  showLog: false,
  splitPos: 50, // percentage

  setShowFillForm: (v) => set({ showFillForm: v }),
  setShowTemplateGallery: (v) => set({ showTemplateGallery: v }),
  setShowThemePicker: (v) => set({ showThemePicker: v }),
  setShowLog: (v) => set({ showLog: v }),
  setSplitPos: (v) => set({ splitPos: Math.max(20, Math.min(80, v)) }),

  // Insert generated LaTeX from AI workflow
  pasteGeneratedCode: (code) => {
    set({ latexCode: code, atsScore: scoreATS(code) })
  },
}))
