import { useStore } from '../../store/useStore.js'

export default function TemplateGallery() {
  const { templates, currentTemplateId, applyTemplate, setShowTemplateGallery } = useStore((s) => ({
    templates: s.templates,
    currentTemplateId: s.currentTemplateId,
    applyTemplate: s.applyTemplate,
    setShowTemplateGallery: s.setShowTemplateGallery,
  }))

  const ATS_COLORS = { high: '#3fb950', medium: '#d29922', low: '#f85149' }
  const ATS_LABELS = { high: 'ATS High', medium: 'ATS Medium', low: 'ATS Low' }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowTemplateGallery(false)}>
      <div className="modal" style={{ width: 800, maxWidth: '96vw' }}>
        <div className="modal-header">
          <div>
            <div className="modal-title">Resume Templates</div>
            <div className="modal-subtitle">Select a template to load its LaTeX structure into the editor</div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={() => setShowTemplateGallery(false)} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {templates.map((tpl) => {
              const active = tpl.id === currentTemplateId
              return (
                <button
                  key={tpl.id}
                  id={`template-${tpl.id}`}
                  onClick={() => { applyTemplate(tpl.id); setShowTemplateGallery(false) }}
                  style={{
                    background: active ? 'var(--accent-dim)' : 'var(--bg-2)',
                    border: `1.5px solid ${active ? 'var(--accent)' : 'var(--border-1)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: 16,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'border-color var(--t), background var(--t), transform var(--t)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.borderColor = 'var(--border-2)' }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.borderColor = 'var(--border-1)' }}
                >
                  {/* Preview placeholder */}
                  <div style={{
                    width: '100%',
                    height: 120,
                    background: 'var(--bg-3)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: 12,
                    flexDirection: 'column',
                    gap: 5,
                    overflow: 'hidden',
                  }}>
                    {/* Simulated resume preview bars */}
                    <div style={{ width: '60%', height: 8, background: 'var(--accent)', borderRadius: 2, opacity: 0.9 }} />
                    <div style={{ width: '40%', height: 4, background: 'var(--text-3)', borderRadius: 2 }} />
                    <div style={{ width: '100%', height: 1, background: 'var(--accent)', opacity: 0.4, marginTop: 3 }} />
                    {[80, 65, 70, 55, 65].map((w, i) => (
                      <div key={i} style={{ width: `${w}%`, height: 3, background: 'var(--text-3)', borderRadius: 2 }} />
                    ))}
                    <div style={{ width: '100%', height: 1, background: 'var(--accent)', opacity: 0.4, marginTop: 2 }} />
                    {[75, 60, 50].map((w, i) => (
                      <div key={i} style={{ width: `${w}%`, height: 3, background: 'var(--text-3)', borderRadius: 2 }} />
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-0)', marginBottom: 3 }}>{tpl.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5 }}>{tpl.description}</div>
                    </div>
                    <span style={{
                      flexShrink: 0,
                      fontSize: 10,
                      fontWeight: 600,
                      padding: '2px 7px',
                      borderRadius: 100,
                      background: `${ATS_COLORS[tpl.atsScore]}20`,
                      color: ATS_COLORS[tpl.atsScore],
                      border: `1px solid ${ATS_COLORS[tpl.atsScore]}40`,
                      marginLeft: 8,
                    }}>
                      {ATS_LABELS[tpl.atsScore]}
                    </span>
                  </div>

                  {active && (
                    <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 500 }}>
                      Currently active
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
        <div className="modal-footer">
          <span style={{ fontSize: 12, color: 'var(--text-2)', marginRight: 'auto' }}>
            Selecting a template will replace your current editor content.
          </span>
          <button className="btn btn-ghost" onClick={() => setShowTemplateGallery(false)}>Close</button>
        </div>
      </div>
    </div>
  )
}
