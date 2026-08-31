# AGENTS.md

- 所有回覆包含思考階段必須使用繁體中文，不得使用簡體中文。

---

## Project Structure

Follow this project structure when creating files:

```text
wenchun-blog/
├── automation/
│   └── playwright/
│
├── artifacts/
│   └── playwright/
│
├── blogger-theme/
├── openspec/
├── docs/
│
├── .mcp.json
├── package.json
└── playwright.config.ts
```

## File Placement Rules

- Playwright automation source code must be placed in `automation/playwright/`.
- Playwright generated screenshots, traces, videos, and other runtime output must be placed in `artifacts/playwright/`.
- Do not place generated artifacts inside `automation/`.
- Permanent documentation images must be placed in `docs/images/`.
- Blogger theme files must be placed in `blogger-theme/`.
- OpenSpec changes must follow the structure under `openspec/changes/`.

## General Rules

- Do not create new top-level directories without a clear reason.
- Follow the existing project structure when adding new automation tools.
- Keep source code and generated output separate.
- Update relevant documentation when the project structure changes.

## Documentation / Markdown Style

All `.md` files in this repo (including `openspec/changes/**/*.md`) MUST pass markdownlint using the repo's `.markdownlint.json` config (checked live by the VS Code markdownlint extension).

Common pitfalls to avoid before finishing any `.md` edit:

- MD041: the first line of the file must be a top-level `# Heading` — do not start a file directly with `## Section`, even if a template (e.g. an OpenSpec artifact template) starts that way; add a meaningful `#` title above it.
- MD032: every list (`-`/`*`/numbered) must have a blank line before and after it — never let a list start immediately under a heading or a paragraph, or run directly into the next paragraph/heading without a blank line.
- Also watch for: blank lines around headings (MD022), consistent list-marker style (MD004), no trailing whitespace (MD009), file ends with a single newline (MD047).

Self-check the diff for these before considering a markdown edit done — don't wait for the user to report lint errors.
