import { useStore } from '../../store/useStore.js'

export default function ATSScorer() {
  const atsScore = useStore((s) => s.atsScore)

  if (!atsScore) return null

  const { score, grade, color, suggestions, bulletCount, wordCount } = atsScore

  const circumference = 2 * Math.PI * 26
  const offset = circumference - (score / 100) * circumference

  return (
    <div style={{
      background: 'var(--bg-1)',
      borderLeft: '1px solid var(--border-0)',
      width: 240,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Score header */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-0)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-2)', marginBottom: 12 }}>
          ATS Compatibility
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Circular progress */}
          <svg width="64" height="64" viewBox="0 0 64 64" style={{ flexShrink: 0, overflow: 'visible' }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <circle cx="32" cy="32" r="26" fill="none" stroke="var(--bg-3)" strokeWidth="4" />
            <circle
              cx="32" cy="32" r="26"
              fill="none"
              stroke={color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              filter="url(#glow)"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '32px 32px', transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
            <text x="32" y="37" textAnchor="middle" fontSize="14" fontWeight="800" fill={color}>{score}</text>
          </svg>

          <div>
            <div style={{ fontSize: 24, fontWeight: 700, color, lineHeight: 1 }}>Grade {grade}</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 4 }}>{score}/100 points</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
              {wordCount} words &middot; {bulletCount} bullets
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
        {suggestions.length === 0 ? (
          <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-2)', fontSize: 12 }}>
            <div style={{ fontSize: 20, marginBottom: 6, color: 'var(--success)' }}>&#10003;</div>
            No issues detected. Your resume scores well for ATS parsing.
          </div>
        ) : (
          suggestions.map((sug, i) => {
            const iconColor = sug.type === 'error' ? 'var(--error)' : sug.type === 'warning' ? 'var(--warning)' : 'var(--text-2)'
            const bgColor = sug.type === 'error' ? 'var(--error-dim)' : sug.type === 'warning' ? 'var(--warning-dim)' : 'transparent'
            const marker = sug.type === 'error' ? '!' : sug.type === 'warning' ? '~' : 'i'
            return (
              <div
                key={i}
                style={{
                  padding: '8px 14px',
                  borderBottom: '1px solid var(--border-0)',
                  display: 'flex',
                  gap: 8,
                  background: bgColor,
                  alignItems: 'flex-start',
                }}
              >
                <span style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: iconColor,
                  color: 'var(--bg-0)',
                  fontSize: 9,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 1,
                }}>
                  {marker}
                </span>
                <p style={{ fontSize: 11, color: 'var(--text-1)', lineHeight: 1.5 }}>
                  {sug.text}
                </p>
              </div>
            )
          })
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border-0)', background: 'var(--bg-0)' }}>
        <p style={{ fontSize: 10, color: 'var(--text-3)', lineHeight: 1.5 }}>
          Score updates as you type. Based on 11 ATS compatibility rules.
        </p>
      </div>
    </div>
  )
}
