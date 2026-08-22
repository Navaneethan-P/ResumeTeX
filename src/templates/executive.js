export const executive = {
  id: 'executive',
  name: 'Executive',
  description: 'Wide margins, elegant gold accent line, refined spacing. For senior leadership and C-suite roles.',
  atsScore: 'high',
  code: `% ============================================================
% Executive Resume Template
% ResumeTeX - https://navaneethan-p.github.io/ResumeTeX
% Creator: Navaneethan P
% License: MIT
% ============================================================
\\documentclass[11pt,a4paper]{article}

\\usepackage[top=2.2cm, bottom=2.2cm, left=2.8cm, right=2.8cm]{geometry}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{microtype}

\\definecolor{resumeaccent}{HTML}{8B6914}
\\definecolor{resumedark}{HTML}{1C1C2E}
\\definecolor{resumegray}{HTML}{555555}

\\hypersetup{colorlinks=true, urlcolor=resumedark}
\\pagestyle{empty}

\\titleformat{\\section}
  {\\normalsize\\bfseries\\scshape\\color{resumedark}}
  {}
  {0em}
  {}
  [\\vspace{-4pt}\\color{resumeaccent}\\rule{\\linewidth}{1.2pt}\\vspace{2pt}]
\\titlespacing{\\section}{0pt}{16pt}{8pt}

\\setlist[itemize]{leftmargin=1.6em, itemsep=3pt, topsep=3pt, parsep=0pt}

\\begin{document}

% --- Name block ---
\\begin{center}
  {\\LARGE\\bfseries\\scshape\\color{resumedark} Robert A. Mitchell}\\\\[6pt]
  {\\color{resumeaccent}\\rule{6cm}{1pt}}\\\\[6pt]
  {\\color{resumegray}\\small
    robert.mitchell@email.com
    \\quad $\\cdot$ \\quad
    +1 (212) 555-0101
    \\quad $\\cdot$ \\quad
    New York, NY
    \\quad $\\cdot$ \\quad
    \\href{https://linkedin.com/in/rmitchell}{linkedin.com/in/rmitchell}
  }
\\end{center}

\\vspace{12pt}

% --- Executive Summary ---
\\section{Executive Profile}
C-suite technology executive with 20 years of experience scaling B2B SaaS companies from
Series A through IPO. Delivered three successful exits totalling \\$4.2 billion. Proven
expertise in building high-performance engineering organizations of 50--400 engineers,
driving product-led growth, and aligning technology strategy with board-level objectives.
Led two digital transformation programmes resulting in 45\\% improvement in operating margin.

% --- Experience ---
\\section{Career History}

\\textbf{Chief Technology Officer} \\hfill \\textit{2019 -- Present}\\\\
\\textsc{Nexus Enterprise Software, Inc.} --- New York, NY
\\begin{itemize}
  \\item Scaled engineering organization from 60 to 280 engineers across 6 global offices
  \\item Led IPO technology readiness programme; company listed at \\$1.8B valuation in 2022
  \\item Drove platform re-architecture reducing infrastructure cost by 38\\% (\\$12M annual savings)
  \\item Established engineering excellence programme achieving 99.99\\% uptime SLA for enterprise clients
  \\item Recruited and developed 4 VP-level engineering leaders who remain with the organization
\\end{itemize}

\\vspace{8pt}

\\textbf{VP Engineering} \\hfill \\textit{2015 -- 2019}\\\\
\\textsc{Clarity Analytics} --- Boston, MA
\\begin{itemize}
  \\item Built engineering team from 12 to 80 engineers; company acquired by Oracle for \\$620M
  \\item Established agile delivery model, increasing product release velocity by 4x
  \\item Oversaw migration of on-premise product to multi-tenant SaaS, growing ARR from \\$8M to \\$42M
\\end{itemize}

\\vspace{8pt}

\\textbf{Director of Engineering} \\hfill \\textit{2010 -- 2015}\\\\
\\textsc{DataStream Corp.} --- Chicago, IL
\\begin{itemize}
  \\item Managed 35-engineer team delivering real-time financial data platform to 300+ enterprise clients
  \\item Led acquisition integration of two companies, consolidating 3 technology stacks into one
\\end{itemize}

% --- Education ---
\\section{Education}

\\textbf{Executive MBA} \\hfill \\textit{2012 -- 2014}\\\\
Harvard Business School

\\vspace{4pt}

\\textbf{B.S. Computer Engineering} \\hfill \\textit{1998 -- 2002}\\\\
University of Michigan, Ann Arbor --- Summa Cum Laude

% --- Board and Advisory ---
\\section{Board and Advisory Roles}

Advisory Board, TechStars New York \\hfill \\textit{2021 -- Present}\\\\
Board Director, National Association of CIOs \\hfill \\textit{2020 -- Present}\\\\
Angel Investor, 8 early-stage SaaS companies \\hfill \\textit{2018 -- Present}

% --- Competencies ---
\\section{Core Competencies}
Technology Strategy and Vision $\\cdot$ Engineering Organization Design $\\cdot$ M\\&A and Integration\\\\
Product-Led Growth $\\cdot$ Board Communication $\\cdot$ SaaS P\\&L Ownership $\\cdot$ Fundraising Support

\\end{document}
`,
}
