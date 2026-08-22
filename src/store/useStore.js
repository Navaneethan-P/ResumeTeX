import { create } from 'zustand'
import { templates } from '../templates/index.js'
import { themes } from '../themes/index.js'
import { scoreATS, scoreJobKeywords } from '../ats/scorer.js'
import { compileLatex, postTexliveToIframe, COMPILE_IFRAME_NAME } from '../compile/compiler.js'

const STORAGE_KEY = 'resumetex-draft-v2'
const DEFAULT_LATEX = templates[0].code

function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveDraft(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      latexCode: state.latexCode,
      currentTemplateId: state.currentTemplateId,
      currentThemeId: state.currentThemeId,
      showAts: state.showAts,
      jobDescription: state.jobDescription,
      uiMode: state.uiMode,
    }))
  } catch {
    /* quota / private mode */
  }
}

const draft = typeof window !== 'undefined' ? loadDraft() : null

function applyCssTheme(theme, uiMode) {
  if (!theme) return
  Object.entries(theme.cssVars).forEach(([key, val]) => {
    document.documentElement.style.setProperty(key, val)
  })
  document.documentElement.setAttribute('data-ui', uiMode || 'dark')
}

if (typeof document !== 'undefined') {
  const theme = themes.find((t) => t.id === draft?.currentThemeId) || themes[0]
  applyCssTheme(theme, draft?.uiMode || 'dark')
}

let persistTimer = 0
function schedulePersist(get) {
  clearTimeout(persistTimer)
  persistTimer = setTimeout(() => saveDraft(get()), 400)
}

function injectAccent(latex, accentHex) {
  const macro = `\\definecolor{resumeaccent}{HTML}{${accentHex}}`
  if (/\\definecolor\{resumeaccent\}\{HTML\}\{[A-Fa-f0-9]{6}\}/.test(latex)) {
    return latex.replace(
      /\\definecolor\{resumeaccent\}\{HTML\}\{[A-Fa-f0-9]{6}\}/,
      macro
    )
  }
  if (/\\begin\{document\}/.test(latex)) {
    return latex.replace('\\begin{document}', `${macro}\n\\begin{document}`)
  }
  return `${macro}\n${latex}`
}

export const useStore = create((set, get) => ({
  latexCode: draft?.latexCode || DEFAULT_LATEX,
  setLatexCode: (code) => {
    const jobDescription = get().jobDescription
    set({
      latexCode: code,
      atsScore: scoreATS(code),
      keywordScore: scoreJobKeywords(code, jobDescription),
    })
    schedulePersist(get)
  },

  pdfUrl: null,
  pdfMode: null,
  compilationLog: '',
  isCompiling: false,
  compilationError: false,
  compileSource: '',

  compile: async () => {
    const { latexCode } = get()
    set({
      isCompiling: true,
      compilationError: false,
      compilationLog: 'Starting compilation...',
      showLog: true,
    })

    try {
      const result = await compileLatex(latexCode, {
        onStatus: (msg) => set({ compilationLog: msg }),
      })
      const prev = get().pdfUrl
      if (prev && String(prev).startsWith('blob:')) URL.revokeObjectURL(prev)

      if (result.type === 'blob') {
        const url = URL.createObjectURL(result.blob)
        set({
          pdfUrl: url,
          pdfMode: 'blob',
          isCompiling: false,
          compilationLog: result.log,
          compilationError: false,
          compileSource: result.source,
          showLog: false,
        })
      } else if (result.type === 'iframe-fallback') {
        set({
          pdfUrl: 'iframe',
          pdfMode: 'iframe',
          isCompiling: false,
          compilationLog: result.log,
          compilationError: false,
          compileSource: result.source,
        })
        // Wait for React to render the iframe before submitting the form to its target
        setTimeout(() => {
          postTexliveToIframe(result.latex, COMPILE_IFRAME_NAME)
        }, 50)
      } else {
        set({
          pdfUrl: 'iframe',
          pdfMode: 'iframe',
          isCompiling: false,
          compilationLog: result.log,
          compilationError: false,
          compileSource: result.source,
        })
      }
    } catch (err) {
      set({
        isCompiling: false,
        compilationLog: err.message || String(err),
        compilationError: true,
        showLog: true,
      })
    }
  },

  currentTemplateId: draft?.currentTemplateId || templates[0].id,
  templates,
  applyTemplate: (templateId) => {
    const tpl = templates.find((t) => t.id === templateId)
    if (!tpl) return
    const theme = themes.find((t) => t.id === get().currentThemeId) || themes[0]
    const code = injectAccent(tpl.code, theme.accentHex)
    set({
      latexCode: code,
      currentTemplateId: templateId,
      atsScore: scoreATS(code),
      keywordScore: scoreJobKeywords(code, get().jobDescription),
    })
    schedulePersist(get)
  },

  currentThemeId: draft?.currentThemeId || themes[0].id,
  themes,
  uiMode: draft?.uiMode || 'dark',
  applyTheme: (themeId) => {
    const theme = themes.find((t) => t.id === themeId)
    if (!theme) return
    applyCssTheme(theme, get().uiMode)
    const updated = injectAccent(get().latexCode, theme.accentHex)
    set({ currentThemeId: themeId, latexCode: updated })
    schedulePersist(get)
  },
  setUiMode: (mode) => {
    const theme = themes.find((t) => t.id === get().currentThemeId) || themes[0]
    applyCssTheme(theme, mode)
    set({ uiMode: mode })
    schedulePersist(get)
  },

  atsScore: scoreATS(draft?.latexCode || DEFAULT_LATEX),
  jobDescription: draft?.jobDescription || '',
  keywordScore: scoreJobKeywords(draft?.latexCode || DEFAULT_LATEX, draft?.jobDescription || ''),
  setJobDescription: (text) => {
    set({
      jobDescription: text,
      keywordScore: scoreJobKeywords(get().latexCode, text),
    })
    schedulePersist(get)
  },

  showFillForm: false,
  showTemplateGallery: false,
  showThemePicker: false,
  showHelp: false,
  showAiHelp: false,
  showWelcome: typeof window !== 'undefined' && !localStorage.getItem('resumetex-welcome-v1'),
  showAts: draft?.showAts !== undefined ? draft.showAts : true,
  splitPos: draft?.splitPos || 50,
  editorFallback: false,

  setShowFillForm: (v) => set({ showFillForm: v }),
  setShowTemplateGallery: (v) => set({ showTemplateGallery: v }),
  setShowThemePicker: (v) => set({ showThemePicker: v }),
  setShowHelp: (v) => set({ showHelp: v }),
  setShowAiHelp: (v) => set({ showAiHelp: v }),
  dismissWelcome: () => {
    try { localStorage.setItem('resumetex-welcome-v1', '1') } catch { /* ignore */ }
    set({ showWelcome: false })
  },
  setShowLog: (v) => set({ showLog: v }),
  setShowAts: (v) => {
    set({ showAts: v })
    schedulePersist(get)
  },
  setSplitPos: (v) => {
    set({ splitPos: Math.max(22, Math.min(78, v)) })
    schedulePersist(get)
  },
  setEditorFallback: (v) => set({ editorFallback: v }),

  pasteGeneratedCode: (code) => {
    const theme = themes.find((t) => t.id === get().currentThemeId) || themes[0]
    const injected = injectAccent(code, theme.accentHex)
    set({
      latexCode: injected,
      atsScore: scoreATS(injected),
      keywordScore: scoreJobKeywords(injected, get().jobDescription),
    })
    schedulePersist(get)
  },

  closeAllModals: () => set({
    showFillForm: false,
    showTemplateGallery: false,
    showThemePicker: false,
    showHelp: false,
  }),
}))
