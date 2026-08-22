import { useRef } from 'react'
import { useStore } from '../../store/useStore.js'

export default function PDFPreview() {
  const pdfUrl = useStore((s) => s.pdfUrl)
  const isCompiling = useStore((s) => s.isCompiling)
  const compile = useStore((s) => s.compile)
  const compilationError = useStore((s) => s.compilationError)
  const latexCode = useStore((s) => s.latexCode)
  const cloudFormRef = useRef(null)

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
          <div className="empty-state" style={{ height: '100%', background: 'radial-gradient(circle at center, var(--bg-1) 0%, var(--bg-0) 100%)' }}>
            <div style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(8px)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-1)', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'var(--shadow-lg)' }}>
              <div className="empty-state-icon" style={{ color: 'var(--accent)', opacity: 0.8, filter: 'drop-shadow(0 0 10px var(--accent-dim))' }}>
                <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="4" width="32" height="40" rx="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 14h16M16 20h16M16 26h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M30 34h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="empty-state-title" style={{ fontSize: 18, marginTop: 12 }}>Ready to Compile</div>
              <div className="empty-state-desc" style={{ marginTop: 8, marginBottom: 20 }}>
                Write or paste LaTeX in the editor, or use the Fill Form feature, then click Compile to render your PDF here.
              </div>
              <button className="btn btn-primary btn-lg" onClick={compile}>
                Compile PDF
              </button>
            </div>
          </div>
        )}

        {compilationError && !isCompiling && (
          <div className="empty-state" style={{ height: '100%', background: 'radial-gradient(circle at center, var(--bg-1) 0%, var(--bg-0) 100%)' }}>
            <div style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(8px)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-1)', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'var(--shadow-lg)' }}>
              <div className="empty-state-icon" style={{ color: 'var(--error)', opacity: 0.9, filter: 'drop-shadow(0 0 15px var(--error-dim))' }}>
                <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="var(--error-dim)"/>
                  <path d="M24 14v10M24 30v2" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="empty-state-title" style={{ color: 'var(--error)', fontSize: 18, marginTop: 12 }}>Compilation Failed</div>
              <div className="empty-state-desc" style={{ maxWidth: 350, marginTop: 8, color: 'var(--text-1)' }}>
                The compilation service encountered an error or is unavailable. Check the log below or try compiling in the cloud.
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button className="btn btn-secondary btn-lg" onClick={compile}>
                  Retry
                </button>
                <button className="btn btn-primary btn-lg" onClick={() => cloudFormRef.current?.submit()} style={{ background: 'var(--text-0)', color: 'var(--bg-0)' }}>
                  Open in Overleaf
                </button>
              </div>
              <form 
                ref={cloudFormRef} 
                action="https://www.overleaf.com/docs" 
                method="POST" 
                target="_blank" 
                style={{ display: 'none' }}
              >
                <input type="hidden" name="snip" value={latexCode} />
              </form>
            </div>
          </div>
        )}

        {pdfUrl && !isCompiling && (
          <iframe
            name={pdfUrl === 'iframe' ? 'resumetex-pdf-frame' : undefined}
            src={pdfUrl !== 'iframe' ? pdfUrl : undefined}
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
