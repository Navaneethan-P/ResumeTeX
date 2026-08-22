import { useState, useCallback } from 'react'
import { useStore } from '../../store/useStore.js'

const CUSTOMIZATION_TOPICS = [
  {
    id: 'colors',
    title: 'Change Colors',
    desc: 'Want a specific color scheme? Ask AI to generate the LaTeX color codes.',
    promptTemplate: 'I am using a LaTeX resume. Please provide the LaTeX code to change the primary accent color to [INSERT COLOR HERE]. Show only the LaTeX code snippet for defining the color.'
  },
  {
    id: 'fonts',
    title: 'Change Fonts',
    desc: 'Switch to a different font like Helvetica, Roboto, or Garamond.',
    promptTemplate: 'I am using a LaTeX resume. Provide the LaTeX package and configuration needed to change the main document font to [INSERT FONT NAME HERE].'
  },
  {
    id: 'sections',
    title: 'Add New Section',
    desc: 'Need a custom section for Publications, Certifications, or Hobbies?',
    promptTemplate: 'I am using a LaTeX resume. Write the LaTeX code for a new section called "[INSERT SECTION NAME]". It should match standard resume formatting with a section title and a few bullet points.'
  },
  {
    id: 'spacing',
    title: 'Adjust Spacing',
    desc: 'Make the resume fit on one page by adjusting margins or line spacing.',
    promptTemplate: 'I am using a LaTeX resume and it is slightly spilling over to a second page. What LaTeX commands can I use in the preamble to reduce the margins and tighten the line spacing so it fits on one page?'
  }
]

export default function AIHelpSidebar() {
  const showAiHelp = useStore((s) => s.showAiHelp)
  const setShowAiHelp = useStore((s) => s.setShowAiHelp)
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = useCallback((id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }, [])

  if (!showAiHelp) return null

  return (
    <>
      <div 
        className="modal-overlay" 
        onClick={() => setShowAiHelp(false)} 
        style={{ background: 'transparent', backdropFilter: 'none' }}
      />
      
      <div 
        style={{
          position: 'absolute',
          top: 'var(--header-height)',
          right: 0,
          bottom: 0,
          width: 360,
          background: 'var(--bg-1)',
          borderLeft: '1px solid var(--border-0)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slide-in var(--t) forwards',
        }}
      >
        <style>{`
          @keyframes slide-in {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>
        
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-0)' }}>AI Assistant</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>Prompts for ChatGPT & Claude</div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={() => setShowAiHelp(false)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <p style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.6 }}>
              Want to customize your LaTeX resume but don't know the exact commands? 
              Select a topic below, copy the prompt, and paste it into your favorite AI chatbot to get the exact code you need.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {CUSTOMIZATION_TOPICS.map(topic => (
              <div 
                key={topic.id} 
                style={{ 
                  background: 'var(--bg-2)', 
                  border: '1px solid var(--border-0)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: 16 
                }}
              >
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-0)', marginBottom: 4 }}>
                  {topic.title}
                </h3>
                <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 12, lineHeight: 1.5 }}>
                  {topic.desc}
                </p>
                
                <div style={{ position: 'relative' }}>
                  <pre style={{
                    background: 'var(--bg-3)',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 11,
                    color: 'var(--text-1)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontFamily: 'inherit',
                    lineHeight: 1.5
                  }}>
                    {topic.promptTemplate}
                  </pre>
                  
                  <button 
                    className="btn btn-primary btn-sm"
                    style={{ position: 'absolute', bottom: 10, right: 10 }}
                    onClick={() => handleCopy(topic.id, topic.promptTemplate)}
                  >
                    {copiedId === topic.id ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
