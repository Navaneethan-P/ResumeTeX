export const academicCV = {
  id: 'academic-cv',
  name: 'Academic CV',
  description: 'Long-form academic curriculum vitae with publications, research, and teaching sections.',
  atsScore: 'high',
  code: `% ============================================================
% Academic CV Template
% ResumeTeX - https://navaneethan-p.github.io/ResumeTeX
% Creator: Navaneethan P
% License: MIT
% ============================================================
\\documentclass[11pt,a4paper]{article}

\\usepackage[top=2cm, bottom=2cm, left=2.5cm, right=2.5cm]{geometry}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{parskip}

\\definecolor{resumeaccent}{HTML}{2C3E50}
\\definecolor{resumegray}{HTML}{666666}

\\hypersetup{colorlinks=true, urlcolor=resumeaccent}
\\pagestyle{empty}

\\titleformat{\\section}
  {\\large\\scshape\\color{resumeaccent}}
  {}
  {0em}
  {}
  [\\rule{\\linewidth}{0.4pt}]
\\titlespacing{\\section}{0pt}{14pt}{8pt}

\\setlist[itemize]{leftmargin=1.4em, itemsep=2pt, topsep=3pt}

\\begin{document}

% --- Name ---
\\begin{center}
  {\\LARGE\\bfseries Dr. Priya Ramanathan}\\\\[6pt]
  {\\color{resumegray}
    Department of Computer Science, Stanford University\\\\
    \\href{mailto:p.ramanathan@stanford.edu}{p.ramanathan@stanford.edu}
    $\\cdot$ +1 (650) 721-0000
    $\\cdot$ \\href{https://priyanathan.ac}{priyanathan.ac}
    $\\cdot$ \\href{https://scholar.google.com/citations?user=xxx}{Google Scholar}
  }
\\end{center}

% --- Research Interests ---
\\section{Research Interests}
Distributed Systems, Byzantine Fault Tolerance, Federated Machine Learning,
Privacy-Preserving Computation, Formal Verification of Concurrent Programs.

% --- Academic Positions ---
\\section{Academic Positions}

\\textbf{Assistant Professor} \\hfill \\textit{2021 -- Present}\\\\
Department of Computer Science, Stanford University\\\\
\\textit{Research groups: Systems, Security, and Foundations}

\\vspace{6pt}

\\textbf{Postdoctoral Researcher} \\hfill \\textit{2019 -- 2021}\\\\
MIT CSAIL -- advised by Prof. Barbara Liskov

% --- Education ---
\\section{Education}

\\textbf{Ph.D. Computer Science} \\hfill \\textit{2014 -- 2019}\\\\
Carnegie Mellon University -- Dissertation: \\textit{Leaderless BFT Consensus for Geo-Distributed Systems}\\\\
Advisor: Prof. David Garlan

\\vspace{4pt}

\\textbf{B.Tech. Computer Science and Engineering} \\hfill \\textit{2010 -- 2014}\\\\
Indian Institute of Technology Madras -- Graduated with Honours (GPA: 9.6/10.0)

% --- Publications ---
\\section{Selected Publications}

\\textbf{2024}
\\begin{enumerate}[leftmargin=*, itemsep=4pt]
  \\item \\textbf{Ramanathan, P.}, Chen, L., Kim, J. (2024). HydraConsensus: Leaderless BFT with
    Adaptive Quorums. \\textit{SOSP 2024}. \\href{https://doi.org/10.xxxx}{doi:10.xxxx}
  \\item Mehta, A., \\textbf{Ramanathan, P.} (2024). Privacy-Preserving Federated Learning
    with Verifiable Aggregation. \\textit{IEEE S\\&P 2024}.
\\end{enumerate}

\\vspace{4pt}

\\textbf{2023}
\\begin{enumerate}[leftmargin=*, itemsep=4pt]
  \\item \\textbf{Ramanathan, P.}, Gupta, S. (2023). Formal Verification of Raft Consensus
    Using TLA+. \\textit{OSDI 2023}. \\textbf{(Best Paper Award)}
\\end{enumerate}

% --- Grants & Awards ---
\\section{Grants and Awards}

NSF CAREER Award, \\$500,000, \\textit{Secure Federated Systems} \\hfill \\textit{2023}\\\\
Google Research Scholar Award \\hfill \\textit{2022}\\\\
USENIX Security Distinguished Paper Award \\hfill \\textit{2021}\\\\
CMU Presidential Fellowship \\hfill \\textit{2014}

% --- Teaching ---
\\section{Teaching}

\\textbf{CS 244B: Distributed Systems} (Stanford, Graduate) \\hfill \\textit{2022 -- Present}\\\\
\\textbf{CS 155: Computer and Network Security} (Stanford, Undergraduate) \\hfill \\textit{2021 -- Present}

% --- Service ---
\\section{Professional Service}

Program Committee: SOSP 2024, OSDI 2024, EuroSys 2023, USENIX ATC 2023\\\\
Reviewer: Journal of Systems Research, IEEE Transactions on Computers\\\\
PhD Application Committee, Stanford CS \\hfill \\textit{2022 -- Present}

\\end{document}
`,
}
