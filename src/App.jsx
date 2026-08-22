import { useRef, useCallback } from 'react'
import { useStore } from './store/useStore.js'
import Header from './components/Header/Header.jsx'
import MonacoEditor from './components/Editor/MonacoEditor.jsx'
import PDFPreview from './components/Preview/PDFPreview.jsx'
import CompilationLog from './components/Preview/CompilationLog.jsx'
import ATSScorer from './components/ATS/ATSScorer.jsx'
import FillFormModal from './components/FillForm/FillFormModal.jsx'
import TemplateGallery from './components/Templates/TemplateGallery.jsx'
import ThemePicker from './components/Themes/ThemePicker.jsx'

export default function App() {
  const showFillForm = useStore((s) => s.showFillForm)
  const showTemplateGallery = useStore((s) => s.showTemplateGallery)
  const showThemePicker = useStore((s) => s.showThemePicker)
  const splitPos = useStore((s) => s.splitPos)
  const setSplitPos = useStore((s) => s.setSplitPos)

  const containerRef = useRef(null)
  const isDragging = useRef(false)

  const handleDividerMouseDown = useCallback((e) => {
    e.preventDefault()
    isDragging.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    const onMove = (ev) => {
      if (!isDragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ev.clientX - rect.left
      const pct = (x / rect.width) * 100
      setSplitPos(pct)
    }

    const onUp = () => {
      isDragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [setSplitPos])

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-0)',
      color: 'var(--text-0)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <Header />

      {/* Main workspace */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Editor panel */}
        <div style={{
          width: `${splitPos}%`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRight: '1px solid var(--border-0)',
        }}>
          {/* Editor toolbar */}
          <div style={{
            height: 'var(--toolbar-height)',
            background: 'var(--bg-1)',
            borderBottom: '1px solid var(--border-0)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            gap: 6,
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-2)' }}>
              Editor
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 4 }}>LaTeX</span>
          </div>

          {/* Monaco */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <MonacoEditor />
          </div>

          {/* Compilation log */}
          <CompilationLog />
        </div>

        {/* Resize divider */}
        <div
          onMouseDown={handleDividerMouseDown}
          style={{
            width: 4,
            background: 'var(--border-0)',
            cursor: 'col-resize',
            flexShrink: 0,
            transition: 'background var(--t)',
            position: 'relative',
            zIndex: 10,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--border-0)' }}
        />

        {/* Right panel: Preview + ATS */}
        <div style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
        }}>
          <PDFPreview />
          <ATSScorer />
        </div>
      </div>

      {/* Modals */}
      {showFillForm && <FillFormModal />}
      {showTemplateGallery && <TemplateGallery />}
      {showThemePicker && <ThemePicker />}
    </div>
  )
}
