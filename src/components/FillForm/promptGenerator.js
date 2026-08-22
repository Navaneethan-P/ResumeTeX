/**
 * Generates a structured AI prompt from form data.
 * The user copies this and pastes it into ChatGPT, Claude, or any AI assistant.
 */

export function generatePrompt(form) {
  const lines = []

  lines.push(`You are a professional LaTeX typesetter. Write complete, compilable LaTeX source code for a resume using the details below.`)
  lines.push(``)
  lines.push(`REQUIREMENTS:`)
  lines.push(`- Use \\documentclass[10pt,a4paper]{article} as the document class`)
  lines.push(`- Include all necessary \\usepackage declarations so it compiles with pdflatex`)
  lines.push(`- Use the geometry package for margins: top=1.8cm, bottom=1.8cm, left=2cm, right=2cm`)
  lines.push(`- ATS-optimized: single-column layout, no images, no text boxes, standard section headings`)
  lines.push(`- Use \\definecolor{resumeaccent}{HTML}{2E6DA4} for the primary accent color`)
  lines.push(`- Format section headings with a thin rule underneath using titlesec`)
  lines.push(`- All bullet points must start with strong past-tense action verbs`)
  lines.push(`- Include quantified achievements wherever the data below provides numbers`)
  lines.push(`- Add \\pagestyle{empty} to suppress page numbers`)
  lines.push(`- Wrap the full output in a Markdown code block: \`\`\`latex ... \`\`\``)
  lines.push(`- Do not explain the code. Only output the LaTeX code block.`)
  lines.push(``)
  lines.push(`====================================================`)
  lines.push(`RESUME DETAILS`)
  lines.push(`====================================================`)
  lines.push(``)

  // Personal Info
  const p = form.personalInfo
  if (p) {
    lines.push(`[PERSONAL INFORMATION]`)
    if (p.fullName)    lines.push(`Full Name:     ${p.fullName}`)
    if (p.jobTitle)    lines.push(`Target Role:   ${p.jobTitle}`)
    if (p.email)       lines.push(`Email:         ${p.email}`)
    if (p.phone)       lines.push(`Phone:         ${p.phone}`)
    if (p.location)    lines.push(`Location:      ${p.location}`)
    if (p.linkedin)    lines.push(`LinkedIn:      ${p.linkedin}`)
    if (p.github)      lines.push(`GitHub:        ${p.github}`)
    if (p.website)     lines.push(`Website:       ${p.website}`)
    lines.push(``)
  }

  // Summary
  if (form.summary && form.summary.trim()) {
    lines.push(`[PROFESSIONAL SUMMARY]`)
    lines.push(form.summary.trim())
    lines.push(``)
  }

  // Experience
  if (form.experience && form.experience.length > 0) {
    lines.push(`[WORK EXPERIENCE]`)
    form.experience.forEach((exp, i) => {
      if (!exp.company && !exp.position) return
      lines.push(`--- Position ${i + 1} ---`)
      if (exp.position) lines.push(`Job Title:   ${exp.position}`)
      if (exp.company)  lines.push(`Company:     ${exp.company}`)
      if (exp.location) lines.push(`Location:    ${exp.location}`)
      const end = exp.current ? 'Present' : exp.endDate
      if (exp.startDate) lines.push(`Dates:       ${exp.startDate} -- ${end || ''}`)
      const bullets = exp.bullets.filter(Boolean)
      if (bullets.length > 0) {
        lines.push(`Achievements/Responsibilities:`)
        bullets.forEach((b) => lines.push(`  - ${b}`))
      }
      lines.push(``)
    })
  }

  // Education
  if (form.education && form.education.length > 0) {
    lines.push(`[EDUCATION]`)
    form.education.forEach((edu, i) => {
      if (!edu.institution && !edu.degree) return
      lines.push(`--- Degree ${i + 1} ---`)
      if (edu.degree)      lines.push(`Degree:      ${edu.degree}`)
      if (edu.field)       lines.push(`Field:       ${edu.field}`)
      if (edu.institution) lines.push(`Institution: ${edu.institution}`)
      if (edu.startDate)   lines.push(`Dates:       ${edu.startDate} -- ${edu.endDate || ''}`)
      if (edu.gpa)         lines.push(`GPA:         ${edu.gpa}`)
      if (edu.honors)      lines.push(`Honors:      ${edu.honors}`)
      lines.push(``)
    })
  }

  // Skills
  const s = form.skills
  if (s) {
    const hasSkills = Object.values(s).some((v) => v && v.trim())
    if (hasSkills) {
      lines.push(`[SKILLS]`)
      if (s.technical)  lines.push(`Technical:   ${s.technical}`)
      if (s.frameworks) lines.push(`Frameworks:  ${s.frameworks}`)
      if (s.tools)      lines.push(`Tools:       ${s.tools}`)
      if (s.languages)  lines.push(`Languages:   ${s.languages}`)
      if (s.soft)       lines.push(`Soft Skills: ${s.soft}`)
      lines.push(``)
    }
  }

  // Projects
  if (form.projects && form.projects.length > 0) {
    const validProjects = form.projects.filter((p) => p.name || p.description)
    if (validProjects.length > 0) {
      lines.push(`[PROJECTS]`)
      validProjects.forEach((proj, i) => {
        lines.push(`--- Project ${i + 1} ---`)
        if (proj.name)         lines.push(`Name:        ${proj.name}`)
        if (proj.technologies) lines.push(`Tech Stack:  ${proj.technologies}`)
        if (proj.dates)        lines.push(`Dates:       ${proj.dates}`)
        if (proj.description)  lines.push(`Description: ${proj.description}`)
        if (proj.link)         lines.push(`Link:        ${proj.link}`)
        lines.push(``)
      })
    }
  }

  // Certifications
  if (form.certifications) {
    const valid = form.certifications.filter((c) => c.name)
    if (valid.length > 0) {
      lines.push(`[CERTIFICATIONS]`)
      valid.forEach((c) => {
        let line = c.name
        if (c.issuer) line += ` -- ${c.issuer}`
        if (c.date)   line += ` (${c.date})`
        if (c.link)   line += ` | ${c.link}`
        lines.push(`  - ${line}`)
      })
      lines.push(``)
    }
  }

  // Languages
  if (form.languages) {
    const valid = form.languages.filter((l) => l.language)
    if (valid.length > 0) {
      lines.push(`[LANGUAGES]`)
      valid.forEach((l) => {
        lines.push(`  - ${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`)
      })
      lines.push(``)
    }
  }

  // Awards
  if (form.awards) {
    const valid = form.awards.filter((a) => a.title)
    if (valid.length > 0) {
      lines.push(`[AWARDS AND HONORS]`)
      valid.forEach((a) => {
        let line = a.title
        if (a.issuer) line += ` -- ${a.issuer}`
        if (a.date)   line += ` (${a.date})`
        if (a.description) line += `: ${a.description}`
        lines.push(`  - ${line}`)
      })
      lines.push(``)
    }
  }

  // Publications
  if (form.publications) {
    const valid = form.publications.filter((p) => p.title)
    if (valid.length > 0) {
      lines.push(`[PUBLICATIONS]`)
      valid.forEach((p) => {
        let line = p.title
        if (p.journal) line += `. ${p.journal}`
        if (p.date)    line += ` (${p.date})`
        if (p.doi)     line += `. DOI: ${p.doi}`
        lines.push(`  - ${line}`)
      })
      lines.push(``)
    }
  }

  // Volunteer
  if (form.volunteer) {
    const valid = form.volunteer.filter((v) => v.organization || v.role)
    if (valid.length > 0) {
      lines.push(`[VOLUNTEER EXPERIENCE]`)
      valid.forEach((v) => {
        if (v.role)         lines.push(`Role:         ${v.role}`)
        if (v.organization) lines.push(`Organization: ${v.organization}`)
        if (v.dates)        lines.push(`Dates:        ${v.dates}`)
        if (v.description)  lines.push(`Description:  ${v.description}`)
        lines.push(``)
      })
    }
  }

  // References
  if (form.references && form.references.trim()) {
    lines.push(`[REFERENCES]`)
    lines.push(form.references.trim())
    lines.push(``)
  }

  lines.push(`====================================================`)
  lines.push(`Generated by ResumeTeX - https://navaneethan-p.github.io/ResumeTeX`)
  lines.push(`Paste the resulting LaTeX code into the ResumeTeX editor to compile and download.`)

  return lines.join('\n')
}

export const DEFAULT_FORM_DATA = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
  },
  summary: '',
  experience: [
    { id: 1, company: '', position: '', location: '', startDate: '', endDate: '', current: false, bullets: ['', '', ''] },
  ],
  education: [
    { id: 1, institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', honors: '' },
  ],
  skills: {
    technical: '',
    frameworks: '',
    tools: '',
    languages: '',
    soft: '',
  },
  projects: [
    { id: 1, name: '', technologies: '', description: '', link: '', dates: '' },
  ],
  certifications: [{ id: 1, name: '', issuer: '', date: '', link: '' }],
  languagesList: [{ id: 1, language: '', proficiency: '' }],
  awards: [{ id: 1, title: '', issuer: '', date: '', description: '' }],
  publications: [{ id: 1, title: '', journal: '', date: '', doi: '' }],
  volunteer: [{ id: 1, organization: '', role: '', dates: '', description: '' }],
  references: 'Available upon request',
}
