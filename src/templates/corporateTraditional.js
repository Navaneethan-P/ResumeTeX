export const corporateTraditional = {
  id: 'corporate-traditional',
  name: 'Corporate Traditional',
  description: 'Formal serif-font layout with a solid header bar. Ideal for finance, law, and consulting roles.',
  atsScore: 'high',
  code: `% ============================================================
% Corporate Traditional Resume Template
% ResumeTeX - https://navaneethan-p.github.io/ResumeTeX
% Creator: Navaneethan P
% License: MIT
% ============================================================
\\documentclass[10pt,a4paper]{article}

\\usepackage[top=2cm, bottom=2cm, left=2.2cm, right=2.2cm]{geometry}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{array}
\\usepackage{booktabs}

% --- Colors ---
\\definecolor{resumeaccent}{HTML}{1B3A5C}
\\definecolor{headerbg}{HTML}{1B3A5C}
\\definecolor{headertext}{HTML}{FFFFFF}
\\definecolor{rulecolor}{HTML}{C8A951}

\\hypersetup{colorlinks=true, urlcolor=resumeaccent, linkcolor=resumeaccent}
\\pagestyle{empty}

% --- Section format ---
\\titleformat{\\section}
  {\\normalsize\\bfseries\\color{resumeaccent}\\uppercase}
  {}
  {0em}
  {}
  [\\color{rulecolor}\\rule{\\linewidth}{1.5pt}]
\\titlespacing{\\section}{0pt}{12pt}{6pt}

\\setlist[itemize]{leftmargin=1.4em, itemsep=1pt, topsep=2pt, parsep=0pt}

\\begin{document}

% --- Header block ---
\\noindent
\\colorbox{headerbg}{%
  \\begin{minipage}{\\linewidth}
    \\vspace{8pt}
    \\begin{center}
      {\\Huge\\bfseries\\color{headertext} Jane Smith}\\\\[4pt]
      {\\color{headertext}\\small
        jane.smith@email.com
        \\quad|\\quad
        +44 20 1234 5678
        \\quad|\\quad
        London, United Kingdom
        \\quad|\\quad
        linkedin.com/in/janesmith
      }
    \\end{center}
    \\vspace{8pt}
  \\end{minipage}%
}

\\vspace{12pt}

% --- Summary ---
\\section{Executive Summary}
Senior financial analyst with 8 years of experience in investment banking and corporate strategy.
Specialized in M\\&A advisory, financial modelling, and cross-border transactions totalling
\\$2.4 billion. CFA charterholder with demonstrated ability to lead teams of 6--10 analysts.

% --- Experience ---
\\section{Professional Experience}

\\textbf{Vice President, Investment Banking} \\hfill \\textit{Mar 2020 -- Present}\\\\
\\textit{Global Finance Group, London}
\\begin{itemize}
  \\item Advised on 14 M\\&A transactions totalling \\$2.4 billion in deal value across EMEA region
  \\item Built and maintained complex DCF, LBO, and merger consequence models for C-suite presentations
  \\item Managed and mentored team of 6 analysts, achieving 95\\% analyst retention rate
  \\item Developed client relationships generating \\$18M in annual fee revenue
\\end{itemize}

\\vspace{4pt}

\\textbf{Associate, Corporate Finance} \\hfill \\textit{Jul 2017 -- Feb 2020}\\\\
\\textit{Premier Capital Partners, London}
\\begin{itemize}
  \\item Executed 8 equity capital market transactions including IPOs and secondary offerings
  \\item Prepared board-level presentations and regulatory filings under FCA guidelines
  \\item Reduced financial modelling turnaround time by 30\\% through Excel automation and standardized templates
\\end{itemize}

% --- Education ---
\\section{Education}

\\textbf{MSc Finance} \\hfill \\textit{Sep 2015 -- Jun 2016}\\\\
London School of Economics \\hfill Distinction

\\vspace{4pt}

\\textbf{B.Sc. Economics} \\hfill \\textit{Sep 2012 -- Jun 2015}\\\\
University of Edinburgh \\hfill First Class Honours

% --- Certifications ---
\\section{Professional Qualifications}
CFA Charterholder (Level III Passed) \\hfill \\textit{2019}\\\\
CAIA Level I \\hfill \\textit{2018}

% --- Skills ---
\\section{Core Competencies}
\\textbf{Technical:} Financial Modelling, Valuation (DCF/LBO/Comps), Bloomberg Terminal, FactSet\\\\
\\textbf{Software:} Microsoft Excel (Advanced VBA), PowerPoint, Capital IQ, Argus\\\\
\\textbf{Languages:} English (Native), French (Business), German (Conversational)

\\end{document}
`,
}
