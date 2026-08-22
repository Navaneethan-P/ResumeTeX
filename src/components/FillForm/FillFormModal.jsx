import { useState, useCallback } from 'react'
import { generatePrompt, DEFAULT_FORM_DATA } from './promptGenerator.js'
import { useStore } from '../../store/useStore.js'

const PROFICIENCY_OPTIONS = ['Native', 'Fluent', 'Professional', 'Conversational', 'Basic']

function addItem(list, template) {
  return [...list, { ...template, id: Date.now() }]
}
function removeItem(list, id) {
  return list.filter((i) => i.id !== id)
}
function updateItem(list, id, field, value) {
  return list.map((i) => (i.id === id ? { ...i, [field]: value } : i))
}

export default function FillFormModal() {
  const setShowFillForm = useStore((s) => s.setShowFillForm)
  const pasteGeneratedCode = useStore((s) => s.pasteGeneratedCode)

  const [form, setForm] = useState(DEFAULT_FORM_DATA)
  const [prompt, setPrompt] = useState('')
  const [copied, setCopied] = useState(false)
  const [pasteMode, setPasteMode] = useState(false)
  const [pastedCode, setPastedCode] = useState('')
  const [activeSection, setActiveSection] = useState('personal')

  const setPersonal = (field, val) =>
    setForm((f) => ({ ...f, personalInfo: { ...f.personalInfo, [field]: val } }))
  const setSkill = (field, val) =>
    setForm((f) => ({ ...f, skills: { ...f.skills, [field]: val } }))

  const handleGenerate = useCallback(() => {
    const p = generatePrompt({
      ...form,
      languages: form.languagesList,
    })
    setPrompt(p)
    setPasteMode(false)
  }, [form])

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const handleUseCode = () => {
    if (pastedCode.trim()) {
      // Strip markdown code fences if present
      const stripped = pastedCode
        .replace(/^```(?:latex)?\s*/i, '')
        .replace(/\s*```\s*$/, '')
        .trim()
      pasteGeneratedCode(stripped)
      setShowFillForm(false)
    }
  }

  const SECTIONS = [
    { id: 'personal',   label: 'Personal Info' },
    { id: 'summary',    label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education',  label: 'Education' },
    { id: 'skills',     label: 'Skills' },
    { id: 'projects',   label: 'Projects' },
    { id: 'extras',     label: 'More Sections' },
  ]

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowFillForm(false)}>
      <div className="modal" style={{ width: '880px', maxWidth: '96vw', maxHeight: '92vh' }}>
        <div className="modal-header">
          <div>
            <div className="modal-title">Fill Form — AI Prompt Generator</div>
            <div className="modal-subtitle">
              Fill in your resume details, generate an AI prompt, paste it into ChatGPT or Claude, then paste the LaTeX code back here.
            </div>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={() => setShowFillForm(false)} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Section Nav */}
          <div style={{ width: 160, borderRight: '1px solid var(--border-0)', flexShrink: 0, padding: '12px 0', overflowY: 'auto' }}>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`btn btn-ghost w-full`}
                style={{
                  justifyContent: 'flex-start',
                  borderRadius: 0,
                  paddingLeft: 20,
                  fontSize: 13,
                  height: 34,
                  color: activeSection === s.id ? 'var(--accent)' : 'var(--text-1)',
                  background: activeSection === s.id ? 'var(--accent-dim)' : 'transparent',
                  borderLeft: activeSection === s.id ? '2px solid var(--accent)' : '2px solid transparent',
                }}
                onClick={() => setActiveSection(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Form Body */}
          <div className="modal-body" style={{ flex: 1, padding: '20px 24px' }}>

            {/* PERSONAL INFO */}
            {activeSection === 'personal' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p className="section-label">Personal Information</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    ['fullName', 'Full Name', 'John Doe'],
                    ['jobTitle', 'Target Job Title', 'Software Engineer'],
                    ['email', 'Email Address', 'john@email.com'],
                    ['phone', 'Phone Number', '+1 (555) 123-4567'],
                    ['location', 'Location (City, Country)', 'New York, NY'],
                    ['linkedin', 'LinkedIn URL', 'linkedin.com/in/johndoe'],
                    ['github', 'GitHub URL', 'github.com/johndoe'],
                    ['website', 'Personal Website', 'johndoe.dev'],
                  ].map(([field, label, placeholder]) => (
                    <div key={field} className="input-group">
                      <label className="input-label">{label}</label>
                      <input className="input input-sm" placeholder={placeholder} value={form.personalInfo[field]} onChange={(e) => setPersonal(field, e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUMMARY */}
            {activeSection === 'summary' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p className="section-label">Professional Summary</p>
                <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
                  A 2-3 sentence overview of your experience, specialization, and what you bring to the role. Leave blank to omit.
                </p>
                <div className="input-group">
                  <label className="input-label">Summary / Objective</label>
                  <textarea className="input" rows={6} placeholder="Results-driven software engineer with 5 years of experience..." value={form.summary} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} />
                </div>
              </div>
            )}

            {/* EXPERIENCE */}
            {activeSection === 'experience' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p className="section-label">Work Experience</p>
                {form.experience.map((exp, idx) => (
                  <div key={exp.id} style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-md)', padding: 16, border: '1px solid var(--border-0)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>Position {idx + 1}</span>
                      {form.experience.length > 1 && (
                        <button className="btn btn-ghost btn-icon-sm" onClick={() => setForm((f) => ({ ...f, experience: removeItem(f.experience, exp.id) }))}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </button>
                      )}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {[['company','Company Name','Acme Corp'],['position','Job Title','Senior Engineer'],['location','Location','New York, NY'],].map(([f,l,ph]) => (
                        <div key={f} className="input-group">
                          <label className="input-label">{l}</label>
                          <input className="input input-sm" placeholder={ph} value={exp[f]} onChange={(e) => setForm((fm) => ({ ...fm, experience: updateItem(fm.experience, exp.id, f, e.target.value) }))} />
                        </div>
                      ))}
                      <div className="input-group">
                        <label className="input-label">Start Date</label>
                        <input className="input input-sm" placeholder="Jan 2022" value={exp.startDate} onChange={(e) => setForm((fm) => ({ ...fm, experience: updateItem(fm.experience, exp.id, 'startDate', e.target.value) }))} />
                      </div>
                      <div className="input-group">
                        <label className="input-label">End Date</label>
                        <input className="input input-sm" placeholder="Present" value={exp.current ? 'Present' : exp.endDate} disabled={exp.current} onChange={(e) => setForm((fm) => ({ ...fm, experience: updateItem(fm.experience, exp.id, 'endDate', e.target.value) }))} />
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>
                          <input type="checkbox" checked={exp.current} onChange={(e) => setForm((fm) => ({ ...fm, experience: updateItem(fm.experience, exp.id, 'current', e.target.checked) }))} />
                          Current role
                        </label>
                      </div>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Key Achievements / Responsibilities (one per line, start with action verbs)</label>
                      {exp.bullets.map((b, bi) => (
                        <input key={bi} className="input input-sm" style={{ marginBottom: 4 }} placeholder={`Achievement ${bi+1}. e.g. Led migration reducing costs by 40%`} value={b} onChange={(e) => {
                          const newBullets = [...exp.bullets]
                          newBullets[bi] = e.target.value
                          setForm((fm) => ({ ...fm, experience: updateItem(fm.experience, exp.id, 'bullets', newBullets) }))
                        }} />
                      ))}
                      <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start', marginTop: 4 }} onClick={() => setForm((fm) => ({ ...fm, experience: updateItem(fm.experience, exp.id, 'bullets', [...exp.bullets, '']) }))}>
                        + Add bullet
                      </button>
                    </div>
                  </div>
                ))}
                <button className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setForm((f) => ({ ...f, experience: addItem(f.experience, { company:'',position:'',location:'',startDate:'',endDate:'',current:false,bullets:['','',''] }) }))}>
                  + Add Position
                </button>
              </div>
            )}

            {/* EDUCATION */}
            {activeSection === 'education' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p className="section-label">Education</p>
                {form.education.map((edu, idx) => (
                  <div key={edu.id} style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-md)', padding: 16, border: '1px solid var(--border-0)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>Degree {idx + 1}</span>
                      {form.education.length > 1 && (
                        <button className="btn btn-ghost btn-icon-sm" onClick={() => setForm((f) => ({ ...f, education: removeItem(f.education, edu.id) }))}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </button>
                      )}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {[['degree','Degree','B.S. / M.S. / Ph.D.'],['field','Field of Study','Computer Science'],['institution','Institution','University Name'],['gpa','GPA (optional)','3.8/4.0'],['honors','Honors (optional)','Summa Cum Laude'],].map(([f,l,ph]) => (
                        <div key={f} className="input-group">
                          <label className="input-label">{l}</label>
                          <input className="input input-sm" placeholder={ph} value={edu[f]} onChange={(e) => setForm((fm) => ({ ...fm, education: updateItem(fm.education, edu.id, f, e.target.value) }))} />
                        </div>
                      ))}
                      <div className="input-group">
                        <label className="input-label">Start Year</label>
                        <input className="input input-sm" placeholder="2018" value={edu.startDate} onChange={(e) => setForm((fm) => ({ ...fm, education: updateItem(fm.education, edu.id, 'startDate', e.target.value) }))} />
                      </div>
                      <div className="input-group">
                        <label className="input-label">End Year</label>
                        <input className="input input-sm" placeholder="2022" value={edu.endDate} onChange={(e) => setForm((fm) => ({ ...fm, education: updateItem(fm.education, edu.id, 'endDate', e.target.value) }))} />
                      </div>
                    </div>
                  </div>
                ))}
                <button className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setForm((f) => ({ ...f, education: addItem(f.education, { institution:'',degree:'',field:'',startDate:'',endDate:'',gpa:'',honors:'' }) }))}>
                  + Add Degree
                </button>
              </div>
            )}

            {/* SKILLS */}
            {activeSection === 'skills' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p className="section-label">Skills</p>
                <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>List items separated by commas. Leave sections blank to omit them.</p>
                {[
                  ['technical', 'Technical / Programming Languages', 'Python, JavaScript, Go, SQL, Rust'],
                  ['frameworks', 'Frameworks and Libraries', 'React, Node.js, Django, FastAPI, Spring Boot'],
                  ['tools', 'Tools and Platforms', 'Docker, Kubernetes, AWS, PostgreSQL, Redis, Git'],
                  ['languages', 'Human Languages', 'English (Native), French (Professional), Hindi (Fluent)'],
                  ['soft', 'Soft Skills (optional)', 'Team leadership, technical communication, agile delivery'],
                ].map(([field, label, placeholder]) => (
                  <div key={field} className="input-group">
                    <label className="input-label">{label}</label>
                    <input className="input input-sm" placeholder={placeholder} value={form.skills[field]} onChange={(e) => setSkill(field, e.target.value)} />
                  </div>
                ))}
              </div>
            )}

            {/* PROJECTS */}
            {activeSection === 'projects' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p className="section-label">Projects</p>
                {form.projects.map((proj, idx) => (
                  <div key={proj.id} style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-md)', padding: 16, border: '1px solid var(--border-0)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>Project {idx + 1}</span>
                      {form.projects.length > 1 && (
                        <button className="btn btn-ghost btn-icon-sm" onClick={() => setForm((f) => ({ ...f, projects: removeItem(f.projects, proj.id) }))}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </button>
                      )}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {[['name','Project Name','OpenMetrics'],['technologies','Tech Stack','Go, React, Docker'],['dates','Dates (optional)','2023'],['link','GitHub / Demo Link','github.com/user/project'],].map(([f,l,ph]) => (
                        <div key={f} className="input-group">
                          <label className="input-label">{l}</label>
                          <input className="input input-sm" placeholder={ph} value={proj[f]} onChange={(e) => setForm((fm) => ({ ...fm, projects: updateItem(fm.projects, proj.id, f, e.target.value) }))} />
                        </div>
                      ))}
                    </div>
                    <div className="input-group">
                      <label className="input-label">Description (what it does, impact, scale)</label>
                      <textarea className="input input-sm" rows={3} placeholder="Open-source APM tool processing 1M events/day with sub-10ms latency. 800+ GitHub stars." value={proj.description} onChange={(e) => setForm((fm) => ({ ...fm, projects: updateItem(fm.projects, proj.id, 'description', e.target.value) }))} />
                    </div>
                  </div>
                ))}
                <button className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setForm((f) => ({ ...f, projects: addItem(f.projects, { name:'',technologies:'',description:'',link:'',dates:'' }) }))}>
                  + Add Project
                </button>
              </div>
            )}

            {/* EXTRAS */}
            {activeSection === 'extras' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Certifications */}
                <div>
                  <p className="section-label" style={{ marginBottom: 10 }}>Certifications</p>
                  {form.certifications.map((cert, idx) => (
                    <div key={cert.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: 8, marginBottom: 8, alignItems: 'end' }}>
                      <div className="input-group"><label className="input-label">Name</label><input className="input input-sm" placeholder="AWS Solutions Architect" value={cert.name} onChange={(e) => setForm((f) => ({ ...f, certifications: updateItem(f.certifications, cert.id, 'name', e.target.value) }))} /></div>
                      <div className="input-group"><label className="input-label">Issuer</label><input className="input input-sm" placeholder="Amazon" value={cert.issuer} onChange={(e) => setForm((f) => ({ ...f, certifications: updateItem(f.certifications, cert.id, 'issuer', e.target.value) }))} /></div>
                      <div className="input-group"><label className="input-label">Date</label><input className="input input-sm" placeholder="2023" value={cert.date} onChange={(e) => setForm((f) => ({ ...f, certifications: updateItem(f.certifications, cert.id, 'date', e.target.value) }))} /></div>
                      {form.certifications.length > 1 && <button className="btn btn-ghost btn-icon-sm" style={{ marginBottom: 2 }} onClick={() => setForm((f) => ({ ...f, certifications: removeItem(f.certifications, cert.id) }))}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button>}
                    </div>
                  ))}
                  <button className="btn btn-ghost btn-sm" onClick={() => setForm((f) => ({ ...f, certifications: addItem(f.certifications, { name:'',issuer:'',date:'',link:'' }) }))}>+ Add Certification</button>
                </div>

                {/* Languages */}
                <div>
                  <p className="section-label" style={{ marginBottom: 10 }}>Languages Spoken</p>
                  {form.languagesList.map((lang) => (
                    <div key={lang.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, marginBottom: 8, alignItems: 'end' }}>
                      <div className="input-group"><label className="input-label">Language</label><input className="input input-sm" placeholder="French" value={lang.language} onChange={(e) => setForm((f) => ({ ...f, languagesList: updateItem(f.languagesList, lang.id, 'language', e.target.value) }))} /></div>
                      <div className="input-group">
                        <label className="input-label">Proficiency</label>
                        <select className="input input-sm" value={lang.proficiency} onChange={(e) => setForm((f) => ({ ...f, languagesList: updateItem(f.languagesList, lang.id, 'proficiency', e.target.value) }))}>
                          <option value="">Select...</option>
                          {PROFICIENCY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      {form.languagesList.length > 1 && <button className="btn btn-ghost btn-icon-sm" style={{ marginBottom: 2 }} onClick={() => setForm((f) => ({ ...f, languagesList: removeItem(f.languagesList, lang.id) }))}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button>}
                    </div>
                  ))}
                  <button className="btn btn-ghost btn-sm" onClick={() => setForm((f) => ({ ...f, languagesList: addItem(f.languagesList, { language:'',proficiency:'' }) }))}>+ Add Language</button>
                </div>

                {/* Awards */}
                <div>
                  <p className="section-label" style={{ marginBottom: 10 }}>Awards and Honors</p>
                  {form.awards.map((award) => (
                    <div key={award.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: 8, marginBottom: 8, alignItems: 'end' }}>
                      <div className="input-group"><label className="input-label">Award Title</label><input className="input input-sm" placeholder="Best Paper Award" value={award.title} onChange={(e) => setForm((f) => ({ ...f, awards: updateItem(f.awards, award.id, 'title', e.target.value) }))} /></div>
                      <div className="input-group"><label className="input-label">Issuer</label><input className="input input-sm" placeholder="IEEE" value={award.issuer} onChange={(e) => setForm((f) => ({ ...f, awards: updateItem(f.awards, award.id, 'issuer', e.target.value) }))} /></div>
                      <div className="input-group"><label className="input-label">Year</label><input className="input input-sm" placeholder="2023" value={award.date} onChange={(e) => setForm((f) => ({ ...f, awards: updateItem(f.awards, award.id, 'date', e.target.value) }))} /></div>
                      {form.awards.length > 1 && <button className="btn btn-ghost btn-icon-sm" style={{ marginBottom: 2 }} onClick={() => setForm((f) => ({ ...f, awards: removeItem(f.awards, award.id) }))}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button>}
                    </div>
                  ))}
                  <button className="btn btn-ghost btn-sm" onClick={() => setForm((f) => ({ ...f, awards: addItem(f.awards, { title:'',issuer:'',date:'',description:'' }) }))}>+ Add Award</button>
                </div>

                {/* References */}
                <div className="input-group">
                  <label className="input-label">References</label>
                  <input className="input input-sm" placeholder="Available upon request" value={form.references} onChange={(e) => setForm((f) => ({ ...f, references: e.target.value }))} />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Generated Prompt Panel */}
        {prompt && (
          <div style={{ borderTop: '1px solid var(--border-0)', padding: '16px 24px', background: 'var(--bg-0)', flexShrink: 0 }}>
            {!pasteMode ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>
                    Prompt ready — copy and paste into ChatGPT, Claude, or any AI assistant
                  </span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => setPasteMode(true)}>Paste AI Response</button>
                    <button className="btn btn-primary btn-sm" onClick={handleCopy}>
                      {copied ? 'Copied!' : 'Copy Prompt'}
                    </button>
                  </div>
                </div>
                <pre style={{ maxHeight: 120, overflowY: 'auto', background: 'var(--bg-2)', border: '1px solid var(--border-0)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontSize: 11, color: 'var(--text-1)', lineHeight: 1.5, fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {prompt.slice(0, 600)}{prompt.length > 600 ? '...' : ''}
                </pre>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>Paste the LaTeX code from the AI response below</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setPasteMode(false)}>Back</button>
                    <button className="btn btn-primary btn-sm" onClick={handleUseCode} disabled={!pastedCode.trim()}>Use in Editor</button>
                  </div>
                </div>
                <textarea
                  className="input"
                  rows={5}
                  placeholder="Paste the LaTeX code block from your AI assistant here..."
                  value={pastedCode}
                  onChange={(e) => setPastedCode(e.target.value)}
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}
                />
              </>
            )}
          </div>
        )}

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={() => setShowFillForm(false)}>Cancel</button>
          <button className="btn btn-secondary" onClick={() => { setForm(DEFAULT_FORM_DATA); setPrompt('') }}>Clear Form</button>
          <button className="btn btn-primary" onClick={handleGenerate}>Generate AI Prompt</button>
        </div>
      </div>
    </div>
  )
}
