import { useState } from 'react'
import { useStore } from '../../store/useStore.js'
import { downloadTex, downloadEncryptedTex } from '../../crypto/encryption.js'

export default function ExportMenu() {
  const latexCode = useStore((s) => s.latexCode)
  const pdfUrl = useStore((s) => s.pdfUrl)
  const compile = useStore((s) => s.compile)
  const isCompiling = useStore((s) => s.isCompiling)

  const [open, setOpen] = useState(false)
  const [copiedTex, setCopiedTex] = useState(false)
  const [encPassphrase, setEncPassphrase] = useState('')
  const [showEncInput, setShowEncInput] = useState(false)
  const [encErr, setEncErr] = useState('')

  const handleCopyTex = () => {
    navigator.clipboard.writeText(latexCode).then(() => {
      setCopiedTex(true)
      setTimeout(() => setCopiedTex(false), 2000)
    })
  }

  const handleDownloadPDF = () => {
    if (!pdfUrl) {
      compile()
      setOpen(false)
      return
    }
    const a = document.createElement('a')
    a.href = pdfUrl
    a.download = 'resume.pdf'
    a.click()
    setOpen(false)
  }

  const handleEncryptedDownload = async () => {
    if (!encPassphrase.trim()) {
      setEncErr('Enter a passphrase to encrypt your file.')
      return
    }
    try {
      await downloadEncryptedTex(latexCode, encPassphrase)
      setShowEncInput(false)
      setEncPassphrase('')
      setEncErr('')
      setOpen(false)
    } catch {
      setEncErr('Encryption failed. Please try again.')
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        id="export-menu-btn"
        className="btn btn-secondary"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v8M4 6l3 3 3-3M2 10v1.5A.5.5 0 002.5 12h9a.5.5 0 00.5-.5V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Export
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 2 }}>
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 200 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            zIndex: 300,
            background: 'var(--bg-2)',
            border: '1px solid var(--border-1)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            minWidth: 240,
            overflow: 'hidden',
            animation: 'modal-in 0.15s ease',
          }}>
            <div style={{ padding: '6px 0' }}>

              {/* Download PDF */}
              <button className="btn btn-ghost w-full" style={{ justifyContent: 'flex-start', padding: '8px 16px', borderRadius: 0, height: 'auto', gap: 10 }} onClick={handleDownloadPDF}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M4 5h6M4 7.5h6M4 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, color: 'var(--text-0)' }}>Download PDF</div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{pdfUrl ? 'Compiled output ready' : 'Compile first, then download'}</div>
                </div>
              </button>

              <div style={{ height: 1, background: 'var(--border-0)', margin: '4px 0' }} />

              {/* Download .tex */}
              <button className="btn btn-ghost w-full" style={{ justifyContent: 'flex-start', padding: '8px 16px', borderRadius: 0, height: 'auto', gap: 10 }} onClick={() => { downloadTex(latexCode); setOpen(false) }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2h6l3 3v7H2V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M8 2v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, color: 'var(--text-0)' }}>Download .tex File</div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)' }}>Raw LaTeX source code</div>
                </div>
              </button>

              {/* Copy to clipboard */}
              <button className="btn btn-ghost w-full" style={{ justifyContent: 'flex-start', padding: '8px 16px', borderRadius: 0, height: 'auto', gap: 10 }} onClick={() => { handleCopyTex(); setOpen(false) }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="9" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M2 10V2h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, color: 'var(--text-0)' }}>{copiedTex ? 'Copied!' : 'Copy LaTeX to Clipboard'}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)' }}>Paste into Overleaf or any editor</div>
                </div>
              </button>

              <div style={{ height: 1, background: 'var(--border-0)', margin: '4px 0' }} />

              {/* Encrypted download */}
              <button className="btn btn-ghost w-full" style={{ justifyContent: 'flex-start', padding: '8px 16px', borderRadius: 0, height: 'auto', gap: 10 }} onClick={() => { setShowEncInput((v) => !v); setEncErr('') }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="6" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M4 6V4.5a3 3 0 016 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="7" cy="9.5" r="1" fill="currentColor"/></svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, color: 'var(--text-0)' }}>Download Encrypted .tex</div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)' }}>AES-256-GCM — only you can decrypt</div>
                </div>
              </button>

              {showEncInput && (
                <div style={{ padding: '8px 16px 12px', borderTop: '1px solid var(--border-0)', background: 'var(--bg-3)' }}>
                  <label className="input-label" style={{ marginBottom: 6 }}>Encryption Passphrase</label>
                  <input
                    type="password"
                    className="input input-sm"
                    placeholder="Strong passphrase — do not lose it"
                    value={encPassphrase}
                    onChange={(e) => { setEncPassphrase(e.target.value); setEncErr('') }}
                    onKeyDown={(e) => e.key === 'Enter' && handleEncryptedDownload()}
                    autoFocus
                  />
                  {encErr && <p style={{ fontSize: 11, color: 'var(--error)', marginTop: 4 }}>{encErr}</p>}
                  <p style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 5, lineHeight: 1.5 }}>
                    If you lose your passphrase, the file cannot be decrypted. The platform never stores it.
                  </p>
                  <button className="btn btn-primary btn-sm w-full" style={{ marginTop: 8 }} onClick={handleEncryptedDownload}>
                    Encrypt and Download
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
