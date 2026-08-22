/**
 * ATS (Applicant Tracking System) Compatibility Scorer.
 * Analyzes raw LaTeX source and returns a 0-100 score + suggestions.
 */

const ACTION_VERBS = [
  'led', 'built', 'designed', 'developed', 'implemented', 'managed',
  'created', 'launched', 'improved', 'reduced', 'increased', 'delivered',
  'architected', 'optimized', 'deployed', 'migrated', 'established',
  'streamlined', 'coordinated', 'collaborated', 'mentored', 'authored',
  'analyzed', 'automated', 'integrated', 'maintained', 'refactored',
  'spearheaded', 'achieved', 'negotiated', 'supervised', 'trained',
  'executed', 'generated', 'facilitated', 'conducted', 'resolved',
]

const STANDARD_HEADINGS = [
  'experience', 'education', 'skills', 'summary', 'objective',
  'projects', 'certifications', 'awards', 'publications', 'languages',
  'volunteer', 'references', 'work experience', 'professional experience',
  'technical skills', 'professional summary',
]

export function scoreATS(latex) {
  if (!latex || latex.trim().length < 50) {
    return { score: 0, grade: 'F', color: '#f85149', suggestions: [] }
  }

  const lower = latex.toLowerCase()
  const suggestions = []
  let score = 0

  // 1. Has \begin{document} (valid LaTeX)
  if (/\\begin\{document\}/.test(latex)) {
    score += 10
  } else {
    suggestions.push({ type: 'error', text: 'Missing \\begin{document}. The document will not compile.' })
  }

  // 2. Contact information present
  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(latex)
  const hasPhone = /(\+?[\d][\d\s\-().]{7,}[\d])/.test(latex)
  if (hasEmail) score += 8
  else suggestions.push({ type: 'warning', text: 'No email address detected. ATS systems require contact info.' })
  if (hasPhone) score += 4
  else suggestions.push({ type: 'info', text: 'Consider adding a phone number for recruiter contact.' })

  // 3. Standard section headings
  let foundHeadings = 0
  STANDARD_HEADINGS.forEach((heading) => {
    if (lower.includes(heading)) foundHeadings++
  })
  if (foundHeadings >= 4) score += 15
  else if (foundHeadings >= 2) score += 8
  else suggestions.push({ type: 'warning', text: 'Use standard section headings (Experience, Education, Skills). ATS parsers rely on these keywords.' })

  // 4. No images (ATS cannot read them)
  if (/\\includegraphics/.test(latex)) {
    suggestions.push({ type: 'error', text: '\\includegraphics detected. Images are invisible to ATS parsers and waste parsing budget.' })
  } else {
    score += 10
  }

  // 5. No text boxes or floating elements that confuse parsers
  if (/\\begin\{textblock\}|\\begin\{wrapfigure\}/.test(latex)) {
    suggestions.push({ type: 'warning', text: 'Floating text boxes can confuse ATS parsers. Use linear layout instead.' })
  } else {
    score += 5
  }

  // 6. Consistent date format
  const dates = latex.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{4}\b|\b\d{1,2}\/\d{4}\b|\b\d{4}\s*[-–]\s*(\d{4}|present|current)\b/gi) || []
  if (dates.length > 0) score += 8
  else suggestions.push({ type: 'info', text: 'Add date ranges for positions (e.g., Jan 2020 -- Present) to help ATS extract employment history.' })

  // 7. Action verbs in bullet points
  const bullets = latex.match(/\\item\s+.+/gi) || []
  let verbCount = 0
  bullets.forEach((b) => {
    const words = b.toLowerCase().split(/\s+/)
    if (ACTION_VERBS.some((v) => words.slice(0, 3).includes(v))) verbCount++
  })
  if (bullets.length > 0) {
    const verbRatio = verbCount / bullets.length
    if (verbRatio >= 0.6) score += 12
    else if (verbRatio >= 0.3) {
      score += 6
      suggestions.push({ type: 'info', text: `${Math.round((1 - verbRatio) * 100)}% of your bullet points don't start with strong action verbs. Start with verbs like "Led", "Built", "Reduced".` })
    } else {
      suggestions.push({ type: 'warning', text: 'Most bullet points lack strong action verbs. Start each with verbs like "Developed", "Managed", "Achieved".' })
    }
  }

  // 8. Quantified achievements (numbers/metrics)
  const quantified = (latex.match(/\d+\s*(%|percent|million|billion|k\b|thousand|users|customers|hours|days|weeks|months|years|x\b)/gi) || []).length
  if (quantified >= 3) score += 10
  else if (quantified >= 1) {
    score += 5
    suggestions.push({ type: 'info', text: 'Add more quantified achievements (e.g., "Reduced load time by 40%", "Managed team of 8"). Numbers stand out to recruiters and ATS.' })
  } else {
    suggestions.push({ type: 'warning', text: 'No quantified achievements found. Numbers and metrics make your resume 2x more impactful.' })
  }

  // 9. Document length estimate (word count of document body)
  const body = latex.split(/\\begin\{document\}/i)[1] || latex
  const words = body
    .replace(/\\[a-zA-Z@]+/g, ' ')
    .replace(/[{}\[\]%]/g, ' ')
    .replace(/[^a-zA-Z\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1)
  const wordCount = words.length
  if (wordCount >= 180 && wordCount <= 900) score += 8
  else if (wordCount < 180) {
    score += 3
    suggestions.push({ type: 'info', text: 'Resume appears short. Add internships, projects, or coursework if you are early-career; otherwise expand achievements.' })
  } else if (wordCount > 1200) {
    score += 3
    suggestions.push({ type: 'warning', text: 'Resume may exceed 2 pages. Keep it concise — 1 page for < 10 years experience, 2 pages maximum.' })
  }

  // 10. No tables for layout (complex tables break ATS parsing)
  const tableCount = (latex.match(/\\begin\{tabular/g) || []).length
  if (tableCount > 3) {
    suggestions.push({ type: 'warning', text: 'Heavy use of tables detected. ATS systems often misread tabular data. Use simple lists instead.' })
  } else {
    score += 5
  }

  // 11. LinkedIn URL
  if (/linkedin\.com/.test(lower)) score += 5
  else suggestions.push({ type: 'info', text: 'Add your LinkedIn URL. Many recruiters and ATS systems parse this as a key identifier.' })

  // Clamp
  score = Math.min(100, Math.max(0, score))

  let grade, color
  if (score >= 85) { grade = 'A'; color = '#3fb950' }
  else if (score >= 70) { grade = 'B'; color = '#58a6ff' }
  else if (score >= 55) { grade = 'C'; color = '#d29922' }
  else if (score >= 40) { grade = 'D'; color = '#f0883e' }
  else { grade = 'F'; color = '#f85149' }

  return { score, grade, color, suggestions, bulletCount: bullets.length, wordCount }
}

const STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'your', 'you', 'are', 'was',
  'were', 'have', 'has', 'will', 'can', 'our', 'their', 'they', 'who', 'what',
  'when', 'where', 'which', 'into', 'about', 'over', 'after', 'before', 'than',
  'then', 'also', 'more', 'most', 'other', 'such', 'only', 'using', 'used',
  'work', 'role', 'team', 'job', 'jobs', 'experience', 'required', 'requirements',
  'including', 'include', 'ability', 'strong', 'good', 'well', 'plus', 'etc',
])

/**
 * Compare resume text against a pasted job description and return keyword coverage.
 */
export function scoreJobKeywords(latex, jobDescription) {
  const jd = (jobDescription || '').toLowerCase()
  if (jd.trim().length < 20) {
    return { matched: [], missing: [], coverage: null, total: 0 }
  }

  const tokens = jd
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .split(/[\s,/|]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t) && !/^\d+$/.test(t))

  const unique = [...new Set(tokens)].slice(0, 40)
  const hay = latex.toLowerCase()
  const matched = []
  const missing = []
  unique.forEach((term) => {
    const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
    if (re.test(hay)) matched.push(term)
    else missing.push(term)
  })

  const total = unique.length
  const coverage = total ? Math.round((matched.length / total) * 100) : 0
  return { matched, missing: missing.slice(0, 18), coverage, total }
}
