import { useStore } from '../../store/useStore.js'

export default function PDFPreview() {
  const { pdfUrl, isCompiling, compile, compilationError } = useStore((s) => ({
    pdfUrl: s.pdfUrl,
    isCompiling: s.isCompiling,
    compile: s.compile,
    compilationError: s.compilationError,
  }))

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-0)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Preview toolbar */}
      <div style={{
        height: 'var(--toolbar-height)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        borderBottom: '1px solid var(--border-0)',
        gap: 8,
        flexShrink: 0,
        background: 'var(--bg-1)',
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-2)' }}>
          Preview
        </span>
        {pdfUrl && !isCompiling && !compilationError && (
          <span className="badge badge-success" style={{ fontSize: 10 }}>Ready</span>
        )}
        {compilationError && (
          <span className="badge badge-error" style={{ fontSize: 10 }}>Error</span>
        )}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm"
              data-tooltip="Open PDF in new tab"
              style={{ textDecoration: 'none' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M5 2H2v8h8V7M7 2h3v3M10 2L5.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Open
            </a>
          )}
        </div>
      </div>

      {/* PDF content area */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {isCompiling && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, background: 'var(--bg-0)', zIndex: 10 }}>
            <div className="spinner spinner-lg" />
            <p style={{ fontSize: 13, color: 'var(--text-2)' }}>Compiling LaTeX...</p>
            <p style={{ fontSize: 11, color: 'var(--text-3)' }}>This may take a few seconds</p>
          </div>
        )}

        {!pdfUrl && !isCompiling && (
          <div className="empty-state" style={{ height: '100%' }}>
            <div className="empty-state-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="4" width="32" height="40" rx="3" stroke="var(--border-2)" strokeWidth="1.5"/>
                <path d="M16 14h16M16 20h16M16 26h10" stroke="var(--border-2)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="empty-state-title">No preview yet</div>
            <div className="empty-state-desc">
              Write or paste LaTeX in the editor, then click Compile to render your PDF preview here.
            </div>
            <button className="btn btn-primary" style={{ marginTop: 4 }} onClick={compile}>
              Compile Now
            </button>
          </div>
        )}

        {compilationError && !isCompiling && (
          <div className="empty-state" style={{ height: '100%' }}>
            <div className="empty-state-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" stroke="var(--error)" strokeWidth="1.5" opacity="0.5"/>
                <path d="M24 14v14M24 32v2" stroke="var(--error)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="empty-state-title" style={{ color: 'var(--error)' }}>Compilation failed</div>
            <div className="empty-state-desc">
              Check the compilation log below for error details. Common issues: missing packages, syntax errors, unclosed braces.
            </div>
            <button className="btn btn-secondary btn-sm" style={{ marginTop: 4 }} onClick={compile}>
              Retry
            </button>
          </div>
        )}

        {pdfUrl && !isCompiling && (
          <iframe
            src={pdfUrl}
            title="Compiled PDF Preview"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: '#fff',
            }}
          />
        )}
      </div>
    </div>
  )
}
