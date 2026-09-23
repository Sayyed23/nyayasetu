# NyayaSetu — Backend + AI Integration Plan

## Context

NyayaSetu (GenAI hackathon submission, PRD v2.1) is a legal-document comprehension app: upload a contract → plain-language summaries, risk flags, grounded Q&A with citations, two-doc compare, action center, multilingual output. Core PRD principle: **the LLM is the reasoning layer, not the source of truth** — every user-facing claim must trace to retrieved document clauses, and a citation verifier blocks unsupported answers.

**Current state:** The frontend is fully built (Next.js 16.3.5 + React 19 + Tailwind 4, 13 routes, polished UI) but 100% mocked — zero `fetch` calls, no API routes, no `lib/api.ts`, no shared types dir, no `.env` files. All data is inline hardcoded fixtures, auth is localStorage-only (`context/AuthContext.tsx`), every export button is an `alert()` stub, and `/compare` has no second-file upload. **No backend code exists.**

**Goal:** Build the FastAPI backend + Gemini AI pipeline per the PRD, wire Supabase auth + opt-in persistence, and replace every mock data block in the frontend with real API-driven data — phased so each milestone is demo-able.

## Locked decisions (user-confirmed)

1. **Gemini API key only** — all AI via `google-genai` SDK: Flash-class model for main reasoning/OCR-fallback/translation/language-detection, Pro-class model for escalation, Gemini embeddings. No GCP Document AI (PyMuPDF native extraction first, Gemini vision OCR for scanned/low-text pages).
2. **Gemini substitutes for specialized models** — IndicLID→Gemini JSON-schema detection, IndicTrans2→Gemini translation + legal glossary, bge-reranker→LLM/embedding-similarity rerank. All behind service interfaces for later swap-in.
3. **Full PRD scope, phased** by P0 (upload+parse, RAG Q&A, risk JSON, citation verifier) → P1 (multilingual, compare, action center) → P2 (legal literacy, export).
4. **Supabase now** — real auth (email+password + Google OAuth) and opt-in "vault" persistence in Postgres. Default is ephemeral: in-memory backend sessions, 60-min TTL.
5. **DigiLocker button → "Try Demo"** one-click login (pre-seeded demo account).
6. **Legal literacy = live RAG + wired UI** on `/legal-info` (separate curated corpus, jurisdiction-filtered).
7. **Environment:** Python 3.14 only (no 3.12 on machine), npm. NumPy-based vector store by default (docs have ~10–100 clauses); ChromaDB optional behind the same interface.

## Architecture

```
Browser (Next.js :3000)
  └─ /api/backend/* ──(next.config.ts rewrites)──► FastAPI (uvicorn :8000, routes under /api)
      ├─ api/        routers: health, upload, documents, summarize, risk, qa, compare, action, translate, export, literacy
      ├─ pipeline/   ocr, parser, clauses, embedder, retriever, reranker, citation_verifier
      ├─ services/   llm (Gemini), language_router, translation, session_store, vector_store, risk_rules, legal_corpus, persistence
      └─ guardrails/ disclaimer, scope_filter, policy_checks
Gemini: Flash reasoning / Pro escalation / embeddings / vision OCR / translation
Supabase: auth (JWT verified by FastAPI) + Postgres writes (service-role, vault mode only)
Vector store: per-doc in-memory NumPy cosine + BM25 (rank-bm25); ChromaDB optional
```

- Frontend↔backend via **Next rewrites** `/api/backend/:path*` → `http://127.0.0.1:8000/api/:path*` (no CORS pain; FastAPI CORS added anyway as fallback). Rewrites confirmed supported in Next 16; per `AGENTS.md`, consult `node_modules/next/dist/docs/` before touching Next-specific APIs (middleware is now `proxy.ts`).
- **Chat is non-streaming** (simple await) — citation verification must gate rendering; typing-indicator UX instead.
- **Single uvicorn worker** (in-memory sessions); no `--reload` during demo runs.

## New repository layout

```
next.config.ts                      # MODIFY: add rewrites
.env.local                          # NEW: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, BACKEND_URL
types/index.ts                      # NEW: all shared API contracts (mirror backend Pydantic)
lib/api.ts                          # NEW: typed client (auth header injection, XHR upload progress, ApiError/410 handling)
lib/constants.ts                    # NEW: disclaimer text, LANGUAGE_MAP, pipeline stage labels
lib/supabase.ts                     # NEW: @supabase/ssr browser client factory
context/AuthContext.tsx             # REWRITE: Supabase session (keep UserProfile shape)
context/UserConfigContext.tsx       # NEW: language/jurisdiction/privacy (replaces per-page localStorage reads)
context/DocumentContext.tsx         # NEW: active doc state + status polling + compare slot
components/CitationCard.tsx         # NEW
components/AiDisclaimer.tsx         # NEW
components/InsufficientEvidence.tsx # NEW
components/DocumentUploader.tsx     # NEW: extracted from workspace upload gate (reused by /compare)
app/auth/callback/page.tsx          # NEW: OAuth code exchange
app/export/[docId]/page.tsx         # NEW: print-to-PDF dossier view
backend/
  requirements.txt  .env  config.py  main.py
  api/        deps.py, health.py, upload.py, documents.py, summarize.py, risk.py, qa.py, compare.py, action.py, translate.py, export.py, literacy.py
  schemas/    document.py, risk.py, qa.py, compare.py, action.py, translate.py, common.py
  pipeline/   ocr.py, parser.py, clauses.py, embedder.py, retriever.py, reranker.py, citation_verifier.py
  services/   llm.py, language_router.py, translation.py, session_store.py, vector_store.py, risk_rules.py, legal_corpus.py, persistence.py
  guardrails/ disclaimer.py, scope_filter.py, policy_checks.py
  scripts/    make_sample_documents.py, smoke_test.sh
  sql/schema.sql
data/sample_documents/   rental_agreement_bengaluru.md/.pdf (+_p1_scan.png), employment_offer_bengaluru.md/.pdf, vendor_services_agreement.md/.pdf
data/legal_sources/      rental.json, employment.json, consumer.json, glossary.json
```

## Backend design

### Env (`backend/.env`, gitignored) — read via `pydantic-settings` in `config.py`
`GEMINI_API_KEY`, `GEMINI_FLASH_MODEL` / `GEMINI_PRO_MODEL` / `GEMINI_EMBEDDING_MODEL` (env-driven; PRD names as defaults — **verify exact model IDs in AI Studio during Phase 0**), `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET` (HS256) or `SUPABASE_JWKS_URL` (RS256 — check project's signing method in Supabase dashboard), `REQUIRE_AUTH=false` (dev fallback: `X-Anonymous-Id` header), `CORS_ORIGINS=http://localhost:3000`, `SESSION_TTL_MINUTES=60`, `VECTOR_STORE=numpy` (`chroma` optional), `LEGAL_CORPUS_DIR=../data/legal_sources`.

### Dependencies (`backend/requirements.txt`)
`fastapi`, `uvicorn[standard]`, `python-multipart`, `pydantic`, `pydantic-settings`, `google-genai`, `pymupdf`, `numpy`, `rank-bm25`, `PyJWT[crypto]`, `httpx`; dev: `pytest`, `fpdf2`, `Pillow`. (chromadb commented optional.)

### Auth (`api/deps.py`)
`get_current_user`: Bearer JWT → verify vs Supabase (RS256/JWKS if configured, else HS256 secret), extract `sub`/`email`; if `REQUIRE_AUTH=false` and no Bearer, fall back to `X-Anonymous-Id`. `get_doc_session(doc_id, user)`: 404 missing / 410 expired / 403 owner-mismatch — 410 drives the frontend purge UX.

### Session store (`services/session_store.py`)
`DocSession {doc_id, owner, privacy_mode, doc (canonical), page_texts, ocr_pages, stage, error, vector store, created_at, expires_at}` — in-memory dict, asyncio sweeper every 60s purges expired (60-min TTL). Vault mode additionally writes to Supabase immediately; memory copy still serves reads.

### Endpoints (all under `/api`; every AI-bearing response includes `disclaimer`)

| Endpoint | Signature | Response shape (abridged) |
|---|---|---|
| `POST /api/upload` | multipart `file, jurisdiction, doc_type, language, privacy_mode` | `202 {doc_id, status_url}` — pipeline runs in BackgroundTasks through 5 stages: `ingest → ocr → language → segmentation → statutory_match` (match the existing workspace stepper labels) |
| `GET /api/documents/{id}/status` | — | `{stage, stage_index, stages[5], progress_pct, error?}` |
| `GET /api/documents/{id}` | — | `DocumentDetail`: canonical doc + page_count, ocr_used_pages, detected_language, expires_at, doc_type, jurisdiction |
| `GET /api/summarize/{id}?depth=tldr\|sections\|full&language=en` | — | `{tldr, sections:[{clause_id, title, plain_summary, obligation?, key_dates[]}], obligations[], key_dates[], insufficient?, disclaimer}` — clause_ids preserved verbatim |
| `GET /api/risk/{id}?language=en` | — | `{overall: low\|medium\|high, counts{}, risks:[{clause_id, risk_level: standard\|unusual\|high\|missing, reason, source:"page 4, span 412-588", page, span, confidence, rule_triggered?, mitigation?, counter_clause?}], missing_expected[], disclaimer}` |
| `POST /api/qa/{id}` | `{question, language, mode:"document"}` | `{answer, language, confidence, citations:[{clause_id, page, span, quote}], verified, evidence_state: sufficient\|insufficient, scope_notice?, disclaimer}` |
| `POST /api/compare` | `{doc_id_a, doc_id_b, criteria[], language}` | `{doc_a, doc_b, criteria, comparisons:[{clause_id_a?, clause_id_b?, title, status: aligned\|modified\|added\|removed, text_a, text_b, page_a, page_b, delta_analysis}], disclaimer}` — **no winner/verdict field exists in schema**; `policy_checks` lints LLM output for verdict phrasing (PRD "key product correction") |
| `GET /api/action-center/{id}?language=en` | — | `{checklist:[{id,title,priority,clause_id}], deadlines:[{label,date,clause_id,page}], red_flags:[], lawyer_questions:[], protection_score, next_deadline?, disclaimer}` |
| `POST /api/translate` | `{doc_id?, clause_id?, text?, target_language, source_language?}` | `{translated_text, source_language, target_language, glossary_terms_applied[], note, disclaimer}` — server fetches canonical clause text when doc_id+clause_id given; original echoed so citations resolve to source |
| `POST /api/export/{id}` | `{format: md\|json, sections[]}` | file download (`Content-Disposition`); lawyer brief from action-center data. PDF via client print page `/export/[docId]` |
| `POST /api/literacy/ask` | `{question, jurisdiction, language}` | QAResponse-shape with corpus citations `{source_id, title, act, section, jurisdiction}` |
| `GET /api/health` | — | `{status, gemini_configured, uptime_s}` |

### Pipeline modules
- **`ocr.py`** `extract_page_texts(bytes, mime)` — PyMuPDF native text per page; page < 100 chars → render pixmap 2× → Gemini vision OCR; low-confidence pages flagged `needs_review` (never silently promoted). PDF / PNG-JPEG (full vision) / DOCX (zip-XML text extraction).
- **`parser.py`** `build_document()` — assembles canonical `DocumentObject {doc_id, source_language, jurisdiction, clauses:[{clause_id, page, text, span, risk}]}`; `span` = character offsets into that page's text.
- **`clauses.py`** `segment_clauses()` — deterministic regex first (`Clause \d+`, `Section \d+`, numbered/heading patterns); < 3 found → Gemini structured segmentation pass, then re-locate spans.
- **`embedder.py`** — batched Gemini embeddings (768-dim, correct task types).
- **`retriever.py`** `hybrid_retrieve(k=8)` — `0.6·cosine + 0.4·BM25` (lexical matters for exact legal terms).
- **`reranker.py`** — LLM relevance JSON scoring behind `Reranker` protocol; keep score ≥ 0.5, top 4.
- **`citation_verifier.py`** — stage 1 deterministic (clause exists; quote fuzzy-match ≥ 0.8 via difflib), stage 2 Gemini entailment per citation. Unsupported citations dropped; all dropped → answer replaced with insufficient-evidence text, `verified=false`.

### Q&A pipeline order (contractual, per PRD §5)
`scope_filter → hybrid_retrieve → rerank → (none pass? → insufficient-evidence answer, NO generation) → generate (Flash; escalate to Pro only when retrieval weak/ambiguous) → citation_verifier → policy_checks → respond`

### Gemini service (`services/llm.py`)
Single `GeminiService`: `generate_structured(prompt, pydantic_schema)` (response_schema), `generate()`, `embed_texts(texts, task_type)`, `vision_ocr(png, page_no)`, `escalate_if(condition, ...)` (Flash→Pro routing rule from PRD). All routers go through this one service.

### Risk pipeline (`services/risk_rules.py` + `api/risk.py`)
Deterministic rules first (deposit > 6× rent, escalation > 10%/yr, lock-in > 12 mo, unilateral termination < 30 days, self-help eviction, full deposit forfeiture, no-limit liability) → tagged `rule_triggered`; remaining clauses → Gemini Flash structured classification; missing-clause checklist per doc_type (rental: deposit-refund timeline, notice, maintenance, escalation, lock-in). Badges render deterministically from `risk_level` (P0 acceptance).

### Language (`services/language_router.py`, `translation.py`)
`LANGUAGE_MAP` single source of truth (mirrored in `lib/constants.ts`): en→eng_Latn, hi→hin_Deva, mr→mar_Deva, ta→tam_Taml, bn→ben_Beng, gu→guj_Gujr, te→tel_Telu, kn→kan_Knda, ml→mal_Mlym. `detect_language()` = Gemini JSON-schema call (romanized detection included). Generation prompts always specify target language + "citations must quote ORIGINAL source text verbatim".

### Legal literacy (`services/legal_corpus.py`)
`data/legal_sources/*.json` entries `{source_id, title, act, section, jurisdiction, domain, text, url}` — curate 30–50 entries covering what the UI already shows (MTA 2021 §13, TP Act 1882 §106/108, CPA 2019, ICA 1872 §27, BNSS 2023) + state rent acts for the 10 onboarding jurisdictions. Embedded at startup; retrieval = jurisdiction filter → hybrid search → same verifier + disclaimer. **Never shares the document index.**

## Supabase setup

1. Create project; enable **Email** auth (confirmations off for demo) + **Google** OAuth (consent screen + redirect `https://<ref>.supabase.co/auth/v1/callback`). Check JWT signing method (dashboard → Settings → API) → feeds backend env.
2. Schema (`backend/sql/schema.sql`, run in SQL editor): `profiles` (id→auth.users, display_name, language, jurisdiction, domain, privacy_mode), `documents` (doc_id, owner, title, doc_type, source_language, jurisdiction, privacy_mode, page_count, clause_count, document jsonb), `document_analyses` (doc_id, owner, kind: summary|risk|action_center, payload jsonb), `qa_history` (doc_id, owner, question, answer, language, citations jsonb, verified). RLS enabled on all; policies `auth.uid() = owner` for all operations. Skip raw-file Storage for hackathon.
3. **Frontend**: `@supabase/ssr` browser client in `lib/supabase.ts`; all pages are client components so no server cookie plumbing needed; OAuth lands on new `app/auth/callback/page.tsx` (`exchangeCodeForSession` — consult Next 16 auth docs first).
4. **Backend**: never uses anon key. Vault writes = `services/persistence.py` via httpx to PostgREST with service-role key. `GET /api/documents/{id}` falls back to a vault read when the ephemeral session expired and doc was vault-mode (this makes dashboard "recent documents" real for vault users).

## Frontend integration

### New layer
- **`types/index.ts`** — mirror every backend schema: `Language, RiskLevel, Citation, Clause, DocumentObject, DocumentDetail, UploadStatus, SummaryResponse, RiskItem, RiskResponse, QAResponse, ChatMessage, CompareResponse, ClauseComparison, ActionCenterResponse, TranslateResponse, UserProfile, UserConfig`.
- **`lib/api.ts`** — `BASE="/api/backend"`; injects `Authorization: Bearer <supabase token>` or `X-Anonymous-Id` (uuid persisted in localStorage); `ApiError{status,detail}`; 401 → refresh + retry once; 410 → `DocumentExpiredError` (purge UX). Functions: `uploadDocument(file, meta, onProgress?)` (XHR for real %), `getDocStatus`, `getDocument`, `getSummary`, `getRisk`, `askQuestion`, `compareDocs`, `getActionCenter`, `translate`, `exportDossier`, `askLiteracy`.
- **Contexts** (mounted in `app/layout.tsx`): `AuthContext` rewritten around `supabase.auth` — keeps `UserProfile` shape so `Header.tsx` changes minimally; DigiLocker button → "Try Demo". `UserConfigContext` — single owner of onboarding config; makes the currently-dead Header language selector (`components/Header.tsx:250-267`) live (selecting a language re-fetches views); syncs to `profiles` when authed. `DocumentContext` — `{primary, secondary (compare slot), status, error, uploadAndTrack, loadFromVault, clearAll}`; polls status every 1.5s through the 5 stages; ephemeral → `sessionStorage["nyayasetu_active_doc"]`, vault → doc_id list in `localStorage["nyayasetu_recent_docs"]` + backend refetch; 410 → clear + "session purged" notice; workspace countdown (`app/workspace/page.tsx:126-133`) binds to real `expires_at`.

### Per-page integration map (hardcoded block → replacement)

| File : lines | Replace with |
|---|---|
| `app/workspace/page.tsx:227-251` fake setInterval progress | `DocumentContext.uploadAndTrack()`; stepper (376-461) bound to real `stage_index` |
| `app/workspace/page.tsx:464-528` "7 Pages • 24 Clauses" | `primary.detail` (pages, clauses, language, OCR pages) |
| `app/workspace/page.tsx:632-713` demo Analysis Matrix | computed from `getRisk()` counts |
| `app/workspace/page.tsx:716-865` Clause 9.3 deep-dive | selected real clause; plain terms ← summary sections; conflict ← risk reason; counter-proposal ← risk `counter_clause` |
| `app/workspace/page.tsx:210-225` canned drawer reply | `askQuestion()` + CitationCard/AiDisclaimer/InsufficientEvidence |
| `app/workspace/page.tsx:362-371` alert() Export | `exportDossier("md")` + link to `/export/[docId]` print view |
| `app/understand/page.tsx` hardcoded tabs | `getSummary(depth)`; language select (126-136) → config + refetch; Export → real |
| `app/risks/page.tsx:32-102` 5 hardcoded risks | `getRisk()` mapped to existing card shape (severity/quote/rule/mitigation/counter) |
| `app/ask/page.tsx:20-26,67-98,100-110` | `Message.citations` ← backend Citation; `handleSend` → `askQuestion`; sidebar ← real clauses |
| `app/compare/page.tsx:21-81,156,180` | two `<DocumentUploader>` slots; `compareDocs(a,b,criteria)`; criteria chips toolbar; swap stays client-side |
| `app/actions/page.tsx:22-59` hardcoded tasks/alerts | `getActionCenter()`; checkboxes stay client-local; Docket → export |
| `app/multilingual/page.tsx:23-104` translations map | `translate({doc_id, clause_id, target_language})` per pill; lexicon ← `glossary_terms_applied` |
| `app/dashboard/page.tsx:85-119` 3 hardcoded docs | vault: Supabase `documents` (RLS-scoped) + live counts; ephemeral: localStorage metadata (marked "purged") |
| `app/legal-info/page.tsx` static codex | wire search → `askLiteracy()` with cited-source cards (static list stays as fallback) |
| `app/profile/page.tsx` fake save/purge | `profiles` upsert; purge → `clearAll()` |
| `app/onboarding/page.tsx:286-309` localStorage write | write through `UserConfigContext` (+ profiles upsert); privacy choice → real `privacy_mode` on upload |
| `app/auth/page.tsx:39-86,331-345` fake logins | `signIn/signUp` + Google `signInWithOAuth`; DigiLocker → demo login; real error surfaces |

### Shared components
`CitationCard` (clause_id/page/span/quote + "view in document" links to workspace page — span-highlight overlay is post-hackathon), `AiDisclaimer` (PRD text, translated per language), `InsufficientEvidence` (amber card + rephrase suggestion + Legal Literacy CTA).

## Phases (each ends demo-able; matches PRD Day 1/2/3)

| # | Scope | Deliverables | Verify by |
|---|---|---|---|
| **0. Foundations** | Scaffold + wiring | `backend/` tree, config, `main.py` (CORS, health), `next.config.ts` rewrites, `types/index.ts`, `lib/api.ts` skeleton, `lib/constants.ts`, `.env`s, sample docs script (rental + employment + scanned page), **verify Gemini model IDs work** | `curl :8000/api/health`; frontend fetches via `/api/backend/health`; PDFs open |
| **1. Upload + Parse (P0)** | Pipeline back half | `ocr.py`, `parser.py`, `clauses.py`, `session_store.py`, `vector_store.py`, `documents.py`, `upload.py` (background stages), `llm.py` embeddings+vision OCR | Upload rental PDF → poll → every clause has page+span (P0 acceptance); scanned PNG → OCR flagged |
| **2. Summarize + Risk (P0)** | Evidence views | `summarize.py`, `risk.py`, `risk_rules.py`, guardrails disclaimer+policy_checks; frontend `DocumentContext`, workspace real, `/understand` + `/risks` real | Upload → TL;DR + deterministic badges in < 30s |
| **3. Auth + Supabase** | Identity + persistence | Supabase project/providers/schema, `persistence.py`, `deps.py` JWT, `AuthContext` rewrite, `auth/callback`, `UserConfigContext`, DigiLocker→Demo, dashboard recent docs | Sign up → Google OAuth → vault upload → row visible, RLS-scoped |
| **4. RAG Q&A + Verifier (P0)** | Core trust feature | `embedder`, `retriever`, `reranker`, `citation_verifier`, `qa.py`, `scope_filter`; `/ask` + workspace drawer + CitationCard/InsufficientEvidence | Cited answer for "Can the landlord deduct painting?"; **insufficient-evidence (no fabrication)** for absent-topic question; tamper test: verifier blocks bad citation |
| **5. Multilingual (P1)** | mr + en minimum | `language_router.py`, `translation.py`, glossary, `translate.py`; `/multilingual` real; language threaded through summarize/qa/action; Header selector live | Marathi question on English doc → Marathi answer + **English original** citation card |
| **6. Compare (P1)** | Two-doc diff | `compare.py` (alignment: clause-number match → cosine ≥ 0.75 → LLM alignment for stragglers; no-verdict lint), uploader slots, criteria chips, swap | Rental A vs B → modified/added/removed traceable to both docs; no winner phrasing |
| **7. Action Center + Export (P1)** | Act + export | `action.py` (regex dates first, LLM structured second), `export.py`, `/actions` real, `/export/[docId]` print page; all remaining alert() stubs removed | Checklist/deadlines from structured fields; brief downloads .md/.json + prints cleanly |
| **8. Legal Literacy + Hardening (P2)** | Separate corpus RAG | `legal_corpus.py` + curated JSONs, `literacy.py`, `/legal-info` wired; purge UX polish; 3-min demo script; `smoke_test.sh` green | "My rights as a tenant in Maharashtra?" routes to corpus (never doc index), jurisdiction-filtered, cited + disclaimed |

Scope-creep control: each phase's "verify by" is the demo gate. Span-highlight overlays, DOCX polish, audio, streaming, full 9-language UI translation → post-hackathon list, not code.

## Cross-cutting

- **Disclaimer**: server-injected `disclaimer` field on every AI payload AND rendered by `<AiDisclaimer>` under every AI surface (belt and suspenders). Text: "This is legal information, not legal advice. Consult a licensed advocate for decisions with legal consequence."
- **Insufficient evidence**: single `evidence_state` field + one shared component; never a raw error; distinct from `verified=false` (partial downgrade).
- **Citations**: one CitationCard; quote always verbatim source language; clause_id/page/span stable end-to-end.
- **Language flow**: onboarding → UserConfigContext → explicit `language` param on every endpoint → Gemini target language → response echoes language → UI re-renders.
- **Jurisdiction flow**: onboarding → upload form field → `DocumentObject.jurisdiction` → risk rules + literacy filter; out-of-scope → `scope_notice`.
- **Privacy**: `privacy_mode` on upload; ephemeral never touches Supabase; vault writes documents + analyses + qa_history; countdown bound to real `expires_at`.

## Verification

Run: `cd backend && .venv/Scripts/activate && uvicorn main:app --port 8000` + `npm run dev` (3000). `backend/scripts/smoke_test.sh` (curl): health → upload (multipart) → poll status → get document → summarize?depth=full → risk → Q&A with citations → Q&A expecting insufficient (fabrication probe) → Marathi Q&A → compare (A,B) → action-center → translate (doc_id+clause_id→mr) → export .md download.

Frontend per phase: upload → stepper advances through 5 real stages → risk badges render → cited Q&A → Marathi toggle → compare doc-B upload → export print preview. TTL check: set `SESSION_TTL_MINUTES=2`, confirm 410 purge UX.

## Risks / notes

- **Python 3.14 wheels**: pymupdf fine; chromadb risky → NumPy store is the default, zero risk.
- **Gemini model-name drift/quota**: env-driven names, Phase 0 verification, batched/cached embeddings, Pro escalation behind flag.
- **In-memory store dies with process**: accepted (hackathon); demo runs without `--reload`.
- **Next 16 breaking changes**: consult `node_modules/next/dist/docs/` before auth callback / rewrites work (per AGENTS.md).
- **Google OAuth setup friction**: email+password is the must-have; Google is best-effort within Phase 3.