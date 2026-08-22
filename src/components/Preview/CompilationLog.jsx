import { useStore } from '../../store/useStore.js'

export default function CompilationLog() {
  const { compilationLog, compilationError, showLog, setShowLog } = useStore((s) => ({
    compilationLog: s.compilationLog,
    compilationError: s.compilationError,
    showLog: s.showLog,
    setShowLog: s.setShowLog,
  }))

  const lines = compilationLog ? compilationLog.split('\n') : []

  const getLineStyle = (line) => {
    const l = line.toLowerCase()
    if (l.startsWith('!') || l.includes('error') || l.includes('fatal')) return { color: 'var(--error)' }
    if (l.includes('warning') || l.includes('warn')) return { color: 'var(--warning)' }
    if (l.includes('successful') || l.includes('success')) return { color: 'var(--success)' }
    return { color: 'var(--text-2)' }
  }

  return (
    <div style={{
      borderTop: '1px solid var(--border-0)',
      background: 'var(--bg-0)',
      flexShrink: 0,
      overflow: 'hidden',
      transition: 'height var(--t-slow)',
    }}>
      {/* Log header / toggle bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          height: 30,
          cursor: 'pointer',
          userSelect: 'none',
          borderBottom: showLog ? '1px solid var(--border-0)' : 'none',
        }}
        onClick={() => setShowLog(!showLog)}
        role="button"
        aria-expanded={showLog}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: compilationError ? 'var(--error)' : 'var(--text-2)' }}>
            Compilation Log
          </span>
          {compilationError && (
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--error)', display: 'inline-block' }} />
          )}
          {compilationLog && !compilationError && (
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
          )}
        </div>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ transform: showLog ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform var(--t)', color: 'var(--text-2)' }}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Log body */}
      {showLog && (
        <div style={{ height: 150, overflowY: 'auto', padding: '8px 16px' }}>
          {lines.length === 0 ? (
            <p style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace' }}>
              No compilation output yet. Press Compile to run.
            </p>
          ) : (
            lines.map((line, i) => (
              <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-all', ...getLineStyle(line) }}>
                {line || '\u00A0'}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
