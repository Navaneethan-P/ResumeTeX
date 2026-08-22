export const creativeDesign = {
  id: 'creative-design',
  name: 'Creative Design',
  description: 'Bold left-border section accents with two-column skills layout. Best for design, marketing, and media roles.',
  atsScore: 'medium',
  code: `% ============================================================
% Creative Design Resume Template
% ResumeTeX - https://navaneethan-p.github.io/ResumeTeX
% Creator: Navaneethan P
% License: MIT
% Note: Use with care for ATS - some parsers struggle
%       with multi-column layouts
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
\\usepackage{mdframed}
\\usepackage{multicol}

% --- Colors ---
\\definecolor{resumeaccent}{HTML}{D4500A}
\\definecolor{resumedark}{HTML}{1A1A2E}
\\definecolor{resumelight}{HTML}{F5F5F5}

\\hypersetup{colorlinks=true, urlcolor=resumeaccent}
\\pagestyle{empty}

% --- Section format with left border ---
\\newmdenv[
  leftline=true,
  rightline=false,
  topline=false,
  bottomline=false,
  linewidth=3pt,
  linecolor=resumeaccent,
  innerleftmargin=10pt,
  innerrightmargin=0pt,
  innertopmargin=0pt,
  innerbottommargin=0pt,
  backgroundcolor=white
]{sectionbar}

\\titleformat{\\section}
  {\\large\\bfseries\\color{resumedark}}
  {}
  {0em}
  {}
\\titlespacing{\\section}{0pt}{12pt}{4pt}

\\setlist[itemize]{leftmargin=1.4em, itemsep=1pt, topsep=2pt, parsep=0pt}

\\begin{document}

% --- Name block ---
\\noindent
{\\Huge\\bfseries\\color{resumedark} Alex Rivera}\\\\[2pt]
{\\large\\color{resumeaccent} UX Designer \\& Creative Director}\\\\[4pt]
{\\small\\color{gray}
  alex.rivera@email.com
  $\\cdot$ +1 (415) 987-6543
  $\\cdot$ San Francisco, CA
  $\\cdot$ \\href{https://alexrivera.design}{alexrivera.design}
  $\\cdot$ \\href{https://linkedin.com/in/alexrivera}{LinkedIn}
}

\\vspace{1pt}
\\noindent\\color{resumeaccent}\\rule{\\linewidth}{2pt}
\\vspace{8pt}

% --- Summary ---
\\section{About}
\\begin{sectionbar}
Award-winning UX designer with 7 years of experience crafting digital products used by
over 5 million people. Led design systems at series B and series D startups. Passionate about
accessible design, design operations, and human-centered product thinking.
\\end{sectionbar}

% --- Experience ---
\\section{Experience}

\\begin{sectionbar}
\\textbf{Lead UX Designer} \\hfill \\textit{2021 -- Present}\\\\
\\textcolor{resumeaccent}{DesignForward Inc.} \\hfill San Francisco, CA
\\begin{itemize}
  \\item Redesigned onboarding flow, increasing 30-day retention by 28\\%
  \\item Built and maintained design system with 200+ components used by 12 engineers
  \\item Conducted 40+ user research sessions and translated insights into shipped features
  \\item Managed design team of 5, establishing critique and sprint processes
\\end{itemize}

\\vspace{6pt}

\\textbf{Senior UX Designer} \\hfill \\textit{2018 -- 2021}\\\\
\\textcolor{resumeaccent}{Creative Agency Co.} \\hfill Remote
\\begin{itemize}
  \\item Delivered end-to-end product design for 20+ clients across fintech, healthcare, and e-commerce
  \\item Reduced client design iteration cycles by 50\\% by introducing prototyping-first methodology
\\end{itemize}
\\end{sectionbar}

% --- Education ---
\\section{Education}
\\begin{sectionbar}
\\textbf{B.F.A. Graphic Design} \\hfill \\textit{2014 -- 2018}\\\\
California College of the Arts \\hfill GPA: 3.9/4.0
\\end{sectionbar}

% --- Skills (two column) ---
\\section{Skills}
\\begin{sectionbar}
\\begin{multicols}{2}
\\textbf{Design}\\\\
Figma, Adobe XD, Sketch\\\\
Prototyping, Wireframing\\\\
Design Systems, WCAG 2.1\\\\
User Research, A/B Testing

\\columnbreak

\\textbf{Technical}\\\\
HTML/CSS, React (basic)\\\\
Framer, Webflow\\\\
Jira, Notion, Zeplin\\\\
Motion Design (After Effects)
\\end{multicols}
\\end{sectionbar}

% --- Awards ---
\\section{Awards}
\\begin{sectionbar}
\\textbf{Awwwards Site of the Day} -- DesignForward Rebrand \\hfill \\textit{2023}\\\\
\\textbf{CSS Design Awards -- Best UX} \\hfill \\textit{2022}
\\end{sectionbar}

\\end{document}
`,
}
