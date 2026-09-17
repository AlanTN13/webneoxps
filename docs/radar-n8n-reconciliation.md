# Radar n8n reconciliation — companion PR #74

Continue #74 in place. The Portal PR #75 replaces direct backend editorial execution with an exportable n8n runtime. Existing PNG 1600×900, full sources, exact package digest and private preview are retained.

`radar-n8n-preflight.mjs` exposes read-only validation of an exact n8n candidate and its controlled eligibility. It reuses the existing article, cover and digest validators. `publicationAuthorized` is always false: this preflight cannot bypass the publisher's approval, deterministic checks, CI/build or production release gates.

Controlled integration evidence is in Portal `docs/execution-checkpoints/2026-09-17_radar-n8n-reconciliation.md` and `scripts/verify-radar-package.cjs`. The exported n8n JavaScript, simulated provider responses, real PNG and web materializer passed together. An isolated copy of the site containing the fixture passed validation/tests/build/SEO (19 articles). No fixture was added to the public corpus and no article was published.

Status: **live n8n E2E still blocked**. Browser import returned “Not allowed”; workflow credentials/settings must be bound securely before the real run. Historical direct-worker usage discovered in Supabase is USD 0.0167395 estimated, not zero, and does not validate n8n. Productive scheduler stays off.

Verification in this update: news tests 62/62, Radar tests 5/5, lint, build, audit and SEO. This document supersedes any interpretation of the earlier #74/#75 description as a completed n8n MVP.
