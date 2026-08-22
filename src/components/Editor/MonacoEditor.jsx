import Editor, { loader } from '@monaco-editor/react'
import { useStore } from '../../store/useStore.js'

// Pin Monaco to a specific CDN version to avoid loading failures
loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs',
  },
})

const LATEX_SNIPPETS = [
  { label: '\\section{}', insertText: '\\\\section{$1}', detail: 'Section heading' },
  { label: '\\textbf{}', insertText: '\\\\textbf{$1}', detail: 'Bold text' },
  { label: '\\textit{}', insertText: '\\\\textit{$1}', detail: 'Italic text' },
  { label: '\\begin{itemize}', insertText: '\\\\begin{itemize}\n  \\\\item $1\n\\\\end{itemize}', detail: 'Bullet list' },
  { label: '\\begin{enumerate}', insertText: '\\\\begin{enumerate}\n  \\\\item $1\n\\\\end{enumerate}', detail: 'Numbered list' },
  { label: '\\href{}{}', insertText: '\\\\href{$1}{$2}', detail: 'Hyperlink' },
  { label: '\\hfill', insertText: '\\\\hfill', detail: 'Horizontal fill' },
  { label: '\\vspace{}', insertText: '\\\\vspace{$1pt}', detail: 'Vertical space' },
  { label: '\\textcolor{}{}', insertText: '\\\\textcolor{resumeaccent}{$1}', detail: 'Accent colored text' },
  { label: '\\rule{}{}', insertText: '\\\\rule{\\\\linewidth}{0.4pt}', detail: 'Horizontal rule' },
]

function beforeMount(monaco) {
  // Register LaTeX language if not already registered
  if (!monaco.languages.getLanguages().some((l) => l.id === 'latex')) {
    monaco.languages.register({ id: 'latex' })
  }

  // Tokenizer (basic LaTeX syntax highlighting)
  monaco.languages.setMonarchTokensProvider('latex', {
    tokenizer: {
      root: [
        [/%.*$/, 'comment'],
        [/\\[a-zA-Z@]+/, 'keyword'],
        [/\{|\}/, 'delimiter.bracket'],
        [/\[|\]/, 'delimiter.square'],
        [/\$\$?/, 'string'],
        [/[0-9]+/, 'number'],
        [/[a-zA-Z\u0080-\uFFFF]+/, 'identifier'],
      ],
    },
  })

  // Completion provider
  monaco.languages.registerCompletionItemProvider('latex', {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position)
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      }
      return {
        suggestions: LATEX_SNIPPETS.map((s) => ({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.insertText,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: s.detail,
          range,
        })),
      }
    },
  })

  // Theme
  monaco.editor.defineTheme('resumetex-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6a7390', fontStyle: 'italic' },
      { token: 'keyword', foreground: '79c0ff' },
      { token: 'string', foreground: 'a5d6ff' },
      { token: 'number', foreground: 'f2cc60' },
      { token: 'delimiter.bracket', foreground: 'e2a97e' },
      { token: 'delimiter.square', foreground: 'e2a97e' },
      { token: 'identifier', foreground: 'c9d1d9' },
    ],
    colors: {
      'editor.background': '#0e0e10',
      'editor.foreground': '#c9d1d9',
      'editorLineNumber.foreground': '#3c3c50',
      'editorLineNumber.activeForeground': '#6a7390',
      'editor.lineHighlightBackground': '#161620',
      'editor.selectionBackground': '#264f78',
      'editorCursor.foreground': '#4da8ff',
      'editor.wordHighlightBackground': '#1a2a3a',
      'editorWidget.background': '#161618',
      'editorWidget.border': '#2a2a38',
      'input.background': '#1f1f24',
      'input.border': '#3c3c50',
      'focusBorder': '#4da8ff',
    },
  })
}

export default function MonacoEditor() {
  const latexCode = useStore((s) => s.latexCode)
  const setLatexCode = useStore((s) => s.setLatexCode)
  const compile = useStore((s) => s.compile)

  const handleMount = (editor, monaco) => {
    // Ctrl+Enter = compile
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      compile()
    })
    // Ctrl+S = compile (mimic save-to-compile workflow)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      compile()
    })
  }

  return (
    <Editor
      height="100%"
      language="latex"
      value={latexCode}
      onChange={(val) => setLatexCode(val || '')}
      beforeMount={beforeMount}
      onMount={handleMount}
      theme="resumetex-dark"
      options={{
        fontSize: 13,
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontLigatures: true,
        lineNumbers: 'on',
        minimap: { enabled: true, scale: 0.7 },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        automaticLayout: true,
        tabSize: 2,
        insertSpaces: true,
        renderWhitespace: 'none',
        bracketPairColorization: { enabled: true },
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        suggestOnTriggerCharacters: true,
        quickSuggestions: { other: true, comments: false, strings: false },
        padding: { top: 12, bottom: 12 },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        overviewRulerLanes: 0,
        renderLineHighlight: 'line',
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        smoothScrolling: true,
        contextmenu: true,
      }}
    />
  )
}
