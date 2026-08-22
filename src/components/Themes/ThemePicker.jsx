import { useStore } from '../../store/useStore.js'

export default function ThemePicker() {
  const { themes, currentThemeId, applyTheme, setShowThemePicker } = useStore((s) => ({
    themes: s.themes,
    currentThemeId: s.currentThemeId,
    applyTheme: s.applyTheme,
    setShowThemePicker: s.setShowThemePicker,
  }))

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowThemePicker(false)}>
      <div className="modal" style={{ width: 520, maxWidth: '96vw' }}>
        <div className="modal-header">
          <div>
            <div className="modal-title">Color Themes</div>
            <div className="modal-subtitle">Changes the accent color in the editor UI and injects the color into your LaTeX document</div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={() => setShowThemePicker(false)} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {themes.map((theme) => {
              const active = theme.id === currentThemeId
              return (
                <button
                  key={theme.id}
                  id={`theme-${theme.id}`}
                  onClick={() => { applyTheme(theme.id); setShowThemePicker(false) }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    background: active ? 'var(--bg-3)' : 'var(--bg-2)',
                    border: `1.5px solid ${active ? theme.preview : 'var(--border-1)'}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all var(--t)',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.preview }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.borderColor = 'var(--border-1)' }}
                >
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: theme.preview,
                    flexShrink: 0,
                    boxShadow: active ? `0 0 0 3px ${theme.preview}40` : 'none',
                    transition: 'box-shadow var(--t)',
                  }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-0)', lineHeight: 1.3 }}>{theme.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace' }}>#{theme.accentHex}</div>
                  </div>
                  {active && (
                    <svg style={{ marginLeft: 'auto' }} width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" fill={theme.preview} />
                      <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              )
            })}
          </div>

          <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-0)' }}>
            <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
              Theme changes inject a <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--text-1)' }}>\definecolor</code> macro into your LaTeX source. To persist a theme, compile and download the document after selecting.
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={() => setShowThemePicker(false)}>Close</button>
        </div>
      </div>
    </div>
  )
}
