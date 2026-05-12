# Portfolio Site Context

Personal portfolio for Rameez (Iso Design & Research). Replacing a Hostinger-templated .com site with a custom Astro build. Currently job searching, so the site needs to function as a real portfolio that gets people to take it seriously, not a generic dev landing page.

## Stack

- **Astro** (decided, don't suggest swapping unless something genuinely blocks)
- Deploying to Vercel or Cloudflare Pages, free tier
- Domain stays registered at Hostinger, just updating DNS to point at the new host
- TypeScript on
- Tailwind by default (matches Paper's output), vanilla CSS for sections that need it

## Design workflow: Paper

Designing in paper.design (open alpha, code-native HTML/CSS canvas). Claude Code connects via MCP so it can read the canvas and write back to it.

One-time MCP setup:
```
claude mcp add paper --transport http http://127.0.0.1:29979/mcp --scope user
```

How to work with Paper in this project:
- When I'm designing a section in Paper, read the canvas (`get_selection`, `get_jsx`, `get_screenshot`, `get_computed_styles`) before translating to Astro. Don't guess at what I want, the canvas is the source of truth.
- Output is HTML + Tailwind, so the translation to Astro components should be near 1:1. Preserve class names and structure unless there's a real reason to refactor.
- For per-project visual identities, lean on Paper's shader library (mesh gradients, fluted glass, grain, halftone, liquid metal). The Bedside section in particular should use shaders for the Victorian/occult feel.
- You can push back to the canvas (`write_html`, `update_styles`, `create_artboard`, etc.) but only if I explicitly ask. Default direction is design in Paper, implement in code.
- Free tier is 100 MCP calls per week. Be efficient. Batch reads when possible, don't pull the same node twice in a session.

## What the site needs to do

Primary: show work clearly, communicate that I take craft seriously, support job applications by giving a real link to send.

Secondary: be a place where Iso Design & Research lives as a brand, separate from "freelancer with a portfolio."

## Projects to feature

- **Iso Design & Research** — the studio itself, brand and consulting work
- **Bedside** — EPUB reader, Victorian occult aesthetic, Electron + React + TypeScript, glassmorphism UI, candlelight mode (proximity-based word illumination), Anna's Archive/Z-Library integration, annotations, TTS, per-book settings
- **Goat** — Tauri + React + Rust HTPC media center for Windows, MPV/libplacebo rendering, Real-Debrid/Torrentio, TMDB metadata, controller navigation, IPTV/EPG, MSI installer, complete and distributed
- **Drift** — personalized content aggregator, Flask + ngrok + SQLite backend, Tauri + React frontend planned, Parallel Monitor API or Google News RSS

Consulting and brand work: anything artist or client-facing gets framed as work for clients, not personal brand stuff. This is a hard rule.

## Aesthetic direction

- Clean, elegant, understated
- Authenticity over polish, but not sloppy
- No generic dev portfolio tropes (terminal hero sections, code rain, "hi I'm X and I build cool stuff," etc.)
- Reference points: considered design, magazine layouts, things that feel like they were made by a person
- Each project section can carry its own visual identity that matches the project (Bedside section should feel Victorian/occult, Goat should feel like a media interface, etc.)
- Typography matters more than animation
- Whitespace is a feature

## Writing voice

Hard rules:
- **No em dashes ever.** Use commas, periods, or rephrase. This is non-negotiable.
- No "passionate about [anything]"
- No corporate speak (synergy, leverage, drive impact, ecosystem, etc.)
- No false enthusiasm or "excited to announce" energy
- Matter-of-fact, direct, casual but not sloppy

What good copy reads like:
- States what the thing is and what it does
- Doesn't oversell
- Trusts the reader to get it

## Job search context (informs emphasis)

Targeting $70k+ roles in brand strategy, marketing coordinator, digital/SEO, entertainment marketing, healthcare marketing. Remote or NYC-commutable. MS in Integrated Marketing Communications from WVU (4.0 GPA, Phi Kappa Phi). Previous experience: Mount Sinai Diversity & Innovation Hub, Sterling Medical Center, co-founded 92 Futuristic (talent agency for musicians and YouTube creators).

Site should make a marketing or brand hiring manager take me seriously, not just a dev hiring manager. The technical projects support the case that I can execute on craft. They're not the whole pitch.

## DNS migration (when ready to ship)

1. Deploy to Vercel or Cloudflare Pages, confirm it works on the auto-generated URL
2. In Hostinger's DNS panel, add A record pointing apex to host IP and CNAME for www
3. Add the custom domain in the Vercel or CF Pages dashboard
4. Wait for propagation, usually 15-60 minutes
5. Verify SSL provisioned automatically

## Environment notes

- Working on M4 MacBook Pro
- iCloud sync has caused file path issues in the past for projects living in `~/Documents`. Consider keeping this project outside iCloud or just accepting the sync behavior.
- Existing projects use a `~/Documents/Projects/` convention

## How to work with me

- Don't ask for permission on small stuff, just make the move and I'll redirect if needed
- Show, don't describe. If you're proposing a layout, build it, I'll react faster to code than to a description
- If something feels generic, kill it. I'd rather have less that's distinct than more that's templated
