import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    this.setState({ info })
    console.error('[ResumeTeX] Uncaught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0e0e10',
          color: '#e8e8ed',
          fontFamily: 'Inter, sans-serif',
          padding: 40,
          textAlign: 'center',
          gap: 16,
        }}>
          <div style={{ fontSize: 32, color: '#f85149' }}>&#9888;</div>
          <h1 style={{ fontSize: 20, fontWeight: 600 }}>ResumeTeX failed to load</h1>
          <p style={{ fontSize: 14, color: '#aeaeb8', maxWidth: 480, lineHeight: 1.6 }}>
            A JavaScript error prevented the app from starting. Open your browser console (F12) for details.
          </p>
          {this.state.error && (
            <pre style={{
              background: '#161618',
              border: '1px solid #2a2a38',
              borderRadius: 6,
              padding: '12px 16px',
              fontSize: 12,
              color: '#f85149',
              maxWidth: 640,
              overflow: 'auto',
              textAlign: 'left',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              {this.state.error.toString()}
              {this.state.info?.componentStack ? '\n\nComponent stack:' + this.state.info.componentStack.slice(0, 500) : ''}
            </pre>
          )}
          <button
            style={{ padding: '8px 20px', background: '#4da8ff', color: '#0e0e10', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
