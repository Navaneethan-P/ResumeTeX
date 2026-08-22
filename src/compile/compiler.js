/**
 * Compile LaTeX to PDF in the browser.
 * Fetch APIs are tried first (gives a downloadable blob). If CORS or downtime
 * blocks them, a multipart form is posted to TeXLive.net inside a named iframe,
 * which does not require CORS.
 */

export const COMPILE_IFRAME_NAME = 'resumetex-pdf-frame'
export const COMPILE_IFRAME_ID = 'resumetex-pdf-frame'

const TEXLIVE_ENDPOINT = 'https://texlive.net/cgi-bin/latexcgi'
const LATEX_ONLINE = 'https://latex.online/api/compile?command=pdflatex'
const LATEXONLINE_CC = 'https://latexonline.cc/compile'

function toCrlf(text) {
  return String(text).replace(/\r\n/g, '\n').replace(/\n/g, '\r\n')
}

function isPdfBlob(blob, contentType) {
  const type = (contentType || blob.type || '').toLowerCase()
  if (type.includes('pdf')) return true
  if (blob.size < 5) return false
  return false
}

async function blobLooksLikePdf(blob) {
  const slice = await blob.slice(0, 5).text()
  return slice.startsWith('%PDF')
}

async function fetchWithTimeout(url, options, ms = 45000) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), ms)
  try {
    return await fetch(url, { ...options, signal: ctrl.signal })
  } finally {
    clearTimeout(t)
  }
}

function buildTexliveFormData(latex) {
  const body = new FormData()
  body.append('filename[]', 'document.tex')
  body.append('filecontents[]', toCrlf(latex))
  body.append('engine', 'pdflatex')
  body.append('return', 'pdf')
  return body
}

async function tryLatexOnline(latex) {
  const response = await fetchWithTimeout(LATEX_ONLINE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-tex' },
    body: latex,
  })
  if (!response.ok) throw new Error(`latex.online HTTP ${response.status}`)
  const contentType = response.headers.get('content-type') || ''
  const blob = await response.blob()
  if (contentType.includes('pdf') || contentType.includes('octet-stream') || await blobLooksLikePdf(blob)) {
    return blob
  }
  const text = await blob.text()
  throw new Error(text.slice(0, 1200) || 'latex.online returned non-PDF output')
}

async function tryLatexOnlineCc(latex) {
  const encoded = encodeURIComponent(latex)
  if (encoded.length < 7500) {
    const response = await fetchWithTimeout(`${LATEXONLINE_CC}?text=${encoded}`, { method: 'GET' })
    if (response.ok) {
      const blob = await response.blob()
      if (await blobLooksLikePdf(blob) || isPdfBlob(blob, response.headers.get('content-type'))) return blob
    }
  }
  const body = new URLSearchParams()
  body.set('text', latex)
  const response = await fetchWithTimeout(LATEXONLINE_CC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!response.ok) throw new Error(`latexonline.cc HTTP ${response.status}`)
  const blob = await response.blob()
  if (await blobLooksLikePdf(blob) || isPdfBlob(blob, response.headers.get('content-type'))) return blob
  throw new Error('latexonline.cc returned non-PDF output')
}

async function tryTexliveFetch(latex) {
  const response = await fetchWithTimeout(TEXLIVE_ENDPOINT, {
    method: 'POST',
    body: buildTexliveFormData(latex),
    redirect: 'follow',
  }, 90000)
  if (!response.ok) throw new Error(`TeXLive.net HTTP ${response.status}`)
  const blob = await response.blob()
  const type = (response.headers.get('content-type') || blob.type || '').toLowerCase()
  if (type.includes('pdf') || await blobLooksLikePdf(blob)) return blob
  const text = await blob.text()
  throw new Error(text.slice(0, 1600) || 'TeXLive.net returned a log instead of a PDF')
}


export function postTexliveToIframe(latex, target) {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = TEXLIVE_ENDPOINT
  form.target = target
  form.enctype = 'multipart/form-data'
  form.style.display = 'none'

  const fields = [
    ['filename[]', 'document.tex'],
    ['engine', 'pdflatex'],
    ['return', 'pdf'],
  ]
  for (const [name, value] of fields) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value
    form.appendChild(input)
  }
  const ta = document.createElement('textarea')
  ta.name = 'filecontents[]'
  ta.value = toCrlf(latex)
  form.appendChild(ta)

  document.body.appendChild(form)
  form.submit()
  form.remove()
}

export function openTexliveCompile(latex) {
  postTexliveToIframe(latex, '_blank')
}

export function openOverleaf(latex) {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = 'https://www.overleaf.com/docs'
  form.target = '_blank'
  form.style.display = 'none'
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'snip'
  input.value = latex
  form.appendChild(input)
  document.body.appendChild(form)
  form.submit()
  form.remove()
}


export async function compileLatex(latex, { onStatus } = {}) {
  const status = (msg) => { if (onStatus) onStatus(msg) }
  const errors = []

  const fetchers = [
    ['TeXLive.net', tryTexliveFetch],
    ['latex.online', tryLatexOnline],
    ['latexonline.cc', tryLatexOnlineCc],
  ]

  for (const [name, fn] of fetchers) {
    status(`Trying ${name}...`)
    try {
      const blob = await fn(latex)
      if (blob && blob.size > 20) {
        status(`Compilation successful via ${name}.`)
        return {
          type: 'blob',
          blob,
          log: `Compilation successful via ${name}.`,
          source: name,
        }
      }
    } catch (err) {
      errors.push(`${name}: ${err.name === 'AbortError' ? 'timed out' : err.message}`)
    }
  }

  status('Direct APIs blocked (CORS/network). Falling back to iframe preview...')
  
  return {
    type: 'iframe-fallback',
    latex,
    log: [
      'Preview compiling via TeXLive.net (form post).',
      'Use Open / Download from the preview toolbar, or Export → Open PDF in new tab.',
      errors.length ? `\nFetch attempts:\n${errors.join('\n')}` : '',
    ].join('\n'),
    source: 'TeXLive.net (iframe)',
  }
}

