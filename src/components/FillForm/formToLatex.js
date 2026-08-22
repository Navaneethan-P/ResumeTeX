/**
 * Build compilable LaTeX from the fill-form data so students and new users
 * do not need an external AI to get a working resume.
 */

export function escapeLatex(str) {
  if (!str) return ''
  return String(str).replace(/[\\&%$#_{}~^]/g, (ch) => ({
    '\\': '\\textbackslash{}',
    '&': '\\&',
    '%': '\\%',
    '$': '\\$',
    '#': '\\#',
    '_': '\\_',
    '{': '\\{',
    '}': '\\}',
    '~': '\\textasciitilde{}',
    '^': '\\textasciicircum{}',
  }[ch]))
}

function href(url, label) {
  const raw = String(url || '').trim()
  if (!raw) return escapeLatex(label || '')
  const hrefUrl = /^https?:\/\//i.test(raw) || raw.startsWith('mailto:') ? raw : `https://${raw}`
  const safeHref = hrefUrl.replace(/[\\%#{}]/g, encodeURIComponent)
  return `\\href{${safeHref}}{${escapeLatex(label || raw.replace(/^https?:\/\//i, ''))}}`
}

function joinContact(parts) {
  return parts.filter(Boolean).join('\n    \\ $\\cdot$\\ \n    ')
}

function itemize(lines) {
  const items = lines.map((l) => String(l).trim()).filter(Boolean)
  if (!items.length) return ''
  return [
    '\\begin{itemize}',
    ...items.map((l) => `  \\item ${escapeLatex(l)}`),
    '\\end{itemize}',
  ].join('\n')
}

export function formToLatex(form, accentHex = '2E6DA4') {
  const p = form.personalInfo || {}
  const name = escapeLatex(p.fullName || 'Your Name')
  const contact = joinContact([
    p.email ? href(`mailto:${p.email}`, p.email) : '',
    p.phone ? escapeLatex(p.phone) : '',
    p.location ? escapeLatex(p.location) : '',
    p.linkedin ? href(p.linkedin, p.linkedin.replace(/^https?:\/\//i, '')) : '',
    p.github ? href(p.github, p.github.replace(/^https?:\/\//i, '')) : '',
    p.website ? href(p.website, p.website.replace(/^https?:\/\//i, '')) : '',
  ])

  const sections = []

  if (p.jobTitle) {
    sections.push(`\\begin{center}\\textit{${escapeLatex(p.jobTitle)}}\\end{center}`)
  }

  if (form.summary && form.summary.trim()) {
    sections.push(`\\section{Professional Summary}\n${escapeLatex(form.summary.trim())}`)
  }

  const jobs = (form.experience || []).filter((e) => e.company || e.position)
  if (jobs.length) {
    const blocks = jobs.map((exp) => {
      const end = exp.current ? 'Present' : (exp.endDate || '')
      const dates = [exp.startDate, end].filter(Boolean).join(' -- ')
      const bullets = itemize(exp.bullets || [])
      return [
        `\\textbf{${escapeLatex(exp.position || 'Role')}} \\hfill \\textit{${escapeLatex(dates)}}\\\\`,
        `\\textcolor{resumeaccent}{${escapeLatex(exp.company || '')}} ${exp.location ? `\\hfill ${escapeLatex(exp.location)}` : ''}`,
        bullets,
      ].filter(Boolean).join('\n')
    })
    sections.push(`\\section{Work Experience}\n\n${blocks.join('\n\n\\vspace{4pt}\n\n')}`)
  }

  const edus = (form.education || []).filter((e) => e.institution || e.degree)
  if (edus.length) {
    const blocks = edus.map((edu) => {
      const title = [edu.degree, edu.field].filter(Boolean).join(', ')
      const dates = [edu.startDate, edu.endDate].filter(Boolean).join(' -- ')
      const right = [edu.gpa ? `GPA: ${edu.gpa}` : '', edu.honors].filter(Boolean).join(' · ')
      return [
        `\\textbf{${escapeLatex(title || 'Degree')}} \\hfill \\textit{${escapeLatex(dates)}}\\\\`,
        `${escapeLatex(edu.institution || '')}${right ? ` \\hfill ${escapeLatex(right)}` : ''}`,
      ].join('\n')
    })
    sections.push(`\\section{Education}\n\n${blocks.join('\n\n')}`)
  }

  const s = form.skills || {}
  const skillLines = [
    s.technical && `\\textbf{Languages:} ${escapeLatex(s.technical)}\\\\`,
    s.frameworks && `\\textbf{Frameworks:} ${escapeLatex(s.frameworks)}\\\\`,
    s.tools && `\\textbf{Tools:} ${escapeLatex(s.tools)}\\\\`,
    s.languages && `\\textbf{Languages spoken:} ${escapeLatex(s.languages)}\\\\`,
    s.soft && `\\textbf{Soft skills:} ${escapeLatex(s.soft)}`,
  ].filter(Boolean)
  const langList = (form.languagesList || form.languages || []).filter((l) => l.language)
  if (langList.length && !s.languages) {
    skillLines.push(`\\textbf{Languages spoken:} ${escapeLatex(langList.map((l) => l.proficiency ? `${l.language} (${l.proficiency})` : l.language).join(', '))}`)
  }
  if (skillLines.length) {
    sections.push(`\\section{Skills}\n\n${skillLines.join('\n')}`)
  }

  const projects = (form.projects || []).filter((pr) => pr.name || pr.description)
  if (projects.length) {
    const blocks = projects.map((pr) => {
      const link = pr.link ? href(pr.link, pr.link.replace(/^https?:\/\//i, '')) : ''
      const bullets = itemize(pr.description ? [pr.description] : [])
      return [
        `\\textbf{${escapeLatex(pr.name || 'Project')}} ${link ? `\\hfill ${link}` : (pr.dates ? `\\hfill \\textit{${escapeLatex(pr.dates)}}` : '')}\\\\`,
        pr.technologies ? `\\textit{${escapeLatex(pr.technologies)}}` : '',
        bullets,
      ].filter(Boolean).join('\n')
    })
    sections.push(`\\section{Projects}\n\n${blocks.join('\n\n')}`)
  }

  const certs = (form.certifications || []).filter((c) => c.name)
  if (certs.length) {
    const lines = certs.map((c) => {
      const left = `\\textbf{${escapeLatex(c.name)}}${c.issuer ? ` -- ${escapeLatex(c.issuer)}` : ''}`
      return `${left} ${c.date ? `\\hfill \\textit{${escapeLatex(c.date)}}` : ''}\\\\`
    })
    sections.push(`\\section{Certifications}\n${lines.join('\n')}`)
  }

  const awards = (form.awards || []).filter((a) => a.title)
  if (awards.length) {
    const lines = awards.map((a) => {
      const left = `\\textbf{${escapeLatex(a.title)}}${a.issuer ? ` -- ${escapeLatex(a.issuer)}` : ''}`
      return `${left} ${a.date ? `\\hfill \\textit{${escapeLatex(a.date)}}` : ''}\\\\`
    })
    sections.push(`\\section{Awards}\n${lines.join('\n')}`)
  }

  const pubs = (form.publications || []).filter((x) => x.title)
  if (pubs.length) {
    const lines = pubs.map((x) => {
      let line = escapeLatex(x.title)
      if (x.journal) line += `. ${escapeLatex(x.journal)}`
      if (x.date) line += ` (${escapeLatex(x.date)})`
      if (x.doi) line += `. DOI: ${escapeLatex(x.doi)}`
      return `  \\item ${line}`
    })
    sections.push(`\\section{Publications}\n\\begin{itemize}\n${lines.join('\n')}\n\\end{itemize}`)
  }

  const vols = (form.volunteer || []).filter((v) => v.organization || v.role)
  if (vols.length) {
    const blocks = vols.map((v) => [
      `\\textbf{${escapeLatex(v.role || 'Volunteer')}} ${v.dates ? `\\hfill \\textit{${escapeLatex(v.dates)}}` : ''}\\\\`,
      escapeLatex(v.organization || ''),
      v.description ? itemize([v.description]) : '',
    ].filter(Boolean).join('\n'))
    sections.push(`\\section{Volunteer Experience}\n\n${blocks.join('\n\n')}`)
  }

  if (form.references && form.references.trim() && form.references.trim().toLowerCase() !== 'available upon request') {
    sections.push(`\\section{References}\n${escapeLatex(form.references.trim())}`)
  }

  const body = sections.length
    ? sections.join('\n\n')
    : '\\section{Professional Summary}\nAdd your details in Fill Form, then click Generate LaTeX.'

  const hex = String(accentHex || '2E6DA4').replace('#', '')

  return `% ============================================================
% Resume generated by ResumeTeX Fill Form
% https://navaneethan-p.github.io/ResumeTeX
% ============================================================
\\documentclass[10pt,a4paper]{article}

\\usepackage[top=1.8cm, bottom=1.8cm, left=2cm, right=2cm]{geometry}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{parskip}

\\definecolor{resumeaccent}{HTML}{${hex}}
\\definecolor{resumegray}{HTML}{555555}

\\hypersetup{colorlinks=true, urlcolor=resumeaccent, linkcolor=resumeaccent}

\\titleformat{\\section}
  {\\large\\bfseries\\color{resumeaccent}}
  {}
  {0em}
  {}
  [\\color{resumeaccent}\\rule{\\linewidth}{0.6pt}]
\\titlespacing{\\section}{0pt}{10pt}{6pt}

\\setlist[itemize]{leftmargin=1.4em, itemsep=1pt, topsep=2pt, parsep=0pt}
\\pagestyle{empty}

\\begin{document}

\\begin{center}
  {\\Huge\\bfseries ${name}}\\\\[6pt]
  {\\color{resumegray}\\small
    ${contact || escapeLatex('email · phone · location')}
  }
\\end{center}

${body}

\\end{document}
`
}
