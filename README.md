# ResumeTeX

A professional LaTeX resume editor built for the browser. No login required. No data stored on any server.

Write LaTeX directly or use the Fill Form feature to generate an AI prompt, get complete LaTeX code from any AI assistant, paste it back into the editor, compile, and download your resume.

**Live site:** https://navaneethan-p.github.io/ResumeTeX

---

## Features

- Monaco code editor with LaTeX syntax highlighting and autocomplete
- Fill Form that generates a structured AI prompt — paste into ChatGPT or Claude to get complete LaTeX code
- Live PDF compilation via latex.online (no backend required)
- 6 professionally designed resume templates
- 15 color themes applied to both the UI and your LaTeX document
- ATS compatibility scorer with 11 rules and actionable suggestions
- Export as PDF, raw .tex file, clipboard copy, or AES-256-GCM encrypted .tex file
- Resizable split-pane editor and preview
- No login, no accounts, no cookies, no analytics on document content
- Client-side end-to-end encryption using the native Web Crypto API

---

## How to Use (Live)

1. Open https://navaneethan-p.github.io/ResumeTeX in any modern browser
2. Start typing LaTeX directly, or click **Fill Form** to use the AI workflow:
   - Fill in your resume details (leave fields blank to skip)
   - Click **Generate AI Prompt**
   - Click **Copy Prompt** and paste it into ChatGPT, Claude, or any AI assistant
   - The AI will return complete LaTeX code
   - Click **Paste AI Response**, paste the code, and click **Use in Editor**
3. Customize using the Templates and Theme pickers
4. Press **Ctrl+Enter** or click **Compile** to render a PDF preview
5. Use **Export** to download your PDF, .tex file, or an encrypted copy

---

## Run Locally

### Requirements

- Node.js 18 or higher
- npm

### Steps

```bash
# Clone the repository
git clone https://github.com/Navaneethan-P/ResumeTeX.git
cd ResumeTeX

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open http://localhost:5173/ResumeTeX/ in your browser.

### Build for production

```bash
npm run build
```

The production build is output to the `dist/` directory and can be served from any static host.

---

## LaTeX Compilation

The editor sends your LaTeX source to the [latex.online](https://latex.online) free public API for compilation. If that service is unavailable, a fallback to latexonline.cc is attempted for shorter documents.

To compile entirely offline, copy your `.tex` source and compile locally with:

```bash
pdflatex resume.tex
```

Or paste your code into [Overleaf](https://overleaf.com) for cloud compilation.

---

## Encryption

When you use **Download Encrypted .tex**, your document is encrypted entirely in your browser using AES-256-GCM via the Web Crypto API before any file is written. The platform never sends or stores your document content.

To decrypt an encrypted file, use the built-in load feature and enter your passphrase. If you lose your passphrase, the file cannot be recovered — the platform has no access to it.

---

## Templates

| Name | Best For | ATS Rating |
|---|---|---|
| Modern Minimal | General / Tech | High |
| Corporate Traditional | Finance / Law / Consulting | High |
| Creative Design | Design / Marketing / Media | Medium |
| Academic CV | Research / Academia | High |
| Technical / Engineering | Engineering / DevOps | High |
| Executive | Senior Leadership / C-Suite | High |

---

## Project Structure

```
src/
  components/
    ATS/            ATS scorer panel
    Editor/         Monaco editor
    Export/         Export dropdown
    FillForm/       Fill Form modal and AI prompt generator
    Header/         App header
    Preview/        PDF preview and compilation log
    Templates/      Template gallery modal
    Themes/         Theme picker modal
  templates/        Six LaTeX resume template files
  themes/           15 color theme definitions
  ats/              ATS scoring rule engine (11 rules)
  crypto/           AES-256-GCM client-side encryption utilities
  store/            Zustand global state
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Code Editor | Monaco Editor (@monaco-editor/react) |
| State | Zustand |
| Encryption | Web Crypto API (AES-256-GCM, PBKDF2) |
| LaTeX Compilation | latex.online public API |
| Styling | Vanilla CSS with CSS custom properties |
| Deployment | GitHub Pages via GitHub Actions |

---

## License

MIT License. See [LICENSE](./LICENSE) for full text.

---

## Creator

**Navaneethan P**

GitHub: https://github.com/Navaneethan-P

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss the proposed change.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request
