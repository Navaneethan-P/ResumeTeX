import React, { useState } from 'react'
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
  const [isDragging, setIsDragging] = useState(false)

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

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (!file) return

    if (file.name.endsWith('.tex') || file.type.includes('text') || file.type === '') {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const text = ev.target?.result
        if (typeof text === 'string') {
          setLatexCode(text)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%' }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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
      
      {isDragging && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(96, 165, 250, 0.1)',
          backdropFilter: 'blur(2px)',
          border: '2px dashed var(--accent)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{
            background: 'var(--bg-1)',
            padding: '16px 24px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>Drop .tex file to load</span>
          </div>
        </div>
      )}
    </div>
  )
}

