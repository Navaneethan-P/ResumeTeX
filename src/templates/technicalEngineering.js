export const technicalEngineering = {
  id: 'technical-engineering',
  name: 'Technical / Engineering',
  description: 'GitHub and tech-stack prominent layout. Monospace section markers for engineering and DevOps roles.',
  atsScore: 'high',
  code: `% ============================================================
% Technical Engineering Resume Template
% ResumeTeX - https://navaneethan-p.github.io/ResumeTeX
% Creator: Navaneethan P
% License: MIT
% ============================================================
\\documentclass[10pt,a4paper]{article}

\\usepackage[top=1.6cm, bottom=1.6cm, left=1.8cm, right=1.8cm]{geometry}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{lmodern}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{tabularx}

\\definecolor{resumeaccent}{HTML}{0D7377}
\\definecolor{resumecode}{HTML}{3A3A4A}
\\definecolor{resumegray}{HTML}{555555}

\\hypersetup{colorlinks=true, urlcolor=resumeaccent}
\\pagestyle{empty}

\\titleformat{\\section}
  {\\small\\bfseries\\ttfamily\\color{resumeaccent}\\uppercase}
  {}
  {0em}
  {\\textgreater\\textgreater\\space}
  [\\color{resumeaccent!40}\\rule{\\linewidth}{0.4pt}]
\\titlespacing{\\section}{0pt}{10pt}{5pt}

\\setlist[itemize]{leftmargin=1.2em, itemsep=1pt, topsep=1pt, parsep=0pt, label={--}}

\\newcommand{\\tech}[1]{%
  \\colorbox{resumeaccent!8}{\\texttt{\\small #1}}%
}

\\begin{document}

% --- Header ---
{\\Huge\\bfseries Arjun Sharma}\\hfill
{\\small\\color{resumegray}
  \\href{mailto:arjun@email.com}{arjun@email.com}
  $\\cdot$ +91 98765 43210
  $\\cdot$ Bengaluru, India
}\\\\
{\\color{resumeaccent}\\small
  \\href{https://github.com/arjunsharma}{github.com/arjunsharma}
  $\\cdot$ \\href{https://linkedin.com/in/arjunsharma}{linkedin.com/in/arjunsharma}
  $\\cdot$ \\href{https://arjunsharma.dev}{arjunsharma.dev}
}

\\vspace{2pt}
\\noindent\\color{resumeaccent}\\rule{\\linewidth}{1pt}
\\vspace{6pt}

% --- Summary ---
\\section{Profile}
Staff Software Engineer with 9 years specializing in distributed systems, cloud-native infrastructure,
and platform engineering. Designed systems processing 200M events/day. Open-source contributor with
2,400+ GitHub stars. Strong in Rust, Go, Kubernetes, and AWS.

% --- Experience ---
\\section{Experience}

\\textbf{Staff Engineer -- Platform} \\hfill \\textit{Aug 2021 -- Present}\\\\
\\href{https://techcorp.io}{\\textcolor{resumeaccent}{TechCorp}} \\hfill Bengaluru (Hybrid)\\\\
\\tech{Go} \\tech{Rust} \\tech{Kubernetes} \\tech{gRPC} \\tech{Kafka} \\tech{AWS}
\\begin{itemize}
  \\item Designed event-streaming platform processing 200M events/day with P99 latency under 5ms
  \\item Led Kubernetes platform team serving 80 engineers across 12 product squads
  \\item Built internal developer platform reducing new service setup from 3 days to 45 minutes
  \\item Architected multi-region active-active deployment cutting RTO from 8h to under 3 minutes
\\end{itemize}

\\vspace{5pt}

\\textbf{Senior Software Engineer -- Backend} \\hfill \\textit{Mar 2018 -- Jul 2021}\\\\
\\href{https://startupco.io}{\\textcolor{resumeaccent}{StartupCo}} \\hfill Remote\\\\
\\tech{Python} \\tech{Django} \\tech{PostgreSQL} \\tech{Redis} \\tech{Docker} \\tech{GCP}
\\begin{itemize}
  \\item Rebuilt monolith into 15 microservices, enabling independent deployment and 6x faster releases
  \\item Reduced PostgreSQL query time by 70\\% through schema redesign and strategic indexing
  \\item Implemented CQRS pattern, decoupling read/write load and enabling horizontal scaling
\\end{itemize}

\\vspace{5pt}

\\textbf{Software Engineer} \\hfill \\textit{Jun 2015 -- Feb 2018}\\\\
\\textcolor{resumeaccent}{Enterprise Solutions Ltd.} \\hfill Bengaluru
\\begin{itemize}
  \\item Developed Java Spring Boot services for banking clients handling 1M+ daily transactions
  \\item Automated regression test suite covering 85\\% of critical paths, reducing QA cycles by 40\\%
\\end{itemize}

% --- Education ---
\\section{Education}

\\textbf{B.E. Computer Science} \\hfill \\textit{2011 -- 2015}\\\\
RV College of Engineering, Bengaluru \\hfill 8.9/10 CGPA

% --- Skills ---
\\section{Technical Skills}

\\begin{tabularx}{\\linewidth}{@{}lX@{}}
  \\textbf{Languages}   & Rust, Go, Python, TypeScript, Java, SQL \\\\
  \\textbf{Cloud/Infra} & AWS (EKS, RDS, MSK, Lambda), GCP, Terraform, Helm \\\\
  \\textbf{Databases}   & PostgreSQL, Redis, ClickHouse, DynamoDB, Elasticsearch \\\\
  \\textbf{Messaging}   & Apache Kafka, RabbitMQ, NATS \\\\
  \\textbf{Observability} & Prometheus, Grafana, OpenTelemetry, Jaeger \\\\
\\end{tabularx}

% --- Open Source ---
\\section{Open Source}

\\textbf{kwatch} \\hfill \\href{https://github.com/arjunsharma/kwatch}{github.com/arjunsharma/kwatch}\\\\
Kubernetes event aggregator written in Go -- 2,400+ stars, 180+ forks, 15 contributors\\\\
\\tech{Go} \\tech{Kubernetes API} \\tech{Prometheus}

\\end{document}
`,
}
