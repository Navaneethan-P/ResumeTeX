export const modernMinimal = {
  id: 'modern-minimal',
  name: 'Modern Minimal',
  description: 'Clean single-column layout with a thin accent rule. Optimized for ATS parsing.',
  atsScore: 'high',
  code: `% ============================================================
% Modern Minimal Resume Template
% ResumeTeX - https://navaneethan-p.github.io/ResumeTeX
% Creator: Navaneethan P
% License: MIT
% ============================================================
\\documentclass[10pt,a4paper]{article}

% --- Packages ---
\\usepackage[top=1.8cm, bottom=1.8cm, left=2cm, right=2cm]{geometry}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{parskip}

% --- Color (change hex to apply a color theme) ---
\\definecolor{resumeaccent}{HTML}{2E6DA4}
\\definecolor{resumegray}{HTML}{555555}

% --- Hyperlink style ---
\\hypersetup{colorlinks=true, urlcolor=resumeaccent, linkcolor=resumeaccent}

% --- Section heading style ---
\\titleformat{\\section}
  {\\large\\bfseries\\color{resumeaccent}}
  {}
  {0em}
  {}
  [\\color{resumeaccent}\\rule{\\linewidth}{0.6pt}]
\\titlespacing{\\section}{0pt}{10pt}{6pt}

% --- List style ---
\\setlist[itemize]{leftmargin=1.4em, itemsep=1pt, topsep=2pt, parsep=0pt}

% --- No page numbers ---
\\pagestyle{empty}

% ============================================================
\\begin{document}

% --- Name & Contact ---
\\begin{center}
  {\\Huge\\bfseries John Doe}\\\\[6pt]
  {\\color{resumegray}\\small
    \\href{mailto:john.doe@email.com}{john.doe@email.com}
    \\ $\\cdot$\\ 
    +1 (555) 123-4567
    \\ $\\cdot$\\
    New York, NY
    \\ $\\cdot$\\
    \\href{https://linkedin.com/in/johndoe}{linkedin.com/in/johndoe}
    \\ $\\cdot$\\
    \\href{https://github.com/johndoe}{github.com/johndoe}
  }
\\end{center}

% --- Summary ---
\\section{Professional Summary}
Results-driven software engineer with 5 years of experience building scalable web applications.
Proven track record of delivering full-stack solutions that improve performance by 30--60\\%.
Strong collaborator with cross-functional teams in fast-paced startup and enterprise environments.

% --- Experience ---
\\section{Work Experience}

\\textbf{Senior Software Engineer} \\hfill \\textit{Jan 2022 -- Present}\\\\
\\textcolor{resumeaccent}{Acme Corporation} \\hfill New York, NY
\\begin{itemize}
  \\item Led migration of legacy monolith to microservices architecture, reducing deployment time by 65\\%
  \\item Built real-time dashboard serving 50,000 concurrent users with React and WebSockets
  \\item Mentored 4 junior engineers and conducted weekly code review sessions
  \\item Reduced API response latency by 40\\% through Redis caching and query optimization
\\end{itemize}

\\vspace{4pt}

\\textbf{Software Engineer} \\hfill \\textit{Jun 2020 -- Dec 2021}\\\\
\\textcolor{resumeaccent}{Tech Startup Inc.} \\hfill Remote
\\begin{itemize}
  \\item Developed RESTful APIs using Node.js and PostgreSQL, supporting 10,000+ daily active users
  \\item Implemented CI/CD pipelines with GitHub Actions, cutting release cycles from 2 weeks to 3 days
  \\item Collaborated with design team to build accessible React component library used across 3 products
\\end{itemize}

% --- Education ---
\\section{Education}

\\textbf{B.S. Computer Science} \\hfill \\textit{Aug 2016 -- May 2020}\\\\
State University \\hfill GPA: 3.8/4.0

% --- Skills ---
\\section{Technical Skills}

\\textbf{Languages:} JavaScript, TypeScript, Python, Go, SQL\\\\
\\textbf{Frameworks:} React, Node.js, Express, FastAPI, Next.js\\\\
\\textbf{Tools:} Docker, Kubernetes, AWS, PostgreSQL, Redis, Git\\\\
\\textbf{Concepts:} Microservices, REST, GraphQL, CI/CD, Agile

% --- Projects ---
\\section{Projects}

\\textbf{OpenMetrics} \\hfill \\href{https://github.com/johndoe/openmetrics}{github.com/johndoe/openmetrics}\\\\
\\textit{Go, PostgreSQL, React, Docker}
\\begin{itemize}
  \\item Built open-source application performance monitoring tool with 800+ GitHub stars
  \\item Processes 1 million events/day with sub-10ms query latency
\\end{itemize}

% --- Certifications ---
\\section{Certifications}
\\textbf{AWS Certified Solutions Architect} -- Amazon Web Services \\hfill \\textit{2023}\\\\
\\textbf{Certified Kubernetes Administrator (CKA)} -- CNCF \\hfill \\textit{2022}

\\end{document}
`,
}
