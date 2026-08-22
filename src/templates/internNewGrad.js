export const internNewGrad = {
  id: 'intern-new-grad',
  name: 'Intern / New Grad',
  description: 'Education-first layout with projects, coursework, and internships. Built for students and early-career applicants.',
  atsScore: 'high',
  code: `% ============================================================
% Intern / New Grad Resume Template
% ResumeTeX - https://navaneethan-p.github.io/ResumeTeX
% Creator: Navaneethan P
% License: MIT
% ============================================================
\\documentclass[10pt,a4paper]{article}

\\usepackage[top=1.7cm, bottom=1.7cm, left=1.9cm, right=1.9cm]{geometry}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{parskip}

\\definecolor{resumeaccent}{HTML}{1B6CA8}
\\definecolor{resumegray}{HTML}{555555}

\\hypersetup{colorlinks=true, urlcolor=resumeaccent, linkcolor=resumeaccent}

\\titleformat{\\section}
  {\\large\\bfseries\\color{resumeaccent}}
  {}
  {0em}
  {}
  [\\color{resumeaccent}\\rule{\\linewidth}{0.6pt}]
\\titlespacing{\\section}{0pt}{9pt}{5pt}

\\setlist[itemize]{leftmargin=1.3em, itemsep=1pt, topsep=2pt, parsep=0pt}
\\pagestyle{empty}

\\begin{document}

\\begin{center}
  {\\Huge\\bfseries Alex Rivera}\\\\[4pt]
  {\\small Aspiring Software Engineer \\ $\\cdot$\\  Available May 2026}\\\\[4pt]
  {\\color{resumegray}\\small
    \\href{mailto:alex.rivera@university.edu}{alex.rivera@university.edu}
    \\ $\\cdot$\\
    +1 (555) 010-8821
    \\ $\\cdot$\\
    Boston, MA
    \\ $\\cdot$\\
    \\href{https://linkedin.com/in/alexrivera}{linkedin.com/in/alexrivera}
    \\ $\\cdot$\\
    \\href{https://github.com/alexrivera}{github.com/alexrivera}
  }
\\end{center}

\\section{Education}

\\textbf{B.S. Computer Science} \\hfill \\textit{Sep 2022 -- May 2026}\\\\
State University \\hfill GPA: 3.7/4.0\\\\
\\textit{Coursework:} Data Structures, Algorithms, Operating Systems, Databases, Machine Learning

\\section{Experience}

\\textbf{Software Engineering Intern} \\hfill \\textit{Jun 2025 -- Aug 2025}\\\\
\\textcolor{resumeaccent}{Cloudline Labs} \\hfill Remote
\\begin{itemize}
  \\item Built a React dashboard that reduced on-call triage time by 35\\% for a 12-person platform team
  \\item Implemented REST endpoints in Python and FastAPI covering 8 customer-facing reports
  \\item Wrote integration tests that caught 14 regressions before weekly staging deploys
\\end{itemize}

\\vspace{4pt}

\\textbf{Undergraduate Research Assistant} \\hfill \\textit{Jan 2025 -- Present}\\\\
\\textcolor{resumeaccent}{HCI Lab, State University} \\hfill Boston, MA
\\begin{itemize}
  \\item Designed a usability study with 24 participants and analyzed task-completion time in Python
  \\item Co-authored an internal technical report summarizing findings for faculty advisors
\\end{itemize}

\\section{Projects}

\\textbf{CampusConnect} \\hfill \\href{https://github.com/alexrivera/campusconnect}{github.com/alexrivera/campusconnect}\\\\
\\textit{TypeScript, Node.js, PostgreSQL, React}
\\begin{itemize}
  \\item Developed a campus event board used by 400+ students during orientation week
  \\item Added search and filters that cut average time-to-event from 45 seconds to 12 seconds
\\end{itemize}

\\vspace{4pt}

\\textbf{GradeScope Lite} \\hfill \\href{https://github.com/alexrivera/gradescope-lite}{github.com/alexrivera/gradescope-lite}\\\\
\\textit{Python, Flask, SQLite}
\\begin{itemize}
  \\item Created an assignment autograder handling 200 submissions per homework with 98\\% match accuracy
\\end{itemize}

\\section{Technical Skills}

\\textbf{Languages:} Python, Java, JavaScript, TypeScript, SQL, HTML/CSS\\\\
\\textbf{Frameworks:} React, Node.js, Flask, FastAPI\\\\
\\textbf{Tools:} Git, GitHub Actions, Docker, PostgreSQL, Figma, Linux\\\\
\\textbf{Concepts:} REST APIs, unit testing, Agile, accessibility (WCAG)

\\section{Leadership}

\\textbf{Vice President, Computing Club} \\hfill \\textit{2024 -- Present}\\\\
Organized 6 workshops for 80+ members covering Git, interviews, and open-source contributions.

\\end{document}
`,
}