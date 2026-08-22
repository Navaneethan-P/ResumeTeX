import { useStore } from '../../store/useStore.js'
import ExportMenu from '../Export/ExportMenu.jsx'

export default function Header() {
  const {
    compile, isCompiling,
    setShowFillForm,
    setShowTemplateGallery,
    setShowThemePicker,
    showLog, setShowLog,
    atsScore,
    currentThemeId,
    themes,
  } = useStore((s) => ({
    compile: s.compile,
    isCompiling: s.isCompiling,
    setShowFillForm: s.setShowFillForm,
    setShowTemplateGallery: s.setShowTemplateGallery,
    setShowThemePicker: s.setShowThemePicker,
    showLog: s.showLog,
    setShowLog: s.setShowLog,
    atsScore: s.atsScore,
    currentThemeId: s.currentThemeId,
    themes: s.themes,
  }))

  const currentTheme = themes.find((t) => t.id === currentThemeId)
  const score = atsScore?.score ?? 0
  const scoreColor = atsScore?.color ?? 'var(--text-2)'

  return (
    <header style={{
      height: 'var(--header-height)',
      background: 'var(--bg-1)',
      borderBottom: '1px solid var(--border-0)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      gap: 8,
      flexShrink: 0,
      position: 'relative',
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 8 }}>
        <div style={{
          width: 28,
          height: 28,
          background: 'var(--accent)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 3h12v10H2V3z" stroke="var(--bg-0)" strokeWidth="1.3" strokeLinejoin="round"/>
            <path d="M5 6h6M5 8.5h6M5 11h4" stroke="var(--bg-0)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-0)', lineHeight: 1.2 }}>ResumeTeX</div>
          <div style={{ fontSize: 10, color: 'var(--text-3)', lineHeight: 1 }}>LaTeX Resume Editor</div>
        </div>
      </div>

      <div className="divider-v" style={{ height: 24 }} />

      {/* Fill Form button */}
      <button
        id="fill-form-btn"
        className="btn btn-secondary"
        onClick={() => setShowFillForm(true)}
        data-tooltip="Fill form and generate an AI prompt to get LaTeX code"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="2" y="2" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M4 5h6M4 7h6M4 9h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        Fill Form
      </button>

      {/* Templates */}
      <button
        id="templates-btn"
        className="btn btn-ghost"
        onClick={() => setShowTemplateGallery(true)}
        data-tooltip="Browse and apply resume templates"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="5" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="8" y="1" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="8" y="7" width="5" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="1" y="10" width="5" height="3" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
        Templates
      </button>

      {/* Theme */}
      <button
        id="themes-btn"
        className="btn btn-ghost"
        onClick={() => setShowThemePicker(true)}
        data-tooltip="Change accent color theme"
        style={{ gap: 7 }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: currentTheme?.preview || 'var(--accent)', flexShrink: 0 }} />
        Theme
      </button>

      <div className="divider-v" style={{ height: 24 }} />

      {/* ATS Score mini badge */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'default' }}
        data-tooltip={`ATS Compatibility Score: ${score}/100`}
      >
        <span style={{ fontSize: 11, color: 'var(--text-2)' }}>ATS</span>
        <span style={{
          fontSize: 12,
          fontWeight: 700,
          color: scoreColor,
          minWidth: 28,
          textAlign: 'right',
        }}>
          {score}
        </span>
        <div style={{
          width: 48,
          height: 4,
          background: 'var(--bg-3)',
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${score}%`,
            height: '100%',
            background: scoreColor,
            borderRadius: 2,
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* Log toggle */}
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => setShowLog(!showLog)}
        data-tooltip="Toggle compilation log"
        style={{ marginLeft: 2 }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <rect x="1" y="1" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M3 4h7M3 6.5h7M3 9h5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
        </svg>
        Log
      </button>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Keyboard shortcut hint */}
      <span style={{ fontSize: 11, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 4 }}>
        <kbd style={{ background: 'var(--bg-3)', border: '1px solid var(--border-1)', borderRadius: 3, padding: '1px 5px', fontSize: 10, fontFamily: 'inherit' }}>Ctrl</kbd>
        <span>+</span>
        <kbd style={{ background: 'var(--bg-3)', border: '1px solid var(--border-1)', borderRadius: 3, padding: '1px 5px', fontSize: 10, fontFamily: 'inherit' }}>Enter</kbd>
        <span style={{ marginLeft: 2 }}>to compile</span>
      </span>

      {/* Export */}
      <ExportMenu />

      {/* Compile button */}
      <button
        id="compile-btn"
        className="btn btn-primary"
        onClick={compile}
        disabled={isCompiling}
        style={{ gap: 7 }}
      >
        {isCompiling ? (
          <><div className="spinner" style={{ width: 12, height: 12, borderWidth: 2 }} />Compiling...</>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 2l4 4.5L2 11h1.5L6.5 7.5 9 11h1.5L7 6.5 10.5 2H9L6.5 5 4 2H2z" fill="currentColor"/>
            </svg>
            Compile
          </>
        )}
      </button>

      {/* Privacy indicator */}
      <div
        data-tooltip="No login required. No data stored on any server. All encryption is client-side."
        style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '0 10px', height: 28, background: 'var(--bg-3)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-sm)', cursor: 'default' }}
      >
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <rect x="1.5" y="4.5" width="8" height="6" rx="1" stroke="var(--success)" strokeWidth="1.2"/>
          <path d="M3.5 4.5V3a2 2 0 014 0v1.5" stroke="var(--success)" strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx="5.5" cy="7.5" r="0.8" fill="var(--success)"/>
        </svg>
        <span style={{ fontSize: 10, color: 'var(--success)', fontWeight: 500 }}>Private</span>
      </div>
    </header>
  )
}
