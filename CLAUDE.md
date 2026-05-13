# tommyflinch.com — Portfolio

Personal portfolio site. This file is the source of truth for any Claude Code session in this repo. Read it before doing anything else.

## Owner

Tommy Flinch — Senior Analyst at Accenture (Feb 2022 – present), starting role as Power Reliability & Monitoring Engineer II at a solar company.

Credentials: AWS Solutions Architect Associate, Azure Data Scientist Associate (DP-100, April 2026).

Target career trajectory: Senior Reliability Engineer → Principal Data Scientist, Renewables.

## Stack

- React 18 + TypeScript (strict)
- Vite 5
- MUI 6 + Emotion (primary design system)
- Bootstrap 5 + react-bootstrap (legacy, candidate for removal — see issues below)
- react-router-dom 7
- react-typed (hero typing animation)
- @elasticemail/elasticemail-client (contact form)
- use-local-storage (theme toggle)
- ESLint 9 + typescript-eslint 8

Assets hosted on S3 bucket: `port-images-bucket.s3.us-east-1.amazonaws.com`.

Deployed at: https://tommyflinch.com

GitHub: https://github.com/tflinch/Portoflio (repo name has a typo — `Portoflio` instead of `Portfolio`. Renaming is on the backlog. GitHub will auto-redirect the old URL when renamed, so it's safe.)

## Current positioning problem

The site currently presents Tommy as "A Full Stack Developer." That framing is outdated. With DP-100 in hand and the new reliability role starting, the target positioning is:

> Full-Stack Engineer • Azure Data Scientist • Reliability Engineering

Anything that touches the hero, About, or meta tags should reinforce that triple framing.

## Audit baseline (May 13, 2026)

Site grades at B (7/10). Strong typography, real project screenshots, dark/light toggle, working contact form. Held back by positioning, information architecture, and a few accessibility issues. Full audit lives in the Claude.ai Professor Engineer Project — summary below.

### Prioritized fix list

Severity: **P0** = critical, blocking professional credibility | **P1** = important, fix soon | **P2** = polish

**P0**

1. **Hero says nothing useful.** `react-typed` animates "A Full Stack Developer" with no static fallback. Skimmers see nothing. Replace with static text underneath the animation (or replace animation entirely) reflecting the triple positioning above.
2. **No Projects link in top nav.** Nav is Experience / About / Contact only. Projects page exists but is invisible. Add a Projects link between Experience and About.
3. **Project cards have no captions.** Six screenshots, zero titles, descriptions, or links visible. Each card needs: project name, one-sentence purpose, 3-4 tech chips, GitHub icon, live demo icon. Use MUI Card.
4. **Two "Type: All" filters with no labels.** Both filter dropdowns show identical text. Either label them properly (Type / Tech / etc.) or remove the duplicate.
5. **Contact modal text contrast fails WCAG.** Form labels (Full Name, Email Address, Mobile Number, Email Subject) are very light grey on light grey. Darken labels or background.
6. **DP-100 not mentioned anywhere on the site.** Add Azure Data Scientist Associate to About and a Certifications section.
7. **New solar role not mentioned.** Add "Currently / What I'm working on" line on About.

**P1**

8. **Accenture timeline overlap.** Two Accenture entries sandwich a freelance role — confusing ordering. Either reorder chronologically or add boomerang context.
9. **"Imp" typo in Accenture role title** — should be "Implementation."
10. **No quantified outcomes in most Experience bullets.** Only $10M and 15% are quantified. Add numbers where possible to the BCI / Boston Dynamics / AWS bullets.
11. **Certifications section is buried** under Education with no badges. Add a dedicated Certifications section with Credly badges for AWS SAA + DP-100.
12. **Two design systems installed.** MUI 6 and Bootstrap 5 are both in dependencies. Pick one (recommend MUI). Audit usage and remove unused.

**P2**

13. **ElasticEmail client used directly in the frontend.** Confirm API key handling is environment-variable-only and not committed. Long-term, move email send to a serverless function (Lambda, Cloudflare Worker, or Vercel function).
14. **README is still the Vite template default.** Replace with a real description of the site and stack.
15. **No CI, no GitHub Actions, no tests.** Add a basic GitHub Action that runs `tsc --noEmit` and `eslint .` on PR. Optionally add Vitest + a couple component tests.
16. **Repo has no description, no website link, no topics.** Add at the repo level on GitHub.
17. **Lighthouse audit needed.** Likely sitting at 70-80 on Accessibility due to the contrast issues. Target 95+.

## Conventions

- **TypeScript strict mode.** No `any` without an inline `// reason:` comment.
- **Functional components and hooks only.** No class components.
- **Preserve existing code structure unless explicitly told to refactor.** Tommy values this. Smallest viable fix first, then optionally suggest a refactor.
- **Component organization:** keep files focused — one component per file unless tightly coupled.
- **Styling:** MUI's `sx` prop or styled components via Emotion. Avoid Bootstrap classes in new code.
- **Imports:** absolute imports from `src/` where the alias is configured; relative imports for sibling files.
- **Commit messages:** conventional commits style preferred (`feat:`, `fix:`, `chore:`, `docs:`).

## What never to commit

- `.env`, `.env.local`, or any file containing `ELASTICEMAIL_*` keys
- API tokens of any kind
- Personal phone number, home address, or any PII beyond what's already public on the live site
- Anything in `node_modules`, `dist`, `.vite`, or coverage output

## Out of scope unless Tommy explicitly asks

- Backend changes (no backend exists today; ElasticEmail is client-side)
- Renaming the GitHub repo (separate task he'll do himself; GitHub auto-redirects so it's safe)
- Visual redesign of the hero typography — the serif treatment is intentional and working
- Migrating off Vite
- Removing the dark/light toggle

## Response style preferences

- **Audit before changes.** When asked for a review, output the findings first. Don't start editing without explicit go-ahead.
- **One fix at a time during execution.** Show the diff, wait for approval, then move to the next item.
- **Reasoning included.** Explain *why* a change matters, not just *what* changes.
- **No flattery, no preamble.** Get to the point.

## How to start a session

When `claude` is launched in this repo, the recommended opening prompt is one of:

- **Top-down audit:** "Read CLAUDE.md, then walk src/App.tsx and the page components. Output a prioritized file-specific issue list. Don't edit yet."
- **Execute fixes:** "Read CLAUDE.md. Start fixing P0 issues from the audit list in order. Show me the diff for each before applying."
- **Specific work:** "Read CLAUDE.md. I want to focus on [issue #N from the fix list] — propose the smallest viable change."

## Linked resources

- Live site: https://tommyflinch.com
- GitHub repo: https://github.com/tflinch/Portoflio
- Professor Engineer (Claude.ai Project) — career strategy, study planning, Notion ops. Separate surface from Claude Code; both maintain the same persona but don't share state.
